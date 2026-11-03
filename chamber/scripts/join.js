const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const timestampInput = document.getElementById('timestamp');
if (timestampInput) {
  timestampInput.value = new Date().toISOString();
}

const currentYear = document.getElementById('currentYear');
if (currentYear) currentYear.textContent = new Date().getFullYear();

const lastModified = document.getElementById('lastModified');
if (lastModified) lastModified.textContent = `Last modified: ${document.lastModified}`;

document.querySelectorAll('.membership-info-link').forEach((link) => {
  link.addEventListener('click', (event) => {
    const modal = document.querySelector(link.getAttribute('href'));
    if (!(modal instanceof HTMLDialogElement)) return;
    event.preventDefault();
    modal.showModal();
  });
});

document.querySelectorAll('.membership-modal').forEach((modal) => {
  modal.querySelector('.modal-close')?.addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
});
