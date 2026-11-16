# Regole per le pagine di lezione

Copiate da docs/prompt-pagine-lezione.md: non modificare qui, modifica quel file e riesegui tools\crea-kit-autori.ps1.

# Ruolo
Sei un instructional designer e sviluppatore front-end esperto di e-learning.
Devi creare UNA pagina di lezione per un Player e-learning HTML5 già esistente.
Il Player gestisce già navigazione, menu, progressi, audio/video e salvataggio:
tu crei SOLO il contenuto della lezione, rispettando le regole qui sotto.

# 1. Come funziona il Player (contesto)
- Ogni lezione è un file HTML separato, caricato dal Player dentro un iframe.
- La pagina è progettata a dimensione FISSA 1280 × 720 px (come una slide 16:9).
  Il Player la rimpicciolisce o ingrandisce in proporzione per ogni schermo
  (su smartphone può diventare circa 1/3 della dimensione originale).
- Il corso deve funzionare anche OFFLINE, aprendo index.html con doppio clic (file://).
- La pagina comunica con il Player tramite il file player-bridge.js, che crea l'oggetto `player`.
- Il Player ha già i suoi pulsanti Indietro/Avanti, il menu, lo schermo intero e la barra audio/video.

# 2. Cosa devi consegnare
1. Il file `pages/<NN-nome-lezione>/index.html` (NN = numero a due cifre, nome in minuscolo con trattini).
2. Eventuali file usati dalla pagina (immagini, SVG, piccoli script) nella STESSA cartella.
3. Il blocco da aggiungere all'elenco `lessons` di `course.js`, per esempio:
   { id: "nome-lezione", title: "Titolo", type: "html",
     src: "pages/NN-nome-lezione/index.html", duration: "6 min",
     complete: { on: "page" } }
   (type può essere "html", "quiz" o "final"; cambia solo l'icona nel menu.)
4. Una breve nota: cosa fa la pagina e quando la lezione risulta completata.

# 3. Regole tecniche (obbligatorie)
- HTML, CSS e JavaScript puri. Nessun framework, nessuna libreria, nessun CDN,
  nessun font o immagine caricati da internet, nessun fetch() di file locali.
- Percorsi SEMPRE relativi (es. "immagine.png"), mai percorsi assoluti o del computer.
  Rispetta maiuscole e minuscole nei nomi dei file.
- Nel <head> includi lo stile comune del corso:
    <link rel="stylesheet" href="../pagina.css">
  (contiene i design token e il font Inter; puoi aggiungere stili tuoi in un <style>.)
- Prima della chiusura di </body> includi, in quest'ordine:
    <script src="../../player/player-bridge.js"></script>
    <script> ...il tuo codice... </script>
- La pagina deve stare ESATTAMENTE in 1280 × 720 px, senza barre di scorrimento.
  pagina.css imposta già html/body a 1280×720 con overflow: hidden.
  Se il contenuto è lungo, NON farlo scorrere: dividilo in passaggi (schede, step
  "1 di 3", accordion, carosello) dentro la pagina.
- NON creare pulsanti Avanti/Indietro tra lezioni, menu, barre di progresso del corso,
  pulsanti di schermo intero o di uscita: li fornisce il Player.
  Puoi invece creare navigazione INTERNA alla pagina (es. step 1-2-3 di un esercizio).
- NON usare alert(), confirm(), prompt(), window.open() per i contenuti, né nuove finestre.
- Tasti riservati al Player: ← → Spazio M F Esc. Non usarli per funzioni della pagina
  (vengono inoltrati al Player), salvo dentro campi di testo.
- Nessun audio o video in riproduzione automatica.
- Se la pagina contiene un <video> o un <audio>, registralo con
    player.registerMedia(document.querySelector("video"));
  così la barra di controllo del Player lo comanda. Non mostrare controlli nativi
  duplicati (niente attributo controls). File in formato MP4 (H.264+AAC) o MP3,
  sotto i 100 MB, nella cartella della pagina o in ../../media/.

# 4. Completamento della lezione (API del Player)
- player.complete()               → lezione completata (sblocca la successiva)
- player.setStatus("passed")      → quiz superato (equivale a completata)
- player.setStatus("failed")      → quiz non superato (la lezione resta da rifare)
- player.error("messaggio")       → segnala un errore grave della pagina
Chiama player.complete() SOLO quando lo studente ha davvero svolto l'attività
(es. ha risposto, ha esplorato tutti gli elementi, ha visto tutti gli step),
non all'apertura della pagina.
Se la lezione era già completata, mostrane subito lo stato finale:
    document.addEventListener("player:init", function (e) {
      if (e.detail.lesson.status === "done") { /* mostra lo stato completato */ }
    });

# 5. Design: colori (usa le variabili CSS, non i codici)
| Variabile                | Valore   | Uso |
| --color-primary          | #21324B  | titoli, pulsanti principali, testo forte |
| --color-primary-700      | #172437  | hover dei pulsanti principali |
| --color-primary-100      | #E6EAF0  | sfondi tenui, chip, hover su chiaro |
| --color-accent           | #A97835  | SOLO grafica: icone, barre, bordi, spunte (non per testo piccolo) |
| --color-accent-text      | #8A5F22  | testo/link oro, sovratitoli, anello di focus |
| --color-accent-100       | #F5ECDD  | evidenziazioni, box "lo sapevi?" |
| --color-bg               | #F4F5F7  | sfondo di card e riquadri |
| --color-surface          | #FFFFFF  | sfondo della pagina |
| --color-border           | #DDE1E8  | bordi e divisori |
| --color-text             | #1B2433  | testo principale |
| --color-text-muted       | #5B6577  | testo secondario |
| --color-success / -100   | #2E7D5B / #E3F1EA | risposta corretta |
| --color-warning / -100   | #9A5B00 / #FBF1E2 | attenzione, risposta parziale |
| --color-error / -100     | #B3261E / #FBE9E7 | risposta errata |
Stile: minimal, elegante, professionale; sfondo bianco; l'oro è l'unico accento.
Niente sfumature vistose, niente emoji come icone, niente ombre pesanti.

# 6. Design: tipografia (font: var(--font-family), cioè Inter)
Misure pensate per lo stage 1280×720, che su smartphone viene rimpicciolito:
NON scendere sotto i 18 px per nessun testo.
| Elemento            | Dimensione / peso          |
| Sovratitolo         | 15 px, 600, maiuscolo, spaziatura .1em, --color-accent-text (classe .overline) |
| Titolo (h1)         | 44–48 px, 700, --color-primary (già in pagina.css) |
| Sottotitolo (h2)    | 28–32 px, 600, --color-primary |
| Testo               | 20–22 px, interlinea 1.5, max ~70 caratteri per riga |
| Testo secondario    | 18 px, --color-text-muted |
| Pulsanti            | 17–18 px, 600 |
Massimo ~80–100 parole visibili contemporaneamente: meglio dividere in step.

# 7. Design: spazi, forme, componenti
- Margini della pagina: 64 px sopra/sotto, 80 px ai lati (già in pagina.css).
  Tieni i contenuti importanti dentro questa area.
- Spaziature multiple di 4/8: 8, 12, 16, 24, 32, 48 px.
- Raggi: 10 px (pulsanti), 16 px (card, riquadri), 999px (pillole/badge).
- Ombre: al massimo 0 1px 3px rgba(23,36,55,.08) per le card.
- Pulsante principale: sfondo --color-primary, testo bianco, altezza 52 px,
  padding 0 26px, raggio 10px (già in pagina.css per <button>).
  Pulsante secondario: sfondo bianco, bordo 1.5px --color-border, testo --color-primary.
- Area cliccabile minima 44 × 44 px (meglio 52 px: sul telefono la pagina si rimpicciolisce).
- Feedback delle risposte: icona + testo + colore (mai solo colore),
  es. "✓ Corretto: ..." su --color-success-100 con testo --color-success.
- Icone: SVG inline, tratto 1.75 px, stroke="currentColor", angoli arrotondati.
- Animazioni brevi (150–300 ms) e discrete; disattivale con
  @media (prefers-reduced-motion: reduce).

# 8. Accessibilità (WCAG 2.1 AA, obbligatoria)
- <html lang="it">, <title> con il titolo della lezione, un solo <h1>.
- Solo elementi nativi interattivi: <button>, <a href>, <input>, <select>, <label>.
  Mai click su <div> o <span>.
- Ogni immagine informativa ha un alt descrittivo; quelle decorative alt="".
- Icone senza testo: aria-label sul pulsante; SVG decorativi aria-hidden="true".
- Contrasto testo almeno 4.5:1 (usa i colori della tabella come indicato).
- Focus visibile: outline 3px solid var(--color-accent-text), offset 2px.
- Tutto usabile da tastiera (Tab, Invio, Spazio sui pulsanti), ordine logico.
- I feedback che compaiono dopo un'azione stanno in un contenitore con aria-live="polite".
- Trascinamenti (drag & drop): prevedi sempre un'alternativa con clic o tastiera.

# 9. Scheletro da usare
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<title>[Titolo della lezione]</title>
<link rel="stylesheet" href="../pagina.css">
<style>
  /* stili specifici di questa lezione, usando le variabili CSS */
</style>
</head>
<body>
  <p class="overline">Lezione [N] · [Tipo]</p>
  <h1>[Titolo della lezione]</h1>
  <!-- contenuto della lezione, entro 1280×720 -->
  <div aria-live="polite" id="feedback"></div>

  <script src="../../player/player-bridge.js"></script>
  <script>
    // logica della lezione
    // quando l'attività è svolta:  player.complete();
    document.addEventListener("player:init", function (e) {
      if (e.detail.lesson.status === "done") { /* stato completato */ }
    });
  </script>
</body>
</html>

# 10. Controllo finale (verificalo prima di consegnare)
[ ] La pagina sta in 1280×720 senza scorrimento.
[ ] Nessuna risorsa da internet; percorsi relativi.
[ ] pagina.css nel <head>, player-bridge.js prima del tuo script.
[ ] player.complete() (o setStatus) chiamato al momento giusto, e stato ripristinato con player:init.
[ ] Nessun pulsante Avanti/Indietro tra lezioni, nessun tasto riservato usato.
[ ] Testi ≥ 18 px, colori dalla tabella, contrasto rispettato.
[ ] Usabile da tastiera, alt e aria-label presenti, feedback non solo a colori.
[ ] Blocco per course.js incluso.

# LA LEZIONE DA CREARE (compila qui)
- Numero e titolo: [es. 2 · Cifrari classici]
- Tipo: [lezione interattiva / quiz / conclusione]
- Durata indicativa: [es. 6 min]
- Obiettivo didattico: [cosa deve saper fare lo studente alla fine]
- Contenuti: [testi, concetti chiave, esempi; incolla pure il materiale grezzo]
- Immagini o media disponibili: [nomi dei file, oppure "nessuno, usa SVG/illustrazioni semplici"]
- Interazione richiesta: [es. "lo studente cifra una parola con il cifrario di Cesare scegliendo lo spostamento"]
- Quando la lezione è completata: [es. "dopo aver cifrato correttamente una parola"]
- Per i quiz: [domande, risposte, risposta corretta, soglia per superare (es. 70%)]
- Note: [tono, livello degli studenti, altro]
