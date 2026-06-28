(function () {
  try {
    var k = "growrix-os-theme";
    var s = localStorage.getItem(k);
    if (s !== "light" && s !== "dark") {
      for (var i = 0, l = ["growrix-theme", "signal-theme"]; i < l.length; i++) {
        var v = localStorage.getItem(l[i]);
        if (v === "light" || v === "dark") {
          s = v;
          break;
        }
      }
    }
    document.documentElement.setAttribute("data-theme", s === "light" ? "light" : "dark");
  } catch {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();
