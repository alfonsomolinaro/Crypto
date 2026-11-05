# Progetto: "Player" — interfaccia di navigazione per corsi e-learning

## Obiettivo
Progetta il **design system completo** e le **schermate chiave** di un Player e-learning: l'interfaccia che fa da cornice alle pagine di contenuto di un corso e permette di navigarle. Non progettare i contenuti delle pagine, solo il Player.
Il Player deve essere moderno, intuitivo e professionale. Deve anche essere **riutilizzabile per più corsi**: per un corso nuovo si cambiano solo la configurazione, i contenuti e i design token.
Il risultato verrà poi sviluppato con Claude Code, quindi serve un design system chiaro e pronto da implementare: token, componenti, stati, comportamenti e misure.

## Contesto tecnico (vincoli da rispettare nel design)
- **Tecnologia:** HTML, CSS e JavaScript puri, senza framework e senza build. Il corso si apre con un doppio clic su `index.html`.
- **Distribuzione:**
  1. HTML autonomo, ospitato su un repository GitHub (GitHub Pages);
  2. **apribile offline da file locale** (`file://`, ad esempio da chiavetta USB);
  3. in futuro pacchetto **SCORM 1.2** per LMS.
  Il Player rileva da solo se è dentro un LMS: se sì usa SCORM, altrimenti salva su localStorage.
- **Configurazione:** un unico file `course.js` che assegna l'oggetto di configurazione a `window.COURSE`. Non usare un `.json` letto con `fetch`, perché da `file://` il browser lo blocca. Il file contiene titolo del corso, elenco delle pagine, tipo, durata stimata, media, risorse scaricabili, modalità di navigazione e design token.
- **Formato dello stage:** stile **Articulate Storyline**. Il contenuto è un'area **16:9 a dimensione fissa, scalata in modo proporzionale** per riempire lo spazio disponibile, con letterbox in tinta neutra. Il Player intorno invece è responsive.
- **Browser:** tutti quelli moderni (Chrome, Edge, Firefox, Safari, anche mobile).

### Struttura delle cartelle (tutti i file sono locali, nessun servizio esterno)
```
corso/
├─ index.html              ← avvia il Player
├─ course.js               ← configurazione del corso
├─ player/                 ← Player riutilizzabile (uguale per tutti i corsi)
│  ├─ player.css
│  ├─ player.js
│  ├─ player-bridge.js     ← da includere in ogni pagina di contenuto
│  ├─ scorm.js
│  ├─ fonts/               ← font inclusi in locale (woff2)
│  └─ icons/
├─ pages/                  ← una cartella per pagina, ognuna con il suo index.html
│  ├─ 02-modulo-1/
│  └─ …
├─ media/
│  ├─ video/               ← es. intro.mp4
│  └─ audio/               ← es. p02-narrazione.mp3
└─ resources/              ← PDF e altri file scaricabili
```
Formati consigliati: video **MP4 (H.264 + AAC)** e audio **MP3**, i più compatibili. Ogni file deve restare **sotto i 100 MB**: è il limite di GitHub, e GitHub Pages non serve i file Git LFS. Conviene comprimere i video, ad esempio in 1080p o 720p.

### Tipi di pagina e modalità di rendering
- **`video`**: il Player mostra direttamente il video nello stage, con un `<video>` nativo che legge il file da `media/video/`. Non serve un HTML di pagina, e la barra di navigazione controlla il video.
- **`html`**: pagina interattiva (file HTML separato in `pages/`) caricata in un **iframe** dentro lo stage.
- **Audio di narrazione**: si dichiara per pagina in `course.js` e lo riproduce **il Player**, non la pagina. Così i controlli della barra funzionano sempre.

### Comunicazione pagina ↔ Player (bridge)
- Ogni pagina HTML include `player/player-bridge.js`, che espone un oggetto semplice: `player.complete()`, `player.setStatus('failed' | 'passed')`, `player.error(msg)`, `player.registerMedia(el)`.
- Internamente il bridge usa **`postMessage`**. È l'unico metodo che funziona sia online sia da `file://`: in locale Chrome tratta ogni file come un'origine separata e blocca l'accesso diretto `window.parent`.
- Il Player accetta solo messaggi che provengono dal suo iframe (`event.source === iframe.contentWindow`) e con un campo `type` riconosciuto, ad esempio con prefisso `player:`. Non ci si può basare su `event.origin`, che da `file://` vale `"null"`.
- Se una pagina contiene un video o un audio proprio, lo registra con `player.registerMedia(el)`: il bridge sincronizza stato e tempo, e la barra del Player può comandarlo.
- Il bridge **inoltra al Player le scorciatoie da tastiera** premute dentro l'iframe, perché altrimenti il Player non le riceverebbe.

## Struttura del corso
- Struttura **piatta**: Pagina 1, 2, 3… Massimo circa 10 pagine, in genere 8–9.
- Sequenza tipica:
  0. **Copertina / Benvenuto**: titolo del corso, breve descrizione, durata totale, pulsante "Inizia". Se esistono progressi salvati mostra **"Riprendi da dove avevi lasciato"** e "Ricomincia".
  1. Pagina **Video**: file locale in `media/video/`.
  2–5. Quattro **moduli interattivi**.
  6. **Quiz** (opzionale).
  7. **Pagina finale**: "Hai completato il corso", con riepilogo e accesso all'attestato.
- Ogni tipo di pagina (video, interattiva, quiz, finale) ha **un'icona dedicata** nel menu.
- Quiz e attestato sono normali pagine di contenuto. Il Player si limita a mostrarne lo stato.

## Layout generale
**Header (sempre visibile, fisso in alto)**
- **Titolo del corso**, sempre visibile. Nessun logo e nessun nome utente.
- Pulsante **hamburger** per aprire il menu.
- **Breadcrumb**: `Titolo corso › Titolo pagina corrente`. Su mobile è ridotto al titolo della pagina.
- **Indicatore di progresso generale**: barra percentuale sottile e/o anello con percentuale.
- Pulsante **Schermo intero**. Va nascosto dove l'API non è supportata, come su iPhone.
- Pulsante **Risorse** (vedi sotto).
- Pulsante **Esci**.

**Area centrale**
- Stage 16:9 scalato, con il video nativo oppure l'iframe della pagina.

**Barra di navigazione inferiore (fissa in basso anche su mobile)**
- **Indietro**, a sinistra.
- **Controlli audio/video** al centro. Compaiono **solo se la pagina ha un media**: se non c'è media sono nascosti, non disabilitati.
- **Avanti**, a destra.
- Non mostrare l'indicatore "Pagina X di Y".

## Navigazione
- Modalità configurabile per singolo corso: **libera** o **vincolata**. Default: vincolata, cioè ogni pagina completata sblocca la successiva.
- In modalità vincolata **"Avanti" resta disabilitato** finché la pagina non è completata. Non serve un messaggio esplicativo: lo stato visivo basta.
- Quando la pagina viene completata, oppure il media arriva alla fine, il pulsante **"Avanti" si evidenzia** con un'animazione leggera (pulse o glow nel colore accento) per invitare a proseguire. Non c'è avanzamento automatico.
- **Scorciatoie da tastiera:** ←/→ pagina precedente/successiva, Spazio play/pausa, `M` apri/chiudi menu, `F` schermo intero, `Esc` chiude il menu o il dialog. Funzionano anche con il focus dentro l'iframe, grazie al bridge. Non devono attivarsi mentre il focus è in un campo di input.
- Nessuna navigazione con swipe su mobile.

## Menu laterale a scomparsa
- Si apre da **sinistra** con un'animazione fluida (circa 250–300 ms, easing morbido).
- **Desktop:** modalità **push**, cioè il contenuto si restringe e lo stage si riscala. Su schermi molto larghi (≥1440px) l'utente può **fissarlo aperto** con un'icona "pin".
- **Tablet e mobile:** modalità **overlay** con sfondo scurito.
- Si chiude con: clic fuori dal menu, `Esc`, pulsante di chiusura, selezione di una pagina (selezione solo su tablet e mobile).
- **Ogni voce mostra:** numero, icona del tipo di pagina, titolo, durata stimata, indicatore di stato. Nessuna miniatura.
- La voce della pagina corrente è chiaramente evidenziata.
- Le **pagine bloccate** sono sbiadite, con un lucchetto, e non sono cliccabili. Deve essere chiaro che si sbloccheranno.
- In fondo al menu: riepilogo del progresso (es. "4 di 9 completate") e tempo totale trascorso.

## Tracciamento dei progressi
**Stati di pagina** (ognuno con colore e icona propri, mai solo il colore):
- **Bloccata**: lucchetto, sbiadita.
- **Da vedere**: cerchio vuoto.
- **In corso / visitata**: cerchio parziale.
- **Completata**: spunta, colore accento.
- **Non superata**: per il quiz, icona di avviso.
- **Corrente**: evidenziazione della riga.

**Regole di completamento** (configurabili per pagina in `course.js`):
- Pagine `html`: completate quando la pagina chiama `player.complete()`. Se la pagina non lo fa, sono completate alla visita.
- Pagine `video`: completate quando il video arriva alla fine (soglia configurabile, default 95%).
- Il corso è **completato quando tutte le pagine sono completate**.

**Salvataggio:**
- Vanno tracciati la percentuale di completamento, lo stato di ogni pagina, l'ultima pagina visitata (per "Riprendi") e il **tempo totale** trascorso.
- Salvataggio automatico su localStorage oppure SCORM 1.2 (`cmi.core.lesson_status`, `cmi.core.lesson_location`, `cmi.suspend_data`, `cmi.core.session_time`).
- In SCORM 1.2 `suspend_data` ha un limite di 4096 caratteri: usa un formato compatto.
- Nessun pulsante utente per azzerare i progressi. Il reset è disponibile solo in modalità sviluppatore.

## Audio e video
- Nessun autoplay: l'utente avvia sempre la riproduzione.
- **Controlli completi** nella barra inferiore: play/pausa, riascolta da capo, salto ±10 secondi, barra di avanzamento cliccabile e trascinabile, tempo trascorso/totale, volume con slider, muto, velocità (0.75× / 1× / 1.25× / 1.5× / 2×).
- Su mobile la barra si semplifica: play/pausa, barra di avanzamento e tempo. Volume e velocità vanno in un piccolo menu "⋯".
- Più media sulla stessa pagina: i controlli della barra agiscono sul **media attivo** (l'ultimo avviato), e avviarne uno mette in pausa gli altri.
- Cambiando pagina il media si ferma. **Volume, muto e velocità vengono mantenuti** tra le pagine.
- Niente sottotitoli e niente cue point.

## Risorse scaricabili
- Pulsante "Risorse" nell'header (con badge numerico) che apre un pannello o popover con l'elenco dei file in `resources/`: nome, tipo, peso, pulsante di download.
- Le risorse sono definite in `course.js`, a livello di corso e/o di pagina.

## Feedback e microinterazioni (minimal con un tocco di gamification)
- **Toast** discreti: "Progresso salvato", "Pagina completata", "Nuova pagina sbloccata" (con animazione del lucchetto che si apre).
- Animazione della spunta e della barra di progresso quando una pagina viene completata.
- **Celebrazione a fine corso**: animazione elegante e misurata, ad esempio coriandoli nei colori del brand, badge o trofeo, messaggio di congratulazioni. Niente di infantile.
- Tutte le animazioni rispettano `prefers-reduced-motion`.

## Pulsante Esci
- Apre un dialog di conferma ("I tuoi progressi sono salvati").
- In modalità LMS chiude la sessione SCORM (`LMSFinish`). In modalità HTML autonoma salva e torna alla copertina: un browser non permette a una pagina di chiudere la propria finestra.

## Gestione errori
Messaggi chiari e non tecnici, in un box nello stage o in un toast persistente, con azione "Riprova" dove ha senso:
- pagina che non si carica (timeout se il bridge non risponde);
- file audio/video mancante o formato non supportato;
- connessione all'LMS persa (i progressi restano salvati in locale e vengono sincronizzati quando possibile).

## Modalità sviluppatore / anteprima
- Si attiva da parametro URL (`?dev=1`) o da flag in `course.js`.
- Badge "DEV" visibile, tutte le pagine sbloccate, pannello con lo stato di ogni pagina, pulsante per azzerare i progressi, log dei messaggi del bridge.

## Accessibilità (WCAG 2.1 AA)
- Contrasto minimo 4.5:1 per il testo e 3:1 per i componenti UI. L'oro `#a97835` su bianco ha un contrasto di circa 3.6:1: va usato per elementi grafici e testo grande, e per il testo piccolo serve una variante più scura.
- Supporto completo agli screen reader: ruoli e attributi ARIA (`aria-expanded`, `aria-current`, `aria-disabled`, `aria-live` per gli annunci di cambio pagina e per i toast), etichette su tutti i pulsanti con sola icona, attributo `title` sull'iframe.
- Focus gestito: si sposta nel menu all'apertura, torna all'hamburger alla chiusura, va sullo stage al cambio pagina. Tab trap nel menu overlay e nei dialog.
- Area cliccabile di almeno 44×44px su touch.
- Nessuna impostazione utente aggiuntiva (dimensione testo, contrasto, tema).

## Responsive
- **Desktop** (≥1024px): esperienza principale.
- **Tablet** (768–1023px) e **smartphone** (<768px), in orizzontale e in verticale.
- Su smartphone in verticale lo stage 16:9 si riduce molto: proponi una soluzione, ad esempio un suggerimento a ruotare il dispositivo e/o uno stage che occupa tutta la larghezza con barre compatte.

## Stile visivo e design token
- Stile **minimal**, pulito e professionale, con **elementi leggeri di gamification** (progresso, sblocchi, badge finale).
- **Colori di partenza:**
  - Primario: **`#21324b`** (blu notte), per header, barra di navigazione e testi principali.
  - Accento: **`#a97835`** (oro/bronzo), per progresso, stati completati, CTA e highlight di "Avanti".
  - Da questi ricava una palette completa: tinte e sfumature, neutri, colori semantici (successo, avviso, errore, info), sfondo dello stage e del letterbox.
- Solo tema chiaro. Font: proponi un sans-serif moderno, molto leggibile e open source, da includere in locale in `player/fonts/` (niente Google Fonts, per l'uso offline).
- Icone: un set SVG coerente, incluso in locale.
- Tutto parametrizzato come **design token** (CSS custom properties) sovrascrivibili da `course.js`: colori, font, raggi, ombre, spaziature, durate delle animazioni.
- Nessun logo. Etichette dell'interfaccia solo in italiano, ma raccolte in un unico oggetto di stringhe per facilitare una futura traduzione.

## Cosa consegnare
1. **Design system**
   - Token: colori, tipografia, spaziature, raggi, ombre, motion.
   - Componenti con tutti gli stati (default, hover, focus, active, disabled): header, breadcrumb, indicatore di progresso, pulsanti Avanti/Indietro (incluso lo stato "evidenziato"), media bar con tutti i controlli, voce del menu nei 6 stati, menu laterale, pannello risorse, toast, dialog, box di errore, badge DEV.
   - Set di icone.
   - Specifiche di comportamento e animazioni (durate, easing).
2. **Schermate chiave, desktop e mobile:**
   - copertina (primo accesso e "Riprendi");
   - pagina video con la media bar attiva;
   - pagina interattiva senza media (controlli nascosti, "Avanti" disabilitato);
   - stessa pagina appena completata ("Avanti" evidenziato e toast);
   - menu aperto (push su desktop, overlay su mobile) con pagine nei vari stati;
   - pannello risorse aperto;
   - dialog di uscita;
   - stato di errore (video mancante);
   - pagina finale con la celebrazione;
   - vista in modalità sviluppatore.
3. **Specifica di `course.js`**: struttura dei campi e un esempio con 9 pagine, inclusi i percorsi ai file in `media/`, `pages/` e `resources/`.
4. **Specifica del bridge pagina ↔ Player**: elenco dei messaggi `postMessage` in entrambe le direzioni, con i campi di ciascuno.
