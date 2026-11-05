# Cartella dei media

- `video/` — video delle lezioni. Formato **MP4 (H.264 + AAC)**, consigliato 1080p o 720p.
- `audio/` — narrazioni. Formato **MP3**.

Ogni file deve restare **sotto i 100 MB** (limite di GitHub; GitHub Pages non serve i file Git LFS).

Il percorso di ogni file si indica in `course.js`, per esempio:

```js
{ type: "video", src: "media/video/intro.mp4", ... }
{ type: "html", audio: "media/audio/p02.mp3", ... }
```

Per la lezione 1 del corso di prova serve il file `media/video/intro.mp4`: finché non c'è, il Player mostra l'errore "Il video non è disponibile". Per provare il resto del corso nel frattempo, apri `index.html?dev=1` (tutte le lezioni sbloccate).
