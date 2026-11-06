(() => {
  const root = document.documentElement;
  const switchButtons = document.querySelectorAll(".mode-switch button, button.text-link[data-mode]");
  const heroLight = document.querySelector(".hero__img--light");
  const heroDark = document.querySelector(".hero__img--dark");
  const copyNodes = document.querySelectorAll("[data-copy]");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector("#mobile-nav");

  const setMode = (mode) => {
    if (mode !== "light" && mode !== "dark") return;
    root.dataset.mode = mode;

    document.querySelectorAll(".mode-switch button").forEach((btn) => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (heroLight && heroDark) {
      heroLight.classList.toggle("is-active", mode === "light");
      heroDark.classList.toggle("is-active", mode === "dark");
    }

    copyNodes.forEach((node) => {
      const show = node.dataset.copy === mode;
      node.hidden = !show;
    });
  };

  switchButtons.forEach((btn) => {
    btn.addEventListener("click", () => setMode(btn.dataset.mode));
  });

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", () => {
      const open = mobileNav.hasAttribute("hidden");
      if (open) mobileNav.removeAttribute("hidden");
      else mobileNav.setAttribute("hidden", "");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.setAttribute("hidden", "");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  setMode(root.dataset.mode || "light");
})();
