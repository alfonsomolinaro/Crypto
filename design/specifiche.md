# Player e-learning — Specifiche per lo sviluppo

Documento di consegna dal design allo sviluppo. Da leggere insieme a:

- **Tela del design** (riferimento visivo e prototipi navigabili): https://claude.ai/artifact/EjvtwDNZoMFhuFLJLL1RKt
  - *Design system* · *Componenti e stati* · *Prototipo desktop* · *Prototipo smartphone* · *Smartphone orizzontale*
- `tokens.css`: tutti i valori di stile.
- `icone.svg`: il set di icone.

Il codice dei prototipi sulla tela è un **riferimento**, non va copiato: la struttura vera va scritta seguendo questo documento.

> **Nota sugli esempi.** Le lezioni citate in questo documento («Introduzione alla crittografia», «Cifrari classici», `pages/02-cifrari-classici`, «Quiz finale», «Conclusione», ecc.) sono **esempi della fase di progettazione** e **non fanno parte del corso attuale** «Crypto agility». Le lezioni effettive sono configurate in `course.js`.

---

## 1. Vincoli tecnici

| Vincolo | Conseguenza |
|---|---|
| HTML, CSS e JavaScript puri, senza framework né build | Moduli JS classici (`<script src>`), nessun `import`/`export` né bundler. |
| Apertura con doppio clic da `file://` | Niente `fetch` di file locali: la configurazione è `course.js` (`window.COURSE = {...}`). Niente accesso diretto tra Player e iframe: si comunica con `postMessage`. |
| Online su GitHub Pages | Ogni file deve restare sotto i 100 MB. GitHub Pages non serve i file Git LFS. |
| Nessuna dipendenza esterna | Font (Inter, woff2) e icone inclusi in locale. Nessun CDN, nessun Google Fonts. |
| SCORM 1.2 in futuro | Il salvataggio passa da un unico modulo `storage` con due implementazioni: localStorage ora, SCORM poi. |
| Browser | Ultime versioni di Chrome, Edge, Firefox, Safari (anche iOS/Android). |

## 2. Struttura delle cartelle

```
corso/
├─ index.html              ← avvia il Player
├─ course.js               ← configurazione del corso
├─ player/                 ← Player, identico per tutti i corsi
│  ├─ tokens.css           ← design token (questo file di consegna)
│  ├─ player.css
│  ├─ player.js
│  ├─ storage.js           ← localStorage ora, SCORM 1.2 poi
│  ├─ player-bridge.js     ← da includere in ogni pagina di contenuto
│  └─ fonts/Inter-Variable.woff2
├─ pages/                  ← una cartella per lezione HTML
│  └─ 02-cifrari-classici/index.html
├─ media/
│  ├─ video/intro.mp4      ← MP4 H.264 + AAC
│  └─ audio/p02.mp3
└─ resources/              ← PDF scaricabili
```

## 3. Configurazione del corso (`course.js`)

```js
window.COURSE = {
  id: "crittografia-basi",            // chiave per il salvataggio
  title: "Crittografia: le basi",
  description: "[Descrizione breve del corso]",
  navigation: "vincolata",            // "vincolata" | "libera"
  theme: {                            // opzionale: sovrascrive i token
    "--color-primary": "#21324B",
    "--color-accent": "#A97835"
  },
  resources: [
    { title: "Slide del corso", file: "resources/slide.pdf", size: "2,4 MB" }
  ],
  lessons: [
    { id: "intro", title: "Introduzione alla crittografia", type: "video",
      src: "media/video/intro.mp4", duration: "3 min",
      complete: { on: "media-end", threshold: 0.95 } },
    { id: "cifrari", title: "Cifrari classici", type: "html",
      src: "pages/02-cifrari-classici/index.html",
      audio: "media/audio/p02.mp3", duration: "6 min",
      complete: { on: "page" } },     // la pagina chiama player.complete()
    { id: "quiz", title: "Quiz finale", type: "quiz",
      src: "pages/06-quiz/index.html", duration: "5 min",
      complete: { on: "page" } },
    { id: "fine", title: "Conclusione", type: "final",
      src: "pages/07-conclusione/index.html", duration: "1 min",
      complete: { on: "visit" } }
  ]
};
```

- `type`: `video` (renderizzato dal Player con `<video>`), `html` · `quiz` · `final` (iframe). Il tipo decide l'icona nel menu.
- `complete.on`: `visit` (default), `page` (via bridge), `media-end` (fine del media, soglia `threshold`).
- `audio`: narrazione riprodotta **dal Player**, non dalla pagina.
- `duration`: testo in minuti (`"6 min"`), sommato nella copertina. Per le lezioni `video` è facoltativo: se manca, il Player legge la durata dai metadati del file (`<video preload="metadata">`, funziona anche da `file://`) e mostra «m min s s»; il totale del corso usa i secondi reali arrotondati al minuto.
- `resources` può comparire anche dentro una lezione.

## 4. Anatomia del Player

```
┌──────────────────────── header (64) ────────────────────────┐
│ ☰  Titolo corso › Lezione n · titolo   [DEV]  ▬▬▬ 29%  Risorse(3)  ⛶  Esci │
├─────────────┬───────────────────────────────────────────────┤
│ menu (320)  │  area contenuti (--color-letterbox)            │
│  voci…      │      ┌──────── stage 16:9 ────────┐            │
│  progresso  │      │  <video> oppure <iframe>   │            │
│             │      └────────────────────────────┘            │
├─────────────┴──────────── barra (80) ───────────────────────┤
│ ‹ Indietro      [⟲ ⏪10 ▶ ⏩10  1:12/3:00 ━━━●━━  🔊 ━━ 1×]      Avanti › │
└──────────────────────────────────────────────────────────────┘
```

Componenti (un modulo JS per ciascuno, con stato centralizzato in `player.js`):

| Componente | Contenuto |
|---|---|
| **Header** | hamburger, titolo del corso + breadcrumb (`›` + "Lezione n · titolo"), badge DEV, progresso (barra + %), Risorse con badge numerico, Schermo intero, Esci |
| **Menu** | titolo "Lezioni" + "n di N completate", pin (solo ≥1440), chiudi; elenco voci; piede con barra di progresso e tempo nel corso |
| **Stage** | area 1280×720 scalata (vedi §6), contiene `<video>`, `<iframe>` o il box di errore |
| **Barra inferiore** | griglia `1fr auto 1fr`: Indietro a sinistra, media bar al centro (solo se c'è un media), Avanti a destra |
| **Media bar** | riascolta, −10 s, play/pausa, +10 s, tempo, barra di avanzamento, volume + slider, velocità |
| **Pannello Risorse** | popover sotto l'header (desktop) / voce del menu "⋮" (mobile) |
| **Toast** | in basso a destra sopra la barra (desktop), a tutta larghezza (mobile) |
| **Dialog** | conferma uscita; modale con focus trap |
| **Copertina** · **Schermata finale** | schermate a tutta pagina, fuori dalla cornice |

## 5. Stati e regole di navigazione

### Stati di una lezione

| Stato | Condizione | Icona (`icone.svg`) | Colori |
|---|---|---|---|
| Completata | `done` | `completata` in cerchio pieno | fondo `--color-accent`, icona bianca |
| In corso | lezione corrente non completata | cerchio con metà piena | `--color-accent` |
| Iniziata | visitata, non completata, non corrente | cerchio con metà piena | `--color-accent` |
| Da iniziare | sbloccata, mai visitata | cerchio vuoto | contorno `--color-disabled` |
| Non superata | quiz con esito negativo | `avviso` | `--color-warning` su `--color-warning-100` |
| Bloccata | vedi sotto | `bloccata` | `--color-surface-muted`, testo con opacità .6, voce `disabled` |

La **lezione corrente** ha anche fondo `--color-accent-100`, titolo 600 in `--color-primary` e `aria-current="page"`. Lo stato è sempre scritto anche in testo nella riga meta: "Interattiva · 6 min · In corso".

### Sblocco
- **Vincolata:** la lezione *i* è sbloccata se *i = 0* oppure la lezione *i−1* è completata.
- **Libera:** tutte sbloccate.
- **Modalità sviluppo:** tutte sbloccate e Avanti sempre attivo.
- Le lezioni completate restano sempre rivisitabili.

### Pulsante Avanti
| Situazione | Aspetto |
|---|---|
| Vincolata, lezione non completata | disabilitato (`.dis`), nessun messaggio |
| Lezione completata, successiva mai visitata | **evidenziato**: pulse oro in loop (`--duration-pulse`) |
| Lezione completata, successiva già visitata | normale |
| Libera, lezione non completata | normale |
| Ultima lezione | etichetta **"Termina"**: attivo solo se completata, porta alla schermata finale |

Nessun avanzamento automatico, nemmeno a fine media.

### Al completamento di una lezione
1. Stato → completata, salvataggio immediato.
2. Barra di progresso aggiornata con transizione (`--duration-progress`).
3. Toast "Lezione completata" + "Si è sbloccata: ‹titolo›" (libera: "Puoi passare alla lezione successiva"; ultima: "Premi Termina per concludere il corso").
4. Avanti evidenziato.

**Corso completato** = tutte le lezioni completate → schermata finale con celebrazione.

## 6. Stage 16:9 e scalatura

- I contenuti si progettano a **1280×720**.
- Il Player calcola lo spazio disponibile (area contenuti meno `--stage-padding` per lato) e applica `scale = min(larghezza / 1280, altezza / 720)`; lo stage è centrato, il resto sono bande `--color-letterbox`.
- Ricalcolo su `resize`, apertura/chiusura del menu (desktop push) e cambio di orientamento (`ResizeObserver` sull'area contenuti).
- Il video usa `object-fit: contain` dentro lo stage; l'iframe è 1280×720 con `transform: scale()` e `transform-origin: 0 0`.

## 7. Responsive

| Ambito | Desktop ≥1024 | Tablet 768–1023 | Smartphone verticale <768 | Smartphone orizzontale |
|---|---|---|---|---|
| Header | 64 px, completo | 64 px; "Risorse" ed "Esci" solo icona | 56 px: ☰, titolo corso (12 px) sopra lezione (15 px), anello di progresso 36 px, "⋮" con Risorse, Schermo intero, Esci | 48 px: ☰, titolo › lezione, barra 80 px + %, "⋮" |
| Menu | **push** 320 px, animazione 280 ms; pin ≥1440 | overlay con scrim | overlay 330 px da sinistra, scrim; si chiude toccando fuori, con la X, con Esc o scegliendo una lezione | overlay |
| Stage | scalato al centro | scalato | **a tutta larghezza**, sotto: titolo lezione + scheda "Ruota il telefono per vedere la lezione più grande" | scalato, cornici minime |
| Barra | 80 px, media bar completa | come desktop, slider volume nascosto | linea di avanzamento sopra; riga: ‹ (icona), play, tempo, "⋯", Avanti con etichetta | 56 px: ‹, −10, play, tempo, avanzamento, "⋯", Avanti |
| "⋯" media | — | — | **bottom sheet**: −10 s, da capo, +10 s, volume e muto, velocità a chip (0,75× – 2×) | come verticale |
| Dialog di uscita | centrato | centrato | **bottom sheet**, pulsanti a tutta larghezza | centrato |

Il menu su desktop si apre **chiuso** se la larghezza è < 1280; altrimenti aperto (preferenza ricordata).

## 8. Audio e video

- Nessun autoplay; play esplicito (bottone grande al centro del video, oppure play nella barra).
- Più media su una pagina: la barra comanda il **media attivo** (l'ultimo avviato); avviarne uno mette in pausa gli altri.
- Cambio lezione: il media si ferma. **Volume, muto e velocità persistono** tra le lezioni (salvati con i progressi).
- Velocità: 0,75× · 1× · 1,25× · 1,5× · 2× (desktop: clic che cicla; mobile: chip).
- Tempo in formato `m:ss / m:ss`, cifre tabellari.
- La barra di avanzamento è un `<input type="range">` stilizzato (accessibile da tastiera: frecce ±5 s).
- Media mancante o formato non supportato → box di errore nello stage, controlli nascosti.

## 9. Comunicazione pagina ↔ Player (`player-bridge.js`)

Ogni pagina HTML include `<script src="../../player/player-bridge.js"></script>` e usa l'oggetto `player`:

| Chiamata nella pagina | Messaggio inviato | Effetto nel Player |
|---|---|---|
| `player.complete()` | `{type:"player:complete"}` | lezione completata |
| `player.setStatus("passed" \| "failed")` | `{type:"player:status", value}` | quiz superato / non superato |
| `player.error(msg)` | `{type:"player:error", message}` | box di errore |
| `player.registerMedia(el)` | `{type:"player:media", ...}` + aggiornamenti di tempo | la media bar comanda quel media |
| (automatico) tasti scorciatoia | `{type:"player:key", key}` | il Player esegue la scorciatoia |
| (automatico) caricamento | `{type:"player:ready"}` | se non arriva entro 8 s → errore "La lezione non si carica" |

Il Player invia alla pagina: `player:media-command` (play, pause, seek, volume, rate) e `player:init` (stato della lezione).

**Sicurezza:** il Player accetta solo messaggi con `event.source === iframe.contentWindow` e `type` che inizia con `player:`. `event.origin` da `file://` vale `"null"` e non va usato come controllo.

## 10. Salvataggio e ripresa

Dati salvati (chiave = `COURSE.id`): stato di ogni lezione, ultima lezione visitata, tempo totale, preferenze media (volume, muto, velocità), menu aperto/chiuso.

- **Ora:** `localStorage`, scritto a ogni cambiamento di stato. Se non è disponibile (alcuni browser da `file://`, navigazione privata) → toast persistente "Salvataggio non disponibile", il corso funziona comunque.
- **SCORM 1.2 (dopo):** `cmi.core.lesson_status` (`incomplete` / `completed`), `cmi.core.lesson_location` (id della lezione), `cmi.suspend_data` (stato compatto, ≤4096 caratteri, es. `"c,c,v,n,n,f,n"`), `cmi.core.session_time`. `LMSFinish` all'uscita.
- **Copertina:** se ci sono progressi → "Riprendi da «titolo»" + "Ricomincia da capo" + barra del progresso; altrimenti "Inizia il corso".

## 11. Uscita, risorse, errori

- **Esci** → dialog "Vuoi uscire dal corso?" / "I tuoi progressi sono salvati. Quando tornerai potrai riprendere da «titolo»." / Annulla · Esci. In HTML autonomo torna alla copertina (un browser non permette di chiudere la finestra); in SCORM chiama `LMSFinish`.
- **Risorse** → elenco con icona file, nome, tipo e peso, pulsante download (`<a href download>`).
- **Errori** (box nello stage, `role="alert"`): "Il video non è disponibile", "La lezione non si carica". Testo non tecnico, pulsante "Riprova".

## 12. Modalità sviluppo

Attiva con `?dev=1` nell'indirizzo o `dev: true` in `course.js`:
- badge rosso **DEV** nell'header;
- tutte le lezioni sbloccate, Avanti sempre attivo;
- pannello in alto a destra con lo stato salvato di ogni lezione e il pulsante "Azzera progressi";
- log dei messaggi del bridge in console.

## 13. Tastiera e accessibilità (WCAG 2.1 AA)

| Tasto | Azione |
|---|---|
| ← / → | lezione precedente / successiva (rispettando i blocchi) |
| Spazio | play / pausa |
| M | apri / chiudi menu |
| F | schermo intero |
| Esc | chiude menu, pannelli e dialog |

Le scorciatoie non si attivano con il focus in `input`, `textarea`, `select` o elementi `contenteditable`.

- Solo elementi nativi: `<button>`, `<a href>`, `<input>`; `aria-label` su tutti i pulsanti con sola icona.
- `aria-expanded` su hamburger, Risorse, "⋮", "⋯"; `aria-current="page"` sulla lezione corrente; voci bloccate `disabled`.
- Progresso: `role="progressbar"` con `aria-valuenow`.
- Annuncio al cambio lezione in una regione `aria-live="polite"`: "Lezione 3 di 7: Crittografia simmetrica". I toast usano `role="status"`.
- Focus: anello `--focus-ring`; all'apertura del menu va alla voce corrente, alla chiusura torna all'hamburger; al cambio lezione va sullo stage; focus trap nei dialog e nel menu overlay.
- `title` sull'iframe ("Contenuto della lezione: ‹titolo›").
- Area cliccabile ≥ 44×44 px.
- `prefers-reduced-motion`: niente pulse (alone statico), niente coriandoli, transizioni istantanee.
- Schermo intero nascosto dove la Fullscreen API non è disponibile (iPhone).

## 14. Testi dell'interfaccia

Tutte le etichette in italiano, raccolte in un unico oggetto `STRINGS` in `player.js` per una futura traduzione: Inizia il corso, Riprendi da «…», Ricomincia da capo, Lezioni, n di N completate, Indietro, Avanti, Termina, Risorse, Esci, Schermo intero, Vuoi uscire dal corso?, Lezione completata, Si è sbloccata: …, Nuova lezione sbloccata, Quiz non superato, Progresso salvato, Salvataggio non disponibile, Il video non è disponibile, La lezione non si carica, Riprova, Corso completato, Complimenti, hai concluso il corso, Scarica l'attestato, Rivedi le lezioni, Ruota il telefono per vedere la lezione più grande.

## 15. Ordine di sviluppo consigliato

1. Scheletro: `index.html`, `tokens.css`, layout a tre fasce, stage scalato, lettura di `course.js`.
2. Navigazione: Indietro/Avanti, menu (push e overlay), stati delle lezioni, sblocco.
3. Bridge e iframe; tipo `video` nativo; media bar.
4. Salvataggio, copertina con "Riprendi", schermata finale.
5. Toast, risorse, uscita, errori, modalità sviluppo.
6. Responsive mobile, tastiera, accessibilità, rifiniture delle animazioni.
7. Prova finale: apertura con doppio clic da `file://` su Chrome, Firefox, Safari.
