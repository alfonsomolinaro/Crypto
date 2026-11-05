# Progetto: Design di un Player eLearning HTML5 riutilizzabile

## Ruolo e obiettivo
Agisci come un esperto UX/UI designer specializzato in piattaforme eLearning.

Progetta e realizza un **prototipo visivo navigabile e responsive** di un Player eLearning HTML5 moderno, elegante e professionale.

Il Player è l'interfaccia che contiene le lezioni di un corso e permette di navigarle. Non devi progettare i contenuti didattici: devi disegnare la struttura che li ospiterà.

Il progetto sarà sviluppato in seguito con Claude Code.

## 1. Contesto del progetto
Il primo utilizzo sarà una demo universitaria sulla crittografia, composta da:

- una copertina iniziale;
- un breve video introduttivo;
- quattro moduli interattivi;
- un eventuale quiz finale;
- una schermata conclusiva.

Il Player deve essere riutilizzabile per corsi diversi: si cambiano contenuti, titoli, configurazione e colori senza modificarne la struttura.

## 2. Vincoli tecnici
Il design dovrà essere realizzabile con HTML, CSS e JavaScript puri, senza framework obbligatori e senza processi di compilazione.

La versione sviluppata dovrà funzionare:

- online, tramite GitHub Pages;
- offline, aprendo direttamente `index.html` con doppio clic su un computer, senza server locale.

Non prevedere dipendenze da servizi esterni, font remoti o librerie CDN necessarie al funzionamento.

In futuro il Player potrà essere integrato con SCORM 1.2, ma in questa fase non devi implementare SCORM.

Non realizzare ora il prodotto definitivo: questa fase riguarda il design e il prototipo navigabile.

## 3. Layout generale
Adotta un'interfaccia ispirata ai Player professionali come Articulate Storyline.

Prevedi tre aree principali.

### Header superiore
- Titolo del corso, sempre visibile.
- Breadcrumb `Titolo corso › Lezione corrente`. Su smartphone mostra solo la lezione.
- Pulsante hamburger per aprire il menu.
- Indicatore percentuale di progresso.
- Pulsante Risorse.
- Pulsante Schermo intero, dove supportato.
- Pulsante Esci.

### Area centrale
- L'area dei contenuti è uno **stage 16:9 a dimensione fissa, scalato in proporzione allo spazio disponibile** (stile Storyline), con bande neutre ai lati.
- Lo stage ospita sia i video sia le pagine HTML interattive.
- Il Player non deve sovrapporre i propri controlli ai contenuti.

### Barra inferiore
- Pulsante Indietro.
- Pulsante Avanti.
- Controlli audio/video, solo quando la lezione contiene media.
- Sulle lezioni prive di media i controlli sono nascosti.

La barra deve adattarsi agli schermi piccoli senza diventare affollata.

## 4. Menu laterale
Il menu contiene l'elenco ordinato delle lezioni.

### Su desktop
- Si apre da sinistra con un'animazione fluida.
- È richiudibile.
- Quando è aperto, l'area centrale si restringe e lo stage si riscala.
- Su schermi molto larghi, prevedi l'opzione di fissarlo aperto.

### Su smartphone e tablet
- Si apre con il pulsante hamburger.
- Compare sopra il contenuto, con uno sfondo oscurato.
- Si chiude con un pulsante dedicato, toccando all'esterno, premendo Esc o selezionando una lezione disponibile.

### Voci del menu
Ogni voce mostra:

- numero della lezione;
- titolo;
- icona del tipo di contenuto (video, interattiva, quiz, finale);
- durata stimata;
- stato di avanzamento.

Gli stati da rappresentare sono:

- da iniziare;
- in corso;
- completata;
- bloccata (sbiadita, con lucchetto: deve far capire che si sbloccherà);
- non superata, per un eventuale quiz.

Ogni stato usa sia un colore sia un'icona, mai solo il colore. La lezione corrente ha anche un'evidenziazione specifica.

In fondo al menu mostra un riepilogo, ad esempio "4 di 9 completate".

## 5. Navigazione
La modalità di navigazione deve essere configurabile per singolo corso: **vincolata** (default) o **libera**.

In modalità vincolata:

- la prima lezione è disponibile;
- le successive sono inizialmente bloccate;
- completando una lezione si sblocca quella successiva;
- il pulsante Avanti resta disabilitato finché la lezione non risulta completata;
- le lezioni già completate possono essere rivisitate;
- non è previsto l'avanzamento automatico.

Quando una lezione viene completata, il pulsante Avanti si evidenzia con un'animazione discreta nel colore oro.

Scorciatoie da tastiera:

| Tasto | Azione |
|---|---|
| ← / → | Lezione precedente / successiva |
| Spazio | Play / pausa |
| M | Apri / chiudi il menu |
| F | Schermo intero |
| Esc | Chiudi il menu e i dialog |

Nel prototipo, simula il completamento delle lezioni con un'interazione dimostrativa, così da poter visualizzare e verificare tutti gli stati dell'interfaccia. Non sviluppare la logica didattica delle singole lezioni.

## 6. Progresso e ripresa del corso
Disegna:

- una barra o un indicatore percentuale di progresso;
- gli stati di completamento delle lezioni;
- un pulsante "Riprendi" nella copertina, quando esistono progressi salvati;
- un feedback visivo quando una lezione viene completata;
- un'indicazione dello sblocco della lezione successiva, ad esempio un lucchetto che si apre.

Prevedi toast discreti ("Lezione completata", "Nuova lezione sbloccata") e una celebrazione finale sobria nei colori del brand.

Nella futura versione su GitHub Pages i progressi saranno salvati automaticamente nel browser tramite localStorage, quando disponibile. In modalità offline (`file://`) il salvataggio persistente non è garantito su tutti i browser: il design deve prevedere anche il caso in cui non sia disponibile.

Per ora simula gli stati nel prototipo navigabile, senza un sistema di persistenza definitivo.

## 7. Controlli audio e video
Prevedi una barra multimediale con:

- play/pausa;
- barra di avanzamento e tempo trascorso/totale;
- volume e muto;
- riascolta da capo;
- salto di ±10 secondi;
- velocità di riproduzione.

Su smartphone mostra soltanto i controlli principali e raccogli quelli secondari in un menu compatto.

Regole:

- i controlli compaiono solo quando la lezione contiene media;
- nessun autoplay: l'utente avvia sempre la riproduzione;
- volume, muto e velocità restano impostati anche cambiando lezione;
- non sono previsti sottotitoli.

## 8. Stile grafico
Utilizza un design minimalista, elegante e professionale.

Palette iniziale:

- blu notte `#21324b`, colore primario;
- oro/bronzo `#a97835`, colore di accento;
- sfondi chiari e neutri;
- colori semantici per completamento, avviso ed errore.

Preferisci:

- tipografia sans-serif moderna e leggibile, open source e includibile in locale;
- icone SVG coerenti;
- angoli leggermente arrotondati;
- ombre leggere;
- animazioni discrete;
- elementi di gamification sobri, come progresso, sblocchi e completamento.

Usa l'oro come colore di accento, rispettando il contrasto del testo. Su sfondo bianco l'oro non basta per il testo piccolo: in quel caso serve una variante più scura.

Altre indicazioni:

- non inserire loghi;
- tutte le etichette dell'interfaccia devono essere in italiano;
- prevedi solo il tema chiaro.

## 9. Responsive e accessibilità
Progetta esplicitamente le versioni:

- desktop (esperienza principale);
- tablet;
- smartphone in verticale e in orizzontale.

Su smartphone:

- header compatto;
- menu laterale a scomparsa;
- barra inferiore semplificata;
- pulsanti facilmente utilizzabili con il tocco (almeno 44×44 px).

Con lo stage 16:9 fisso, su smartphone in verticale i contenuti diventano piccoli. Proponi una soluzione, ad esempio un invito discreto a ruotare il dispositivo, con lo stage a tutta larghezza e le barre ridotte al minimo.

Rispetta le WCAG 2.1 AA:

- contrasto sufficiente;
- focus visibile;
- navigazione completa da tastiera;
- etichette accessibili per i pulsanti con sola icona;
- annunci per gli screen reader al cambio lezione;
- gestione corretta dei dialog;
- rispetto della preferenza per il movimento ridotto.

## 10. Schermate da progettare
Realizza un prototipo navigabile che mostri:

1. copertina del corso, primo accesso;
2. copertina con possibilità di riprendere;
3. Player con il video introduttivo;
4. Player con una lezione HTML dimostrativa;
5. lezione non completata, con Avanti disabilitato;
6. lezione completata, con Avanti evidenziato e toast;
7. menu laterale aperto, con vari stati delle lezioni;
8. barra multimediale e relativi controlli;
9. pannello delle risorse scaricabili (nome, tipo, peso del file, pulsante di download);
10. dialog di conferma uscita;
11. stati di errore: media non disponibile e lezione che non si carica;
12. schermata finale di completamento, con la celebrazione;
13. modalità sviluppatore: tutte le lezioni sbloccate e badge "DEV" visibile.

Mostra le principali schermate sia su desktop sia su mobile.

Per i contenuti del corso usa esclusivamente segnaposto dimostrativi, senza sviluppare i moduli sulla crittografia.

## 11. Cosa consegnare
### A. Prototipo navigabile
Un prototipo che permetta di sperimentare menu, navigazione, stati di avanzamento, controlli e comportamento responsive. Le interazioni devono essere dimostrative e non devono dipendere da backend o servizi esterni.

### B. Design system
Definisci palette, tipografia, spaziature, icone, componenti, varianti e stati (default, hover, focus, attivo, disabilitato), con indicazioni utili alla futura implementazione. Tutti i valori devono essere espressi come design token (CSS custom properties), così da poterli cambiare per ogni corso.

### C. Specifiche per Claude Code
Documenta in modo chiaro:

- struttura dei componenti del Player;
- comportamento delle interazioni e durate delle animazioni;
- regole responsive e scalatura dello stage 16:9;
- stati della navigazione;
- elementi grafici e design token;
- distinzione tra elementi del Player e contenuti dei corsi.

Il progetto grafico deve essere facilmente trasferibile a Claude Code per la successiva realizzazione del Player HTML5.

## 12. Formato di consegna
Organizza i materiali in questa struttura:

```
design/
├─ prototipo/          ← prototipo HTML navigabile (punto A)
├─ tokens.css          ← design token come CSS custom properties
├─ componenti.html     ← libreria dei componenti, ognuno in tutti i suoi stati
├─ schermate/          ← le schermate del punto 10, desktop e mobile (PNG o PDF)
├─ specifiche.md       ← specifiche per Claude Code (punto C)
└─ icons/              ← icone SVG, una per file, con nomi descrittivi
```

Dettagli:

- **`tokens.css`**: tutti i valori dello stile (colori, inclusa la variante dell'oro per il testo, tipografia, spaziature, raggi, ombre, durate e easing delle animazioni, breakpoint). Nessun valore deve essere scritto direttamente nei componenti: tutto passa dai token.
- **`componenti.html`**: pulsanti Avanti/Indietro (normale, hover, focus, disabilitato, evidenziato), voce del menu in tutti gli stati, menu laterale, header con breadcrumb e progresso, media bar desktop e mobile, toast, dialog, box di errore, pannello risorse, badge DEV.
- **`specifiche.md`**: struttura dei componenti, comportamenti e transizioni, regole responsive e scalatura dello stage 16:9, stati della navigazione, separazione tra Player e contenuti, nome del font scelto (open source, da includere in locale).
- **`icons/`**: set coerente che copra almeno menu, chiudi, avanti, indietro, play, pausa, volume, muto, velocità, ±10 secondi, riascolta, schermo intero, risorse, esci, download, lucchetto, spunta, avviso, errore e i tipi di lezione (video, interattiva, quiz, finale).

I materiali indispensabili sono `tokens.css`, `componenti.html` e `specifiche.md`. Il prototipo e le schermate servono per approvare il design.

## Regola finale
Concentrati sulla progettazione visiva e sull'esperienza utente. Non costruire ora un LMS, non implementare SCORM e non sviluppare i contenuti didattici.

L'obiettivo è ottenere un Player riutilizzabile, professionale, responsive e ben specificato, che sia una base concreta per lo sviluppo successivo con Claude Code.
