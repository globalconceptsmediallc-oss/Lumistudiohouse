/* Lumi Studio — shared nav + cache-busting */
(() => {
  const VERSION = "20260303";

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

  function injectNav() {
    const nav = document.querySelector("[data-nav]");
    if (!nav) return;

    const ul = document.createElement("ul");
    const path = location.pathname.endsWith("/") ? "/index.html" : location.pathname;

    navItems.forEach(item => {
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
    document.querySelectorAll('link[rel="stylesheet"]').forEach(l => {
      l.href = withV(l.getAttribute("href"));
    });
    document.querySelectorAll('script[src]').forEach(s => {
      s.src = withV(s.getAttribute("src"));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    injectNav();
    bustAssets();
  });
})();
