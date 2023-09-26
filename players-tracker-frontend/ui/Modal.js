import { addPlayer } from "../api/player-api";
import { TodayPlayers } from "./TodayPlayers";

export class Modal {
  static instance;
  constructor() {
    if (Modal.instance) {
      throw new Error("Use TodayHabits.getInstance() instead");
    }
  }

  static getInstance() {
    if (!Modal.instance) {
      Modal.instance = new Modal();
    }
    return Modal.instance;
  }

  _open = false;

  init() {
    this.trigger = document.getElementById("add-new-player");
    this.dialog = document.getElementById("add-player-dialog");
    this.form = document.getElementById("add-player-form");

    this.trigger.addEventListener("click", () => {
      this.open = true;
    });

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.handleSubmit(event);
    });
  }

  async handleSubmit(event) {
    const form = event.currentTarget;
    const formData = new FormData(form);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    try {
      await addPlayer(firstName, lastName);
      TodayPlayers.getInstance().refresh();
      this.open = false;
    } catch (error) {
      alert("Failed to create habit with this error : ", error.message);
    }
  }

  get open() {
    return this._open;
  }

  set open(newOpen) {
    this._open = newOpen;
    if (newOpen) {
      this.dialog.setAttribute("open", "");
    } else {
      this.dialog.removeAttribute("open");
    }
  }
}
