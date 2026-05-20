const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const header = document.querySelector("[data-header]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const watchedSections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".site-nav a")];

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-35% 0px -55% 0px", threshold: [0.15, 0.35, 0.6] }
);

watchedSections.forEach((section) => observer.observe(section));

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
});

const form = document.querySelector("[data-contact-form]");

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const topic = String(data.get("topic") || "Mutare.biz business help").trim();
  const message = String(data.get("message") || "").trim();

  const body = [
    name ? `Name: ${name}` : "",
    `Topic: ${topic}`,
    "",
    message || "Hi Mutare.biz, I would like help with this."
  ]
    .filter(Boolean)
    .join("\n");

  const mailto = new URL("mailto:hello@mutare.biz");
  mailto.searchParams.set("subject", topic);
  mailto.searchParams.set("body", body);

  window.location.href = mailto.toString();
});
