# Relazione — riepilogo del lavoro e traccia

## 1. Cosa abbiamo fatto finora

| # | Fase | Cosa è stato fatto | Risultato |
|---|---|---|---|
| 1 | **Analisi dei requisiti** | 60 domande su piattaforma, struttura, navigazione, menu, progressi, audio/video, accessibilità, dispositivi, branding, funzioni extra. Risposte raccolte e trasformate in requisiti. | Elenco dei requisiti del Player |
| 2 | **Prompt di progettazione** | Prima versione dettagliata con vincoli tecnici; revisione incrociata con ChatGPT; versione finale unita, con le scelte confermate (stage 16:9 fisso stile Storyline, navigazione configurabile, niente sottotitoli). | `prompt-claude-design-player.md` (note tecniche), `prompt-claude-design-finale.md` (design e UX) |
| 3 | **Scelte tecniche** | HTML/CSS/JS puri senza framework; funzionamento offline da `file://`; configurazione in `course.js`; pagine in iframe con comunicazione `postMessage`; cartella `media/` locale; SCORM 1.2 predisposto per il futuro. | Vincoli documentati nelle specifiche |
| 4 | **Scelta degli strumenti** | Confronto Claude / ChatGPT / Figma / v0-Lovable-Bolt. Scelto Claude (design + sviluppo nello stesso flusso), ChatGPT come revisore. | Motivazioni della scelta |
| 5 | **Design — Fase 1** | Design system (palette blu notte `#21324B` e oro `#A97835` con varianti accessibili, tipografia Inter, spaziature, raggi, ombre, movimento, 31 icone); componenti in tutti gli stati; prototipo desktop navigabile. | Tela di design con prototipo interattivo |
| 6 | **Design — Fase 2** | Prototipo smartphone verticale (stage a tutta larghezza + invito a ruotare, bottom sheet per i controlli), vista smartphone orizzontale, modalità sviluppatore. | Versioni responsive |
| 7 | **Design — Fase 3 (consegna)** | Design token in CSS, set di icone SVG, specifiche complete per lo sviluppo. | `design/tokens.css`, `design/icone.svg`, `design/specifiche.md` |
| 8 | **Versionamento e pubblicazione** | Progetto in `Documenti\crypto`, repository Git, collegamento al repository `alfonsomolinaro/Crypto` su GitHub, primo push. Regola: commit frequenti, push solo dopo conferma. | Codice online su GitHub |
| 9 | **Sviluppo del Player** | *In corso.* | Player HTML5 funzionante |

### Decisioni chiave da motivare nella relazione
- **Stage 16:9 fisso** (stile Storyline) invece di contenuti responsive: le pagine si progettano una volta e appaiono identiche ovunque; su smartphone in verticale si invita a ruotare.
- **Navigazione vincolata** di default (ogni lezione sblocca la successiva), configurabile in libera.
- **Offline senza server**: per questo `course.js` invece di JSON e `postMessage` invece dell'accesso diretto all'iframe.
- **Accessibilità WCAG 2.1 AA**: contrasti verificati (l'oro originale non basta per il testo piccolo → variante più scura), stati mai indicati solo dal colore, tastiera, screen reader, movimento ridotto.
- **Riutilizzabilità**: il Player non cambia tra un corso e l'altro; cambiano solo `course.js`, contenuti e token.

## 2. Traccia proposta per la relazione

1. **Introduzione**
   - Obiettivo: un Player e-learning riutilizzabile, sviluppato da zero.
   - Caso d'uso: demo universitaria sulla crittografia.
2. **Contesto e stato dell'arte**
   - Cos'è un Player e-learning; strumenti di authoring esistenti (es. Articulate Storyline) e standard (SCORM 1.2, xAPI).
   - Perché sviluppare da zero: controllo, leggerezza, nessuna licenza, funzionamento offline.
3. **Metodologia**
   - Approccio iterativo: requisiti → prompt → design → sviluppo → test → pubblicazione.
   - Uso dell'intelligenza artificiale: Claude per design e sviluppo, ChatGPT come revisore; vantaggi e limiti riscontrati.
4. **Analisi dei requisiti**
   - Requisiti funzionali: navigazione, menu, progressi, audio/video, risorse, uscita, errori.
   - Requisiti non funzionali: offline, compatibilità, responsive, accessibilità, riutilizzabilità.
   - Tabella riassuntiva delle scelte (dalle 60 domande).
5. **Progettazione dell'interfaccia (UX/UI)**
   - Design system: colori e contrasti, tipografia, icone, movimento.
   - Componenti e stati (screenshot dalla tela).
   - Flussi: copertina → lezioni → completamento; navigazione vincolata.
   - Responsive: desktop, tablet, smartphone verticale e orizzontale.
   - Accessibilità.
6. **Architettura tecnica**
   - Struttura delle cartelle; separazione tra Player e contenuti.
   - `course.js`; stage 16:9 scalato; comunicazione pagina ↔ Player.
   - Salvataggio dei progressi (localStorage, poi SCORM 1.2).
7. **Sviluppo**
   - Fasi di implementazione e problemi risolti.
8. **Test e validazione**
   - Prove su browser e dispositivi, apertura offline, verifica di accessibilità.
9. **Pubblicazione**
   - Git e GitHub, flusso commit/push, GitHub Pages.
10. **Risultati, limiti e sviluppi futuri**
    - Pacchetto SCORM, quiz e attestato, multilingua, statistiche.
11. **Conclusioni**
12. **Appendici**
    - Prompt usati, specifiche, link al repository e alla tela di design.
