import {
  addPlayer,
  getPlayers,
  getTodayPlayers,
  updatePlayer,
} from "../helpers/players.helper.js";
import { isProvidedBody, isValidBody } from "../utils/index.js";

export const playersRoute = async (fastify) => {
  fastify.get("/", async (_, reply) => {
    try {
      const player = await getPlayers();
      return player;
    } catch (error) {
      reply.code(400).send({
        error: `Error on getPlayers with ${error.message}`,
      });
    }
  });

  fastify.get("/today", async (_, reply) => {
    try {
      const players = await getTodayPlayers();
      return players;
    } catch (error) {
      reply.code(400).send({
        error: `Error on getTodayPlayers with ${error.message}`,
      });
    }
  });

  fastify.post("/", async (request, reply) => {
    const body = request.body;

    if (!isProvidedBody(body))
      reply.code(400).send({
        error: "Body is required",
      });

    if (!isValidBody(body))
      reply.code(400).send({
        error: `FirstName and LastName are required in the body but get firstName: '${body.firstName}' & lastName: '${body.lastName}'`,
      });

    try {
      const newPlayer = await addPlayer(body.firstName, body.lastName);
      return newPlayer;
    } catch (error) {
      reply.code(400).send({
        error: `Error on adding player with ${error.message}`,
      });
    }
  });

  fastify.patch("/:playerId", async (request, reply) => {
    const body = request.body;

    if (!isProvidedBody(body))
      reply.code(400).send({
        error: "Body is required",
      });

    if (body.attendance === undefined)
      reply.code(400).send({
        error: "daysAttendance is required",
      });

    const playerId = Number(request.params.playerId);

    if (!playerId || Number.isNaN(playerId))
      reply.code(400).send({
        error: "playerId params must be a number",
      });

    try {
      const player = await updatePlayer(playerId, body.attendance);
      return player;
    } catch (error) {
      reply.code(400).send({
        error: `Error on updating player with ${error.message}`,
      });
    }
  });
};
