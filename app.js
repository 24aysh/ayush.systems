import {
  ABOUT,
  COMMANDS,
  EDUCATION,
  EXPERIENCE,
  PROFILE,
  PROJECTS,
  SKILL_SET,
  SOCIALS,
  TIMELINE,
} from "./data.js";

const $ = (selector) => document.querySelector(selector);
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const append = (parent, ...children) => {
  children.forEach((child) => parent.append(child));
  return parent;
};
const paragraph = (text) => el("p", "", text);
const safeLink = (href) =>
  /^(https?:\/\/|mailto:[^@\s]+@[^@\s]+\.[^@\s]+$)/i.test(href || "")
    ? href
    : null;
const externalLink = (label, href, className = "") => {
  const link = el("a", className, label);
  if (safeLink(href)) {
    link.href = href;
    if (!href.startsWith("mailto:")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }
  return link;
};
function renderProfile() {
  document.title = PROFILE.pageTitle;
  $("meta[name='description']").content = PROFILE.metaDescription;
  $("#intro-greeting").textContent = PROFILE.greeting;
  $("#profile-name").textContent = PROFILE.name;
  $("#intro-wave").textContent = PROFILE.wave;
  $("#headline-prefix").textContent = PROFILE.headlinePrefix;
  $("#flip-word").textContent = PROFILE.rotatingWords[0] || "";
  $("#profile-description").replaceChildren(
    ...PROFILE.introParagraphs.map(paragraph),
  );
  const nav = $("#social-links");
  nav.replaceChildren();
  SOCIALS.forEach(({ title, link }) => {
    const item = externalLink("", link);
    item.append(document.createTextNode(`${title} `), el("span", "", "↗"));
    nav.append(item);
  });
  $("#terminal-input").placeholder = PROFILE.terminalPlaceholder;
}
renderProfile();
const addTitle = (parent, title) =>
  parent.append(el("h2", "response-title", title));
const card = (title, subtitle, description, url, tags = []) => {
  const item = el("div", "response-card");
  const heading = el("h3");
  heading.append(
    safeLink(url)
      ? externalLink(title + " ↗", url)
      : document.createTextNode(title),
  );
  item.append(heading);
  if (subtitle) item.append(el("p", "response-meta", subtitle));
  if (description) item.append(paragraph(description));
  if (tags.length) {
    const tagWrap = el("div", "response-tags");
    tags.forEach((tag) => tagWrap.append(el("span", "", tag)));
    item.append(tagWrap);
  }
  if (safeLink(url))
    item.append(externalLink(url.startsWith("mailto:") ? url.slice(7) : url, url, "url"));
  return item;
};
const dateLabel = (value) => {
  const text = String(value || "").trim();
  if (!text || /^present$/i.test(text)) return "Present";
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(text)) return text;
  return new Date(`${text}-01T00:00:00Z`).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

function renderExperience() {
  const list = $("#experience-list");
  const appendBullet = (target, value) => {
    const links = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;
    let start = 0;
    for (const match of value.matchAll(links)) {
      target.append(document.createTextNode(value.slice(start, match.index)));
      target.append(externalLink(match[1], match[2], "experience-inline-link"));
      start = match.index + match[0].length;
    }
    target.append(document.createTextNode(value.slice(start)));
  };

  EXPERIENCE.forEach((item, index) => {
    const cardNode = el("article", "experience-card");
    const head = el("div", "experience-head");
    const logo = el("img", "experience-logo");
    logo.src = item.logo;
    logo.alt = `${item.company} logo`;
    logo.loading = "lazy";
    logo.addEventListener("error", () => {
      const initials = (item.company.match(/\b[A-Z]/g) || [item.company[0]])
        .slice(0, 2)
        .join("");
      logo.replaceWith(
        el("span", "experience-logo experience-logo-fallback", initials),
      );
    });

    const identity = el("div", "experience-identity");
    const company = safeLink(item.link)
      ? externalLink(item.company, item.link, "experience-company")
      : el("span", "experience-company", item.company);
    const dates = `${dateLabel(item.startTime)} – ${dateLabel(item.endTime)}`;
    const meta = el("p", "experience-meta");
    meta.append(
      el("span", "experience-mobile-date", `${dates} · `),
      document.createTextNode(item.location),
    );
    identity.append(company, el("p", "experience-role", item.role), meta);

    const side = el("div", "experience-side");
    const toggle = el("button", "experience-toggle");
    toggle.type = "button";
    toggle.setAttribute(
      "aria-label",
      `${index === 0 ? "Collapse" : "Expand"} ${item.company} description`,
    );
    toggle.setAttribute("aria-expanded", String(index === 0));
    toggle.setAttribute("aria-controls", `experience-detail-${index}`);
    toggle.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
    side.append(el("span", "experience-date", dates), toggle);
    head.append(logo, identity, side);

    const detail = el("div", "experience-detail");
    detail.id = `experience-detail-${index}`;
    detail.hidden = index !== 0;
    const bullets = el("ul");
    item.bullets.forEach((bullet) => {
      const entry = el("li");
      appendBullet(entry, bullet);
      bullets.append(entry);
    });
    const tags = el("div", "experience-tags");
    item.techStack.forEach((tech) => tags.append(el("span", "", tech)));
    detail.append(bullets, tags);
    cardNode.append(head, detail);
    list.append(cardNode);

    toggle.addEventListener("click", () => {
      const shouldExpand = toggle.getAttribute("aria-expanded") !== "true";
      for (const button of list.querySelectorAll(".experience-toggle")) {
        button.setAttribute("aria-expanded", "false");
        button.setAttribute(
          "aria-label",
          button.getAttribute("aria-label").replace(/^Collapse/, "Expand"),
        );
        $(`#${button.getAttribute("aria-controls")}`).hidden = true;
      }
      if (shouldExpand) {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute(
          "aria-label",
          `Collapse ${item.company} description`,
        );
        detail.hidden = false;
      }
    });
  });
}
renderExperience();

function responseFor(command) {
  const response = el("div", "response");
  const list = el("div", "response-list");
  switch (command) {
    case "/about":
      addTitle(response, "About");
      response.append(paragraph(ABOUT.trim().replaceAll("*", "")));
      break;
    case "/projects":
      addTitle(response, `Projects / ${PROJECTS.length}`);
      PROJECTS.forEach((project) =>
        list.append(
          card(
            project.title,
            project.tags.join(" · "),
            project.description,
            project.link || project.github,
          ),
        ),
      );
      response.append(list);
      break;
    case "/achievements":
      addTitle(response, `Achievements / ${TIMELINE.length}`);
      TIMELINE.forEach((item) =>
        list.append(
          card(
            item.title,
            dateLabel(item.timestamp),
            item.description,
            item.link,
          ),
        ),
      );
      response.append(list);
      break;
    case "/education":
      addTitle(response, "Education");
      EDUCATION.forEach((item) =>
        list.append(
          card(
            item.title,
            `${dateLabel(item.startTime)} — ${dateLabel(item.endTime)}`,
            item.description,
            item.link,
          ),
        ),
      );
      response.append(list);
      break;
    case "/socials":
      addTitle(response, "Find me online");
      SOCIALS.forEach((item) =>
        list.append(card(item.terminalTitle || item.title, "", "", item.link)),
      );
      response.append(list);
      break;
    case "/experience":
      addTitle(response, `Experience / ${EXPERIENCE.length}`);
      EXPERIENCE.forEach((item) => {
        const entry = card(
          item.company,
          `${item.role} · ${item.location} · ${dateLabel(item.startTime)} — ${dateLabel(item.endTime)}`,
          "",
          item.link,
          item.techStack,
        );
        const bullets = el("ul");
        item.bullets.forEach((bullet) =>
          bullets.append(
            el("li", "", bullet.replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")),
          ),
        );
        entry.insertBefore(bullets, entry.querySelector(".response-tags"));
        list.append(entry);
      });
      response.append(list);
      break;
    case "/skills":
      addTitle(response, "Skill set");
      response.append(card("Languages", "", "", "", SKILL_SET.languages));
      response.append(card("Technologies", "", "", "", SKILL_SET.technologies));
      break;
    default:
      addTitle(response, "Command not found");
      response.append(paragraph("Type / to browse commands."));
  }
  return response;
}

const input = $("#terminal-input");
const menu = $("#command-menu");
const output = $("#terminal-output");
const body = $("#terminal-body");
const terminalFrame = $(".terminal-frame");
const sendButton = $(".send-button");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
function enableSmoothWheel(pane, desktopOnly = false) {
  let target = 0;
  let frame = 0;
  const cancel = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    target = pane.scrollTop;
  };
  const animate = () => {
    const distance = target - pane.scrollTop;
    if (Math.abs(distance) < 0.5) {
      pane.scrollTop = target;
      frame = 0;
      return;
    }
    pane.scrollTop += distance * 0.2;
    frame = requestAnimationFrame(animate);
  };
  pane.addEventListener("wheel", (event) => {
    if (reduceMotion || (desktopOnly && matchMedia("(max-width: 760px)").matches) || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const maxScroll = pane.scrollHeight - pane.clientHeight;
    if (maxScroll <= 0) return;
    const delta = event.deltaY * (event.deltaMode === 1 ? 20 : event.deltaMode === 2 ? pane.clientHeight : 1);
    event.preventDefault();
    target = Math.min(maxScroll, Math.max(0, (frame ? target : pane.scrollTop) + delta));
    if (!frame) frame = requestAnimationFrame(animate);
  }, { passive: false });
  return cancel;
}

enableSmoothWheel($(".intro-pane"), true);
const cancelTerminalWheel = enableSmoothWheel(body);

let history = [];
let historyIndex = 0;
let selectedMenuIndex = 0;
let visibleCommands = [];
let isResponding = false;
let menuOpen = false;
let menuHideTimer = 0;
let menuOpenFrame = 0;

const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
function keepTerminalAtBottom(update) {
  const nearBottom =
    body.scrollHeight - body.scrollTop - body.clientHeight < 100;
  update();
  if (nearBottom) {
    cancelTerminalWheel();
    body.scrollTop = body.scrollHeight;
  }
}

async function streamNode(source, parent, chunkSize) {
  if (source.nodeType === Node.TEXT_NODE) {
    const text = source.textContent || "";
    const target = document.createTextNode("");
    keepTerminalAtBottom(() => parent.append(target));
    for (let index = 0; index < text.length; index += chunkSize) {
      keepTerminalAtBottom(() => {
        target.textContent += text.slice(index, index + chunkSize);
      });
      await pause(29);
    }
    return;
  }
  const target = source.cloneNode(false);
  keepTerminalAtBottom(() => parent.append(target));
  for (const child of source.childNodes)
    await streamNode(child, target, chunkSize);
}

function setMenuOpen(open) {
  clearTimeout(menuHideTimer);
  cancelAnimationFrame(menuOpenFrame);
  menuOpen = open;
  input.setAttribute("aria-expanded", String(open));
  if (open) {
    menu.hidden = false;
    menu.inert = false;
    if (reduceMotion) menu.classList.add("is-open");
    else menuOpenFrame = requestAnimationFrame(() => menu.classList.add("is-open"));
  } else {
    menu.classList.remove("is-open");
    menu.inert = true;
    if (reduceMotion) menu.hidden = true;
    else menuHideTimer = setTimeout(() => { if (!menuOpen) menu.hidden = true; }, 220);
  }
}

function updateMenuSelection() {
  const items = menu.querySelectorAll(".menu-item");
  items.forEach((button, index) => button.classList.toggle("active", index === selectedMenuIndex));
  const selected = items[selectedMenuIndex];
  if (!selected) return;
  menu.style.setProperty("--selection-y", `${selected.offsetTop}px`);
  menu.style.setProperty("--selection-height", `${selected.offsetHeight}px`);
  if (selected.offsetTop < menu.scrollTop) {
    menu.scrollTo({ top: selected.offsetTop - 6, behavior: reduceMotion ? "instant" : "smooth" });
  } else if (selected.offsetTop + selected.offsetHeight > menu.scrollTop + menu.clientHeight) {
    menu.scrollTo({ top: selected.offsetTop + selected.offsetHeight - menu.clientHeight + 6,
      behavior: reduceMotion ? "instant" : "smooth" });
  }
}

function renderMenu() {
  const value = input.value.trim().toLowerCase();
  visibleCommands = value.startsWith("/")
    ? COMMANDS.filter((item) => item.name.includes(value))
    : [];
  if (!visibleCommands.length) {
    setMenuOpen(false);
    return;
  }
  selectedMenuIndex = Math.min(selectedMenuIndex, visibleCommands.length - 1);
  menu.replaceChildren();
  menu.scrollTop = 0;
  menu.append(el("div", "menu-highlight"), el("div", "menu-label", "COMMANDS"));
  visibleCommands.forEach((item, index) => {
    const button = el(
      "button",
      "menu-item",
    );
    button.type = "button";
    append(button, el("span", "", item.name), el("span", "", item.description));
    button.addEventListener("click", () => runCommand(item.name));
    button.addEventListener("mouseenter", () => {
      selectedMenuIndex = index;
      updateMenuSelection();
    });
    menu.append(button);
  });
  setMenuOpen(true);
  updateMenuSelection();
}

async function runCommand(value) {
  if (isResponding) return;
  const raw = value.trim();
  if (!raw) return;
  input.value = "";
  setMenuOpen(false);
  history.push(raw);
  historyIndex = history.length;
  const command = raw.toLowerCase();
  isResponding = true;
  input.disabled = true;
  sendButton.disabled = true;
  body.setAttribute("aria-busy", "true");
  if (command === "/clear") {
    output.replaceChildren();
    cancelTerminalWheel();
    body.scrollTop = 0;
    const wasActive = terminalFrame.classList.contains("terminal-active");
    terminalFrame.classList.remove("terminal-active");
    if (wasActive && !reduceMotion) await pause(650);
    isResponding = false;
    input.disabled = false;
    sendButton.disabled = false;
    body.setAttribute("aria-busy", "false");
    input.focus();
    return;
  }
  if (!terminalFrame.classList.contains("terminal-active")) {
    terminalFrame.classList.add("terminal-active");
    if (!reduceMotion) await pause(650);
  }
  const entry = el("div", "terminal-entry");
  const echo = el("div", "command-echo");
  append(echo, el("span", "prompt-symbol", "❯"), el("span", "", raw));
  entry.append(echo);
  keepTerminalAtBottom(() => output.append(entry));

  const thinking = el("div", "thinking-line");
  thinking.setAttribute("role", "status");
  const thought = el("span", "thinking-copy", "Thinking");
  const dots = el("span", "thinking-dots");
  for (let index = 0; index < 3; index++) dots.append(el("i"));
  append(thinking, el("span", "thinking-icon", "✳"), thought, dots);
  keepTerminalAtBottom(() => entry.append(thinking));
  const phrases = ["Thinking", "Connecting the dots", "Preparing response"];
  let phraseIndex = 0;
  const thoughtTimer = reduceMotion
    ? null
    : setInterval(() => {
        phraseIndex = (phraseIndex + 1) % phrases.length;
        thought.textContent = phrases[phraseIndex];
      }, 420);

  try {
    if (!reduceMotion) await pause(760);
    if (thoughtTimer) clearInterval(thoughtTimer);
    thinking.remove();
    const response = responseFor(command);
    if (reduceMotion) {
      keepTerminalAtBottom(() => entry.append(response));
    } else {
      const cursor = el("span", "stream-cursor");
      cursor.setAttribute("aria-hidden", "true");
      const streamedResponse = response.cloneNode(false);
      keepTerminalAtBottom(() => entry.append(streamedResponse, cursor));
      const chunkSize = Math.max(
        12,
        Math.ceil((response.textContent || "").length / 120),
      );
      for (const child of response.childNodes)
        await streamNode(child, streamedResponse, chunkSize);
      cursor.remove();
    }
  } catch {
    thinking.remove();
    entry.append(
      paragraph(
        "Something went wrong while displaying this response. Please try again.",
      ),
    );
  } finally {
    if (thoughtTimer) clearInterval(thoughtTimer);
    isResponding = false;
    input.disabled = false;
    sendButton.disabled = false;
    body.setAttribute("aria-busy", "false");
    input.focus();
  }
}

$("#terminal-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const selectedCommand = menuOpen
    ? visibleCommands[selectedMenuIndex]?.name
    : null;
  runCommand(selectedCommand || input.value);
});
input.addEventListener("input", () => {
  selectedMenuIndex = 0;
  renderMenu();
});
input.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    input.value = "";
    return;
  }
  if (event.key === "ArrowDown" && menuOpen) {
    event.preventDefault();
    selectedMenuIndex = (selectedMenuIndex + 1) % visibleCommands.length;
    updateMenuSelection();
    return;
  }
  if (event.key === "ArrowUp" && menuOpen) {
    event.preventDefault();
    selectedMenuIndex =
      (selectedMenuIndex - 1 + visibleCommands.length) % visibleCommands.length;
    updateMenuSelection();
    return;
  }
  if (event.key === "Tab" && menuOpen) {
    event.preventDefault();
    input.value = visibleCommands[selectedMenuIndex].name;
    setMenuOpen(false);
    return;
  }
  if (
    event.key === "Enter" &&
    !event.isComposing &&
    menuOpen &&
    visibleCommands.length
  ) {
    event.preventDefault();
    runCommand(visibleCommands[selectedMenuIndex].name);
    return;
  }
  if (event.key === "ArrowUp" && history.length) {
    event.preventDefault();
    historyIndex = Math.max(0, historyIndex - 1);
    input.value = history[historyIndex];
  }
  if (event.key === "ArrowDown" && history.length) {
    event.preventDefault();
    historyIndex = Math.min(history.length, historyIndex + 1);
    input.value = historyIndex === history.length ? "" : history[historyIndex];
  }
});
document.addEventListener("keydown", (event) => {
  if (
    !isResponding &&
    event.key === "/" &&
    !event.metaKey &&
    !event.ctrlKey &&
    document.activeElement !== input &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
  ) {
    event.preventDefault();
    input.focus();
    input.value = "/";
    renderMenu();
  }
});
document
  .querySelectorAll("[data-command]")
  .forEach((button) =>
    button.addEventListener("click", () => runCommand(button.dataset.command)),
  );
$("#inline-command")?.addEventListener("click", () => {
  if (isResponding) return;
  input.focus();
  input.value = "/";
  renderMenu();
});

const root = document.documentElement;
const savedTheme = localStorage.getItem("ayush-theme");
if (savedTheme === "light") root.classList.add("light");
function updateThemeButton() {
  const light = root.classList.contains("light");
  const nextTheme = light ? "dark" : "light";
  $("#theme-label").textContent = `Switch to ${nextTheme} mode`;
  $("#theme-toggle").setAttribute("aria-label", `Switch to ${nextTheme} mode`);
  $("#theme-toggle").setAttribute("aria-pressed", String(light));
}
updateThemeButton();
$("#theme-toggle").addEventListener("click", () => {
  const changeTheme = () => {
    root.classList.toggle("light");
    localStorage.setItem(
      "ayush-theme",
      root.classList.contains("light") ? "light" : "dark",
    );
    updateThemeButton();
  };
  if (reduceMotion) {
    changeTheme();
    return;
  }
  if (document.startViewTransition) {
    document.startViewTransition(changeTheme);
    return;
  }
  root.classList.add("theme-changing");
  changeTheme();
  setTimeout(() => root.classList.remove("theme-changing"), 350);
});

if (!reduceMotion) {
  const word = $("#flip-word");
  const words = PROFILE.rotatingWords;
  let index = 0;
  if (words.length > 1) setInterval(() => {
    word.classList.add("out");
    setTimeout(() => {
      index = (index + 1) % words.length;
      word.textContent = words[index];
      word.classList.remove("out");
      word.classList.add("in");
      requestAnimationFrame(() =>
        requestAnimationFrame(() => word.classList.remove("in")),
      );
    }, 260);
  }, 3200);
}

function drawActivity(contributions = null) {
  const grid = $("#chart-grid");
  const months = $("#chart-months");
  grid.replaceChildren();
  months.replaceChildren();
  const today = new Date();
  const end = new Date(
    Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
  );
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - end.getUTCDay() - 52 * 7);
  const byDate = new Map((contributions || []).map((day) => [day.date, day]));
  let lastMonth = -1;
  for (let week = 0; week < 53; week++) {
    const weekDate = new Date(start);
    weekDate.setUTCDate(start.getUTCDate() + week * 7);
    if (weekDate.getUTCMonth() !== lastMonth && week < 52) {
      const label = el(
        "span",
        "",
        weekDate.toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
      );
      label.style.gridColumn = `${week + 1} / span 4`;
      months.append(label);
      lastMonth = weekDate.getUTCMonth();
    }
    for (let day = 0; day < 7; day++) {
      const date = new Date(weekDate);
      date.setUTCDate(weekDate.getUTCDate() + day);
      const key = date.toISOString().slice(0, 10);
      const value = date <= end ? byDate.get(key) : null;
      const cell = el("span", "chart-cell");
      cell.dataset.level = value?.level ?? 0;
      cell.title = value
        ? `${value.count} contributions on ${key}`
        : date <= end
          ? `Activity unavailable for ${key}`
          : "";
      grid.append(cell);
    }
  }
}
drawActivity();
fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(PROFILE.githubUsername)}?y=last`, {
  mode: "cors",
})
  .then((response) => {
    if (!response.ok) throw new Error("GitHub activity unavailable");
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data.contributions))
      throw new Error("Invalid activity data");
    drawActivity(data.contributions);
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    const total = data.contributions
      .filter((day) => day.date >= oneYearAgo.toISOString().slice(0, 10))
      .reduce((sum, day) => sum + day.count, 0);
    $("#chart-status").textContent =
      `${total.toLocaleString()} contributions in the last year`;
  })
  .catch(() => {
    $("#chart-status").textContent =
      "GitHub activity unavailable · view profile ↗";
  });
