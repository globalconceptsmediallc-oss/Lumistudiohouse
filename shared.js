/* Lumi Studio — shared nav + safe cache-busting */
(() => {
  const VERSION = "20260304";

  const navItems = [
    { href: "/index.html", label: "Home" },
    { href: "/studio.html", label: "Studio" },
    { href: "/lumi-and-friends.html", label: "Lumi & Friends" },
    { href: "/stories.html", label: "Stories" },
    { href: "/journal.html", label: "Journal" },
    { href: "/contact.html", label: "Contact" }
  ];

  function withV(url) {
    if (!url) return url;
    if (url.includes("?v=")) return url;
    const join = url.includes("?") ? "&" : "?";
    return url + join + "v=" + VERSION;
  }

  function normalizePath(p) {
    if (!p) return "/index.html";
    if (p.endsWith("/")) return "/index.html";
    return p;
  }

  function injectNav() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;

    // Prevent duplicates if script runs twice
    nav.innerHTML = "";

    const ul = document.createElement("ul");
    const path = normalizePath(location.pathname);

    navItems.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;

      if (path === item.href || (path === "/" && item.href === "/index.html")) {
        a.classList.add("active");
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
  }

  function bustAssets() {
    // Bust stylesheets (safe)
    document.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
      const href = l.getAttribute("href");
      if (!href) return;
      l.href = withV(href);
    });

    // Bust other scripts, but DO NOT touch shared.js (the script currently running)
    document.querySelectorAll("script[src]").forEach((s) => {
      const src = s.getAttribute("src");
      if (!src) return;

      // Skip this file to avoid reload loops / timing issues
      if (src.includes("/shared.js")) return;

      s.src = withV(src);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectNav();
    bustAssets();
  });
})();
