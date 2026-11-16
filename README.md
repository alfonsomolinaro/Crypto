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

Le regole per creare le pagine di lezione sono in **[`docs/prompt-pagine-lezione.md`](docs/prompt-pagine-lezione.md)**: valgono per qualsiasi assistente AI. Per avere Claude già «istruito» ci sono tre strade, spiegate in **[`docs/progetto-claude.md`](docs/progetto-claude.md)**:

- **Claude Code:** il repository contiene la skill `.claude/skills/pagina-lezione/`. Basta aprire Claude Code nella cartella del corso e chiedere «crea la pagina della lezione N» con i contenuti (oppure `/pagina-lezione`).
- **claude.ai, in tutte le chat:** carica `skill-pagina-lezione.zip` in *Impostazioni › Funzionalità › Skill*.
- **claude.ai, con un Progetto:** istruzioni del progetto pronte da incollare e i 3 file da caricare.
- **Autori esterni:** il kit (`kit-autori.zip`) contiene la skill, il suo zip e `PROMPT-CLAUDE.md`, con le istruzioni nella guida `LEGGIMI-PRIMA.md`.

Facoltativo: un file `CLAUDE.md` nella cartella del corso (non è nel repository, ognuno crea il proprio) per regole personali, per esempio «chiedi conferma prima di ogni push».

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
| `kit-autori.zip` · `kit-autori/` | **Kit per autori esterni**: guida, prompt e skill per Claude, pagina modello, foglio di stile e `prova.html` per verificare il completamento. Si rigenera con `tools\crea-kit-autori.ps1` |
| `docs/guida-autori-esterni.md` | Guida passo passo per creare una pagina di lezione (inclusa nel kit) |
| `docs/prompt-pagine-lezione.md` | Prompt per far creare le pagine a un assistente AI (incluso nel kit come `PROMPT-CLAUDE.md`) |
| `docs/progetto-claude.md` | Come usare Claude già istruito: skill per Claude Code e claude.ai, istruzioni per un Progetto |
| `.claude/skills/pagina-lezione/` · `skill-pagina-lezione.zip` | Skill «pagina-lezione» per Claude (generata in parte da `tools\crea-kit-autori.ps1`) |
| `design/specifiche.md` | Specifiche per lo sviluppo: struttura, comportamenti, responsive, accessibilità, `course.js`, bridge |
| `design/tokens.css` | Design token (colori, tipografia, spaziature, animazioni) |
| `design/icone.svg` | Set di icone del Player |
| `prompt-claude-design-finale.md` | Prompt di progettazione (design e UX) |
| `prompt-claude-design-player.md` | Note tecniche iniziali (offline, bridge, cartella media) |
| `tools/` | Script: server locale per le prove, creazione del kit autori |

Design di riferimento (tela con i prototipi): https://claude.ai/artifact/EjvtwDNZoMFhuFLJLL1RKt (privata: va condivisa dal menu Share per mostrarla ad altri).
