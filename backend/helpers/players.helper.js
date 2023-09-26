import path from "path";
import fs from "fs/promises";
import { Log } from "../utils/log.js";
import { getTodayDate } from "../utils/index.js";

const databaseFile = path.join(process.cwd(), "database.json");

export const getDatabase = async () => {
  try {
    const db = await fs.readFile(databaseFile, "utf-8");
    Log.success("Database is read with success");
    return JSON.parse(db);
  } catch (err) {
    Log.error("ReadFile throws an error : ", err);
  }
};

export const updateDatabase = async (newEntry) => {
  const database = await getDatabase();
  try {
    await fs.writeFile(
      databaseFile,
      JSON.stringify(
        {
          ...database,
          ...newEntry,
        },
        null,
        2
      )
    );
    Log.success("Database updated with success !!");
  } catch (err) {
    Log.error("An error occures with : ", err);
  }
};

export const getPlayers = async () => {
  try {
    const database = await getDatabase();
    return database.players;
  } catch (error) {
    Log.error("getPlayers throws an error : ", error.message);
  }
};

export const getTodayPlayers = async () => {
  const today = getTodayDate();
  const players = await getPlayers();
  return players.map((player) => ({
    id: player.id,
    firstName: player.firstName,
    lastName: player.lastName,
    attendance: player.daysAttendance[today] || false,
  }));
};

export const addPlayer = async (firstName, lastName) => {
  const players = await getPlayers();

  const newPlayer = {
    id: (players[players.length - 1].id || 0) + 1,
    firstName,
    lastName,
    daysAttendance: {},
  };

  players.push(newPlayer);

  await updateDatabase({ players });

  return newPlayer;
};

export const updatePlayer = async (id, attendance) => {
  const players = await getPlayers();
  const playerToEdit = players.find((player) => player.id === id);

  if (!playerToEdit) throw new Error("id is invalid");

  const today = getTodayDate();
  playerToEdit.daysAttendance[today] = attendance;

  await updateDatabase({ players });

  return playerToEdit;
};
