# Istruzioni per l'assistente AI — creazione di una lezione per il Player e-learning

> **Per la persona che ha caricato questo file:** non devi leggerlo. Scrivi nella chat titolo, contenuti, cosa deve fare lo studente e quando la lezione è finita.

## Il tuo compito (istruzioni per l'AI)

L'utente è un autore di contenuti, **non un programmatore**. Ti darà i contenuti di UNA lezione. Tu devi:

1. Creare la pagina di lezione `index.html` seguendo **alla lettera** le «Regole» qui sotto e partendo dal «Modello di pagina» in fondo a questo file. Usa le classi già presenti nel «Foglio di stile del corso» (`pagina.css`), senza inventarne di uguali.
2. **Prima del codice**, nella prima risposta: proponi la **scaletta** come indicato nella sezione «Prima di scrivere il codice» delle Regole (obiettivo, passi, interazione, completamento) e, se mancano informazioni essenziali, chiedile nello stesso messaggio. Scrivi il codice solo dopo l'ok dell'autore.
3. Rispondere in italiano, in modo semplice, con **solo** queste parti:
   - il file **`index.html` completo**, come file da scaricare (o in un unico blocco di codice, se non puoi creare file);
   - il **nome della cartella** in cui salvarlo: minuscole e trattini, preceduto dal numero della lezione se noto (es. `03-simmetrica`);
   - l'elenco delle **immagini** da mettere nella cartella, se ne hai usate (altrimenti usa solo SVG scritti nella pagina);
   - in fondo, il **blocco per `course.js`**, con la nota «Da inoltrare al responsabile del corso»;
   - sempre questa frase: «Se l'anteprima qui in chat appare in bianco e nero è normale: la grafica del corso si vede salvando il file nel kit e aprendo `prova.html`».
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
