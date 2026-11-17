# Kit per creare una lezione — inizia da qui

Con questo kit crei **una lezione** per il corso, facendola scrivere a un'intelligenza artificiale (Claude, ChatGPT o un'altra). Non serve saper programmare.

## Cosa ti serve davvero

| File | A cosa serve |
|---|---|
| **`CARICA-NELL-AI.md`** | L'unico file da dare all'AI: contiene già tutte le regole del corso. |
| **`prova.html`** | Per controllare che la lezione funzioni. |
| **`pages/`** | La cartella dove salvi la tua lezione. |

Tutto il resto (`player/`, `approfondimenti/`, `.claude/`) **non va toccato**.

## I 5 passi

**1. Apri l'AI e carica il file.**
Apri **claude.ai** (o ChatGPT) in una chat nuova e allega **`CARICA-NELL-AI.md`** (icona 📎 o trascinalo nella chat).

**2. Scrivi la tua lezione.**
Nello stesso messaggio scrivi, con parole tue:
- il **titolo** della lezione;
- i **contenuti** (puoi incollare appunti, testi, slide);
- **cosa deve fare lo studente** (es. «rispondere a 3 domande», «abbinare termini e definizioni»);
- **quando la lezione è finita** (es. «quando risponde giusto a tutte le domande»).

Invia. L'AI ti restituisce un file **`index.html`** e un **nome di cartella** (es. `03-simmetrica`).

**3. Salva il file.**
Dentro `pages/` crea una cartella con quel nome e mettici `index.html` (e le eventuali immagini).

```
pages/
└─ 03-simmetrica/
   └─ index.html
```

**4. Provala.**
Doppio clic su **`prova.html`** › scrivi il nome della cartella (es. `03-simmetrica`) › **Carica**.
Svolgi la lezione come uno studente. Devono diventare **verdi** due scritte:
- ✓ *Pagina collegata al Player*
- ✓ *Lezione completata*

Se qualcosa non va (testo tagliato, scritta rossa, non si completa), **descrivilo all'AI nella stessa chat** e chiedi di correggere. Poi sostituisci il file e riprova.

**5. Consegna.**
Tasto destro sulla **tua cartella** (es. `03-simmetrica`) › *Invia a › Cartella compressa*. Manda lo zip al responsabile del corso indicando titolo, durata e quando la lezione è completata.
Il blocco «course.js» che l'AI ti scrive in fondo copialo pure nel messaggio: serve al responsabile, non a te.

---

**Vuoi modificare la pagina a mano, senza AI?** Leggi `approfondimenti/GUIDA-COMPLETA.md`.
**Usi Claude Code sul computer?** Aprilo in questa cartella e chiedi «crea la lezione …»: le regole le conosce già.
**Dubbi?** Chiedi al responsabile del corso.
