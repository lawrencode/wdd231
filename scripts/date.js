document.addEventListener("DOMContentLoaded", () => {
  const currentYear = document.getElementById("currentYear");
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  const lastModified = document.getElementById("lastModified");
  if (lastModified) {
    lastModified.textContent = `Last modified: ${document.lastModified}`;
  }
});
