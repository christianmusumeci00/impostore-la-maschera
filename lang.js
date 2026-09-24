/* Selettore di lingua (italiano / inglese) delle pagine di Impostore: La Maschera.
   La lingua iniziale la sceglie lo script in <head>: ?lang= nell'indirizzo,
   poi l'ultima scelta salvata, poi la lingua del browser. */
(function () {
  var root = document.documentElement;
  var titles = {
    it: root.getAttribute("data-title-it"),
    en: root.getAttribute("data-title-en")
  };

  function apply(lang) {
    root.setAttribute("data-lang-current", lang);
    root.lang = lang;
    if (titles[lang]) document.title = titles[lang];
    var buttons = document.querySelectorAll("[data-set-lang]");
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute("data-set-lang") === lang;
      buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function choose(lang) {
    apply(lang);
    try { localStorage.setItem("impostore-lang", lang); } catch (e) {}
    try {
      var url = new URL(window.location.href);
      url.searchParams.set("lang", lang);
      window.history.replaceState(null, "", url.toString());
    } catch (e) {}
  }

  document.addEventListener("click", function (event) {
    var target = event.target;
    var button = target && target.closest ? target.closest("[data-set-lang]") : null;
    if (button) choose(button.getAttribute("data-set-lang"));
  });

  apply(root.getAttribute("data-lang-current") === "en" ? "en" : "it");
})();
