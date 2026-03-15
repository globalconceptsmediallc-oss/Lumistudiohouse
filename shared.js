/* Lumi Studio — shared nav + footer + safe cache-busting */
(() => {
  const VERSION = "20260314";

  const navItems = [
    { href: "/index.html", label: "Home" },
    { href: "/lumi-and-friends.html", label: "Lumi & Friends" },
    { href: "/characters.html", label: "Characters" },
    { href: "/stories.html", label: "Stories" },
    { href: "/journal.html", label: "Journal" },
    { href: "/studio.html", label: "Studio" },
    { href: "/contact.html", label: "Contact" }
  ];

  const footerItems = [
    { href: "/parents.html", label: "Educators" },
    { href: "/coloring.html", label: "Coloring Pages" },
    { href: "/shop.html", label: "Shop" },
    { href: "/privacy.html", label: "Privacy" }
  ];

  function withV(url) {
    if (!url) return url;
    if (url.includes("?v=")) return url;
    const join = url.includes("?") ? "&" : "?";
    return url + join + "v=" + VERSION;
  }

  function normalizePath(p) {
    if (!p || p === "/") return "/index.html";
    if (p.endsWith("/")) return p + "index.html";
    return p;
  }

  function isCharactersSection(path) {
    return path === "/characters.html" || path.startsWith("/characters/");
  }

  function injectNav() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;

    nav.innerHTML = "";

    const ul = document.createElement("ul");
    const path = normalizePath(location.pathname);

    navItems.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;

      if (
        path === item.href ||
        (item.href === "/characters.html" && isCharactersSection(path))
      ) {
        a.classList.add("active");
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
  }

  function injectFooter() {
    const footerNav = document.querySelector("[data-footer-nav]");
    if (!footerNav) return;

    footerNav.innerHTML = "";

    const ul = document.createElement("ul");

    footerItems.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.href;
      a.textContent = item.label;

      li.appendChild(a);
      ul.appendChild(li);
    });

    footerNav.appendChild(ul);
  }

  function bustAssets() {
    document.querySelectorAll('link[rel="stylesheet"]').forEach((l) => {
      const href = l.getAttribute("href");
      if (!href) return;
      l.href = withV(href);
    });

    document.querySelectorAll("script[src]").forEach((s) => {
      const src = s.getAttribute("src");
      if (!src) return;

      if (
        src.includes("/shared.js") ||
        src === "shared.js" ||
        src === "./shared.js" ||
        src === "../shared.js"
      ) {
        return;
      }

      s.src = withV(src);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectNav();
    injectFooter();
    bustAssets();
  });
})();
