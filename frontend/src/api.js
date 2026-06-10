const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const getGroups = () =>
  fetch(`${BASE_URL}/groups`).then(r => r.json())

export const simulateGroup = (group) =>
  fetch(`${BASE_URL}/simulate/group/${group}`, { method: 'POST' }).then(r => r.json())

export const predictMatch = (home, away) =>
  fetch(`${BASE_URL}/predict/${encodeURIComponent(home)}/${encodeURIComponent(away)}`).then(r => r.json())

export const simulateTournament = () =>
  fetch(`${BASE_URL}/simulate/tournament`, { method: 'POST' }).then(r => r.json())

export const simulateOdds = (n = 1000) =>
  fetch(`${BASE_URL}/simulate/odds?n=${n}`, { method: 'POST' }).then(r => r.json())
