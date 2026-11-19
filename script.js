// ---------- Theme товч (dark / light) ----------
const root = document.documentElement;
const themeBtn = document.getElementById('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeBtn.setAttribute('aria-pressed', String(theme === 'dark'));
}

let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) { /* storage хаалттай байж болно */ }
applyTheme(saved || (prefersDark.matches ? 'dark' : 'light'));

themeBtn.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (e) { /* алгасах */ }
});

// ---------- Flip товч ----------
const cards = document.querySelectorAll('.card');

function setFlipped(card, on) {
  card.classList.toggle('is-flipped', on);
  card.querySelector('.flip').setAttribute('aria-pressed', String(on));
}

cards.forEach((card) => {
  card.querySelector('.flip').addEventListener('click', () => {
    setFlipped(card, !card.classList.contains('is-flipped'));
  });
});

// Бүгдийг эргүүлэх: нэг нь ч эргээгүй бол бүгдийг эргүүлнэ, үгүй бол буцаана
document.getElementById('flipAll').addEventListener('click', () => {
  const anyFront = [...cards].some((c) => !c.classList.contains('is-flipped'));
  cards.forEach((c) => setFlipped(c, anyFront));
});
