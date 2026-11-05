/* =========================================================================
   Salvataggio dei progressi.
   Oggi: localStorage. In futuro: un adattatore SCORM 1.2 con la stessa
   interfaccia (load, save, clear, finish, ok, kind).
   ========================================================================= */
(function () {
  "use strict";

  function LocalStore(courseId) {
    this.key = "player:" + courseId;
    this.kind = "local";
    this.ok = false;
    try {
      var probe = "__player_probe__";
      window.localStorage.setItem(probe, "1");
      window.localStorage.removeItem(probe);
      this.ok = true;
    } catch (e) {
      this.ok = false; // file:// in alcuni browser, navigazione privata, cookie bloccati
    }
  }

  LocalStore.prototype.load = function () {
    if (!this.ok) return null;
    try { return JSON.parse(window.localStorage.getItem(this.key) || "null"); }
    catch (e) { return null; }
  };

  LocalStore.prototype.save = function (data) {
    if (!this.ok) return false;
    try { window.localStorage.setItem(this.key, JSON.stringify(data)); return true; }
    catch (e) { return false; }
  };

  LocalStore.prototype.clear = function () {
    if (!this.ok) return;
    try { window.localStorage.removeItem(this.key); } catch (e) { /* niente */ }
  };

  LocalStore.prototype.finish = function () { /* nulla da chiudere in locale */ };

  window.PlayerStorage = {
    create: function (courseId) {
      // Punto di aggancio per SCORM 1.2: se viene trovata l'API dell'LMS,
      // qui si restituirà un ScormStore con la stessa interfaccia.
      return new LocalStore(courseId);
    }
  };
})();
