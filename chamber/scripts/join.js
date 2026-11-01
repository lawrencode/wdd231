const timestampInput = document.getElementById('timestamp');

if (timestampInput) {
  const now = new Date();
  timestampInput.value = now.toISOString();
}

const modalButtons = document.querySelectorAll('.membership-info-link');
const closeButtons = document.querySelectorAll('.modal-close');
const modals = document.querySelectorAll('.membership-modal');

const closeModal = (modal) => {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
};

const openModal = (modalId) => {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.focus();
  }
};

modalButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const target = button.getAttribute('href');
    if (target && target.startsWith('#')) {
      openModal(target.slice(1));
    }
  });
});

closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = button.closest('.membership-modal');
    closeModal(modal);
  });
});

modals.forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal(modal);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') {
      closeModal(modal);
    }
  });
});
