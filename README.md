# Crypto — Player e-learning

Player e-learning HTML5 riutilizzabile, sviluppato da zero. Prima applicazione: una demo universitaria sulla crittografia.

Il Player funziona online (GitHub Pages) e offline, aprendo `index.html` con un doppio clic. È predisposto per un futuro pacchetto SCORM 1.2.

## Stato del progetto

- [x] Requisiti e prompt di progettazione
- [x] Design: design system, componenti, prototipi desktop e smartphone
- [x] Sviluppo del Player (prima versione completa)
- [ ] Contenuti delle lezioni (ora ci sono pagine di prova)
- [ ] Pacchetto SCORM 1.2

📘 **[Manuale d'uso del Player](docs/manuale-player.md)**: come si usa il corso e come si crea o modifica.

## Come aprire il corso

- **Offline:** doppio clic su `index.html`.
- **Modalità sviluppo:** in `course.js` c'è `dev: true` (tutte le lezioni sbloccate, badge DEV che apre il pannello stati, azzeramento progressi). **Va messo a `false` prima di consegnare il corso.** In alternativa: `index.html?dev=1` per accenderla, `?dev=0` per spegnerla.
- **Server locale per le prove (facoltativo):** `powershell -ExecutionPolicy Bypass -File tools\serve.ps1` e poi http://localhost:8123

## Come creare un corso nuovo

1. Modifica `course.js`: titolo, lezioni, navigazione, risorse, colori.
2. Metti le pagine delle lezioni in `pages/` (ognuna include `player/player-bridge.js` e chiama `player.complete()`).
3. Metti video e audio in `media/` (vedi `media/LEGGIMI.md`) e i PDF in `resources/`.

La cartella `player/` resta identica per tutti i corsi.

## Contenuto

| Percorso | Descrizione |
|---|---|
| `index.html` | Avvio del corso |
| `course.js` | Configurazione del corso |
| `player/` | Il Player: stili, token, logica, salvataggio, bridge |
| `pages/` | Pagine delle lezioni (ora pagine di prova) |
| `media/`, `resources/` | Video, audio e file scaricabili |
| `docs/manuale-player.md` | **Manuale d'uso del Player**: per chi segue il corso e per chi lo crea |
| `kit-autori.zip` · `kit-autori/` | **Kit per autori esterni**: guida, pagina modello, foglio di stile e `prova.html` per verificare il completamento |
| `docs/guida-autori-esterni.md` | Guida passo passo per creare una pagina di lezione (inclusa nel kit) |
| `docs/prompt-pagine-lezione.md` | Prompt per far creare le pagine a un assistente AI |
| `docs/relazione-traccia.md` | Riepilogo del lavoro e traccia della relazione |
| `design/specifiche.md` | Specifiche per lo sviluppo: struttura, comportamenti, responsive, accessibilità, `course.js`, bridge |
| `design/tokens.css` | Design token (colori, tipografia, spaziature, animazioni) |
| `design/icone.svg` | Set di icone del Player |
| `prompt-claude-design-finale.md` | Prompt di progettazione (design e UX) |
| `prompt-claude-design-player.md` | Note tecniche iniziali (offline, bridge, cartella media) |

Design di riferimento (tela con i prototipi): https://claude.ai/artifact/EjvtwDNZoMFhuFLJLL1RKt (privata: va condivisa dal menu Share per mostrarla ad altri).
