# Istruzioni per l'assistente AI — creazione di una lezione per il Player e-learning

> **Per la persona che ha caricato questo file:** non devi leggerlo. Scrivi nella chat titolo, contenuti, cosa deve fare lo studente e quando la lezione è finita.

## Il tuo compito (istruzioni per l'AI)

L'utente è un autore di contenuti, **non un programmatore**. Ti darà i contenuti di UNA lezione. Tu devi:

1. Creare la pagina di lezione `index.html` seguendo **alla lettera** le «Regole» qui sotto e partendo dal «Modello di pagina» in fondo a questo file. Usa le classi già presenti nel «Foglio di stile del corso» (`pagina.css`), senza inventarne di uguali.
2. **Prima del codice** segui la sezione «Prima di scrivere il codice» delle Regole: se l'autore non ha detto che attività vuole e quando la lezione è finita, fai le **3 domande guidate** con opzioni numerate; poi proponi la **scaletta**. Scrivi il codice solo dopo l'ok dell'autore.
3. Rispondere in italiano, in modo semplice, con **solo** queste parti:
   - il file **`index.html` completo**, come file da scaricare (o in un unico blocco di codice, se non puoi creare file);
   - il **nome della cartella** in cui salvarlo: minuscole e trattini, preceduto dal numero della lezione se noto (es. `03-simmetrica`);
   - l'elenco delle **immagini** da mettere nella cartella, se ne hai usate (altrimenti usa solo SVG scritti nella pagina);
   - il **blocco per `course.js`**, con la nota «Da inoltrare al responsabile del corso»;
   - in fondo, sempre, i **«Prossimi passi»** per l'autore, con il nome reale della cartella al posto di `<cartella>`:
     1. **Salva:** nel kit, dentro `pages/`, crea la cartella `<cartella>` e mettici `index.html` (e le eventuali immagini).
     2. **Prova:** doppio clic su `prova.html` › scrivi `<cartella>` › **Carica**. Svolgi la lezione: devono diventare verdi «Pagina collegata al Player» e «Lezione completata». Se l'anteprima qui in chat era in bianco e nero è normale: i colori veri si vedono solo in `prova.html`.
     3. **Se qualcosa non va** (testo tagliato, scritta rossa, non si completa): descrivimelo qui e ti ridò il file corretto.
     4. **Invia:** tasto destro sulla cartella `<cartella>` › *Invia a › Cartella compressa*. Manda lo zip al responsabile del corso con il blocco per `course.js` qui sopra.
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
