import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { database } from "../service/firebase";

const playersCollection = collection(database, "players");

export const getTodayPlayers = async () => {
  try {
    const querySnapshot = await getDocs(playersCollection);
    const players = [];
    querySnapshot.forEach((doc) => {
      const { firstName, lastName, daysAttendance } = doc.data();
      const today = new Date().toISOString().slice(0, 10);
      players.push({
        id: doc.id,
        firstName,
        lastName,
        attendance: daysAttendance[today] || false,
      });
    });
    return players.sort((a, b) => {
      if (a.lastName > b.lastName) {
        return 1;
      }
      if (a.lastName < b.lastName) {
        return -1;
      }
      return 0;
    });
  } catch (error) {
    alert("Error to get players with : ", error.message);
  }
};

export const addPlayer = async (firstName, lastName, daysAttendance = {}) => {
  try {
    const docRef = await addDoc(playersCollection, {
      firstName,
      lastName,
      daysAttendance,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const updatePlayerAttendance = async (id, attendance) => {
  const playerRef = doc(database, "players", id);
  try {
    const snapshot = await getDoc(playerRef);

    if (snapshot.exists()) {
      console.log("Exists");
      const today = new Date().toISOString().slice(0, 10);
      const { firstName, lastName, daysAttendance } = snapshot.data();
      daysAttendance[today] = attendance;
      await setDoc(playerRef, {
        firstName,
        lastName,
        daysAttendance,
      });
      return { firstName, lastName, daysAttendance, id: snapshot.id };
    }
  } catch (error) {
    console.log("Error on updating player with ", error.message);
  }
};
