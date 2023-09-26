const BASE_URL = "http://127.0.0.1:3000";

export const getTodayPlayers = () =>
  fetch(`${BASE_URL}/players/today`).then((res) => res.json());

export const updatePlayerAttendance = (id, attendance) =>
  fetch(`${BASE_URL}/players/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ attendance }),
  }).then((res) => res.json());
