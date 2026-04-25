import { createClient } from "redis";
import dotenv from "dotenv"
import path from "path"



export function initDotEnv(){


    dotenv.config({
    path: path.resolve(import.meta.dirname,"../.env")
});

}
export async function CreateRedisClient() {

    let client = await createClient({
        url: "redis://redis"
    }).connect();

    return client;

}

/**
 * Gets next player ID and sets it as the number of players
 */
export async function increasePlayers() {

    let client = await CreateRedisClient();
    let playerID = (Number(await client.get("players")) + 1).toString()
    await client.set("players", Number(playerID))
    client.destroy();
    return playerID;

}