import { activities } from './data-source.js';

export async function fetchActivities() {
  try {
    const response = await fetch('data/activities.json');
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.length ? data : activities;
  } catch (error) {
    console.error('Unable to fetch activity data:', error);
    return activities;
  }
}

export function buildTripSummary(plan) {
  return `
    <p><strong>Focus:</strong> ${plan.focus}</p>
    <p><strong>Island:</strong> ${plan.island}</p>
    <p><strong>Length:</strong> ${plan.days} days</p>
    <p><strong>Style:</strong> ${plan.style}</p>
  `;
}





