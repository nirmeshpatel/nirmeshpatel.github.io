const technicalSkills = [
  { name: "HTML", icon: "fa-brands fa-html5" },
  { name: "CSS", icon: "fa-brands fa-css3-alt" },
  { name: "JavaScript", icon: "fa-brands fa-square-js" },
  { name: "Java", icon: "fa-brands fa-java" },
  { name: "Python", icon: "fa-brands fa-python" },
  { name: "VS Code", icon: "fa-solid fa-code" }
];

const additionalSkills = [
  { name: "Photo Editing", icon: "fa-solid fa-image" },
  { name: "Social Media Management", icon: "fa-solid fa-share-nodes" },
  { name: "Content Writining", icon: "fa-solid fa-pen-nib" }
];

const projects = [
  {
    role: "Timber Volume Calculator",
    period: "Tech: HTML, CSS, JavaScript",
    text: "Designed to solve real-world timber volume calculation and record keeping challenges.",
    link: "https://nirmeshpatel.github.io/timber-volume-calculator/"
  },
  {
    role: "Timetable Management",
    period: "Tech: HTML, CSS, JavaScript",
    text: "Built a web-based timetable management system for organizing academic schedules efficiently.",
    link: "https://nirmeshpatel.github.io/study-planner/"
  },
  {
    role: "Developer Portfolio Website",
    period: "Tech: HTML, CSS, JavaScript",
    text: "Designed and developed a personal portfolio website to showcase projects, skills, and contact information.",
    link: "https://nirmeshpatel.github.io/"
  }
];

const education = [
  {
    title: "B.Sc. (Hons) in Computer Science & Artificial Intelligence",
    text: "Central University of Andhra Pradesh, Anantapur, Andhra Pradesh -515701<br>Year: 2024 - 2028 (Expected) "
  },
  {
    title: "Intermediate (80% Marks)",
    text: "BAHAR SINGH SRINET I C INDUPUR DEORIA<br>Year: 2020 - 2021"
  },
  {
    title: "High School (81.16% Marks)",
    text: "S S S S I C JAWAHAR NAGAR BANKI DEORIA<br>Year: 2018 - 2019"
  }
];

const languages = ["English", "Hindi"];
const THEME_KEY = "resume-site-theme";

function renderChips(id, items) {
  const root = document.getElementById(id);
  root.innerHTML = items
    .map((item) => {
      if (typeof item === "string") {
        return `<span class="chip">${item}</span>`;
      }
      return `<span class="chip"><i class="chip-icon ${item.icon}" aria-hidden="true"></i>${item.name}</span>`;
    })
    .join("");
}

function renderCards(id, items) {
  const root = document.getElementById(id);
  root.innerHTML = items
    .map((item) => `<article class="card"><h3>${item.title}</h3><p>${item.text}</p></article>`)
    .join("");
}

function renderTimeline(id, items) {
  const root = document.getElementById(id);
  root.innerHTML = items
    .map(
      (item) =>
        `<article class="item"><h3>${item.role}</h3><span>${item.period}</span><p>${item.text}</p>${item.link ? `<a class="project-view-btn" href="${item.link}" target="_blank" rel="noreferrer">View</a>` : ""}</article>`
    )
    .join("");
}

function setupMenu() {
  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("navMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (event) => {
    if (!menu.classList.contains("open")) return;
    if (menu.contains(event.target) || btn.contains(event.target)) return;
    menu.classList.remove("open");
    btn.setAttribute("aria-expanded", "false");
  });
}

function setupReveal() {
  const sections = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.15 }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupTyping() {
  const lines = [
    "Computer Science & AI Student",
    "Building clean and practical projects",
    "Focused on growth, learning, and innovation"
  ];

  const el = document.getElementById("typingText");
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;
  const stepDelay = 120;
  const holdDelay = 2200;

  function tick() {
    const current = lines[lineIndex];
    el.textContent = current.slice(0, charIndex);
    let nextDelay = stepDelay;

    if (!deleting && charIndex < current.length) {
      charIndex += 1;
      setTimeout(tick, nextDelay);
      return;
    }

    if (!deleting && charIndex === current.length) {
      deleting = true;
      nextDelay = holdDelay;
      setTimeout(tick, nextDelay);
      return;
    }

    if (deleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(tick, nextDelay);
      return;
    }

    deleting = false;
    lineIndex = (lineIndex + 1) % lines.length;
    setTimeout(tick, nextDelay);
  }

  tick();
}

function setupThemeToggle() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  function applyTheme(theme) {
    const dark = theme === "dark";
    document.body.classList.toggle("theme-dark", dark);
    btn.innerHTML = dark ? "&#9728;" : "&#9790;";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    btn.title = dark ? "Switch to light mode" : "Switch to dark mode";
  }

  const savedTheme = localStorage.getItem(THEME_KEY);
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  btn.addEventListener("click", () => {
    const darkNow = document.body.classList.contains("theme-dark");
    const nextTheme = darkNow ? "light" : "dark";
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

renderChips("technicalSkillsList", technicalSkills);
renderChips("additionalSkillsList", additionalSkills);
renderTimeline("projectsList", projects);
renderCards("educationList", education);
renderChips("languageList", languages);
setupThemeToggle();
setupMenu();
setupReveal();
setupTyping();
document.getElementById("year").textContent = new Date().getFullYear();
