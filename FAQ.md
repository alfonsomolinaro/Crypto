# Domande frequenti

Risposte brevi. Per ogni domanda trovi **📄 il file da aprire** e **👉 cosa fare**.
Per i dettagli c'è il [manuale](docs/manuale-player.md).

---

## Da dove parto?

Dipende da **cosa hai in mano**. Trova la tua situazione e segui solo quella riga.

| Cosa hai | Cosa vuoi fare | Primo passo | File da aprire |
|---|---|---|---|
| **Niente**, solo il link al repository GitHub | Avere il corso sul tuo computer | Scaricalo (vedi sotto, «Come scarico il progetto?») | — |
| **Solo un link al corso online** | Seguire il corso | Apri il link nel browser: non serve altro | — |
| **La cartella del progetto** (es. `crypto`) | Seguire o provare il corso | Doppio clic su `index.html` (aggiungi `?dev=1` per sbloccare tutto) | `index.html` |
| **La cartella del progetto** | Modificare il corso | Cambia `course.js` e le lezioni in `pages/` | [manuale, Parte B](docs/manuale-player.md#parte-b--per-chi-crea-il-corso) |
| **La cartella del progetto** | Fare un **corso nuovo** | Copia la cartella e segui la procedura | [manuale, B10](docs/manuale-player.md#b10-creare-un-nuovo-corso-con-lo-stesso-player) |
| **Solo `kit-autori.zip`** (sei un autore esterno) | Scrivere una lezione | Estrai lo zip, allega `CARICA-NELL-AI.md` in una chat AI e scrivi i contenuti: 5 passi in tutto | `LEGGIMI-PRIMA.md` nel kit |

**Come scarico il progetto?**
- 📄 `github.com/alfonsomolinaro/Crypto`
- 👉 **Senza programmi:** sulla pagina del repository › pulsante verde **Code** › **Download ZIP** › estrai lo zip (tasto destro › *Estrai tutto*). Ottieni una copia da usare e modificare, **non collegata** a GitHub.
- 👉 **Con GitHub Desktop** (se vuoi poi salvare le modifiche su GitHub): *File › Clone repository* › scegli il repository › **Clone**. La cartella resta collegata: puoi fare commit e push.
- ⚠️ Il repository è **privato**: per vederlo serve essere invitati dal proprietario (*Settings › Collaborators*) e aver fatto l'accesso a GitHub.

### Con Claude o senza?

Una volta che hai i file, scegli **come** lavorare. Tutte e tre le strade portano allo stesso risultato.

| Come lavori | Ti serve | Cosa fai | Dove sono le istruzioni |
|---|---|---|---|
| **A mano**, senza IA | un editor di testo (VS Code o Blocco note) | Copi `pages/_modello/`, cambi i testi, aggiungi la lezione in `course.js` | [manuale, B3–B4](docs/manuale-player.md#b3-aggiungere-togliere-e-riordinare-le-lezioni) · nel kit: `approfondimenti/GUIDA-COMPLETA.md` |
| **Claude Code** (installato sul PC) | la cartella del progetto o del kit sul tuo computer | Apri Claude Code **in quella cartella** e chiedi «crea la lezione N su …». La skill inclusa applica le regole e crea i file | [`docs/progetto-claude.md`](docs/progetto-claude.md) |
| **claude.ai** (chat nel browser o app), **con un Progetto** | un account Claude | Prepari una volta un Progetto con le regole del Player (passi qui sotto, «Come creo il Progetto su claude.ai?»). Poi Claude ti restituisce il file `index.html` da salvare tu nella cartella | [`docs/progetto-claude.md`](docs/progetto-claude.md), § 2 |
| **claude.ai, senza Progetto** | un account Claude | Carichi una volta `skill-pagina-lezione.zip` nelle impostazioni: vale in tutte le chat | [`docs/progetto-claude.md`](docs/progetto-claude.md), § 1 |

**Come creo il Progetto su claude.ai?** (una volta sola)
1. Su **claude.ai**, nel menu a sinistra: **Progetti › Crea progetto**. Dagli un nome, per esempio «Lezioni del Player».
2. Nella pagina del Progetto, nel riquadro **Conoscenze del progetto** (*Project knowledge*), clicca **+** e carica questi **3 file** dalla cartella del progetto:
   - `docs/prompt-pagine-lezione.md`: le regole delle pagine;
   - `pages/pagina.css`: lo stile comune delle pagine;
   - `pages/_modello/index.html`: la pagina modello.

   Se hai **solo il kit autori**, carica invece un unico file: `CARICA-NELL-AI.md`, che contiene già tutti e tre (e non servono le istruzioni del punto 3).
3. Sempre nella pagina del Progetto, clicca **Istruzioni del progetto** (*Set project instructions*) e incolla il testo che trovi nel riquadro grigio di [`docs/progetto-claude.md`](docs/progetto-claude.md), § 2, punto 3. Salva.
4. Fatto. D'ora in poi apri una **nuova chat dentro il Progetto** e scrivi solo i dati della lezione: titolo, contenuti, cosa deve fare lo studente, quando la lezione è completata.
5. Claude risponde con il file `index.html`: scaricalo e salvalo in `pages/<nome-lezione>/index.html`. Poi aggiungi in `course.js` il blocco che Claude ti indica (nel kit autori questo lo fa il responsabile del corso).

**Regola valida per tutti:** qualunque strada scegli, alla fine la lezione va **provata** (doppio clic su `index.html`, oppure `prova.html` nel kit) e i file vanno messi nella cartella del progetto. Con claude.ai il salvataggio dei file lo fai tu; con Claude Code lo fa lui.

---

## Usare il corso

**Come apro il corso?**
- 📄 `index.html`
- 👉 Doppio clic sul file. Non serve internet né un programma da installare.

**Come vedo tutte le lezioni sbloccate per provarle?**
- 📄 nessuno: si usa l'indirizzo
- 👉 Aggiungi `?dev=1` alla fine dell'indirizzo nel browser (es. `…/index.html?dev=1`) e premi Invio. Con `?dev=0` torni alla modalità studente.

**Come ricomincio il corso da zero?**
- 👉 In modalità sviluppo: clicca il badge rosso **DEV** › **Azzera progressi**. Come studente: in copertina **Ricomincia da capo**.

**Come vedo il corso online?**
- 📄 [manuale, B9](docs/manuale-player.md#b9-pubblicare-su-github)
- 👉 Attiva GitHub Pages (una volta sola). Il corso sarà su `https://alfonsomolinaro.github.io/Crypto/`.

---

## Modificare il corso

**Come cambio titolo, descrizione o ordine delle lezioni?**
- 📄 `course.js`
- 👉 Apri il file con VS Code o Blocco note, cambia `title`, `description` o sposta i blocchi in `lessons`. Salva e ricarica (F5).

**Come cambio un testo dentro una lezione?**
- 📄 `pages/<cartella-della-lezione>/index.html` (es. `pages/ca-01-algoritmi-invecchiano/index.html`)
- 👉 Apri il file, cerca il testo (Ctrl+F), cambialo e salva. Controlla che la pagina stia ancora in 1280×720.

**Come cambio i colori?**
- 📄 `course.js` › `theme`
- 👉 Scrivi i nuovi colori in `theme` (es. `"--color-primary": "#1F3A5F"`). Non toccare `player/tokens.css`. Dettagli: [manuale, B6](docs/manuale-player.md#b6-colori-e-aspetto).

**Come aggiungo una lezione?**
- 📄 `pages/_modello/` e `course.js`
- 👉 Copia `_modello` in `pages/`, rinominala (es. `05-nuova-lezione`), cambia i testi, poi aggiungi il blocco in `lessons` di `course.js`. Dettagli: [manuale, B3–B4](docs/manuale-player.md#b3-aggiungere-togliere-e-riordinare-le-lezioni).

**Come aggiungo o sostituisco un video?**
- 📄 `media/video/` e `course.js`
- 👉 Metti il file MP4 (sotto i 100 MB) in `media/video/`. Se sostituisci, usa lo stesso nome; se è nuovo, aggiungi un blocco con `type: "video"`. La durata il Player la legge da solo.

**Come aggiungo un PDF tra le risorse?**
- 📄 `resources/` e `course.js` › `resources`
- 👉 Metti il PDF in `resources/` e aggiungi una riga in `resources` con titolo, percorso e dimensione.

**Posso usare il Player per un altro corso?**
- 📄 [manuale, B10](docs/manuale-player.md#b10-creare-un-nuovo-corso-con-lo-stesso-player)
- 👉 Sì: copia la cartella, cancella `.git` nella copia, cambia `id` e `title` in `course.js`, crea le tue lezioni. Il Player non si tocca.

**Quali file NON devo modificare?**
- 👉 `index.html`, la cartella `player/` e `pages/pagina.css`. Sono il Player: uguali per tutti i corsi.

---

## Claude e autori esterni

**Come faccio creare una lezione a Claude?**
- 📄 [`docs/progetto-claude.md`](docs/progetto-claude.md)
- 👉 Con **Claude Code**: apri la cartella del corso e chiedi «crea la lezione N su …» (la skill `pagina-lezione` applica le regole da sola). Con **claude.ai**: carica `skill-pagina-lezione.zip` nelle impostazioni, oppure crea un Progetto con le istruzioni pronte.

**Dove sono le regole per creare le pagine?**
- 📄 [`docs/prompt-pagine-lezione.md`](docs/prompt-pagine-lezione.md)
- 👉 È l'unica fonte delle regole: skill e kit le copiano da qui.

**Cosa do a un autore esterno?**
- 📄 `kit-autori.zip`
- 👉 Mandagli solo lo zip: non gli serve il progetto. Dentro trova `LEGGIMI-PRIMA.md` (5 passi), `CARICA-NELL-AI.md` (il file da allegare in chat a Claude, ChatGPT o altra AI) e `prova.html` per controllare la lezione.

**Come controlla l'autore che la sua pagina funzioni?**
- 📄 `kit-autori/prova.html`
- 👉 Apre `prova.html`, scrive il nome della sua cartella e prova la lezione: deve comparire «✓ Lezione completata».

**Ho cambiato le regole o il modello: cosa devo fare?**
- 📄 `tools/crea-kit-autori.ps1`
- 👉 Rigenera kit e skill con:
```
powershell -ExecutionPolicy Bypass -File tools\crea-kit-autori.ps1
```

---

## Problemi

**Una lezione resta bloccata anche se l'ho finita.**
- 👉 La pagina non chiama `player.complete()`. Apri il corso con `?dev=1`, guarda il pannello DEV e la console (F12).

**Vedo ancora la versione vecchia di una pagina.**
- 👉 Ricarica con **Ctrl+F5**. Online aspetta 1–2 minuti dopo il push.

**Compare «La lezione non si carica» o «Il video non è disponibile».**
- 📄 `course.js`
- 👉 Il `src` non corrisponde al nome del file o della cartella. Controlla anche maiuscole e minuscole.

**Il corso non parte o la pagina è bianca.**
- 📄 `course.js`
- 👉 Di solito manca una virgola tra due blocchi o una virgoletta. Premi F12 › Console: l'errore indica la riga.

---

## Salvare e pubblicare

**Come salvo le modifiche su GitHub?**
- 👉 Con **Claude Code**: chiedi «fai commit e push». Con **GitHub Desktop**: scrivi una descrizione › **Commit to main** › **Push origin**.

**Devo collegare GitHub a Claude?**
- 👉 **Claude Code**: non serve un collegamento in Claude. Usa l'accesso a GitHub del tuo computer: basta aver fatto **una volta** l'accesso in **GitHub Desktop** (*File › Options › Accounts › Sign in*) con un account che può scrivere nel repository. Da lì Claude Code può fare commit e push, e chiede sempre conferma prima del push.
- 👉 **claude.ai** (chat e Progetti): Claude non può fare push. Se vuoi che legga i file del repository, collega GitHub in *Impostazioni › Connettori › GitHub* e poi aggiungi il repository al Progetto. È facoltativo: in alternativa carichi i file a mano.

**Prima di dare il corso agli studenti?**
- 📄 `course.js`
- 👉 Controlla che ci sia `dev: false`.

**Cosa manca per rendere pubblico il repository?**
- 👉 Togliere la propria email visibile nei commit (oppure, per i commit futuri, su github.com: *Settings › Emails › Keep my email addresses private*).

---

## Dove trovo cosa

| Cosa | File |
|---|---|
| Configurazione del corso | `course.js` |
| Lezioni | `pages/` |
| Pagina da copiare | `pages/_modello/` |
| Video e audio | `media/` |
| PDF | `resources/` |
| Manuale completo | [`docs/manuale-player.md`](docs/manuale-player.md) |
| Regole delle pagine | [`docs/prompt-pagine-lezione.md`](docs/prompt-pagine-lezione.md) |
| Usare Claude | [`docs/progetto-claude.md`](docs/progetto-claude.md) |
| Guida per autori esterni | [`docs/guida-autori-esterni.md`](docs/guida-autori-esterni.md) |
| Specifiche tecniche | [`design/specifiche.md`](design/specifiche.md) |
