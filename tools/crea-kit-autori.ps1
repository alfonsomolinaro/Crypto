# Crea (o aggiorna):
#  - la skill per Claude .claude/skills/pagina-lezione/ (SKILL.md si scrive a mano; regole.md, pagina.css e modello.html si copiano)
#  - skill-pagina-lezione.zip, da caricare su claude.ai (Impostazioni › Funzionalità › Skill)
#  - la cartella kit-autori/ e il file kit-autori.zip da dare agli autori esterni
# Copia i file ATTUALI del corso: va rieseguito se cambiano pagina.css, tokens, bridge, modello, guida, prompt delle pagine o SKILL.md.
# Uso:  powershell -ExecutionPolicy Bypass -File tools\crea-kit-autori.ps1

$root = Split-Path -Parent $PSScriptRoot
Add-Type -AssemblyName System.IO.Compression, System.IO.Compression.FileSystem

# Zip con percorsi a barra "/" (Compress-Archive di Windows PowerShell usa "\", che su Mac e Linux non crea le cartelle)
function Crea-Zip($cartella, $prefisso, $zip) {
  if (Test-Path $zip) { Remove-Item -Force $zip }
  $archivio = [System.IO.Compression.ZipFile]::Open($zip, [System.IO.Compression.ZipArchiveMode]::Create)
  try {
    Get-ChildItem $cartella -Recurse -File -Force | ForEach-Object {
      $nome = $prefisso + "/" + $_.FullName.Substring($cartella.Length + 1).Replace("\", "/")
      [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($archivio, $_.FullName, $nome, [System.IO.Compression.CompressionLevel]::Optimal) | Out-Null
    }
  } finally { $archivio.Dispose() }
}

# ---------- 1. Skill per Claude ----------
$skill = Join-Path $root ".claude\skills\pagina-lezione"
# regole.md = il testo del prompt (il riquadro ```text … ``` di docs/prompt-pagine-lezione.md): le regole restano in un solo posto
$righe = Get-Content (Join-Path $root "docs\prompt-pagine-lezione.md") -Encoding UTF8
$inizio = [Array]::IndexOf($righe, '```text')
$fine = -1
for ($i = $righe.Length - 1; $i -gt $inizio; $i--) { if ($righe[$i] -eq '```') { $fine = $i; break } }
if ($inizio -lt 0 -or $fine -lt 0) { throw "Riquadro del prompt non trovato in docs\prompt-pagine-lezione.md" }
$regole = @("# Regole per le pagine di lezione", "", "Copiate da docs/prompt-pagine-lezione.md: non modificare qui, modifica quel file e riesegui tools\crea-kit-autori.ps1.", "") + $righe[($inizio + 1)..($fine - 1)]
[System.IO.File]::WriteAllLines((Join-Path $skill "regole.md"), $regole, (New-Object System.Text.UTF8Encoding $false))
Copy-Item (Join-Path $root "pages\pagina.css")          (Join-Path $skill "pagina.css")
Copy-Item (Join-Path $root "pages\_modello\index.html") (Join-Path $skill "modello.html")
Crea-Zip $skill "pagina-lezione" (Join-Path $root "skill-pagina-lezione.zip")

# ---------- 2. Kit per autori esterni ----------
$kit = Join-Path $root "kit-autori"
if (Test-Path $kit) { Remove-Item -Recurse -Force $kit }
New-Item -ItemType Directory -Force (Join-Path $kit "pages\_modello"), (Join-Path $kit "player\fonts"), (Join-Path $kit ".claude\skills"), (Join-Path $kit "approfondimenti") | Out-Null

# Guida breve (5 passi) in cima; la guida lunga va in approfondimenti/
Copy-Item (Join-Path $root "tools\kit\LEGGIMI-PRIMA.md")    (Join-Path $kit "LEGGIMI-PRIMA.md")
Copy-Item (Join-Path $root "docs\guida-autori-esterni.md") (Join-Path $kit "approfondimenti\GUIDA-COMPLETA.md")
Copy-Item (Join-Path $root "skill-pagina-lezione.zip")      (Join-Path $kit "approfondimenti\skill-pagina-lezione.zip")
Copy-Item $skill -Recurse                                   (Join-Path $kit ".claude\skills\pagina-lezione")

# CARICA-NELL-AI.md: UN solo file da allegare in chat (istruzioni per l'AI + regole + pagina.css + modello)
$utf8 = New-Object System.Text.UTF8Encoding $false
$ai = New-Object System.Collections.Generic.List[string]
$ai.AddRange([string[]](Get-Content (Join-Path $root "tools\kit\CARICA-NELL-AI-intestazione.md") -Encoding UTF8))
$ai.AddRange([string[]]@("", "## Regole (obbligatorie)", "", '```text'))
$ai.AddRange([string[]]$righe[($inizio + 1)..($fine - 1)])
$ai.AddRange([string[]]@('```', "", "## Foglio di stile del corso (pages/pagina.css)", "", '```css'))
$ai.AddRange([string[]](Get-Content (Join-Path $root "pages\pagina.css") -Encoding UTF8))
$ai.AddRange([string[]]@('```', "", "## Modello di pagina (pages/_modello/index.html)", "", '```html'))
$ai.AddRange([string[]](Get-Content (Join-Path $root "pages\_modello\index.html") -Encoding UTF8))
$ai.Add('```')
[System.IO.File]::WriteAllLines((Join-Path $kit "CARICA-NELL-AI.md"), $ai, $utf8)
Copy-Item (Join-Path $root "tools\kit\prova.html")          (Join-Path $kit "prova.html")
Copy-Item (Join-Path $root "pages\pagina.css")              (Join-Path $kit "pages\pagina.css")
Copy-Item (Join-Path $root "pages\_modello\*")              (Join-Path $kit "pages\_modello")
Copy-Item (Join-Path $root "player\tokens.css")             (Join-Path $kit "player\tokens.css")
Copy-Item (Join-Path $root "player\player-bridge.js")       (Join-Path $kit "player\player-bridge.js")
Copy-Item (Join-Path $root "player\fonts\InterVariable.ttf") (Join-Path $kit "player\fonts\InterVariable.ttf")
Copy-Item (Join-Path $root "player\fonts\OFL.txt")          (Join-Path $kit "player\fonts\OFL.txt")

Crea-Zip $kit "kit-autori" (Join-Path $root "kit-autori.zip")
Write-Host "Skill aggiornata: $skill"
Write-Host "Zip della skill: $(Join-Path $root 'skill-pagina-lezione.zip')"
Write-Host "Kit creato: $kit"
Write-Host "Zip del kit: $(Join-Path $root 'kit-autori.zip')"
