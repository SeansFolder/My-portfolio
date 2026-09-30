const typing = document.getElementById("typing");
const phrases = ["initializing developer_profile...", "loading projects...", "status: ready_to_build"];
let pi = 0, ci = 0, deleting = false;

function typeLoop() {
  const word = phrases[pi];
  typing.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
  if (!deleting && ci > word.length + 8) deleting = true;
  if (deleting && ci < 0) {
    deleting = false;
    ci = 0;
    pi = (pi + 1) % phrases.length;
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}

typeLoop();

const terminal = document.getElementById("terminal");
const input = document.getElementById("terminalInput");
const body = document.getElementById("terminalBody");

document.getElementById("terminalToggle").onclick = () => {
  terminal.classList.add("open");
  input.focus();
};

document.getElementById("terminalClose").onclick = () => terminal.classList.remove("open");

const commands = {
  help: `Available commands:\n  about      → about me\n  projects   → featured projects\n  skills     → tech stack\n  github     → open GitHub\n  resume     → download resume\n  contact    → get contact info\n  clear      → clear terminal`,
  about: `Computer Science student graduating in 2026.\nBuilding software, games, web applications, and learning through projects.`,
  projects: `Kitchen Chaos\nCMASS System\nPortfolio Projects`,
  skills: `JavaScript · Python · Java · C#\nReact · Node.js · MySQL · PostgreSQL · Git · GitHub`,
  contact: `rcamarig@usa.edu.ph\nhttps://github.com/rcamarig-boop\nhttps://www.linkedin.com/`,
  github: `https://github.com/rcamarig-boop`,
  resume: `resume.pdf`
};

input.addEventListener("keydown", e => {
  if (e.key !== "Enter") return;

  const cmd = input.value.trim().toLowerCase();
  const line = document.createElement("p");
  line.className = "terminal-output";
  line.textContent = `ralph@portfolio:~$ ${cmd}`;
  body.insertBefore(line, input.parentElement);

  if (cmd === "clear") {
    document.querySelectorAll(".terminal-output").forEach(x => x.remove());
  } else if (cmd === "github") {
    window.open("https://github.com/rcamarig-boop", "_blank", "noopener,noreferrer");
  } else if (cmd === "resume") {
    window.location.href = "resume.pdf";
  } else if (commands[cmd]) {
    const out = document.createElement("p");
    out.className = "terminal-output";
    out.textContent = commands[cmd];
    body.insertBefore(out, input.parentElement);
  } else if (cmd) {
    const out = document.createElement("p");
    out.className = "terminal-output";
    out.textContent = `command not found: ${cmd}`;
    body.insertBefore(out, input.parentElement);
  }

  input.value = "";
  body.scrollTop = body.scrollHeight;
});

document.querySelectorAll("[data-placeholder]").forEach(a => {
  a.addEventListener("click", e => {
    e.preventDefault();
    alert("Replace this placeholder link with the project's GitHub repository or live demo.");
  });
});
