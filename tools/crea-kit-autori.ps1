# Crea (o aggiorna) la cartella kit-autori/ e il file kit-autori.zip da dare agli autori esterni.
# Copia i file ATTUALI del corso: va rieseguito se cambiano pagina.css, tokens, bridge, modello o guida.
# Uso:  powershell -ExecutionPolicy Bypass -File tools\crea-kit-autori.ps1

$root = Split-Path -Parent $PSScriptRoot
$kit = Join-Path $root "kit-autori"

if (Test-Path $kit) { Remove-Item -Recurse -Force $kit }
New-Item -ItemType Directory -Force (Join-Path $kit "pages\_modello"), (Join-Path $kit "player\fonts") | Out-Null

Copy-Item (Join-Path $root "docs\guida-autori-esterni.md") (Join-Path $kit "LEGGIMI-PRIMA.md")
Copy-Item (Join-Path $root "tools\kit\prova.html")          (Join-Path $kit "prova.html")
Copy-Item (Join-Path $root "pages\pagina.css")              (Join-Path $kit "pages\pagina.css")
Copy-Item (Join-Path $root "pages\_modello\*")              (Join-Path $kit "pages\_modello")
Copy-Item (Join-Path $root "player\tokens.css")             (Join-Path $kit "player\tokens.css")
Copy-Item (Join-Path $root "player\player-bridge.js")       (Join-Path $kit "player\player-bridge.js")
Copy-Item (Join-Path $root "player\fonts\InterVariable.ttf") (Join-Path $kit "player\fonts\InterVariable.ttf")

$zip = Join-Path $root "kit-autori.zip"
if (Test-Path $zip) { Remove-Item -Force $zip }
Compress-Archive -Path $kit -DestinationPath $zip
Write-Host "Kit creato: $kit"
Write-Host "Zip creato: $zip"
