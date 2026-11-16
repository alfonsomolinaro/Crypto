---
name: pagina-lezione
description: Crea o modifica una pagina di lezione per il Player e-learning HTML5 del corso (stage fisso 1280×720, pagina.css, player-bridge.js, player.complete(), design token, accessibilità WCAG 2.1 AA). Usala quando l'utente chiede di creare, rifare o correggere una lezione, una pagina, un quiz o una pagina di conclusione per il corso o per il kit autori.
---

# Pagina di lezione per il Player

Crei UNA pagina di lezione compatibile con il Player. Il Player gestisce già navigazione, menu, progressi, audio/video e salvataggio: tu crei solo il contenuto della lezione.

## Prima di scrivere

1. Leggi **`regole.md`** (in questa cartella): sono le regole complete e obbligatorie (misure, stile, completamento, accessibilità, scheletro). Seguile alla lettera.
2. Usa **`modello.html`** come punto di partenza e **`pagina.css`** per sapere quali classi esistono già (card, box-info, lab, griglie, pulsanti…). Non inventare classi già presenti.
3. Se mancano informazioni essenziali (titolo, contenuti, interazione, quando la lezione è completata), chiedile in una sola domanda breve. Altrimenti procedi.

## Dove salvare il risultato

| Dove lavori | Cosa fare |
|---|---|
| **Cartella del corso** (c'è `course.js`) | Crea `pages/<numero-nome>/index.html` (minuscole e trattini, es. `03-simmetrica`), con le immagini nella stessa cartella. Aggiungi il blocco della lezione in `lessons` di `course.js`. Non modificare `player/`. |
| **Kit autori** (c'è `prova.html`, non c'è `course.js`) | Copia `pages/_modello/` in `pages/<numero-nome>/` e scrivi lì la pagina. Il blocco per `course.js` mostralo in chat: lo inserisce il responsabile del corso. |
| **Chat senza file** (claude.ai) | Restituisci `index.html` completo come file da scaricare e il blocco per `course.js`. Spiega in due righe dove salvarli (`pages/<numero-nome>/`). |

## Regole che si sbagliano più spesso

- Tutto deve stare in **1280×720 senza scorrimento**, anche dopo ogni interazione. Più contenuto = più passi interni, mai lo scroll.
- Collegamenti con **percorsi relativi**: `../pagina.css` nel `<head>`, `../../player/player-bridge.js` prima del tuo script. **Nessuna risorsa da internet** (CDN, font remoti, `fetch`): il corso deve funzionare aprendo `index.html` con doppio clic.
- `player.complete()` solo **quando lo studente ha davvero finito**, mai all'apertura. Per i quiz `player.setStatus("passed" | "failed")`. Ripristina lo stato completato con l'evento `player:init`.
- Aggiungi `[hidden] { display: none !important; }` nel blocco `<style>`.
- Testi **≥ 18 px**; colori solo dalle variabili CSS; feedback mai solo a colori; tutto usabile da tastiera.
- Nessun pulsante Avanti/Indietro tra lezioni: li ha il Player.

## Alla fine

- Ripassa il **controllo finale** in fondo a `regole.md` punto per punto.
- Se puoi aprire un browser: verifica a 1280×720 che ogni passo resti dentro la pagina dopo tutte le interazioni, che la lezione si completi e che la console non abbia errori. Nel kit autori si usa `prova.html`.
- Rispondi in breve: cosa hai creato, dove, e cosa resta da fare.
