# Crypto — Player e-learning

Player e-learning HTML5 riutilizzabile, sviluppato da zero (HTML, CSS e JavaScript puri, senza dipendenze esterne).

Il Player funziona online (GitHub Pages) e offline, aprendo `index.html` con un doppio clic. È predisposto per un futuro pacchetto SCORM 1.2.

**Corso attuale: «Crypto agility: quando la crittografia deve cambiare»**, per un pubblico non specialista, basato sul documento NIST CSWP 39-upd1 (in `resources/`). Struttura: video introduttivo, 4 moduli interattivi e verifica finale (8 domande, superata con 6 risposte giuste).

## Stato del progetto

- [x] Requisiti e prompt di progettazione
- [x] Design: design system, componenti, prototipi desktop e smartphone
- [x] Sviluppo del Player
- [x] Contenuti del corso «Crypto agility»
- [x] Kit per autori esterni
- [ ] Pacchetto SCORM 1.2

📘 **[Manuale d'uso del Player](docs/manuale-player.md)**: come si usa il corso e come si crea o modifica.

## Come aprire il corso

- **Offline:** doppio clic su `index.html`.
- **Modalità sviluppo** (tutte le lezioni sbloccate, badge DEV che apre il pannello stati, azzeramento progressi): aggiungi `?dev=1` all'indirizzo (`index.html?dev=1`); `?dev=0` la spegne. In `course.js` ora c'è `dev: false` (modalità studente): lascialo così per il corso pubblicato.
- **Server locale per le prove (facoltativo):** `powershell -ExecutionPolicy Bypass -File tools\serve.ps1` e poi http://localhost:8123

## Come creare un corso nuovo

1. Modifica `course.js`: titolo, lezioni, navigazione, risorse, colori.
2. Metti le pagine delle lezioni in `pages/` (ognuna include `player/player-bridge.js` e chiama `player.complete()`).
3. Metti video e audio in `media/` (vedi `media/LEGGIMI.md`) e i PDF in `resources/`.

La cartella `player/` resta identica per tutti i corsi.

## Lavorare con Claude

Le regole per creare le pagine di lezione sono in **[`docs/prompt-pagine-lezione.md`](docs/prompt-pagine-lezione.md)**: valgono per qualsiasi assistente AI.

- **Claude (claude.ai o app desktop):** crea un *Progetto* e carica nelle conoscenze `docs/prompt-pagine-lezione.md`, `pages/pagina.css` e `docs/manuale-player.md`. Poi chiedi «Crea la pagina della lezione N secondo il prompt delle pagine» e incolla i contenuti.
- **Claude Code (nella cartella del corso):** scrivi «Leggi `docs/prompt-pagine-lezione.md` e crea la pagina della lezione N», poi i contenuti. Per non ripeterlo ogni volta, crea un file `CLAUDE.md` nella cartella del corso con le regole principali, per esempio:
  ```
  - Per creare o modificare le pagine in pages/ segui docs/prompt-pagine-lezione.md.
  - Aggiungi sempre la lezione in course.js.
  - Non modificare la cartella player/.
  - Nessuna dipendenza esterna: il corso deve funzionare con doppio clic su index.html.
  - Chiedi conferma prima di ogni push.
  ```
  Claude Code legge `CLAUDE.md` da solo a ogni avvio. (Il file non è nel repository: ognuno crea il proprio.)
- **Autori esterni:** il kit (`kit-autori.zip`) contiene `PROMPT-CLAUDE.md` e le istruzioni per usarlo, nella guida `LEGGIMI-PRIMA.md`.

Qualunque assistente si usi, la pagina va sempre provata: misure 1280×720, completamento della lezione, nessun errore nella console del browser.

## Contenuto

| Percorso | Descrizione |
|---|---|
| `index.html` | Avvio del corso |
| `course.js` | Configurazione del corso |
| `player/` | Il Player: stili, token, logica, salvataggio, bridge, font Inter con licenza (`player/fonts/OFL.txt`) |
| `pages/` | Pagine delle lezioni: `ca-01…ca-04` (moduli), `06-quiz` (verifica). Le altre cartelle sono lezioni di esempio non usate nel corso; `_modello/` è la pagina da copiare |
| `media/`, `resources/` | Video, audio e file scaricabili (qui il documento NIST CSWP 39-upd1) |
| `docs/manuale-player.md` | **Manuale d'uso del Player**: per chi segue il corso e per chi lo crea |
| `kit-autori.zip` · `kit-autori/` | **Kit per autori esterni**: guida, prompt per Claude, pagina modello, foglio di stile e `prova.html` per verificare il completamento. Si rigenera con `tools\crea-kit-autori.ps1` |
| `docs/guida-autori-esterni.md` | Guida passo passo per creare una pagina di lezione (inclusa nel kit) |
| `docs/prompt-pagine-lezione.md` | Prompt per far creare le pagine a un assistente AI (incluso nel kit come `PROMPT-CLAUDE.md`) |
| `design/specifiche.md` | Specifiche per lo sviluppo: struttura, comportamenti, responsive, accessibilità, `course.js`, bridge |
| `design/tokens.css` | Design token (colori, tipografia, spaziature, animazioni) |
| `design/icone.svg` | Set di icone del Player |
| `prompt-claude-design-finale.md` | Prompt di progettazione (design e UX) |
| `prompt-claude-design-player.md` | Note tecniche iniziali (offline, bridge, cartella media) |
| `tools/` | Script: server locale per le prove, creazione del kit autori |

Design di riferimento (tela con i prototipi): https://claude.ai/artifact/EjvtwDNZoMFhuFLJLL1RKt (privata: va condivisa dal menu Share per mostrarla ad altri).
