/* =========================================================================
   Bridge pagina ↔ Player.
   Da includere in ogni pagina di contenuto:
     <script src="../../player/player-bridge.js"></script>
   Poi, nella pagina:
     player.complete()                  lezione completata
     player.setStatus("passed"|"failed") esito di un quiz
     player.error("messaggio")          mostra l'errore nel Player
     player.registerMedia(elemento)     la barra del Player comanda questo <audio>/<video>
   Comunica solo con postMessage: funziona anche aperto da file://.
   ========================================================================= */
(function () {
  "use strict";

  var parentWin = window.parent !== window ? window.parent : null;
  var medias = {};
  var seq = 0;

  function send(msg) {
    if (parentWin) parentWin.postMessage(msg, "*"); // da file:// l'origine è "null"
    else if (window.console) console.info("[player-bridge] pagina aperta senza Player:", msg);
  }

  var player = {
    lesson: null,
    complete: function () { send({ type: "player:complete" }); },
    setStatus: function (value) { send({ type: "player:status", value: value }); },
    error: function (message) { send({ type: "player:error", message: String(message || "") }); },
    registerMedia: function (el) {
      if (!el) return null;
      if (el.__playerId) return el.__playerId;
      var id = "m" + (++seq);
      el.__playerId = id;
      medias[id] = el;
      var push = function () {
        send({
          type: "player:media-state", id: id,
          time: el.currentTime || 0,
          duration: isFinite(el.duration) ? el.duration : 0,
          paused: el.paused, ended: el.ended
        });
      };
      ["play", "pause", "timeupdate", "ended", "loadedmetadata", "durationchange"].forEach(function (ev) {
        el.addEventListener(ev, push);
      });
      send({ type: "player:media", id: id, duration: isFinite(el.duration) ? el.duration : 0 });
      return id;
    }
  };
  window.player = player;

  window.addEventListener("message", function (e) {
    if (!parentWin || e.source !== parentWin) return;
    var d = e.data;
    if (!d || typeof d.type !== "string") return;
    if (d.type === "player:media-command") {
      var el = medias[d.id];
      if (!el) return;
      switch (d.cmd) {
        case "play": var p = el.play(); if (p && p.catch) p.catch(function () {}); break;
        case "pause": el.pause(); break;
        case "seek": if (isFinite(el.duration)) el.currentTime = Math.min(d.value, el.duration - 0.05); break;
        case "prefs": el.volume = d.volume; el.muted = d.muted; el.playbackRate = d.rate; break;
      }
    } else if (d.type === "player:init") {
      player.lesson = d.lesson;
      document.dispatchEvent(new CustomEvent("player:init", { detail: d }));
    }
  });

  // Inoltra al Player le scorciatoie premute dentro la pagina
  var KEYS = { ArrowLeft: 1, ArrowRight: 1, " ": 1, m: 1, M: 1, f: 1, F: 1, Escape: 1 };
  document.addEventListener("keydown", function (e) {
    if (!KEYS[e.key] || e.ctrlKey || e.metaKey || e.altKey || e.defaultPrevented) return;
    var tg = e.target;
    if (tg && (tg.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(tg.tagName)) && e.key !== "Escape") return;
    if (e.key === " " && tg && /^(BUTTON|A|SUMMARY)$/.test(tg.tagName)) return;
    e.preventDefault();
    send({ type: "player:key", key: e.key });
  });

  function ready() { send({ type: "player:ready" }); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
