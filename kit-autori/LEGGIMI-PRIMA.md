# Kit per creare una lezione — inizia da qui

Con questo kit fai generare a un'intelligenza artificiale (Claude, ChatGPT o un'altra) la **pagina HTML di una lezione**, già pronta da inserire nel corso. Non serve saper programmare: l'inserimento nel corso lo fa il **responsabile del corso**.

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

Non sai che attività fare? Scrivi solo titolo e contenuti: l'AI ti farà **3 domande con le opzioni** (che attività vuoi: laboratorio, quiz, scenario…; obiettivo; quando è finita). Rispondi anche solo con le lettere, es. «1c, 2 ok, 3b».

Invia. L'AI ti propone poi una **breve scaletta**: se va bene rispondi «ok», altrimenti scrivi cosa cambiare. Poi ti restituisce un file **`index.html`**, un **nome di cartella** (es. `03-simmetrica`) e, in fondo, i **prossimi passi** già scritti per te: salvare, provare, inviare.

> **L'anteprima nella chat è in bianco e nero?** È normale: l'AI non ha la grafica del corso. I colori veri compaiono solo con il file salvato in `pages/` e aperto con `prova.html` (passi 3 e 4). Anche aprire `index.html` da solo, fuori dal kit, lo mostra senza colori.

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

## Cosa puoi mettere nella lezione

- ✅ **Testi**, appunti, slide da cui l'AI ricava i contenuti.
- ✅ **Immagini** PNG, JPG o SVG: mettile nella cartella della lezione e indica all'AI i nomi dei file. Oppure chiedi all'AI di disegnare schemi semplici.
- ✅ **Attività**: spiegazioni a passi, laboratori, scenari con scelte, abbinamenti, quiz.
- ✅ **Video** MP4 e **audio** MP3, sotto i 100 MB (vedi sotto).
- ❌ **Niente da internet:** niente link a YouTube o ad altri siti, immagini o font presi da un indirizzo web. Il corso deve funzionare anche offline.

## Vuoi un video?

- **Video come lezione a sé** (es. un'introduzione): non serve l'AI né l'HTML. Manda il file MP4 al responsabile del corso, con titolo e posizione nel corso: lo aggiunge lui.
- **Video dentro una pagina** (insieme a testo o attività): scrivilo all'AI, es. «nella lezione c'è il video `spiegazione.mp4`». Metti il file nella **stessa cartella** di `index.html`, prova con `prova.html` e consegna la cartella con il video dentro.

In tutti e due i casi è il **responsabile del corso** a inserire la lezione nel Player.

---

**Vuoi modificare la pagina a mano, senza AI?** Leggi `approfondimenti/GUIDA-COMPLETA.md`.
**Usi Claude Code sul computer?** Aprilo in questa cartella e chiedi «crea la lezione …»: le regole le conosce già.
**Dubbi?** Chiedi al responsabile del corso.
