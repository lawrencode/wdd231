const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });

  nav.querySelectorAll('a').forEach((link) => {
    const isPlaceholder = link.getAttribute('href') === '#';

    link.addEventListener('click', (event) => {
      if (isPlaceholder) {
        event.preventDefault();
      }
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const weatherSummary = document.getElementById('weather-summary');
const forecastContainer = document.getElementById('forecast');
const spotlightsContainer = document.getElementById('spotlights');

const formatTemperature = (value) => `${Math.round(value)}°F`;

const loadWeather = async () => {
  if (!weatherSummary || !forecastContainer) return;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch('https://api.openweathermap.org/data/2.5/weather?q=Nampa,US&units=imperial&appid=demo'),
      fetch('https://api.openweathermap.org/data/2.5/forecast?q=Nampa,US&units=imperial&appid=demo')
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('Unable to load weather data.');
    }

    const current = await currentResponse.json();
    const forecast = await forecastResponse.json();
    const description = current.weather?.[0]?.description ?? 'Current conditions';
    const iconCode = current.weather?.[0]?.icon;
    const temp = current.main?.temp ?? 0;

    weatherSummary.innerHTML = `
      <div class="weather-main">
        <div>
          <p class="weather-label">Now in Nampa</p>
          <strong class="weather-temp">${formatTemperature(temp)}</strong>
        </div>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">
      </div>
      <p class="weather-description">${description}</p>
    `;

    const weatherIcon = weatherSummary.querySelector('.weather-icon');
    if (weatherIcon) {
      weatherIcon.onerror = () => {
        weatherIcon.style.display = 'none';
      };
    }

    const dailyForecast = [];
    const datesSeen = new Set();

    (forecast.list || []).forEach((entry) => {
      const date = entry.dt_txt.split(' ')[0];
      if (entry.dt_txt.includes('12:00:00') && !datesSeen.has(date)) {
        datesSeen.add(date);
        dailyForecast.push(entry);
      }
    });

    const nextThreeDays = dailyForecast.slice(0, 3);

    forecastContainer.innerHTML = nextThreeDays
      .map((entry) => {
        const date = new Date(entry.dt * 1000);
        return `
          <div class="forecast-item">
            <span>${date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
            <strong>${formatTemperature(entry.main?.temp ?? 0)}</strong>
          </div>
        `;
      })
      .join('');
  } catch (error) {
    weatherSummary.innerHTML = '<p class="weather-error">Weather data is currently unavailable.</p>';
    forecastContainer.innerHTML = '<p class="weather-error">Please check back soon.</p>';
    console.error(error);
  }
};

const loadSpotlights = async () => {
  if (!spotlightsContainer) return;

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error('Unable to load chamber members.');
    }

    const data = await response.json();
    const eligibleMembers = (data.members || []).filter((member) => member.membershipLevel >= 2);
    const shuffled = [...eligibleMembers].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    spotlightsContainer.innerHTML = selected
      .map(
        (member) => `
          <article class="spotlight-card">
            <img class="spotlight-logo" src="images/${member.image}" alt="${member.name} logo">
            <div class="spotlight-body">
              <div class="spotlight-header">
                <h3>${member.name}</h3>
                <span class="membership-badge level-${member.membershipLevel}">${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</span>
              </div>
              <p class="spotlight-tagline">${member.tagline}</p>
              <ul class="spotlight-info">
                <li><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^\d+]/g, '')}">${member.phone}</a></li>
                <li><strong>Address:</strong> ${member.address}</li>
                <li><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit site</a></li>
              </ul>
            </div>
          </article>
        `
      )
      .join('');
  } catch (error) {
    spotlightsContainer.innerHTML = '<p>Member spotlights are unavailable at the moment.</p>';
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

  loadWeather();
  loadSpotlights();
});
