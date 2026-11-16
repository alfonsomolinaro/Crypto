# Usare Claude già «istruito» per creare le pagine di lezione

Tre modi, dal più semplice. Le regole sono sempre le stesse (`docs/prompt-pagine-lezione.md`): scegli quello che si adatta a come lavori.

| Come lavori | Cosa usare | Da fare una volta sola |
|---|---|---|
| **Claude Code** nella cartella del corso o del kit | la skill `.claude/skills/pagina-lezione/` | niente: Claude Code la trova da solo |
| **claude.ai o app Claude** (tutte le chat) | `skill-pagina-lezione.zip` | caricarla nelle impostazioni (§ 1) |
| **claude.ai o app Claude** (un Progetto dedicato) | le istruzioni qui sotto | creare il Progetto (§ 2) |

Qualunque strada scegli, la pagina va sempre provata: misure 1280×720, completamento della lezione, nessun errore nella console (nel kit autori con `prova.html`).

---

## Claude Code

Apri Claude Code nella cartella del corso (o in `kit-autori`) e chiedi, per esempio: «Crea la pagina della lezione 3 sulla crittografia simmetrica», poi incolla i contenuti. Claude Code riconosce la richiesta e usa la skill `pagina-lezione`: segue le regole, crea la cartella in `pages/` e, nel corso, aggiunge la lezione in `course.js`.

Puoi anche richiamarla esplicitamente scrivendo `/pagina-lezione`.

## 1. Skill su claude.ai (vale in tutte le chat)

1. Scarica `skill-pagina-lezione.zip` (nel repository o nel kit autori). **Non estrarlo.**
2. Su claude.ai: **Impostazioni › Funzionalità › Skill › Carica skill** e scegli lo zip. (Se la voce non c'è, attiva prima *Esecuzione di codice e creazione di file* nella stessa pagina.)
3. Attiva la skill `pagina-lezione`.
4. In qualsiasi chat scrivi: «Crea una pagina di lezione per il Player: …» e incolla titolo, contenuti, interazione e quando la lezione è completata. Claude restituisce `index.html` da scaricare e il blocco per `course.js`.

## 2. Progetto Claude dedicato

1. Su claude.ai: **Progetti › Crea progetto**, per esempio «Pagine del Player».
2. Nelle **conoscenze del progetto** carica: `docs/prompt-pagine-lezione.md`, `pages/pagina.css` e `pages/_modello/index.html`. (Nel kit autori: `PROMPT-CLAUDE.md`, `pages/pagina.css`, `pages/_modello/index.html`.)
3. Nelle **istruzioni del progetto** incolla il testo seguente:

```text
Sei un instructional designer e sviluppatore front-end. In questo progetto crei pagine di lezione per un Player e-learning HTML5 già esistente.

Per ogni pagina:
- Segui alla lettera le regole del file prompt-pagine-lezione.md (o PROMPT-CLAUDE.md): stage fisso 1280×720 senza scorrimento, ../pagina.css nel <head>, ../../player/player-bridge.js prima dello script, player.complete() solo quando lo studente ha finito (quiz: player.setStatus), stato ripristinato con l'evento player:init, nessuna risorsa da internet, testi ≥ 18 px, colori solo dalle variabili CSS, accessibilità WCAG 2.1 AA.
- Parti dal file index.html del modello e usa le classi già presenti in pagina.css.
- Se il contenuto non sta in 1280×720, dividilo in più passi interni, mai lo scorrimento.
- Restituisci index.html completo come file da scaricare, il nome della cartella (minuscole e trattini, es. 03-simmetrica) e il blocco da aggiungere a course.js.
- Prima di rispondere ripassa il «Controllo finale» delle regole.
- Se mancano titolo, contenuti, interazione o il momento in cui la lezione è completata, chiedili in una sola domanda.
- Rispondi in italiano, in modo breve.
```

4. In ogni nuova chat del progetto basta scrivere i dati della lezione: titolo, contenuti, interazione, quando è completata.

## Se cambiano le regole

Modifica solo `docs/prompt-pagine-lezione.md` e riesegui:

```
powershell -ExecutionPolicy Bypass -File tools\crea-kit-autori.ps1
```

Lo script aggiorna la skill, `skill-pagina-lezione.zip` e il kit autori. Chi usa la skill su claude.ai deve ricaricare lo zip; chi usa il Progetto deve sostituire i file nelle conoscenze.
