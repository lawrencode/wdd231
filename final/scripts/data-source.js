import { fetchActivities, buildTripSummary } from './data.js';
import { getTheme, saveTheme, savePlan, getPlan, getFavorites, saveFavorites } from './storage.js';

const page = document.body.dataset.page;
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#primary-nav');
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

const theme = getTheme();
if (theme === 'dark') {
  document.body.classList.add('dark-mode');
}

const themeButton = document.createElement('button');
themeButton.type = 'button';
themeButton.className = 'theme-toggle';
themeButton.textContent = theme === 'dark' ? 'Light mode' : 'Dark mode';
themeButton.setAttribute('aria-label', 'Toggle color theme');

themeButton.addEventListener('click', () => {
  const current = document.body.classList.toggle('dark-mode') ? 'dark' : 'light';
  saveTheme(current);
  themeButton.textContent = current === 'dark' ? 'Light mode' : 'Dark mode';
});

const footer = document.querySelector('.site-footer');
if (footer) {
  footer.appendChild(themeButton);
}

async function initExperiencePage() {
  const list = document.getElementById('activityList');
  const filter = document.getElementById('regionFilter');
  const favoritesToggle = document.getElementById('favoritesToggle');
  const modal = document.getElementById('activityModal');
  const modalContent = document.getElementById('modalContent');

  if (!list || !filter || !favoritesToggle || !modal || !modalContent) return;

  const allActivities = await fetchActivities();
  let favoritesOnly = false;

  function renderActivities(items) {
    const favorites = getFavorites();
    list.innerHTML = '';

    if (!items.length) {
      list.innerHTML = '<p class="empty-state">No experiences match the current filters.</p>';
      return;
    }

    items.forEach((activity) => {
      const card = document.createElement('article');
      card.className = 'activity-card';
      const isFavorite = favorites.includes(activity.id);

      card.innerHTML = `
        <img src="${activity.image}" alt="${activity.name}" loading="lazy" />
        <div class="card-copy">
          <div class="card-topline">
            <span class="badge">${activity.region}</span>
            <button class="favorite-button ${isFavorite ? 'active' : ''}" type="button" data-id="${activity.id}" aria-label="Toggle favorite for ${activity.name}">
              ${isFavorite ? '★ Saved' : '☆ Save'}
            </button>
          </div>
          <h3>${activity.name}</h3>
          <p>${activity.description}</p>
          <ul class="meta-list">
            <li><strong>Difficulty:</strong> ${activity.difficulty}</li>
            <li><strong>Duration:</strong> ${activity.duration}</li>
            <li><strong>Best for:</strong> ${activity.bestFor}</li>
            <li><strong>Approx. cost:</strong> ${activity.cost}</li>
          </ul>
          <button class="button secondary details-button" type="button" data-id="${activity.id}">View details</button>
        </div>
      `;
      list.appendChild(card);
    });

    document.querySelectorAll('.details-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = Number(event.currentTarget.dataset.id);
        const selected = allActivities.find((item) => item.id === id);
        if (!selected) return;

        modalContent.innerHTML = `
          <h2 id="modalTitle">${selected.name}</h2>
          <img src="${selected.image}" alt="${selected.name}" />
          <div class="modal-details">
            <p><strong>Region:</strong> ${selected.region}</p>
            <p><strong>Difficulty:</strong> ${selected.difficulty}</p>
            <p><strong>Duration:</strong> ${selected.duration}</p>
            <p><strong>Best for:</strong> ${selected.bestFor}</p>
            <p><strong>Estimated cost:</strong> ${selected.cost}</p>
            <p>${selected.description}</p>
          </div>
        `;
        modal.showModal();
      });
    });

    document.querySelectorAll('.favorite-button').forEach((button) => {
      button.addEventListener('click', (event) => {
        const id = Number(event.currentTarget.dataset.id);
        const storedFavorites = getFavorites();
        const nextFavorites = storedFavorites.includes(id)
          ? storedFavorites.filter((favorite) => favorite !== id)
          : [...storedFavorites, id];
        saveFavorites(nextFavorites);
        renderActivities(getFilteredActivities());
      });
    });
  }

  function getFilteredActivities() {
    const selectedRegion = filter.value;
    const favorites = getFavorites();
    return allActivities.filter((activity) => {
      const regionMatch = selectedRegion === 'all' || activity.region === selectedRegion;
      const favoriteMatch = !favoritesOnly || favorites.includes(activity.id);
      return regionMatch && favoriteMatch;
    });
  }

  filter.addEventListener('change', () => {
    renderActivities(getFilteredActivities());
  });

  favoritesToggle.addEventListener('click', () => {
    favoritesOnly = !favoritesOnly;
    favoritesToggle.textContent = favoritesOnly ? 'Show all experiences' : 'Show favorites only';
    renderActivities(getFilteredActivities());
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.close();
    }
  });

  renderActivities(getFilteredActivities());
}

function initPlannerPage() {
  const form = document.getElementById('plannerForm');
  const output = document.getElementById('plannerOutput');

  if (!form || !output) return;

  const savedPlan = getPlan();

  if (savedPlan) {
    document.getElementById('tripFocus').value = savedPlan.focus;
    document.getElementById('tripDays').value = savedPlan.days;
    document.getElementById('tripIsland').value = savedPlan.island;
    document.getElementById('tripStyle').value = savedPlan.style;
  }

  const renderPlan = (plan) => {
    output.innerHTML = buildTripSummary(plan);
  };

  const currentPlan = savedPlan || {
    focus: 'beach',
    days: 5,
    island: 'Upolu',
    style: 'relaxed'
  };
  renderPlan(currentPlan);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const plan = {
      focus: document.getElementById('tripFocus').value,
      days: Number(document.getElementById('tripDays').value),
      island: document.getElementById('tripIsland').value,
      style: document.getElementById('tripStyle').value
    };
    savePlan(plan);
    renderPlan(plan);
  });
}

async function initHomePage() {
  const featuredList = document.getElementById('featuredList');
  if (!featuredList) return;

  const activities = await fetchActivities();
  const featured = activities.slice(0, 3);

  featuredList.innerHTML = featured
    .map((item) => `
      <article class="activity-card spotlight">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="card-copy">
          <span class="badge">${item.region}</span>
          <h3>${item.name}</h3>
          <p>${item.description}</p>
          <ul class="meta-list">
            <li><strong>Difficulty:</strong> ${item.difficulty}</li>
            <li><strong>Best for:</strong> ${item.bestFor}</li>
          </ul>
        </div>
      </article>
    `)
    .join('');
}

if (page === 'experiences') {
  initExperiencePage();
}

if (page === 'planner') {
  initPlannerPage();
}

if (page === 'home') {
  initHomePage();
}







































