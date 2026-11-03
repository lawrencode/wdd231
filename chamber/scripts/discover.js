import { places } from "../data/places.mjs";

const grid = document.querySelector("#places-grid");
const visitMessage = document.querySelector("#visit-message");
const lastVisitKey = "nampaDiscoverLastVisit";
const millisecondsPerDay = 1000 * 60 * 60 * 24;

function renderVisitMessage() {
  const now = Date.now();
  const previousVisit = Number(localStorage.getItem(lastVisitKey));

  if (!previousVisit || !Number.isFinite(previousVisit)) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const elapsed = now - previousVisit;
    if (elapsed < millisecondsPerDay) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const days = Math.floor(elapsed / millisecondsPerDay);
      visitMessage.textContent = `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
    }
  }

  localStorage.setItem(lastVisitKey, String(now));
}

function createPlaceCard(place, index) {
  const article = document.createElement("article");
  article.className = `place-card place-${index + 1}`;
  article.setAttribute("aria-labelledby", `${place.id}-title`);

  const title = document.createElement("h2");
  title.id = `${place.id}-title`;
  title.textContent = place.name;

  const figure = document.createElement("figure");
  const image = document.createElement("img");
  image.src = place.image;
  image.alt = place.imageAlt;
  image.width = 300;
  image.height = 200;
  image.loading = "lazy";
  image.decoding = "async";
  figure.append(image);

  const address = document.createElement("address");
  address.textContent = place.address;

  const description = document.createElement("p");
  description.className = "place-description";
  description.textContent = place.description;

  const extra = document.createElement("p");
  extra.className = "place-detail";
  extra.id = `${place.id}-detail`;
  extra.textContent = place.detail;
  extra.hidden = true;

  const actions = document.createElement("div");
  actions.className = "place-actions";

  const detailButton = document.createElement("button");
  detailButton.className = "learn-more";
  detailButton.type = "button";
  detailButton.textContent = "Learn more";
  detailButton.setAttribute("aria-expanded", "false");
  detailButton.setAttribute("aria-controls", extra.id);
  detailButton.addEventListener("click", () => {
    const expanded = detailButton.getAttribute("aria-expanded") === "true";
    detailButton.setAttribute("aria-expanded", String(!expanded));
    detailButton.textContent = expanded ? "Learn more" : "Show less";
    extra.hidden = expanded;
  });

  const mapLink = document.createElement("a");
  mapLink.className = "map-link";
  mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;
  mapLink.target = "_blank";
  mapLink.rel = "noopener noreferrer";
  mapLink.textContent = "Map";

  actions.append(detailButton, mapLink);
  article.append(title, figure, address, description, extra, actions);
  return article;
}

function initialize() {
  renderVisitMessage();
  grid.replaceChildren(...places.map(createPlaceCard));

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("open", !isOpen);
  });

  document.querySelector("#currentYear").textContent = new Date().getFullYear();
  document.querySelector("#lastModified").textContent = `Last modified: ${document.lastModified}`;
}

initialize();
