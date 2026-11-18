document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const currentYear = document.getElementById('currentYear');
  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const lastModified = document.getElementById('lastModified');
  if (lastModified) lastModified.textContent = `Last modified: ${document.lastModified}`;

  loadWeather();
  loadSpotlights();
});

const weatherSummary = document.getElementById('weather-summary');
const forecastContainer = document.getElementById('forecast');
const spotlightsContainer = document.getElementById('spotlights');

const formatTemperature = (value) => `${Math.round(value)}°F`;

async function loadWeather() {
  if (!weatherSummary || !forecastContainer) return;

  const OPEN_WEATHER_API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
  if (!OPEN_WEATHER_API_KEY || OPEN_WEATHER_API_KEY.startsWith('YOUR_')) {
    weatherSummary.innerHTML = '<p class="weather-error">Live weather setup is pending. Add an OpenWeatherMap API key to show Nampa weather.</p>';
    forecastContainer.innerHTML = '<p class="weather-error">The 3-day forecast will appear after setup.</p>';
    return;
  }

  const query = `q=Nampa,US&units=imperial&appid=${encodeURIComponent(OPEN_WEATHER_API_KEY)}`;

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?${query}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?${query}`)
    ]);

    if (!currentResponse.ok || !forecastResponse.ok) {
      throw new Error('OpenWeatherMap returned an unsuccessful response.');
    }

    const [current, forecast] = await Promise.all([
      currentResponse.json(),
      forecastResponse.json()
    ]);

    const condition = current.weather?.[0];
    const description = condition?.description ?? 'Current conditions unavailable';
    const iconCode = condition?.icon;

    weatherSummary.innerHTML = `
      <div class="weather-main">
        <div>
          <p class="weather-label">Current temperature</p>
          <strong class="weather-temp">${formatTemperature(current.main.temp)}</strong>
        </div>
        ${iconCode ? `<img class="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}">` : ''}
      </div>
      <p class="weather-description">${description}</p>
    `;

    const dailyForecast = new Map();
    (forecast.list || []).forEach((entry) => {
      const dateKey = entry.dt_txt.split(' ')[0];
      const day = dailyForecast.get(dateKey) || { timestamp: entry.dt, high: -Infinity };
      day.high = Math.max(day.high, entry.main.temp_max ?? entry.main.temp);
      dailyForecast.set(dateKey, day);
    });

    const nextThreeDays = [...dailyForecast.values()].slice(0, 3);
    if (nextThreeDays.length < 3) throw new Error('The forecast did not contain three days.');

    forecastContainer.innerHTML = nextThreeDays.map((day) => {
      const date = new Date(day.timestamp * 1000);
      const label = date.toLocaleDateString('en-US', { weekday: 'long' });
      return `<div class="forecast-item"><span>${label}</span><strong>${formatTemperature(day.high)}</strong></div>`;
    }).join('');
  } catch (error) {
    weatherSummary.innerHTML = '<p class="weather-error">Live weather is currently unavailable.</p>';
    forecastContainer.innerHTML = '<p class="weather-error">The 3-day forecast could not be loaded.</p>';
    console.error('Unable to load Nampa weather:', error);
  }
}

async function loadSpotlights() {
  if (!spotlightsContainer) return;

  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Unable to load chamber members.');

    const data = await response.json();
    const eligible = (data.members || []).filter((member) => member.membershipLevel === 2 || member.membershipLevel === 3);

    for (let index = eligible.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [eligible[index], eligible[randomIndex]] = [eligible[randomIndex], eligible[index]];
    }

    const selected = eligible.slice(0, Math.min(3, eligible.length));
    if (selected.length < 2) throw new Error('At least two eligible members are required.');

    spotlightsContainer.innerHTML = selected.map((member) => `
      <article class="spotlight-card">
        <img class="spotlight-logo" src="images/${member.image}" alt="${member.name} logo" loading="lazy">
        <div class="spotlight-body">
          <div class="spotlight-header">
            <h3>${member.name}</h3>
            <span class="membership-badge level-${member.membershipLevel}">${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</span>
          </div>
          <p class="spotlight-tagline">${member.tagline}</p>
          <ul class="spotlight-info">
            <li><strong>Phone:</strong> <a href="tel:${member.phone.replace(/[^\d+]/g, '')}">${member.phone}</a></li>
            <li><strong>Address:</strong> ${member.address}</li>
            <li><strong>Website:</strong> <a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website.replace(/^https?:\/\//, '')}</a></li>
          </ul>
        </div>
      </article>
    `).join('');
  } catch (error) {
    spotlightsContainer.innerHTML = '<p>Member spotlights are unavailable at the moment.</p>';
    console.error('Unable to load member spotlights:', error);
  }
}
