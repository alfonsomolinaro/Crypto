/* =========================================================================
   Configurazione del corso.
   È l'unico file da modificare (insieme a pages/, media/, resources/)
   per creare un corso nuovo con lo stesso Player.
   ========================================================================= */
window.COURSE = {
  id: "crittografia-basi",              // chiave del salvataggio: cambiala per ogni corso
  title: "Crypto agility: dalla simmetrica al post-quantum",
  description: "Perché gli algoritmi crittografici invecchiano, cosa cambia con i computer quantistici e cosa significa per te. Basato sul documento NIST CSWP 39 sulla crypto agility.",
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
      title: "Introduzione · Crypto agility",
      type: "video",                    // il Player mostra il video direttamente
      src: "media/video/intro.mp4",     // MP4 (H.264 + AAC), sotto i 100 MB
      duration: "3 min",
      complete: { on: "media-end", threshold: 0.95 }   // completata al 95% del video
    },
    {
      // Percorso Crypto Agility · modulo 1 di 4
      id: "ca-algoritmi-invecchiano",
      title: "Modulo 1 · Perché gli algoritmi invecchiano",
      type: "html",
      src: "pages/ca-01-algoritmi-invecchiano/index.html",
      // audio: "media/audio/p02.mp3",  // narrazione riprodotta dal Player
      duration: "10 min",
      complete: { on: "page" }          // la pagina chiama player.complete() dopo le 3 risposte giuste
    },
    {
      id: "ca-chiave-pubblica-quantum",
      title: "Modulo 2 · La chiave pubblica e il computer quantistico",
      type: "html",
      src: "pages/ca-02-chiave-pubblica-quantum/index.html",
      duration: "10 min",
      complete: { on: "page" }
    },
    {
      id: "ca-cambiare-algoritmo",
      title: "Modulo 3 · Perché cambiare è così difficile",
      type: "html",
      src: "pages/ca-03-cambiare-algoritmo/index.html",
      duration: "8 min",
      complete: { on: "page" }
    },
    {
      id: "ca-algoritmo-ritirato",
      title: "Modulo 4 · Quando un algoritmo viene ritirato",
      type: "html",
      src: "pages/ca-04-algoritmo-ritirato/index.html",
      duration: "8 min",
      complete: { on: "page" }
    },
    /* Lezione NASCOSTA (non cancellata): RSA con i numeri e algoritmo di Shor.
       Per rimetterla nel corso basta togliere i segni di commento intorno al blocco.
    {
      id: "asimmetrica",
      title: "Crittografia asimmetrica e algoritmo di Shor",
      type: "html",
      src: "pages/04-asimmetrica/index.html",
      duration: "7 min",
      complete: { on: "page" }
    },
    */
    {
      id: "quiz",
      title: "Verifica finale",
      type: "quiz",
      src: "pages/06-quiz/index.html",
      duration: "8 min",
      complete: { on: "page" }          // la pagina chiama player.setStatus("passed" | "failed"): servono 6 risposte giuste su 8
    }
    /* Pagina NASCOSTA (non cancellata): riepilogo «Hai completato il percorso».
       Il Player mostra già la sua schermata finale dopo «Termina». Per rimetterla nel corso,
       aggiungi una virgola dopo il blocco della verifica qui sopra e togli i segni di commento.
    ,{
      id: "conclusione",
      title: "Hai completato il percorso",
      type: "final",
      src: "pages/07-conclusione/index.html",
      duration: "1 min",
      complete: { on: "visit" }         // completata appena aperta
    }
    */
  ]
};
