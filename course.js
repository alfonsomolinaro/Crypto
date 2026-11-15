/* =========================================================================
   Configurazione del corso.
   È l'unico file da modificare (insieme a pages/, media/, resources/)
   per creare un corso nuovo con lo stesso Player.
   ========================================================================= */
window.COURSE = {
  id: "crittografia-basi",              // chiave del salvataggio: cambiala per ogni corso
  title: "Crittografia: le basi",
  description: "[Descrizione breve del corso: cosa imparerai e a chi è rivolto.]",
  navigation: "vincolata",              // "vincolata" (ogni lezione sblocca la successiva) | "libera"
  // MODALITÀ SVILUPPO: tutte le lezioni sbloccate, badge DEV, pannello stati e "Azzera progressi".
  // Mettere false prima di consegnare il corso agli studenti.
  // (In alternativa si può usare l'indirizzo index.html?dev=1, e ?dev=0 per spegnerla.)
  dev: true,
  // certificate: "resources/attestato.pdf",   // se presente, compare "Scarica l'attestato" alla fine

  // Facoltativo: sovrascrive i design token di player/tokens.css
  theme: {
    // "--color-primary": "#21324B",
    // "--color-accent": "#A97835"
  },

  // Fonti e risorse disponibili in tutto il corso (pulsante "Risorse" in alto).
  // I PDF si aprono dentro il Player su computer, in una nuova scheda su smartphone.
  // Si possono aggiungere risorse anche a una singola lezione, con la stessa proprietà "resources".
  resources: [
    { title: "Approfondimento · NIST CSWP 39-upd1: Considerations for Achieving Crypto Agility (2025)", file: "resources/NIST.CSWP.39-upd1.pdf", size: "1,1 MB" }
    // { title: "Slide del corso", file: "resources/slide.pdf", size: "2,4 MB" }
  ],

  lessons: [
    {
      id: "intro",
      title: "Introduzione alla crittografia",
      type: "video",                    // il Player mostra il video direttamente
      src: "media/video/intro.mp4",     // MP4 (H.264 + AAC), sotto i 100 MB
      duration: "3 min",
      complete: { on: "media-end", threshold: 0.95 }   // completata al 95% del video
    },
    {
      // Percorso Crypto Agility · modulo 1 di 4 (in prova)
      id: "ca-algoritmi-invecchiano",
      title: "Crypto agility 1 · Perché gli algoritmi invecchiano",
      type: "html",
      src: "pages/ca-01-algoritmi-invecchiano/index.html",
      duration: "8 min",
      complete: { on: "page" }          // completata con le 3 risposte giuste del quiz finale
    },
    {
      // Percorso Crypto Agility · modulo 2 di 4 (in prova)
      id: "ca-chiave-pubblica-quantum",
      title: "Crypto agility 2 · La chiave pubblica e il computer quantistico",
      type: "html",
      src: "pages/ca-02-chiave-pubblica-quantum/index.html",
      duration: "10 min",
      complete: { on: "page" }          // completata con le 3 risposte giuste del quiz finale
    },
    {
      id: "cifrari-classici",
      title: "Cifrari classici",
      type: "html",                     // pagina HTML caricata nello stage 16:9
      src: "pages/02-cifrari-classici/index.html",
      // audio: "media/audio/p02.mp3",  // narrazione riprodotta dal Player
      duration: "6 min",
      complete: { on: "page" }          // la pagina chiama player.complete()
    },
    {
      id: "simmetrica",
      title: "Crittografia simmetrica",
      type: "html",
      src: "pages/03-simmetrica/index.html",
      duration: "7 min",
      complete: { on: "page" }
    },
    {
      id: "asimmetrica",
      title: "Crittografia asimmetrica",
      type: "html",
      src: "pages/04-asimmetrica/index.html",
      duration: "7 min",
      complete: { on: "page" }
    },
    {
      id: "firme-hash",
      title: "Firme digitali e hash",
      type: "html",
      src: "pages/05-firme-hash/index.html",
      duration: "6 min",
      complete: { on: "page" }
    },
    {
      id: "quiz",
      title: "Quiz finale",
      type: "quiz",
      src: "pages/06-quiz/index.html",
      duration: "5 min",
      complete: { on: "page" }          // la pagina chiama player.setStatus("passed" | "failed")
    },
    {
      id: "conclusione",
      title: "Conclusione",
      type: "final",
      src: "pages/07-conclusione/index.html",
      duration: "1 min",
      complete: { on: "visit" }         // completata appena aperta
    }
  ]
};
