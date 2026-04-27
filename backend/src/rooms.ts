import { CreateRedisClient } from "./util.ts";


type Data = {

    wins: number,
    loses: number,
    playerTurn: boolean,
    playerPos: number,
    pcPos: number
}


export async function initRoom() {

    let client = await CreateRedisClient();
    await client.set("players", 0)
    await client.set("minimum_win",0)
    await client.set("leaderboard",JSON.stringify([]))
    client.destroy();
}


/**
 * creates a room with init data in it
 * @param playerID playerID that you get from the bearer auth token
 */
export async function createRoom(playerID: string) {

    let client = await CreateRedisClient();
    await client.set(`room${playerID}`, JSON.stringify({

        wins: 0,
        loses: 0,
        playerTurn: true,
        playerPos: 1,
        pcPos: 1
    }), {
        expiration: {
            type: "EX",
            value: 60 * 60
        }
    })
    client.destroy()

}


export async function getRoom(playerID: string) {

    let client = await CreateRedisClient();
    let roomData = await client.get(`room${playerID}`);
    client.destroy();
    return roomData ? JSON.parse(roomData) as Data : null;



}



export async function updateRoom(playerID: string, data: Data) {

    let client = await CreateRedisClient();
    await client.set(`room${playerID}`, JSON.stringify(data), {
        expiration: {
            type: "EX",
            value: 60 * 60
        }
    })
    client.destroy();

}



export async function deleteRoom(playerID: string) {

    let client = await CreateRedisClient();
    let roomData = await client.del(`room${playerID}`);
    client.destroy();


}