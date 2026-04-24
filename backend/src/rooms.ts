import { createClient } from "redis";



export async function CreateRedisClient() {

    let client = await createClient({
        url: "redis://redis"
    }).connect();

    return client;

}

export async function init() {

    let client = await CreateRedisClient();
    await client.set("players", 0)
    client.destroy();
}

export async function createRoom() {

    let client = await CreateRedisClient();
    let playerID = (Number(await client.get("players")) + 1).toString()
    await client.set(`room${playerID}`, JSON.stringify({

        wins: 0,
        loses: 0,
        playerTurn: true,
        playerPos: 1,
        pcPos: 1
    }))
    await client.set("players", Number(playerID) + 1)
    client.destroy()

    return playerID

}


export async function getRoom(playerID: string) {

    let client = await CreateRedisClient();
    let roomData = await client.get(`room${playerID}`);
    client.destroy();
    return roomData ? JSON.parse(roomData) : null;



}