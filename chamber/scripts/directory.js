const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const memberList = document.getElementById('memberList');
const viewButtons = document.querySelectorAll('.view-btn');
let currentView = 'grid';
let directoryMembers = [];

const formatMembershipLevel = (level) => {
  if (level === 3) return 'Gold';
  if (level === 2) return 'Silver';
  return 'Member';
};

const setView = (view) => {
  currentView = view;
  memberList.className = view === 'grid' ? 'member-grid' : 'member-list';

  viewButtons.forEach((button) => {
    const isActive = button.dataset.view === view;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
};

const createMemberCard = (member) => {
  const article = document.createElement('article');
  article.className = 'member-card';

  article.innerHTML = `
    <img class="member-logo" src="images/${member.image}" alt="${member.name} logo" />
    <div class="member-body">
      <div class="member-header">
        <h2>${member.name}</h2>
        <span class="membership-badge level-${member.membershipLevel}">${formatMembershipLevel(member.membershipLevel)}</span>
      </div>
      <p class="member-tagline">${member.tagline}</p>
      <ul class="member-info">
        <li><strong>Category:</strong> ${member.category}</li>
        <li><strong>Address:</strong> ${member.address}</li>
        <li><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^\d+]/g, '')}">${member.phone}</a></li>
        <li><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit site</a></li>
      </ul>
      <a class="member-link" href="${member.website}" target="_blank" rel="noopener noreferrer">Learn More</a>
    </div>
  `;

  return article;
};

const renderMembers = () => {
  if (!memberList) return;

  memberList.innerHTML = '';

  directoryMembers.forEach((member) => {
    memberList.appendChild(createMemberCard(member));
  });
};

const loadMembers = async () => {
  if (!memberList) return;

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Unable to load chamber members.');
    }

    const data = await response.json();
    directoryMembers = data.members || [];
    renderMembers();
    setView(currentView);
  } catch (error) {
    memberList.innerHTML = '<p>We are currently unable to load the chamber directory. Please try again later.</p>';
    console.error(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const currentYear = document.getElementById('currentYear');
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const lastModified = document.getElementById('lastModified');
  if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
  }

  viewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setView(button.dataset.view);
    });
  });

  loadMembers();
});
