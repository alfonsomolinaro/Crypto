# Guida per creare una pagina di lezione

**Per chi:** chiunque debba preparare una lezione per il corso, anche senza esperienza di programmazione.
**Tempo per la prima pagina:** circa 30 minuti, seguendo i passi in ordine.

> **In una frase:** nel kit copi la cartella `_modello`, cambi testi e immagini dove vedi ✏️, controlli con `prova.html` che la lezione «si completi» e mandi la cartella al responsabile del corso.

---

## ⚠️ La regola fondamentale: la pagina deve «completarsi»

Nel corso lo studente **non può passare alla lezione successiva** finché la tua pagina non dice al Player che l'attività è finita. Se la pagina non lo dice, il pulsante **Avanti resta grigio per sempre** e lo studente è bloccato.

- La pagina lo dice con **una sola istruzione**, `player.complete();`, che va eseguita **quando lo studente ha davvero finito** (ha risposto correttamente, ha completato l'esercizio, ha visto tutti i passi). Non all'apertura della pagina.
- **Nel modello è già fatto:** la lezione si completa quando lo studente sceglie la risposta giusta. Se usi il modello cambiando solo testi e immagini, **non devi fare nulla**: basta segnare correttamente la risposta giusta (§ 3, passo 5).
- **Se crei un'attività tua** (un esercizio diverso, un gioco, un trascinamento…), devi mettere `player.complete();` nel punto in cui l'attività risulta finita. Per i quiz si usano invece `player.setStatus("passed");` (superato) e `player.setStatus("failed");` (non superato).
- **Verificalo sempre** con `prova.html` (§ 6): deve comparire la scritta verde *«✓ Lezione completata»*.
- Se la lezione deve completarsi **appena aperta**, senza attività (per esempio una pagina di sola lettura), dillo al responsabile del corso: si imposta nel corso, non nella pagina.

---

## 1. Cosa ti serve

| Cosa | Dove si trova | Note |
|---|---|---|
| **Il kit per gli autori** (`kit-autori.zip`) | te lo manda il responsabile del corso, oppure su GitHub: `github.com/alfonsomolinaro/Crypto` › file **`kit-autori.zip`** › pulsante **Download** (icona ⤓) | Estrai lo ZIP in una cartella del computer: tasto destro › *Estrai tutto*. |
| **Un browser** | Chrome (consigliato), Edge o Firefox | serve per l'anteprima e la prova |
| **Un editor di testo** | **Visual Studio Code** (gratuito: code.visualstudio.com), consigliato | Va bene anche **Blocco note**. **Non usare Word**: rovina i file. |

Il kit contiene tutto il necessario, e nient'altro:

```
kit-autori/
├─ LEGGIMI-PRIMA.md     ← questa guida
├─ PROMPT-CLAUDE.md     ← le regole da dare a Claude se vuoi farti aiutare (vedi sotto)
├─ skill-pagina-lezione.zip ← la stessa cosa come «skill» da caricare su claude.ai
├─ .claude/             ← la skill per Claude Code (non toccare)
├─ prova.html           ← PROVA della pagina: simula il Player e controlla il completamento
├─ pages/
│  ├─ pagina.css        ← il foglio di stile del corso (LO USI, NON LO MODIFICHI)
│  └─ _modello/         ← la pagina da copiare
│     ├─ index.html
│     └─ immagine-esempio.svg
└─ player/              ← file tecnici del corso (NON TOCCARE)
   ├─ tokens.css · player-bridge.js
   └─ fonts/            ← font Inter e la sua licenza (OFL.txt)
```

Lavori **solo dentro `kit-autori/pages/`**.

### Vuoi farti aiutare da Claude?

Puoi far scrivere la pagina a Claude invece di modificare il modello a mano. Il file `PROMPT-CLAUDE.md` contiene tutte le regole del corso (misure, stile, completamento, accessibilità).

| Dove lavori | Come fare |
|---|---|
| **Claude Code** (sul PC), il più semplice | Apri Claude Code nella cartella `kit-autori` e scrivi: «Crea la pagina della lezione 3 nella cartella `03-simmetrica`: …», poi incolla i contenuti. Il kit contiene già la skill `pagina-lezione`: Claude Code segue da solo le regole e crea i file al posto giusto. |
| **claude.ai o app Claude** (tutte le chat) | Una volta sola: *Impostazioni › Funzionalità › Skill › Carica skill* e scegli `skill-pagina-lezione.zip` (senza estrarlo). Poi in qualsiasi chat scrivi «Crea una pagina di lezione per il Player: …» con titolo, contenuti, interazione e quando la lezione si completa. Salva il file ricevuto come `pages/<la-tua-cartella>/index.html`, con le eventuali immagini nella stessa cartella. |
| **claude.ai con un Progetto** | Crea un **Progetto**, carica nelle *conoscenze* `PROMPT-CLAUDE.md`, `pages/pagina.css` e `pages/_modello/index.html`, poi in una chat scrivi «Crea una pagina di lezione secondo il prompt» e compila la parte finale del prompt, **«LA LEZIONE DA CREARE»**. |
| **Altri assistenti** (ChatGPT ecc.) | Copia il riquadro del prompt da `PROMPT-CLAUDE.md`, compila la parte finale e incollalo nella chat. |

Il blocco per `course.js` che Claude ti propone **non serve a te**: lo inserisce il responsabile del corso.

> **Anche se la pagina l'ha scritta Claude, la prova con `prova.html` (§ 6) resta obbligatoria**: l'assistente può sbagliare misure o completamento. Se qualcosa non va, descrivi a Claude cosa vedi e chiedi di correggere.

## 2. Cosa puoi toccare e cosa no

| ✅ Puoi modificare | ⛔ Non modificare mai |
|---|---|
| la **tua** cartella dentro `pages/` (copiata da `_modello`) | la cartella `player/` |
| i testi e le immagini nella tua pagina | `pages/pagina.css` (il foglio di stile comune) |
| un blocco `<style>` dentro la tua pagina, per piccoli ritocchi | `prova.html` |
| | la cartella `_modello` originale (copiala, non modificarla) |
| | le righe segnate ⛔ nel modello |

## 3. Passo per passo

### Passo 1 — Copia il modello
1. Apri `kit-autori\pages\`.
2. Copia la cartella **`_modello`** e incollala nella stessa posizione.
3. Rinomina la copia con **numero della lezione + nome**, per esempio `03-simmetrica`.

**Regole per i nomi di cartelle e file:**
- solo **lettere minuscole, numeri e trattini**: `03-simmetrica`, `schema-chiavi.png`;
- **niente spazi, accenti o simboli**: ❌ `Lezione 3`, ❌ `perché.png`, ❌ `Schema(1).PNG`;
- il file della pagina si chiama **sempre** `index.html`.

### Passo 2 — Apri la pagina nell'editor
- In Visual Studio Code: *File › Apri cartella…* e scegli la tua cartella, poi clicca `index.html`.
- In Blocco note: tasto destro su `index.html` › *Apri con › Blocco note*.

Nel file trovi le parti da cambiare segnate con **✏️**. Le righe segnate con **⛔** vanno lasciate come sono.

### Passo 3 — Cambia i testi
- Cambia **solo il testo tra i tag**, non i tag:
  ```html
  <h1>Titolo della lezione</h1>          ← cambia solo "Titolo della lezione"
  <p class="testo">Il tuo testo…</p>      ← cambia solo "Il tuo testo…"
  ```
- Ogni paragrafo è un `<p class="testo">…</p>`. Per aggiungerne uno, copia una riga intera e cambia il testo.
- Non cancellare le parentesi angolari `< >` e le virgolette `" "`.

### Passo 4 — Metti le tue immagini
1. Copia l'immagine **dentro la tua cartella**, accanto a `index.html`.
2. Nella riga `<img src="immagine-esempio.svg" alt="…">` scrivi il **nome esatto** del tuo file, con maiuscole e minuscole uguali.
3. In `alt` scrivi **cosa mostra l'immagine** (serve a chi usa un lettore di schermo). Esempio: `alt="Schema di cifratura con chiave pubblica e privata"`.
4. Cancella `immagine-esempio.svg` se non ti serve più.

| Requisito | Valore |
|---|---|
| Formati | **PNG** (schemi, grafici), **JPG** (foto), **SVG** (icone, disegni), **WebP** |
| Larghezza massima | **1280 px** (in una colonna della griglia bastano **600 px**) |
| Peso | possibilmente **sotto 500 KB** per immagine |
| Testo dentro le immagini | almeno **24 px**, altrimenti sul telefono non si legge |

### Passo 5 — La domanda di verifica (è ciò che completa la lezione)
Nel modello la lezione si **completa quando lo studente risponde correttamente**: solo allora si sblocca il pulsante Avanti del corso (vedi [la regola fondamentale](#️-la-regola-fondamentale-la-pagina-deve-completarsi)). **Se togli la domanda senza mettere un'altra attività con `player.complete();`, la lezione non si completerà mai.**

- Cambia il testo della domanda nella riga `<h2>`.
- Cambia le risposte nelle righe `<button …>`. Puoi averne da 2 a 5.
- Metti **`data-giusta="si"`** sulla risposta corretta (una sola) e **`data-giusta="no"`** sulle altre.
- I messaggi di risposta giusta e sbagliata si cambiano in alto nello script, nelle righe `MESSAGGIO_GIUSTO` e `MESSAGGIO_SBAGLIATO`.

**Se la lezione non deve avere una domanda,** chiedi al responsabile del corso: si può impostare come completata all'apertura oppure con un pulsante «Ho finito».

### Passo 6 — Più contenuto? Usa più passi, mai lo scorrimento
La pagina ha **dimensione fissa: 1280 × 720 pixel**, come una slide. **Non scorre.** Se il contenuto non ci sta:
- **non** rimpicciolire il testo;
- **dividi** in più passi: copia un blocco `<section class="passo" …> … </section>`, aggiungi `hidden` dopo `aria-label="…"` e aggiorna il numero nell'etichetta. Il contatore «Passo 1 di N» e i pulsanti Continua/Indietro si adattano da soli.

## 4. Linee guida grafiche

**Usa i componenti pronti: hanno già colori, caratteri e spazi corretti.** Ti basta scrivere la classe indicata.

| Vuoi… | Scrivi |
|---|---|
| un sovratitolo dorato in maiuscolo | `<p class="overline">Lezione 3 · Video</p>` |
| il titolo della pagina (uno solo) | `<h1>Titolo</h1>` |
| un sottotitolo | `<h2>Sottotitolo</h2>` |
| il titolo di un riquadro | `<h3>Titolo del riquadro</h3>` |
| un paragrafo | `<p class="testo">…</p>` |
| un testo secondario, più piccolo | `<p class="piccolo">…</p>` |
| due o tre colonne | `<div class="griglia-2"> … </div>` oppure `griglia-3` |
| un riquadro (card) | `<div class="card"><h3>…</h3><p>…</p></div>` |
| un box «Lo sapevi?» | `<div class="box-info"><span><strong>Lo sapevi?</strong> …</span></div>` |
| un'immagine con didascalia | `<figure class="figura"><img src="…" alt="…"><figcaption>…</figcaption></figure>` |
| un pulsante principale | `<button type="button">Testo</button>` |
| un pulsante secondario | `<button type="button" class="btn-secondario">Testo</button>` |

**Dimensioni e formato**

| Elemento | Misura |
|---|---|
| Pagina | **1280 × 720 px**, fissa, senza scorrimento |
| Margini (già impostati) | 64 px sopra e sotto, 80 px ai lati: non mettere nulla fuori |
| Testo più piccolo consentito | **18 px**. Sul telefono la pagina si rimpicciolisce fino a 1/3. |
| Testo normale | 20–22 px (classe `testo`) |
| Quantità di testo | al massimo **80–100 parole** visibili insieme |
| Pulsanti | almeno 44 px di altezza (già impostati a 52 px) |

**Colori.** Se aggiungi stili tuoi, usa **solo** questi nomi, mai codici inventati:

| Nome | Colore | Quando usarlo |
|---|---|---|
| `var(--color-primary)` | blu notte | titoli, pulsanti, testi importanti |
| `var(--color-text)` | quasi nero | testo normale |
| `var(--color-text-muted)` | grigio | testo secondario |
| `var(--color-accent)` | oro | **solo** linee, icone, decorazioni (non per il testo) |
| `var(--color-accent-text)` | oro scuro | testo dorato |
| `var(--color-accent-100)` | crema | sfondi evidenziati |
| `var(--color-bg)` | grigio chiarissimo | sfondi di riquadri |
| `var(--color-border)` | grigio chiaro | bordi |
| `var(--color-success)` · `var(--color-error)` | verde · rosso | solo per giusto / sbagliato, sempre con un testo («✓ Corretto», «✗ Non corretto») |

Esempio di stile personalizzato, dentro `<style>` nella tua pagina:
```css
.mio-riquadro { border: 2px solid var(--color-accent); border-radius: 16px; padding: 24px; }
```

**Da evitare:**
- emoji al posto delle icone;
- colori vivaci o sfumature;
- testo bianco su oro;
- testi tutti in maiuscolo;
- animazioni lampeggianti;
- informazioni date **solo** dal colore.

## 5. Regole tecniche (a prova di errore)

- ❌ **Niente da internet:** nessun font, immagine, video o libreria presi da un indirizzo web. Il corso deve funzionare anche offline.
- ❌ **Niente percorsi del computer:** mai `C:\Users\…`. Solo il nome del file nella tua cartella.
- ❌ **Niente pulsanti Avanti/Indietro tra lezioni,** menu o schermo intero: li ha già il Player. I pulsanti «Continua/Indietro» del modello spostano solo tra i passi della tua pagina.
- ❌ **Niente audio o video che partono da soli.** Per un video dentro la pagina, chiedi al responsabile del corso.
- ✅ **Lascia le due righe ⛔** che collegano la pagina al corso: `pagina.css` in alto e `player-bridge.js` in basso.
- ✅ **Salva sempre in UTF-8.** Visual Studio Code lo fa da solo. In Blocco note: *File › Salva con nome › Codifica: UTF-8*. Se vedi lettere strane al posto delle accentate (es. `Ã¨`), il file non è in UTF-8.

## 6. Controlla la tua pagina

**Anteprima veloce:** doppio clic su `index.html` della **tua cartella**. Vedi la pagina da sola, a grandezza reale (1280 × 720).

**Prova completa (obbligatoria): `prova.html`**
1. Doppio clic su **`kit-autori\prova.html`**.
2. In alto scrivi il **nome della tua cartella** (es. `03-simmetrica`) e premi **Carica**.
3. La pagina compare rimpicciolita come nel corso. Sotto ci sono due indicatori:
   - **«✓ Pagina collegata al Player»** in verde: il collegamento funziona. Se compare un messaggio rosso, è stata cancellata la riga `player-bridge.js` oppure il nome della cartella è sbagliato.
   - **«Completamento»**: svolgi l'attività come farebbe lo studente. Deve diventare verde, *«✓ Lezione completata: nel corso lo studente potrà andare avanti»*. **Se resta «non ancora», nel corso lo studente resterebbe bloccato:** correggi prima di consegnare.

**Lista di controllo, prima di consegnare:**

- [ ] La cartella ha un nome tipo `03-simmetrica` (minuscole, trattini, niente spazi).
- [ ] Dentro ci sono `index.html` e tutte le immagini usate, con i nomi giusti.
- [ ] Tutte le immagini si vedono (se ne manca una, compare un'icona rotta).
- [ ] Il contenuto sta nella finestra **senza scorrere** e niente è tagliato in basso o a destra.
- [ ] Nessun testo è troppo piccolo (almeno 18 px).
- [ ] Ogni immagine ha un `alt` descrittivo.
- [ ] La risposta giusta fa comparire «✓ Corretto»; quelle sbagliate il messaggio di errore.
- [ ] **In `prova.html` entrambi gli indicatori diventano verdi** (collegata e completata).
- [ ] Le accentate si leggono bene (file in UTF-8).
- [ ] Non hai modificato `pagina.css`, `player/` o `prova.html`.

## 7. Consegna e caricamento

**Consegni solo la tua cartella** (es. `kit-autori\pages\03-simmetrica`), non tutto il kit.

**Se non hai accesso al repository GitHub (caso più comune):**
1. Tasto destro sulla tua cartella (es. `03-simmetrica`) › *Invia a › Cartella compressa*.
2. Manda lo ZIP al responsabile del corso, per email o con un servizio di trasferimento.
3. Nel messaggio indica:
   - **numero e titolo** della lezione;
   - **durata** indicativa (es. «6 minuti»);
   - **tipo**: lezione interattiva, quiz o conclusione;
   - **quando si considera completata** (es. «quando risponde correttamente alla domanda»).

**Il responsabile del corso** poi:
- estrae la cartella in `pages/`;
- aggiunge la lezione in `course.js`, per esempio:
  ```js
  { id: "simmetrica", title: "Crittografia simmetrica", type: "html",
    src: "pages/03-simmetrica/index.html", duration: "6 min",
    complete: { on: "page" } },
  ```
- prova il corso e lo salva su GitHub. I dettagli sono nel [Manuale d'uso del Player](manuale-player.md), § B3 e B9.

**Se hai accesso al repository su GitHub,** puoi caricarla direttamente dal sito:
1. Apri il repository › cartella `pages`.
2. **Add file › Upload files** › trascina **l'intera cartella** (es. `03-simmetrica`) › scrivi una descrizione › **Commit changes**.
3. Avvisa il responsabile, che aggiunge la lezione in `course.js`.

## 8. Problemi frequenti

| Problema | Causa probabile | Soluzione |
|---|---|---|
| L'immagine non si vede | nome sbagliato o file fuori dalla cartella | controlla maiuscole, estensione (`.png` ≠ `.PNG`) e posizione |
| La pagina è «bianca e senza stile» | la riga `pagina.css` è stata cambiata o la cartella non è in `pages/` | ripristina la riga ⛔ e controlla la posizione |
| Lettere strane (`Ã¨`, `â€™`) | file non salvato in UTF-8 | risalva in UTF-8 |
| Il contenuto è tagliato in basso | troppo testo o immagine troppo alta | riduci il testo o dividi in più passi |
| La domanda non risponde | `data-giusta` scritto male o virgolette cancellate | confronta con il modello originale |
| In `prova.html`: «La pagina NON è collegata» | cancellata la riga `player-bridge.js`, o nome della cartella scritto male | rimetti la riga ⛔; controlla il nome |
| In `prova.html` il completamento resta «non ancora» | nessuna risposta segnata `data-giusta="si"`, oppure attività tua senza `player.complete();` | segna la risposta giusta o aggiungi `player.complete();` alla fine dell'attività |
| Nel corso Avanti resta grigio | stesso motivo della riga sopra | come sopra: verifica sempre con `prova.html` |

**Dubbi?** Prima di inventare una soluzione chiedi al responsabile del corso: è più veloce che correggere dopo.
