/* =========================================================================
   Player e-learning
   Legge window.COURSE (course.js) e gestisce: copertina, navigazione,
   menu, stage 16:9, audio/video, progressi, toast, uscita, errori,
   modalità sviluppo, tastiera e accessibilità.
   Nessuna dipendenza esterna; funziona anche aperto da file://.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------- Testi dell'interfaccia (unico punto da tradurre) ---------- */
  var STRINGS = {
    courseKind: "Corso e-learning",
    program: "Programma",
    start: "Inizia il corso",
    resume: "Riprendi da «{title}»",
    restart: "Ricomincia da capo",
    yourProgress: "Il tuo progresso",
    lessonsCount: "{n} lezioni",
    aboutMinutes: "circa {n} minuti",
    lessons: "Lezioni",
    doneOf: "{done} di {total} completate",
    progress: "Progresso",
    timeInCourse: "Tempo nel corso: {t}",
    prev: "Indietro",
    next: "Avanti",
    finish: "Termina",
    resources: "Risorse",
    resourcesTitle: "Risorse del corso",
    noResources: "Nessuna risorsa per questa lezione.",
    download: "Scarica {name}",
    exit: "Esci",
    exitCourse: "Esci dal corso",
    close: "Chiudi",
    fullscreen: "Schermo intero",
    exitFullscreen: "Esci da schermo intero",
    openMenu: "Apri il menu delle lezioni",
    closeMenu: "Chiudi il menu delle lezioni",
    moreOptions: "Altre opzioni: risorse, schermo intero, esci",
    moreControls: "Altri controlli: volume, velocità, salti",
    controls: "Controlli",
    play: "Riproduci",
    pause: "Pausa",
    replay: "Riascolta da capo",
    replayShort: "Da capo",
    back10: "Indietro di 10 secondi",
    back10short: "Indietro 10 s",
    fwd10: "Avanti di 10 secondi",
    fwd10short: "Avanti 10 s",
    mute: "Disattiva audio",
    unmute: "Riattiva audio",
    volume: "Volume",
    position: "Posizione di riproduzione",
    speed: "Velocità",
    rate: "Velocità di riproduzione: {r}",
    of: "{a} di {b}",
    lessonN: "Lezione {n}",
    lessonNofT: "Lezione {n} di {t}",
    types: { video: "Video", html: "Interattiva", quiz: "Quiz", final: "Conclusione" },
    st: { done: "Completata", current: "In corso", visited: "Iniziata", todo: "Da iniziare", failed: "Non superato", locked: "Bloccata" },
    exitTitle: "Vuoi uscire dal corso?",
    exitText: "I tuoi progressi sono salvati. Quando tornerai potrai riprendere da «{title}».",
    exitTextNoSave: "Questo browser non conserva i progressi: annota la lezione a cui sei arrivato («{title}»).",
    cancel: "Annulla",
    toastDone: "Lezione completata",
    toastUnlocked: "Si è sbloccata: {title}",
    toastNextFree: "Puoi passare alla lezione successiva",
    toastLastDone: "Ultima lezione completata",
    toastLastSub: "Premi Termina per concludere il corso",
    toastFailed: "Quiz non superato",
    toastFailedSub: "Rivedi le lezioni e riprova quando vuoi",
    toastIncomplete: "Corso non ancora completato",
    toastIncompleteSub: "Mancano {n} lezioni da completare",
    toastNoSave: "Salvataggio non disponibile",
    toastNoSaveSub: "Il browser non conserva i progressi: annota la lezione a cui sei arrivato.",
    toastAudio: "Audio non disponibile",
    toastAudioSub: "La lezione continua senza narrazione.",
    errVideoTitle: "Il video non è disponibile",
    errVideo: "Non riusciamo a caricare il file di questa lezione. Controlla la connessione o riprova; se il problema continua, segnalalo al docente.",
    errVideoSkip: "Intanto puoi proseguire con la lezione successiva.",
    expand: "Ingrandisci",
    shrink: "Riduci",
    openPdf: "Apri {name}",
    openNewTab: "Apri in una nuova scheda",
    downloadShort: "Scarica",
    errPageTitle: "La lezione non si carica",
    errPage: "La pagina di questa lezione non risponde. Riprova; se il problema continua, segnalalo al docente.",
    retry: "Riprova",
    finalOver: "Corso completato",
    finalTitle: "Complimenti, hai concluso il corso",
    finalText: "Hai completato tutte le {n} lezioni di «{title}».",
    statProgress: "Progresso",
    statLessons: "Lezioni",
    statTime: "Tempo nel corso",
    certificate: "Scarica l'attestato",
    review: "Rivedi le lezioni",
    rotate: "Ruota il telefono o tocca «Ingrandisci» per vedere la lezione più grande.",
    announce: "Lezione {n} di {t}: {title}",
    iframeTitle: "Contenuto della lezione: {title}",
    devTitle: "Modalità sviluppo",
    devHint: "Tutte le lezioni sbloccate. Stato salvato:",
    devReset: "Azzera progressi",
    devResetDone: "Progressi azzerati",
    devResetSub: "Il corso riparte da zero",
    noCourse: "Il file course.js manca o non contiene lezioni."
  };

  /* ---------- Costanti ---------- */
  var C = window.COURSE;
  if (!C || !Array.isArray(C.lessons) || !C.lessons.length) {
    document.body.innerHTML = '<p style="color:#fff;padding:24px;font-family:sans-serif">' + STRINGS.noCourse + "</p>";
    return;
  }
  var L = C.lessons;
  var N = L.length;
  L.forEach(function (l, i) { if (!l.id) l.id = "lezione-" + (i + 1); if (!l.type) l.type = "html"; });

  var NAV = C.navigation === "libera" ? "libera" : "vincolata";
  var DEV = /[?&]dev=0(&|$)/.test(location.search) ? false : (/[?&]dev=1(&|$)/.test(location.search) || C.dev === true);
  var RATES = [0.75, 1, 1.25, 1.5, 2];
  var PAGE_TIMEOUT = 8000;
  var TOAST_MS = 3500;
  var TYPE_ICON = { video: "tipo-video", html: "tipo-interattiva", quiz: "tipo-quiz", final: "tipo-conclusione" };
  var overlayQuery = window.matchMedia("(max-width: 1023px)");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Utilità ---------- */
  function $(id) { return document.getElementById(id); }
  function t(key, vars) {
    var v = key.split(".").reduce(function (o, k) { return o && o[k]; }, STRINGS);
    if (typeof v !== "string") return key;
    return v.replace(/\{(\w+)\}/g, function (m, k) { return vars && vars[k] != null ? vars[k] : m; });
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(id, cls) { return '<svg class="icon ' + (cls || "") + '" aria-hidden="true"><use href="#' + id + '"></use></svg>'; }
  function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }
  function fmtDuration(sec) {
    var m = Math.round((sec || 0) / 60);
    if (m < 60) return m + " min";
    return Math.floor(m / 60) + " h " + (m % 60) + " min";
  }
  function rateLabel(r) { return String(r).replace(".", ",") + "×"; }
  function setBar(el, p) { el.style.width = p + "%"; }
  function isOverlay() { return overlayQuery.matches; }

  /* ---------- Stato e salvataggio ---------- */
  var store = window.PlayerStorage.create(C.id || C.title || "corso");
  var saved = store.load() || {};
  var S = {
    status: saved.status || {},                 // id lezione -> "visited" | "done" | "failed"
    idx: Math.max(0, L.findIndex(function (l) { return l.id === saved.location; })),
    time: saved.time || 0,
    prefs: Object.assign({ volume: 0.8, muted: false, rate: 1 }, saved.prefs || {}),
    menuOpen: false,
    menuPref: saved.menuOpen,                   // preferenza del menu su desktop (non toccata dal mobile)
    devPanel: window.innerWidth >= 1024,        // pannello sviluppo aperto all'avvio solo su desktop
    screen: "cover"
  };
  var noSaveWarned = false;

  function save() {
    var ok = store.save({
      v: 1, status: S.status, location: L[S.idx].id, time: Math.round(S.time),
      prefs: S.prefs, menuOpen: S.menuPref
    });
    if (!ok) warnNoSave();
    renderDev();
  }
  function warnNoSave() {
    if (noSaveWarned) return;
    noSaveWarned = true;
    toast("warn", t("toastNoSave"), t("toastNoSaveSub"), true);
  }

  function st(i) { return S.status[L[i].id]; }
  function isDone(i) { return st(i) === "done"; }
  function unlocked(i) { return DEV || NAV === "libera" || i === 0 || isDone(i - 1); }
  function doneCount() { var n = 0; for (var i = 0; i < N; i++) if (isDone(i)) n++; return n; }
  function pct() { return Math.round(doneCount() / N * 100); }
  function anyProgress() { return Object.keys(S.status).length > 0; }
  function completeRule(l) {
    var c = l.complete || {};
    return { on: c.on || (l.type === "video" ? "media-end" : "visit"), threshold: c.threshold || 0.95 };
  }
  function resourcesFor(i) { return (C.resources || []).concat(L[i].resources || []); }
  function statusOf(i) {
    var s = st(i);
    if (s === "failed") return "failed";
    if (s === "done") return "done";
    if (!unlocked(i)) return "locked";
    if (i === S.idx) return "current";
    if (s === "visited") return "visited";
    return "todo";
  }

  /* ---------- Schermate ---------- */
  function show(name) {
    S.screen = name;
    $("cover").hidden = name !== "cover";
    $("player").hidden = name !== "player";
    $("final").hidden = name !== "final";
    renderDevPanel();
    if (name !== "player") { closeTransient(); }
  }

  function totalMinutes() {
    return L.reduce(function (a, l) { var m = parseInt(l.duration, 10); return a + (isNaN(m) ? 0 : m); }, 0);
  }

  function renderCover() {
    $("coverTitle").textContent = C.title;
    $("coverDesc").textContent = C.description || "";
    $("coverDesc").hidden = !C.description;
    var mins = totalMinutes();
    $("coverMeta").textContent = t("lessonsCount", { n: N }) + (mins ? " · " + t("aboutMinutes", { n: mins }) : "");
    var resume = anyProgress();
    $("coverProgress").hidden = !resume;
    if (resume) { $("coverPct").textContent = pct() + "%"; setBar($("coverBar"), pct()); }
    $("startBtn").innerHTML = "<span>" + esc(resume ? t("resume", { title: L[S.idx].title }) : t("start")) + "</span>" + icon("avanti");
    $("restartBtn").hidden = !resume;
    $("coverList").innerHTML = L.map(function (l, i) {
      var dot = isDone(i)
        ? '<span class="dot dot-done">' + icon("completata") + "</span>"
        : '<span class="dot">' + (i + 1) + "</span>";
      return '<li class="cover-item">' + dot + '<span class="ci-title">' + esc(l.title) + '</span><span class="ci-dur">' + esc(l.duration || "") + "</span></li>";
    }).join("");
  }

  function enterPlayer(i) {
    show("player");
    if (!store.ok) warnNoSave();
    applyMenu();
    goTo(i, { force: true });
    requestAnimationFrame(scaleStage);
  }

  function finishCourse() {
    if (doneCount() < N) {
      toast("warn", t("toastIncomplete"), t("toastIncompleteSub", { n: N - doneCount() }));
      return;
    }
    clearStage();
    save();
    show("final");
    $("finalText").textContent = t("finalText", { n: N, title: C.title });
    $("fStatPct").textContent = pct() + "%";
    $("fStatLessons").textContent = doneCount() + "/" + N;
    $("fStatTime").textContent = fmtDuration(S.time);
    if (C.certificate) { $("certBtn").href = C.certificate; $("certBtn").hidden = false; }
    else $("certBtn").hidden = true;
    buildConfetti();
    $("finalTitle").focus();
  }

  function buildConfetti() {
    var box = $("confetti");
    box.innerHTML = "";
    if (reduceMotion) return;
    var cols = ["var(--color-accent-on-dark)", "var(--color-accent)", "#FFFFFF", "#9FB1CC"];
    var html = "";
    for (var k = 0; k < 36; k++) {
      html += '<i style="left:' + ((k * 37 + 11) % 100) + "%;width:" + (6 + (k % 3) * 2) + "px;background:" + cols[k % 4] +
        ";animation-delay:-" + ((k * 0.73) % 7).toFixed(2) + "s;animation-duration:" + (5.5 + (k % 5) * 0.7).toFixed(1) + 's"></i>';
    }
    box.innerHTML = html;
  }

  /* ---------- Navigazione ---------- */
  function goTo(i, opts) {
    opts = opts || {};
    if (i < 0 || i >= N) return;
    if (!opts.force && !unlocked(i)) return;
    S.idx = i;
    if (!S.status[L[i].id]) S.status[L[i].id] = "visited";
    if (isOverlay() && S.menuOpen) setMenu(false, false);
    loadLesson();
    renderAll();
    save();
    announce(t("announce", { n: i + 1, t: N, title: L[i].title }));
    if (opts.focusStage) $("stageBox").focus({ preventScroll: true });
    if (completeRule(L[i]).on === "visit") complete({ quiet: true });
  }
  function next() {
    var i = S.idx;
    if (i === N - 1) { if (isDone(i)) finishCourse(); return; }
    if ($("nextBtn").disabled) return;
    goTo(i + 1, { force: true });
  }
  function prev() { if (S.idx > 0) goTo(S.idx - 1, { force: true }); }

  function complete(opts) {
    opts = opts || {};
    var i = S.idx, id = L[i].id;
    if (S.status[id] === "done") return;
    var nextWasLocked = i < N - 1 && !unlocked(i + 1);
    S.status[id] = "done";
    save();
    renderAll();
    if (opts.quiet) return;
    if (i < N - 1) {
      toast("done", t("toastDone"), nextWasLocked ? t("toastUnlocked", { title: L[i + 1].title }) : t("toastNextFree"));
    } else {
      toast("done", t("toastLastDone"), t("toastLastSub"));
    }
  }
  function fail() {
    var id = L[S.idx].id;
    if (S.status[id] === "done") return;
    S.status[id] = "failed";
    save();
    renderAll();
    toast("warn", t("toastFailed"), t("toastFailedSub"));
  }

  /* ---------- Rendering del Player ---------- */
  function renderAll() {
    renderHeader();
    renderMenu();
    renderNav();
    renderInfo();
    renderDev();
  }

  function renderHeader() {
    var i = S.idx, p = pct();
    $("hdrCourse").textContent = C.title;
    $("hdrLesson").textContent = t("lessonN", { n: i + 1 }) + " · " + L[i].title;
    setBar($("hdrBar"), p);
    $("hdrPct").textContent = p + "%";
    $("hdrProgress").setAttribute("aria-valuenow", p);
    $("hdrProgress").setAttribute("aria-label", t("progress") + " " + p + "%");
    $("ringArc").setAttribute("stroke-dasharray", (p / 100 * 87.96).toFixed(2) + " 87.96");
    $("ringArc").style.opacity = p ? 1 : 0;
    $("ringTxt").textContent = p;
    $("hdrRing").setAttribute("aria-label", t("progress") + " " + p + "%");
    var nRes = resourcesFor(i).length;
    $("resCount").textContent = nRes;
    $("hmResCount").textContent = nRes;
    $("resBtn").classList.toggle("is-empty", !nRes);
    $("hmRes").classList.toggle("is-empty", !nRes);
  }

  function statusIcon(s) {
    switch (s) {
      case "done": return '<span class="sti sti-done">' + icon("completata") + "</span>";
      case "failed": return '<span class="sti sti-failed">' + icon("avviso") + "</span>";
      case "locked": return '<span class="sti sti-locked">' + icon("bloccata") + "</span>";
      case "current":
      case "visited": return '<span class="sti sti-half"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 4a10 10 0 0 1 0 20z"/></svg></span>';
      default: return '<span class="sti sti-todo"></span>';
    }
  }

  function renderMenu() {
    var focusedIdx = document.activeElement && document.activeElement.closest && document.activeElement.closest(".mi")
      ? document.activeElement.getAttribute("data-i") : null;
    $("menuList").innerHTML = L.map(function (l, i) {
      var s = statusOf(i), cur = i === S.idx, label = t("st." + s);
      var meta = icon(TYPE_ICON[l.type] || "tipo-interattiva", "icon-xs") + esc(t("types." + l.type)) +
        (l.duration ? " · " + esc(l.duration) : "") + " · " + esc(label);
      return '<li><button type="button" class="mi' + (cur ? " is-current" : "") + '" data-i="' + i + '"' +
        (s === "locked" ? " disabled" : "") + (cur ? ' aria-current="page"' : "") +
        ' aria-label="' + esc(t("lessonN", { n: i + 1 }) + ": " + l.title + ", " + label) + '">' +
        statusIcon(s) + '<span class="mi-text"><span class="mi-title">' + (i + 1) + ". " + esc(l.title) +
        '</span><span class="mi-meta mi-' + s + '">' + meta + "</span></span></button></li>";
    }).join("");
    if (focusedIdx != null) {
      var again = $("menuList").querySelector('[data-i="' + focusedIdx + '"]');
      if (again && !again.disabled) again.focus();
    }
    $("menuCount").textContent = t("doneOf", { done: doneCount(), total: N });
    setBar($("menuBar"), pct());
    $("menuPct").textContent = pct() + "%";
    renderTime();
  }
  function renderTime() { $("menuTime").textContent = t("timeInCourse", { t: fmtDuration(S.time) }); }

  function renderNav() {
    var i = S.idx, last = i === N - 1, done = isDone(i);
    var nb = $("nextBtn");
    nb.disabled = last ? !done : (NAV === "vincolata" && !DEV && !done);
    nb.querySelector(".lbl").textContent = last ? t("finish") : t("next");
    nb.classList.toggle("is-highlight", done && (last || !S.status[L[i + 1].id]));
    $("prevBtn").disabled = i === 0;
    $("prevBtn").setAttribute("aria-label", t("prev"));
  }

  function renderInfo() {
    var l = L[S.idx];
    $("infoOver").textContent = t("lessonNofT", { n: S.idx + 1, t: N }) + " · " + t("types." + l.type);
    $("infoTitle").textContent = l.title;
  }

  function renderDevPanel() {
    var open = DEV && S.screen === "player" && S.devPanel;
    $("devPanel").hidden = !open;
    $("devBadge").setAttribute("aria-expanded", String(!!open));
  }
  function renderDev() {
    if (!DEV) return;
    $("devList").innerHTML = L.map(function (l, i) {
      var s = st(i) || "—";
      var col = s === "done" ? "var(--color-accent-text)" : s === "failed" ? "var(--color-warning)" : "var(--color-text-muted)";
      return "<li><span>" + (i + 1) + ". " + esc(l.title) + '</span><code style="color:' + col + '">' + s + "</code></li>";
    }).join("");
  }

  /* ---------- Menu laterale ---------- */
  function setMenu(open, moveFocus) {
    S.menuOpen = open;
    applyMenu();
    if (!isOverlay()) { S.menuPref = open; save(); }
    if (moveFocus) {
      if (open) {
        setTimeout(function () {
          var cur = $("menuList").querySelector(".is-current") || $("menuClose");
          cur.focus();
        }, 60);
      } else {
        $("menuBtn").focus();
      }
    }
  }
  function applyMenu() {
    var open = !!S.menuOpen;
    $("player").classList.toggle("menu-open", open);
    $("scrim").hidden = !(open && isOverlay());
    $("menuBtn").setAttribute("aria-expanded", String(open));
    $("menuBtn").setAttribute("aria-label", t(open ? "closeMenu" : "openMenu"));
    $("menu").inert = !open;
  }

  /* ---------- Stage 16:9 scalato ---------- */
  function scaleStage() {
    var area = $("stageArea");
    var cs = getComputedStyle(area);
    var w = area.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    var h = area.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    if (w <= 0 || h <= 0) return;
    var s = Math.min(w / 1280, h / 720);
    $("stageBox").style.width = Math.floor(1280 * s) + "px";
    $("stageBox").style.height = Math.floor(720 * s) + "px";
    $("stage").style.transform = "scale(" + s + ")";
  }

  /* ---------- Caricamento delle lezioni ---------- */
  var frame = null, readyTimer = null, medias = [], active = null, primary = null, seeking = false;

  function clearStage() {
    medias.forEach(function (m) { m.destroy(); });
    medias = []; active = null; primary = null;
    clearTimeout(readyTimer);
    if (frame) frame.src = "about:blank";
    frame = null;
    $("stage").innerHTML = "";
    closeSheet();
    updateMediaBar();
  }

  function loadLesson() {
    clearStage();
    var l = L[S.idx], stage = $("stage");
    if (l.type === "video") {
      var wrap = document.createElement("div");
      wrap.className = "video-wrap";
      var v = document.createElement("video");
      v.preload = "metadata";
      v.playsInline = true;
      v.setAttribute("playsinline", "");
      v.setAttribute("aria-label", l.title);
      var big = document.createElement("button");
      big.type = "button";
      big.className = "video-bigplay";
      big.setAttribute("aria-label", t("play"));
      big.innerHTML = icon("play");
      wrap.appendChild(v);
      wrap.appendChild(big);
      stage.appendChild(wrap);
      v.addEventListener("error", function () { showError("video"); });
      v.src = l.src;
      var m = addLocal(v);
      big.addEventListener("click", function () { m.play(); });
      v.addEventListener("click", function () { m.toggle(); });
      // iPhone non consente lo schermo intero della pagina, ma sì quello del video
      $("expandBtn").classList.toggle("is-off", !(document.fullscreenEnabled || v.webkitEnterFullscreen));
      v.addEventListener("play", function () { wrap.classList.add("is-playing"); });
      v.addEventListener("pause", function () { wrap.classList.remove("is-playing"); });
    } else {
      var f = document.createElement("iframe");
      f.title = t("iframeTitle", { title: l.title });
      f.setAttribute("allow", "autoplay; fullscreen");
      f.src = l.src;
      stage.appendChild(f);
      frame = f;
      readyTimer = setTimeout(function () { showError("page"); }, PAGE_TIMEOUT);
      $("expandBtn").classList.toggle("is-off", !document.fullscreenEnabled);
      if (l.audio) {
        var a = new Audio();
        a.preload = "metadata";
        a.addEventListener("error", function () {
          removeMedia(na);
          toast("warn", t("toastAudio"), t("toastAudioSub"));
        });
        a.src = l.audio;
        var na = addLocal(a);
      }
    }
    updateMediaBar();
  }

  function showError(kind) {
    clearStage();
    var title = kind === "video" ? t("errVideoTitle") : t("errPageTitle");
    var text = kind === "video" ? t("errVideo") : t("errPage");
    // Un file mancante è un problema del corso, non dello studente: la lezione
    // viene sbloccata per non bloccare tutto il percorso.
    var skip = !isDone(S.idx) && S.idx < N - 1;
    if (skip) { text += " " + t("errVideoSkip"); complete({ quiet: true }); }
    $("stage").innerHTML =
      '<div class="stage-error" role="alert"><div class="stage-error-box">' +
      '<span class="stage-error-ic">' + icon("errore") + "</span>" +
      "<h2>" + esc(title) + "</h2><p>" + esc(text) + "</p>" +
      '<button type="button" class="btn btn-solid" id="retryBtn">' + esc(t("retry")) + "</button></div></div>";
    $("retryBtn").addEventListener("click", function () { loadLesson(); });
  }

  /* ---------- Media: adattatori locali (video/audio del Player) e remoti (dentro la pagina) ---------- */
  function addLocal(el) {
    var handlers = {};
    var m = {
      kind: "local",
      play: function () { var p = el.play(); if (p && p.catch) p.catch(function () {}); },
      pause: function () { el.pause(); },
      toggle: function () { if (el.paused) m.play(); else m.pause(); },
      seek: function (s) { if (isFinite(el.duration)) el.currentTime = Math.max(0, Math.min(el.duration - 0.05, s)); },
      apply: function () { el.volume = S.prefs.volume; el.muted = S.prefs.muted; el.playbackRate = S.prefs.rate; },
      destroy: function () {
        el.pause();
        Object.keys(handlers).forEach(function (ev) { el.removeEventListener(ev, handlers[ev]); });
        el.removeAttribute("src");
        try { el.load(); } catch (e) { /* niente */ }
      },
      get time() { return el.currentTime || 0; },
      get duration() { return isFinite(el.duration) ? el.duration : 0; },
      get paused() { return el.paused; }
    };
    handlers.play = function () { setActive(m); updateMediaBar(); };
    handlers.pause = function () { updateMediaBar(); };
    handlers.timeupdate = function () { updateTimeUI(); checkMediaComplete(m, false); };
    handlers.loadedmetadata = function () { m.apply(); updateTimeUI(); };
    handlers.durationchange = function () { updateTimeUI(); };
    handlers.ended = function () { updateMediaBar(); checkMediaComplete(m, true); };
    Object.keys(handlers).forEach(function (ev) { el.addEventListener(ev, handlers[ev]); });
    m.apply();
    registerMedia(m);
    return m;
  }

  function addRemote(id, info) {
    var m = {
      kind: "remote", id: id, _t: 0, _d: info.duration || 0, _p: true,
      play: function () { send({ type: "player:media-command", id: id, cmd: "play" }); },
      pause: function () { send({ type: "player:media-command", id: id, cmd: "pause" }); },
      toggle: function () { if (m._p) m.play(); else m.pause(); },
      seek: function (s) { send({ type: "player:media-command", id: id, cmd: "seek", value: Math.max(0, s) }); },
      apply: function () { send({ type: "player:media-command", id: id, cmd: "prefs", volume: S.prefs.volume, muted: S.prefs.muted, rate: S.prefs.rate }); },
      destroy: function () {},
      get time() { return m._t; },
      get duration() { return m._d; },
      get paused() { return m._p; }
    };
    m.apply();
    registerMedia(m);
    return m;
  }
  function remoteState(m, d) {
    var wasPaused = m._p;
    m._t = d.time || 0;
    m._d = d.duration || m._d;
    m._p = !!d.paused;
    if (wasPaused && !m._p) setActive(m);
    if (wasPaused !== m._p) updateMediaBar(); else updateTimeUI();
    checkMediaComplete(m, !!d.ended);
  }
  function findRemote(id) { return medias.filter(function (m) { return m.kind === "remote" && m.id === id; })[0]; }

  function registerMedia(m) {
    medias.push(m);
    if (!primary) primary = m;
    if (!active) active = m;
    updateMediaBar();
  }
  function removeMedia(m) {
    if (!m) return;
    m.destroy();
    medias = medias.filter(function (x) { return x !== m; });
    if (primary === m) primary = medias[0] || null;
    if (active === m) active = primary;
    updateMediaBar();
  }
  function setActive(m) {
    active = m;
    medias.forEach(function (o) { if (o !== m && !o.paused) o.pause(); });
  }
  function checkMediaComplete(m, ended) {
    if (m !== primary) return;
    var rule = completeRule(L[S.idx]);
    if (rule.on !== "media-end") return;
    if (ended || (m.duration && m.time / m.duration >= rule.threshold)) complete();
  }
  function applyPrefs() {
    medias.forEach(function (m) { m.apply(); });
    updateMediaBar();
    save();
  }

  function updateMediaBar() {
    var has = medias.length > 0;
    $("mediabar").hidden = !has;
    $("seekLine").hidden = !has;
    if (!has) return;
    if (!active) active = primary || medias[0];
    var playing = !active.paused;
    $("mPlay").innerHTML = icon(playing ? "pausa" : "play");
    $("mPlay").setAttribute("aria-label", t(playing ? "pause" : "play"));
    var muteIcon = icon(S.prefs.muted ? "muto" : "volume");
    var muteLabel = t(S.prefs.muted ? "unmute" : "mute");
    $("mMute").innerHTML = muteIcon; $("mMute").setAttribute("aria-label", muteLabel);
    $("sMute").innerHTML = muteIcon; $("sMute").setAttribute("aria-label", muteLabel);
    var vol = S.prefs.muted ? 0 : Math.round(S.prefs.volume * 100);
    ["mVol", "sVol"].forEach(function (id) { var el = $(id); el.value = vol; el.style.setProperty("--p", vol + "%"); });
    $("mRate").textContent = rateLabel(S.prefs.rate);
    $("mRate").setAttribute("aria-label", t("rate", { r: rateLabel(S.prefs.rate) }));
    $("sRates").innerHTML = RATES.map(function (r) {
      return '<button type="button" class="rate-chip" data-rate="' + r + '" aria-pressed="' + (r === S.prefs.rate) + '">' + rateLabel(r) + "</button>";
    }).join("");
    updateTimeUI();
  }

  function updateTimeUI() {
    if (!active) return;
    var d = active.duration, c = active.time;
    var label = fmt(c) + " / " + fmt(d);
    $("mTime").textContent = label;
    $("sheetTime").textContent = label;
    var p = d ? c / d * 1000 : 0;
    ["mSeek", "mSeekMobile"].forEach(function (id) {
      var el = $(id);
      if (!seeking) el.value = Math.round(p);
      el.style.setProperty("--p", (p / 10) + "%");
      el.setAttribute("aria-valuetext", t("of", { a: fmt(c), b: fmt(d) }));
    });
  }

  function onSeekInput(e) {
    seeking = true;
    e.target.style.setProperty("--p", (e.target.value / 10) + "%");
  }
  function onSeekChange(e) {
    seeking = false;
    if (active && active.duration) active.seek(e.target.value / 1000 * active.duration);
  }
  function onSeekKey(e) {
    if (!active || !active.duration) return;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") { e.preventDefault(); active.seek(active.time - 5); }
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") { e.preventDefault(); active.seek(active.time + 5); }
  }
  function onVolInput(e) {
    var v = e.target.value / 100;
    S.prefs.volume = v;
    S.prefs.muted = v === 0;
    e.target.style.setProperty("--p", e.target.value + "%");
    medias.forEach(function (m) { m.apply(); });
  }
  function cycleRate() {
    var i = RATES.indexOf(S.prefs.rate);
    S.prefs.rate = RATES[(i + 1) % RATES.length];
    applyPrefs();
  }

  /* ---------- Comunicazione con la pagina (bridge) ---------- */
  function send(msg) {
    if (!frame || !frame.contentWindow) return;
    if (DEV) console.log("[player] →", msg);
    // "*" è necessario: da file:// l'origine della pagina è "null".
    frame.contentWindow.postMessage(msg, "*");
  }
  window.addEventListener("message", function (e) {
    if (!frame || e.source !== frame.contentWindow) return;
    var d = e.data;
    if (!d || typeof d.type !== "string" || d.type.indexOf("player:") !== 0) return;
    if (DEV) console.log("[player] ←", d);
    switch (d.type) {
      case "player:ready":
        clearTimeout(readyTimer);
        send({ type: "player:init", lesson: { id: L[S.idx].id, title: L[S.idx].title, status: st(S.idx) || "visited" }, prefs: S.prefs });
        break;
      case "player:complete": complete(); break;
      case "player:status":
        if (d.value === "passed") complete();
        else if (d.value === "failed") fail();
        break;
      case "player:error": showError("page"); break;
      case "player:media": if (d.id && !findRemote(d.id)) addRemote(d.id, d); break;
      case "player:media-state": var m = findRemote(d.id); if (m) remoteState(m, d); break;
      case "player:key": handleKey(d.key); break;
    }
  });

  /* ---------- Toast e annunci ---------- */
  function toast(kind, title, sub, persistent) {
    var box = $("toasts");
    var el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = '<span class="sti ' + (kind === "done" ? "sti-done" : "sti-failed") + '">' + icon(kind === "done" ? "completata" : "avviso") + "</span>" +
      '<span class="toast-text"><b>' + esc(title) + "</b>" + (sub ? "<span>" + esc(sub) + "</span>" : "") + "</span>" +
      (persistent ? '<button type="button" class="ib" aria-label="' + esc(t("close")) + '">' + icon("chiudi") + "</button>" : "");
    box.appendChild(el);
    while (box.children.length > 3) box.removeChild(box.firstChild);
    function remove() { el.classList.add("is-leaving"); setTimeout(function () { el.remove(); }, 250); }
    if (persistent) el.querySelector("button").addEventListener("click", remove);
    else setTimeout(remove, TOAST_MS);
  }
  function announce(msg) {
    var a = $("announcer");
    a.textContent = "";
    setTimeout(function () { a.textContent = msg; }, 60);
  }

  /* ---------- Pannelli: risorse, menu "⋮", controlli media, uscita ---------- */
  function renderResources() {
    var res = resourcesFor(S.idx);
    if (!res.length) { $("resList").innerHTML = '<li class="res-empty">' + esc(t("noResources")) + "</li>"; return; }
    $("resList").innerHTML = res.map(function (r, k) {
      var ext = (String(r.file).split(".").pop() || "").toUpperCase();
      return '<li class="res-item"><span class="res-ic">' + icon("file") + '</span>' +
        '<button type="button" class="res-open" data-k="' + k + '" aria-label="' + esc(t("openPdf", { name: r.title })) + '">' +
        '<span class="res-name">' + esc(r.title) + '</span><span class="res-meta">' + esc(ext + (r.size ? " · " + r.size : "")) + "</span></button>" +
        '<a class="ibd" href="' + esc(r.file) + '" download aria-label="' + esc(t("download", { name: r.title })) + '">' + icon("download") + "</a></li>";
    }).join("");
  }
  function toggleRes(open) {
    var p = $("resPanel");
    open = open == null ? p.hidden : open;
    if (open) { renderResources(); toggleHdr(false); }
    p.hidden = !open;
    $("resBtn").setAttribute("aria-expanded", String(open));
    if (open) { var f = p.querySelector("a, button"); if (f) f.focus(); }
  }
  function toggleHdr(open) {
    var m = $("hdrMenu");
    open = open == null ? m.hidden : open;
    m.hidden = !open;
    $("moreBtn").setAttribute("aria-expanded", String(open));
    if (open) m.querySelector(".hm-item:not(.is-empty)").focus();
  }
  function openSheet() { var s = $("mediaSheet"); if (!s.open) { s.showModal(); $("mMore").setAttribute("aria-expanded", "true"); } }
  function closeSheet() { var s = $("mediaSheet"); if (s.open) s.close(); $("mMore").setAttribute("aria-expanded", "false"); }

  function openExit() {
    closeTransient();
    if (active && !active.paused) active.pause();
    $("exitText").textContent = t(store.ok ? "exitText" : "exitTextNoSave", { title: L[S.idx].title });
    $("exitDialog").showModal();
    $("exitCancel").focus();
  }
  function confirmExit() {
    $("exitDialog").close();
    clearStage();
    save();
    store.finish();
    renderCover();
    show("cover");
    $("startBtn").focus();
  }

  /** Chiude menu "⋮", risorse e menu laterale. Restituisce true se ha chiuso qualcosa. */
  function closeTransient() {
    var closed = false;
    if (!$("hdrMenu").hidden) { toggleHdr(false); $("moreBtn").focus(); closed = true; }
    if (!$("resPanel").hidden) { toggleRes(false); closed = true; }
    if (S.screen === "player" && S.menuOpen && !closed) { setMenu(false, true); closed = true; }
    return closed;
  }

  /* ---------- Schermo intero ---------- */
  function toggleFullscreen() {
    if (!document.fullscreenEnabled) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(function () {});
  }
  function updateFsLabels() {
    var fs = !!document.fullscreenElement;
    var lbl = t(fs ? "exitFullscreen" : "fullscreen");
    if ($("fsBtn")) $("fsBtn").setAttribute("aria-label", lbl);
    if ($("hmFs")) $("hmFs").querySelector("span").textContent = lbl;
    $("expandLbl").textContent = t(fs ? "shrink" : "expand");
    if (!fs && screen.orientation && screen.orientation.unlock) { try { screen.orientation.unlock(); } catch (e) { /* niente */ } }
  }

  /** Smartphone: schermo intero e, dove il browser lo consente, orientamento orizzontale. */
  function expandStage() {
    if (document.fullscreenElement) { document.exitFullscreen(); return; }
    if (document.fullscreenEnabled) {
      document.documentElement.requestFullscreen().then(function () {
        if (screen.orientation && screen.orientation.lock) screen.orientation.lock("landscape").catch(function () {});
      }).catch(function () {});
      return;
    }
    var v = $("stage").querySelector("video");
    if (v && v.webkitEnterFullscreen) v.webkitEnterFullscreen();
  }

  /* ---------- Visualizzatore PDF ---------- */
  function isPdf(file) { return /\.pdf($|[?#])/i.test(String(file)); }
  function openResource(r) {
    // Su smartphone i browser non mostrano i PDF dentro la pagina: si apre una nuova scheda.
    if (!isPdf(r.file) || window.matchMedia("(max-width: 767px), (pointer: coarse)").matches) {
      window.open(r.file, "_blank", "noopener");
      return;
    }
    toggleRes(false);
    $("pdfTitle").textContent = r.title;
    $("pdfFrame").title = r.title;
    $("pdfFrame").src = r.file;
    $("pdfNewTab").href = r.file;
    $("pdfDownload").href = r.file;
    $("pdfDialog").showModal();
    $("pdfClose").focus();
  }
  function closePdf() {
    $("pdfDialog").close();
  }

  /* ---------- Tastiera ---------- */
  function handleKey(key) {
    if (S.screen !== "player") return false;
    if ($("exitDialog").open || $("mediaSheet").open || $("pdfDialog").open) return false;
    switch (key) {
      case "ArrowLeft": prev(); return true;
      case "ArrowRight": next(); return true;
      case " ": case "Spacebar": if (active) { active.toggle(); return true; } return false;
      case "m": case "M": setMenu(!S.menuOpen, true); return true;
      case "f": case "F": toggleFullscreen(); return true;
      case "Escape": return closeTransient();
    }
    return false;
  }

  function trapFocus(container, e) {
    var items = Array.prototype.filter.call(
      container.querySelectorAll("button:not([disabled]), a[href], input, [tabindex]:not([tabindex='-1'])"),
      function (el) { return el.offsetParent !== null; });
    if (!items.length) return;
    var first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Collegamento degli eventi ---------- */
  function bind() {
    $("startBtn").addEventListener("click", function () { enterPlayer(anyProgress() ? S.idx : 0); });
    $("restartBtn").addEventListener("click", function () {
      S.status = {}; S.time = 0; S.idx = 0; save(); enterPlayer(0);
    });

    $("menuBtn").addEventListener("click", function () { setMenu(!S.menuOpen, true); });
    $("menuClose").addEventListener("click", function () { setMenu(false, true); });
    $("scrim").addEventListener("click", function () { setMenu(false, true); });
    $("menuList").addEventListener("click", function (e) {
      var b = e.target.closest(".mi");
      if (b && !b.disabled) goTo(+b.getAttribute("data-i"), { focusStage: isOverlay() });
    });
    $("menu").addEventListener("keydown", function (e) { if (e.key === "Tab" && isOverlay()) trapFocus($("menu"), e); });
    overlayQuery.addEventListener("change", function () {
      S.menuOpen = isOverlay() ? false : S.menuPref !== false;
      applyMenu();
    });

    $("prevBtn").addEventListener("click", prev);
    $("nextBtn").addEventListener("click", next);

    $("mPlay").addEventListener("click", function () { if (active) active.toggle(); });
    $("mReplay").addEventListener("click", function () { if (active) { active.seek(0); active.play(); } });
    $("mBack").addEventListener("click", function () { if (active) active.seek(active.time - 10); });
    $("mFwd").addEventListener("click", function () { if (active) active.seek(active.time + 10); });
    $("mMute").addEventListener("click", function () { S.prefs.muted = !S.prefs.muted; applyPrefs(); });
    $("mRate").addEventListener("click", cycleRate);
    $("mMore").addEventListener("click", openSheet);
    ["mSeek", "mSeekMobile"].forEach(function (id) {
      $(id).addEventListener("input", onSeekInput);
      $(id).addEventListener("change", onSeekChange);
      $(id).addEventListener("keydown", onSeekKey);
    });
    ["mVol", "sVol"].forEach(function (id) {
      $(id).addEventListener("input", onVolInput);
      $(id).addEventListener("change", applyPrefs);
    });

    $("sBack").addEventListener("click", function () { if (active) active.seek(active.time - 10); });
    $("sFwd").addEventListener("click", function () { if (active) active.seek(active.time + 10); });
    $("sReplay").addEventListener("click", function () { if (active) { active.seek(0); active.play(); } closeSheet(); });
    $("sMute").addEventListener("click", function () { S.prefs.muted = !S.prefs.muted; applyPrefs(); });
    $("sRates").addEventListener("click", function (e) {
      var b = e.target.closest(".rate-chip");
      if (b) { S.prefs.rate = parseFloat(b.getAttribute("data-rate")); applyPrefs(); }
    });
    $("mediaSheet").addEventListener("click", function (e) { if (e.target === $("mediaSheet")) closeSheet(); });
    $("mediaSheet").addEventListener("close", function () { $("mMore").setAttribute("aria-expanded", "false"); });

    $("resBtn").addEventListener("click", function () { toggleRes(); });
    $("resClose").addEventListener("click", function () { toggleRes(false); $("resBtn").focus(); });
    $("moreBtn").addEventListener("click", function () { toggleHdr(); });
    $("hmRes").addEventListener("click", function () { toggleRes(true); });
    $("hmFs").addEventListener("click", function () { toggleHdr(false); toggleFullscreen(); });
    $("hmExit").addEventListener("click", openExit);
    $("exitBtn").addEventListener("click", openExit);
    $("exitCancel").addEventListener("click", function () { $("exitDialog").close(); });
    $("exitConfirm").addEventListener("click", confirmExit);
    $("exitDialog").addEventListener("click", function (e) { if (e.target === $("exitDialog")) $("exitDialog").close(); });

    $("resList").addEventListener("click", function (e) {
      var b = e.target.closest(".res-open");
      if (b) openResource(resourcesFor(S.idx)[+b.getAttribute("data-k")]);
    });
    $("pdfClose").addEventListener("click", closePdf);
    $("pdfDialog").addEventListener("click", function (e) { if (e.target === $("pdfDialog")) closePdf(); });
    $("pdfDialog").addEventListener("close", function () { $("pdfFrame").src = "about:blank"; });
    $("expandBtn").addEventListener("click", expandStage);
    $("devBadge").addEventListener("click", function () { S.devPanel = !S.devPanel; renderDevPanel(); });

    $("fsBtn").addEventListener("click", toggleFullscreen);
    document.addEventListener("fullscreenchange", updateFsLabels);
    if (!document.fullscreenEnabled) { $("fsBtn").remove(); $("hmFs").remove(); }

    $("reviewBtn").addEventListener("click", function () { enterPlayer(0); });

    $("devReset").addEventListener("click", function () {
      S.status = {}; S.time = 0;
      goTo(0, { force: true });
      toast("warn", t("devResetDone"), t("devResetSub"));
    });

    document.addEventListener("click", function (e) {
      if (!$("resPanel").hidden && !e.target.closest("#resPanel, #resBtn, #hdrMenu")) toggleRes(false);
      if (!$("hdrMenu").hidden && !e.target.closest("#hdrMenu, #moreBtn")) toggleHdr(false);
    });

    document.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      var tg = e.target;
      var typing = tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName));
      if (typing && e.key !== "Escape") return;
      if (e.key === " " && tg && /^(BUTTON|A|SUMMARY)$/.test(tg.tagName)) return;
      if (handleKey(e.key)) e.preventDefault();
    });

    if (window.ResizeObserver) new ResizeObserver(scaleStage).observe($("stageArea"));
    window.addEventListener("resize", scaleStage);
    window.addEventListener("pagehide", save);
    document.addEventListener("visibilitychange", function () { if (document.hidden) save(); });
  }

  /* ---------- Avvio ---------- */
  function fillStrings() {
    document.querySelectorAll("[data-t]").forEach(function (el) { el.textContent = t(el.getAttribute("data-t")); });
    document.querySelectorAll("[data-t-label]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-t-label"))); });
  }
  function applyTheme() {
    var th = C.theme || {};
    Object.keys(th).forEach(function (k) { document.documentElement.style.setProperty(k, th[k]); });
  }

  function init() {
    document.title = C.title;
    if (C.lang) document.documentElement.lang = C.lang;
    applyTheme();
    fillStrings();
    bind();
    if (S.menuPref == null) S.menuPref = window.innerWidth >= 1280;
    S.menuOpen = isOverlay() ? false : S.menuPref;
    $("devBadge").hidden = !DEV;
    if (S.idx > 0 && !unlocked(S.idx)) S.idx = 0;
    renderCover();
    show("cover");
    setInterval(function () {
      if (S.screen !== "player" || document.hidden) return;
      S.time += 1;
      if (S.time % 15 === 0) { save(); renderTime(); }
    }, 1000);
  }

  init();
})();
