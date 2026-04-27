import { createClient, REDIS_FLUSH_MODES } from "redis";
import dotenv from "dotenv"
import path from "path"
import type { IncomingHttpHeaders } from "http";
import jwt from "jsonwebtoken"


export function initDotEnv() {


    dotenv.config({
        path: path.resolve(import.meta.dirname, "../.env")
    });

}


export function isUserAuthorized(headers: IncomingHttpHeaders): { userID: string, username: string } | null {
    let token = headers.authorization?.split("Bearer ")[1];
    if (token) {

        try {
            let data = jwt.verify(token, process.env.SECRET)
            return data
        } catch (error) {
            return null;

        }

    } else {

        return null;
    }
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

export async function flushingDB(){

    let client = await CreateRedisClient();
    await client.flushDb(REDIS_FLUSH_MODES.SYNC);
    client.destroy();
}