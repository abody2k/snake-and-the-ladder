import { randomInt } from "crypto"
import { createRoom, deleteRoom, getRoom, updateRoom } from "./rooms.ts";

/**
 * it takes you from a high number to a lower number
 * it can be updated to be room specific so that each room has its
 * own random map
 */
const TRAPS: { [key: number]: number } = {


    11: 1,

    24: 9,
    99: 70,

    33: 7,
    67: 44
}




//start a new game
export async function startGame(playerID: string) {

    //make a new room #it will purge the previous one if a previous one exists

    await createRoom(playerID);


}

/**
 * Plays if it is the player turn and returns the number or
 * change of numbers that shows the final position of the
 * player, otherwise it will return false
 * @param playerID 
 * @param username 
 */
export async function play(playerID: string, username: string) {

    //get room data

    let roomData = await getRoom(playerID)

    if (roomData) {

        if (roomData.playerTurn) {

            let dice = randomInt(1, 8); // throw dice

            let playerArr = [roomData.playerPos + dice] // add the new value to destination
            if (Object.hasOwn(TRAPS, playerArr[0] as number)) { // is it a trap?
                playerArr.push(TRAPS[playerArr[0] as number] as number) // if so take the player to a new destination
                roomData.playerPos = TRAPS[playerArr[0] as number] as number

            } else {
                if (roomData.playerPos + dice > 100) {
                    let remaining = roomData.playerPos + dice - 100
                    roomData.playerPos = 100 - remaining

                } else if (roomData.playerPos + dice === 100) {

                    roomData.pcPos = 1
                    roomData.playerPos = 1
                    roomData.playerTurn = true
                    roomData.wins += 1

                    //if user wins check leaderboard 
                }
                else {
                    roomData.playerPos += dice
                }

                playerArr[0] = roomData.playerPos


            }
            roomData.playerTurn = false; // change the turn to pc
            await updateRoom(playerID, roomData) // update the room data
            return playerArr;


        } else {
            return false;
        }

    } else {

        return false;
    }

}



/**
 * 
 * it will delete the room
 */
export async function leaveGame(playerID: string) {

    await deleteRoom(playerID);
}


export async function pcPlay(playerID: string) {

    let roomData = await getRoom(playerID)
    if (roomData) {
        let dice = randomInt(1, 8); // throw dice
        let pcArr = [roomData.pcPos + dice] // add the new value to destination
        if (Object.hasOwn(TRAPS, pcArr[0] as number)) { // is it a trap?
            pcArr.push(TRAPS[pcArr[0] as number] as number) // if so take the player to a new destination   
            roomData.pcPos = TRAPS[pcArr[0] as number] as number
        } else {

            if (roomData.pcPos + dice > 100) {
                let remaining = roomData.pcPos + dice - 100
                roomData.pcPos = 100 - remaining
            } else if (roomData.pcPos + dice === 100) {

                roomData.pcPos = 1
                roomData.playerPos = 1
                roomData.playerTurn = true
                roomData.loses += 1
            }
            else {
                roomData.pcPos += dice
            }

            pcArr[0] = roomData.pcPos

        }
        roomData.playerTurn = true;
        await updateRoom(playerID, roomData) // update the room data
        return pcArr;
    } else {
        return false;
    }
}