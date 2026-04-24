import { createClient } from "redis";



export async function CreateRedisClient() {

    let client = await createClient({
        url: "redis://redis"
    }).connect();

    return client;

}



export async function createRoom(playerID: string) {

    let client = await CreateRedisClient();
    await client.set(`room${playerID}`, JSON.stringify({

        wins: 0,
        loses: 0,
        playerTurn: true,
        playerPos: 1,
        pcPos: 1
    }))

    client.destroy()

}