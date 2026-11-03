const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const params = new URLSearchParams(window.location.search);
const fields = ['first-name', 'last-name', 'email', 'phone', 'business-name'];
fields.forEach((field) => {
  const output = document.querySelector(`[data-field="${field}"]`);
  if (output) output.textContent = params.get(field)?.trim() || 'Not provided';
});

const timestampOutput = document.querySelector('[data-field="timestamp"]');
const timestamp = params.get('timestamp');
if (timestampOutput && timestamp) {
  const date = new Date(timestamp);
  timestampOutput.textContent = Number.isNaN(date.getTime()) ? timestamp : date.toLocaleString();
}

const currentYear = document.getElementById('currentYear');
if (currentYear) currentYear.textContent = new Date().getFullYear();
const lastModified = document.getElementById('lastModified');
if (lastModified) lastModified.textContent = `Last modified: ${document.lastModified}`;
