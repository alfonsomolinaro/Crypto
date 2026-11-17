# Istruzioni per l'assistente AI — creazione di una lezione per il Player e-learning

> **Per la persona che ha caricato questo file:** non devi leggerlo. Scrivi nella chat titolo, contenuti, cosa deve fare lo studente e quando la lezione è finita.

## Il tuo compito (istruzioni per l'AI)

L'utente è un autore di contenuti, **non un programmatore**. Ti darà i contenuti di UNA lezione. Tu devi:

1. Creare la pagina di lezione `index.html` seguendo **alla lettera** le «Regole» qui sotto e partendo dal «Modello di pagina» in fondo a questo file. Usa le classi già presenti nel «Foglio di stile del corso» (`pagina.css`), senza inventarne di uguali.
2. Se mancano informazioni essenziali (titolo, contenuti, cosa fa lo studente, quando la lezione è completata), chiedile **in una sola domanda breve**. Altrimenti procedi senza fare domande.
3. Rispondere in italiano, in modo semplice, con **solo** queste parti:
   - il file **`index.html` completo**, come file da scaricare (o in un unico blocco di codice, se non puoi creare file);
   - il **nome della cartella** in cui salvarlo: minuscole e trattini, preceduto dal numero della lezione se noto (es. `03-simmetrica`);
   - l'elenco delle **immagini** da mettere nella cartella, se ne hai usate (altrimenti usa solo SVG scritti nella pagina);
   - in fondo, il **blocco per `course.js`**, con la nota «Da inoltrare al responsabile del corso».
4. Non spiegare il codice. Se l'utente segnala un problema (testo tagliato, lezione che non si completa, scritta rossa in `prova.html`), correggi e restituisci di nuovo il file completo.

**Struttura delle cartelle in cui verrà salvata la pagina** (i percorsi nel codice devono funzionare da qui):

```
kit-autori/
├─ prova.html
├─ pages/
│  ├─ pagina.css
│  └─ <nome-cartella>/index.html   ← la pagina che crei
└─ player/
   └─ player-bridge.js
```

Quindi: `<link rel="stylesheet" href="../pagina.css">` e `<script src="../../player/player-bridge.js"></script>`.

---

## Regole (obbligatorie)

```text
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
```

## Foglio di stile del corso (pages/pagina.css)

```css
/* =========================================================================
   STILE COMUNE DELLE PAGINE DI LEZIONE — NON MODIFICARE QUESTO FILE.
   Ogni pagina è progettata a 1280×720 px: il Player la scala per lo schermo.
   Per stili specifici di una lezione usare un <style> dentro la pagina.
   Componenti pronti: vedi pages/_modello/index.html e docs/guida-autori-esterni.md
   ========================================================================= */
@import url("../player/tokens.css");

*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; width: 1280px; height: 720px; overflow: hidden; background: var(--color-surface); }
body {
  font-family: var(--font-family); color: var(--color-text);
  padding: 64px 80px; display: flex; flex-direction: column; gap: 22px;
}
.overline { margin: 0; font-size: 15px; font-weight: 600; letter-spacing: .1em; text-transform: uppercase; color: var(--color-accent-text); }
h1 { margin: 0; font-size: 46px; line-height: 1.1; font-weight: 700; color: var(--color-primary); }
p { margin: 0; font-size: 20px; line-height: 1.55; max-width: 900px; color: var(--color-text-muted); }
.area {
  flex: 1; border: 2px dashed var(--color-border); border-radius: 16px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px;
  font-size: 18px; color: var(--color-text-muted);
}
.row { display: flex; gap: 12px; }
button {
  height: 52px; padding: 0 26px; border: 0; border-radius: 10px; cursor: pointer;
  font: 600 17px/1 var(--font-family); background: var(--color-primary); color: #fff;
}
button:hover { background: var(--color-primary-700); }
button.secondary { background: #fff; color: var(--color-warning); box-shadow: inset 0 0 0 1.5px var(--color-warning); }
button:focus-visible { outline: 3px solid var(--color-accent-text); outline-offset: 2px; }
.done {
  display: none; align-items: center; gap: 10px; font-size: 18px; font-weight: 600;
  color: var(--color-accent-text); background: var(--color-accent-100); padding: 12px 20px; border-radius: 999px;
}
.is-done .done { display: inline-flex; }
.is-done .todo { display: none; }

/* ---------- Componenti pronti ---------- */
h2 { margin: 0; font-size: 30px; line-height: 1.2; font-weight: 600; color: var(--color-primary); }
h3 { margin: 0; font-size: 22px; line-height: 1.3; font-weight: 600; color: var(--color-primary); }
.testo { font-size: 21px; line-height: 1.5; color: var(--color-text); max-width: 900px; }
.piccolo { font-size: 18px; color: var(--color-text-muted); }

/* Griglie: 2 o 3 colonne uguali */
.griglia-2, .griglia-3 { display: grid; gap: 24px; align-items: start; }
.griglia-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.griglia-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Card */
.card {
  background: var(--color-bg); border: 1px solid var(--color-border); border-radius: 16px;
  padding: 24px; display: flex; flex-direction: column; gap: 10px;
}
.card p { font-size: 19px; color: var(--color-text); }

/* Riquadro "Lo sapevi?" */
.box-info {
  background: var(--color-accent-100); border-radius: 16px; padding: 20px 24px;
  display: flex; gap: 16px; align-items: flex-start; font-size: 20px; line-height: 1.5; color: var(--color-text);
}
.box-info strong { color: var(--color-accent-text); }

/* Immagine con didascalia */
.figura { margin: 0; display: flex; flex-direction: column; gap: 8px; }
.figura img { display: block; width: 100%; height: auto; border-radius: 12px; }
.figura figcaption { font-size: 18px; color: var(--color-text-muted); }

/* Pulsante secondario e scelte di una domanda */
button.btn-secondario { background: #fff; color: var(--color-primary); box-shadow: inset 0 0 0 1.5px var(--color-border); }
button.btn-secondario:hover { background: var(--color-bg); }
.scelte { display: flex; flex-direction: column; gap: 10px; }
.scelte button {
  height: auto; min-height: 56px; padding: 14px 20px; text-align: left; line-height: 1.35;
  background: #fff; color: var(--color-text); font-weight: 500; font-size: 19px;
  box-shadow: inset 0 0 0 1.5px var(--color-border);
}
.scelte button:hover { background: var(--color-bg); }
.scelte button[aria-pressed="true"] { box-shadow: inset 0 0 0 2px var(--color-primary); background: var(--color-primary-100); }

/* Feedback delle risposte (sempre icona + testo, mai solo colore) */
.feedback { font-size: 19px; line-height: 1.45; border-radius: 12px; padding: 14px 18px; }
.feedback:empty { display: none; }
.feedback.ok { background: var(--color-success-100); color: var(--color-success); }
.feedback.ko { background: var(--color-error-100); color: var(--color-error); }

/* Passaggi interni alla pagina (per contenuti lunghi: niente scorrimento) */
.passo { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 20px; }
.passo[hidden] { display: none; }
.passi-nav { display: flex; align-items: center; gap: 16px; font-size: 18px; color: var(--color-text-muted); }

@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
```

## Modello di pagina (pages/_modello/index.html)

```html
<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<!-- ✏️ MODIFICA QUI: il titolo della lezione (compare nella scheda del browser) -->
<title>Titolo della lezione</title>

<!-- ⛔ NON TOCCARE: stile comune del corso (colori, caratteri, componenti pronti) -->
<link rel="stylesheet" href="../pagina.css">

<!-- ✏️ Facoltativo: stili solo per questa lezione. Usa i colori var(--color-...) della guida. -->
<style>
</style>
</head>
<body>
  <!-- =====================================================================
       PAGINA MODELLO — copia l'intera cartella _modello, rinominala
       (es. 03-simmetrica) e modifica solo le parti segnate con ✏️.
       La pagina misura 1280 × 720 px: tutto deve starci SENZA scorrere.
       ===================================================================== -->

  <!-- ✏️ Sovratitolo e titolo -->
  <p class="overline">Lezione 3 · Contenuto interattivo</p>
  <h1>Titolo della lezione</h1>

  <!-- ================= PASSO 1: spiegazione ================= -->
  <section class="passo" id="passo-1" aria-label="Passo 1 di 2">
    <div class="griglia-2">
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <!-- ✏️ Testo: massimo 3–4 frasi brevi per riquadro -->
        <p class="testo">Qui va la spiegazione principale. Usa frasi brevi e chiare: lo studente legge sullo schermo, a volte su un telefono.</p>
        <p class="testo">Un secondo paragrafo, se serve. Se il testo è lungo, dividilo in più passi invece di rimpicciolirlo.</p>
        <!-- ✏️ Riquadro evidenziato (facoltativo: cancellalo se non serve) -->
        <div class="box-info"><span><strong>Lo sapevi?</strong> Una curiosità o un concetto chiave da ricordare.</span></div>
      </div>
      <!-- ✏️ Immagine: metti il file in questa cartella e scrivi qui il nome esatto.
           "alt" = descrizione per chi non vede l'immagine (obbligatoria). -->
      <figure class="figura">
        <img src="immagine-esempio.svg" alt="Un lucchetto chiuso, simbolo della crittografia">
        <figcaption>Didascalia dell'immagine.</figcaption>
      </figure>
    </div>
  </section>

  <!-- ================= PASSO 2: verifica ================= -->
  <section class="passo" id="passo-2" aria-label="Passo 2 di 2" hidden>
    <!-- ✏️ Domanda -->
    <h2>Domanda: quale di queste affermazioni è corretta?</h2>
    <div class="scelte" id="scelte">
      <!-- ✏️ Risposte: data-giusta="si" sulla risposta corretta (una sola) -->
      <button type="button" data-giusta="no">Prima risposta (sbagliata)</button>
      <button type="button" data-giusta="si">Seconda risposta (giusta)</button>
      <button type="button" data-giusta="no">Terza risposta (sbagliata)</button>
    </div>
    <!-- Qui compare il risultato (non toccare l'id) -->
    <div class="feedback" id="feedback" aria-live="polite"></div>
  </section>

  <!-- Navigazione tra i passi DENTRO la pagina (non è il pulsante Avanti del corso) -->
  <div class="passi-nav">
    <button type="button" class="btn-secondario" id="indietro" hidden>Indietro</button>
    <button type="button" id="continua">Continua</button>
    <span id="contatore">Passo 1 di 2</span>
  </div>

  <!-- ⛔ NON TOCCARE: collega la pagina al Player. Deve restare prima dello script sotto. -->
  <script src="../../player/player-bridge.js"></script>

  <script>
    // ✏️ Testi dei messaggi di risposta
    var MESSAGGIO_GIUSTO = "✓ Corretto! Hai completato la lezione: ora puoi andare avanti.";
    var MESSAGGIO_SBAGLIATO = "✗ Non è corretto. Rileggi la spiegazione e riprova.";

    // ---------- Da qui in poi non serve modificare nulla ----------
    var passi = document.querySelectorAll(".passo");
    var attuale = 0;

    function mostraPasso(n) {
      attuale = n;
      passi.forEach(function (p, i) { p.hidden = i !== n; });
      document.getElementById("indietro").hidden = n === 0;
      document.getElementById("continua").hidden = n === passi.length - 1;
      document.getElementById("contatore").textContent = "Passo " + (n + 1) + " di " + passi.length;
    }
    document.getElementById("continua").addEventListener("click", function () { mostraPasso(attuale + 1); });
    document.getElementById("indietro").addEventListener("click", function () { mostraPasso(attuale - 1); });

    var feedback = document.getElementById("feedback");
    document.getElementById("scelte").addEventListener("click", function (e) {
      var scelta = e.target.closest("button");
      if (!scelta) return;
      document.querySelectorAll("#scelte button").forEach(function (b) { b.setAttribute("aria-pressed", String(b === scelta)); });
      if (scelta.getAttribute("data-giusta") === "si") {
        feedback.className = "feedback ok";
        feedback.textContent = MESSAGGIO_GIUSTO;
        player.complete();               // ← la lezione è completata: il Player sblocca Avanti
      } else {
        feedback.className = "feedback ko";
        feedback.textContent = MESSAGGIO_SBAGLIATO;
      }
    });

    // Se la lezione era già stata completata, mostra subito la domanda risolta
    document.addEventListener("player:init", function (e) {
      if (e.detail.lesson.status === "done") {
        mostraPasso(passi.length - 1);
        feedback.className = "feedback ok";
        feedback.textContent = MESSAGGIO_GIUSTO;
      }
    });

    mostraPasso(0);
  </script>
</body>
</html>
```
