//make a room

import { createMultiplayerRoom, getRoom, updateRoom, type MultiplayerRoomData } from "./rooms.ts";
import { randomInt } from "crypto"
import * as io from "socket.io"
import { TRAPS } from "./gameLogic.ts";
import { getLeaderboard, updateLeaderboard } from "./leaderboard.ts";



export async function startMultiplayerGame(playerID: string) {


    await createMultiplayerRoom(playerID);


}


export async function playMultiplayer(playerID: string, roomID: string, username: string, io: io.Server) {
    //get room data

    let roomData = await getRoom(roomID) as MultiplayerRoomData

    if (roomData) {

        if (roomData.playerTurn === playerID) {



            let dice = randomInt(1, 8); // throw dice
            let index = roomData.playerPos.findIndex(pos => pos[0] === playerID)

            //does this player exist in this room?
            if (index == -1) {
                console.log("Player is not in this room");
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
                    roomData.playerTurn = getNextPlayerTurn(roomData.playerPos, index)
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
            roomData.playerTurn = getNextPlayerTurn(roomData.playerPos, index)
            await updateRoom(roomID, roomData) // update the room data
            return {
                newPos: roomData.playerPos, //new player
                prePlyrPos: playerArr,
                prePlyr: playerID,
                roomData: roomData,
                dice: dice
            };


        } else {
            console.log("Not the right player turn");
            console.log(roomData);


            return false;
        }

    } else {

        console.log("Room does not exist");


        return false;
    }
}
//play a turn

//leaving a room



function getNextPlayerTurn(arr: [string, number][], index: number) {

    //if this is the last element then pick the first, otherwise pick it
    console.log(`Player index ${index} player`);

    if (arr.length - 1 == index) {
        console.log(`So it has to be index ${arr[0]![0]} turn`);
        return arr[0]![0];
    } else {
        console.log(`So it has to be index ${arr[0]![0]} turn`);
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

    if (roomData.playerPos.findIndex((e) => e[0] == playerID) != -1) {
        return;
    }
    roomData.playerPos.push([playerID, 1])
    roomData.wins.push([playerID, 0])
    await updateRoom(roomID, roomData)
}