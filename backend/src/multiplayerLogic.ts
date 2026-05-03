//make a room

import { createMultiplayerRoom, getRoom, updateRoom, type MultiplayerRoomData } from "./rooms.ts";
import { randomInt } from "crypto"
import * as io from "socket.io"
import { TRAPS } from "./gameLogic.ts";
import { getLeaderboard, updateLeaderboard } from "./leaderboard.ts";



export async function startMultiplayerGame(playerID: string) {


    await createMultiplayerRoom(playerID);


}


export async function playMultiplayer(playerID: string, username: string, io: io.Server) {
    //get room data

    let roomData = await getRoom(playerID) as MultiplayerRoomData

    if (roomData) {

        if (roomData.playerTurn === playerID) {



            let dice = randomInt(1, 8); // throw dice
            let index = roomData.playerPos.findIndex(pos => pos[0] === playerID)

            //does this player exist in this room?
            if (index == -1) {
                return false
            }
            let playerArr = [roomData.playerPos[index]![1] + dice] // add the new value to destination
            if (Object.hasOwn(TRAPS, playerArr[0] as number)) { // is it a trap?
                playerArr.push(TRAPS[playerArr[0] as number] as number) // if so take the player to a new destination
                roomData.playerPos[index]![1] = TRAPS[playerArr[0] as number] as number

            } else {
                if (roomData.playerPos[index]![1] + dice > 100) {
                    let remaining = roomData.playerPos[index]![1] + dice - 100
                    roomData.playerPos[index]![1] = 100 - remaining

                } else if (roomData.playerPos[index]![1] + dice === 100) {

                    roomData.playerTurn = getNextPlayerTurn(roomData.playerPos, index)
                    roomData.wins[index]![1] += 1; // increment wins for the player

                    //if user wins check leaderboard 

                    let leaderboardUpdated = await updateLeaderboard(roomData.wins[index]![1], username)

                    if (leaderboardUpdated) {
                        //broadcast to leaderboard the changes

                        io.to("leaderboard").emit("lbu", await getLeaderboard()); //leaderboard updated
                    }
                }
                else {
                    roomData.playerPos[index]![1] += dice
                }

                playerArr[0] = roomData.playerPos[index]![1]


            }
            await updateRoom(playerID, roomData) // update the room data
            return {
                newPos: roomData.playerPos, //new player
                prePlyrPos: playerArr,
                prePlyr: playerID,
                roomData:roomData
            };


        } else {
            return false;
        }

    } else {

        return false;
    }
}
//play a turn

//leaving a room



function getNextPlayerTurn(arr: [string, number][], index: number) {

    //if this is the last element then pick the first, otherwise pick it

    if (arr.length - 1 == index) {
        return arr[0]![0];
    } else {
        return arr[index + 1]![0];
    }

}


/**
 * Joins a multiplayer room
 * @param playerID 
 * @param roomData 
 * @param roomID 
 */
export async function joinRoom(playerID: string, roomData: MultiplayerRoomData, roomID: string) {

    if (roomData.playerPos.findIndex((e)=>e[0]==playerID)!=-1){
        return;
    }
    roomData.playerPos.push([playerID, 1])
    roomData.wins.push([playerID, 0])
    await updateRoom(roomID, roomData)
}