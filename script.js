// ── Animated background canvas ──
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticles() {
  particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.3,
    dy: (Math.random() - 0.5) * 0.3,
    alpha: Math.random() * 0.5 + 0.1,
  }));
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(124,106,247,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── Typewriter ──
const phrases = [
  'Full-Stack Developer',
  'React Enthusiast',
  'Python Developer',
  'Open Source Contributor',
  'Problem Solver',
];
let pi = 0, ci = 0, deleting = false;
const tw = document.getElementById('typewriter');

function type() {
  const current = phrases[pi];
  if (!deleting) {
    tw.textContent = current.slice(0, ++ci);
    if (ci === current.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    tw.textContent = current.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 60 : 100);
}
type();

// ── Navbar scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ── Scroll reveal ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .skill-category, .timeline-item, .about-grid, .contact-grid').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ── Contact form ──
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('button[type="submit"]');
  btn.textContent = 'Sent ✓';
  btn.style.background = '#28c840';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    this.reset();
  }, 3000);
});

// ── Interactive Terminal ──
(function () {
  const output = document.getElementById('term-output');
  const input  = document.getElementById('term-input');
  const term   = document.getElementById('interactive-terminal');
  if (!output || !input) return;

  const history = [];
  let histIdx = -1;

  const commands = {
    help: () => `
<span class="term-highlight">Available commands:</span>
  <span class="term-accent">about</span>       — who am I
  <span class="term-accent">skills</span>      — tech stack
  <span class="term-accent">projects</span>    — things I've built
  <span class="term-accent">experience</span>  — work & education
  <span class="term-accent">contact</span>     — get in touch
  <span class="term-accent">whoami</span>      — quick intro
  <span class="term-accent">socials</span>     — links
  <span class="term-accent">clear</span>       — clear terminal
  <span class="term-accent">echo [text]</span> — print text
  <span class="term-accent">date</span>        — current date`,

    whoami: () =>
      `<span class="term-highlight">Piyush Kumar</span> — Full-Stack Developer & CS undergrad\nBMS College of Engineering, Bengaluru · CGPA <span class="term-accent">9.383</span>`,

    about: () =>
      `I build full-stack web apps and explore AI/ML systems.\nPassionate about clean UIs, scalable backends, and open source.\nCurrently: <span class="term-accent">Building cool stuff ☕</span>`,

    skills: () =>
      `<span class="term-highlight">Frontend  </span>  React · JavaScript · TypeScript · Tailwind CSS
<span class="term-highlight">Backend   </span>  Node.js · Express · Python · FastAPI
<span class="term-highlight">Database  </span>  Supabase · PostgreSQL · MongoDB · Firebase
<span class="term-highlight">Tools     </span>  Git · Docker · Linux · C/C++ · DSA`,

    projects: () =>
      `<span class="term-highlight">UniSync</span>   — College sync platform
  → <span class="term-link" onclick="window.open('https://www.officialunisync.ac.in','_blank')">www.officialunisync.ac.in</span>

<span class="term-highlight">Calority</span>  — Calorie & nutrition tracker
  → <span class="term-link" onclick="window.open('https://calority.vercel.app','_blank')">calority.vercel.app</span>`,

    experience: () =>
      `<span class="term-accent">Sept 2024–Dec 2024</span>  Assistant Editor Intern @ StayWhizzy`,

    contact: () =>
      `<span class="term-highlight">Email   </span>  <span class="term-link" onclick="window.location='mailto:piyushkumararya8521@gmail.com'">piyushkumararya8521@gmail.com</span>
<span class="term-highlight">LinkedIn</span>  <span class="term-link" onclick="window.open('https://linkedin.com/in/piyush-kumar-2a09a2250','_blank')">linkedin.com/in/piyush-kumar-2a09a2250</span>
<span class="term-highlight">GitHub  </span>  <span class="term-link" onclick="window.open('https://github.com/KrPIYUSH007','_blank')">github.com/KrPIYUSH007</span>`,

    socials: () =>
      `<span class="term-link" onclick="window.open('https://github.com/KrPIYUSH007','_blank')">GitHub</span>  ·  <span class="term-link" onclick="window.open('https://linkedin.com/in/piyush-kumar-2a09a2250','_blank')">LinkedIn</span>  ·  <span class="term-link" onclick="window.location='mailto:piyushkumararya8521@gmail.com'">Email</span>`,

    date: () => new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',

    clear: () => { output.innerHTML = ''; return null; },
  };

  function print(html, cls = 'term-out') {
    const div = document.createElement('div');
    div.className = `term-line ${cls}`;
    div.innerHTML = html;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
  }

  function run(raw) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    // echo command
    if (trimmed.toLowerCase().startsWith('echo ')) {
      print(`<span class="term-cmd">${escHtml(trimmed)}</span>`);
      print(escHtml(trimmed.slice(5)));
      return;
    }

    const cmd = trimmed.toLowerCase();
    print(`<span class="term-cmd">${escHtml(trimmed)}</span>`);

    if (commands[cmd] !== undefined) {
      const result = commands[cmd]();
      if (result !== null && result !== undefined) print(result);
    } else {
      print(`<span class="term-error">command not found: ${escHtml(trimmed)}</span> — try <span class="term-accent">help</span>`);
    }
  }

  function escHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const val = input.value;
      history.unshift(val);
      histIdx = -1;
      input.value = '';
      run(val);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) input.value = history[++histIdx];
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0) input.value = history[--histIdx];
      else { histIdx = -1; input.value = ''; }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const partial = input.value.toLowerCase();
      const match = Object.keys(commands).find(k => k.startsWith(partial));
      if (match) input.value = match;
    }
  });

  // click anywhere on terminal to focus input
  term.addEventListener('click', () => input.focus());

  // auto-run welcome sequence
  setTimeout(() => run('help'), 400);
})();
