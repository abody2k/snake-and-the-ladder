import { CreateRedisClient } from "./util.ts";


export type Data = {

    wins: number,
    loses: number,
    playerTurn: boolean,
    playerPos: number,
    pcPos: number
}


export type MultiplayerRoomData = {

    wins: [string, number][], //array of arrays to support more than 2 players [playerID, wins]
    playerTurn: string, //playerID of the player whose turn it is
    playerPos: [string, number][], //array of arrays to support more than 2 players [playerID, position]
}

export type LeaderBoard = {

    playerName: string,
    wins: number
}

export async function initRoom() {

    let client = await CreateRedisClient();
    await client.set("players", 0)
    await client.set("minimum_win", 0)
    let leaderboard : LeaderBoard[] = []
    await client.set("leaderboard", JSON.stringify( leaderboard))
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


/**
 * creates a multiplayer room with init data in it
 * @param playerID playerID that you get from the bearer auth token
 */
export async function createMultiplayerRoom(playerID: string) {

    let client = await CreateRedisClient();
    await client.set(`room${playerID}`, JSON.stringify({

        wins: [[playerID, 0]], //array of arrays to support more than 2 players [playerID, wins]
        playerTurn: playerID,
        playerPos: [[playerID, 1]], //array of arrays to support more than 2 players
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
    return roomData ? JSON.parse(roomData) as Data | MultiplayerRoomData : null;

}





export async function updateRoom(playerID: string, data: Data | MultiplayerRoomData) {

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