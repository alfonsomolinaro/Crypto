# Progetto Crypto — Player e-learning

Player e-learning HTML5 riutilizzabile (HTML/CSS/JS puri, funziona offline da `file://`), primo corso: demo universitaria sulla crittografia.

## Documenti di riferimento
- `design/specifiche.md`: specifiche del Player.
- `docs/manuale-player.md`: manuale d'uso (studenti e autori).
- `docs/prompt-pagine-lezione.md`: **regole obbligatorie per creare le pagine di lezione.**

## Regole
- **Pagine di lezione:** quando si crea o modifica una pagina in `pages/`, seguire `docs/prompt-pagine-lezione.md` (stage fisso 1280×720, `../pagina.css`, `player-bridge.js`, `player.complete()`, design token, accessibilità WCAG 2.1 AA). Aggiungere sempre il blocco della lezione in `course.js`.
- **Il Player (`player/`) non va modificato** per creare un corso: si lavora su `course.js`, `pages/`, `media/`, `resources/`.
- **Nessuna dipendenza esterna** (CDN, font remoti, `fetch` di file locali): il corso deve funzionare con doppio clic su `index.html`.
- **File multimediali** sotto i 100 MB (limite GitHub).
- **Git:** commit a ogni passo funzionante, messaggi in italiano; **chiedere conferma all'utente prima di ogni push.** Git e GitHub CLI non sono nel PATH: usare il git di GitHub Desktop (`%LOCALAPPDATA%\GitHubDesktop\app-*\resources\app\git\cmd\git.exe`).
- **Kit autori:** se cambiano `pages/pagina.css`, `pages/_modello/`, `player/tokens.css`, `player/player-bridge.js`, il font o `docs/guida-autori-esterni.md`, rigenerare `kit-autori/` e `kit-autori.zip` con `tools/crea-kit-autori.ps1`.
- `course.js` ha `dev: true` durante lo sviluppo: ricordare di metterlo a `false` prima di pubblicare per gli studenti.
- Lingua: italiano per testi, commenti e messaggi.
