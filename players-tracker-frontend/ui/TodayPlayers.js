import { getTodayPlayers, updatePlayerAttendance } from "../api/player-api";
import { Player } from "./Player";

export class TodayPlayers {
  static instance;
  constructor() {
    if (TodayPlayers.instance) {
      throw new Error("Use TodayHabits.getInstance() instead");
    }
  }

  squad = [];

  static getInstance() {
    if (!TodayPlayers.instance) {
      TodayPlayers.instance = new TodayPlayers();
    }
    return TodayPlayers.instance;
  }

  async init() {
    this.element = document.getElementById("today-players");
    await this.refresh();
  }

  async refresh() {
    this.squad.forEach((player) =>
      player.removeEventListener("toggle", this.toggle)
    );
    try {
      this.todayPlayers = await getTodayPlayers();
      this.render();
    } catch (error) {
      alert("Impossible to get players", error.message);
    }
  }

  async render() {
    this.element.innerHTML = "";
    this.squad = this.todayPlayers.map((todayPlayer) => {
      const player = new Player(
        todayPlayer.id,
        todayPlayer.firstName,
        todayPlayer.lastName,
        todayPlayer.attendance
      );
      this.element.appendChild(player.element);
      player.addEventListener("toggle", async (event) => {
        const { id, attendance } = event.currentTarget;
        await updatePlayerAttendance(id, !attendance);
        this.refresh();
      });
      return player;
    });
  }
}
