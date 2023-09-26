import "./style.css";
import { Modal } from "./ui/Modal";
import { TodayPlayers } from "./ui/TodayPlayers";

const todayPlayers = TodayPlayers.getInstance();
const modal = Modal.getInstance();

todayPlayers.init();
modal.init();
