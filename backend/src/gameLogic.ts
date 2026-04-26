//start a new game
import { randomInt } from "crypto"
import { createRoom, getRoom } from "./rooms.ts";

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

//play


//leave the game



export async function startGame(playerID: string) {

    //make a new room #it will purge the previous one if a previous one exists

    await createRoom(playerID);


}

/**
 * Plays if it is the player turn and returns the number or
 * change of numbers that shows the final position of the
 * player, otherwise it will return false
 * @param playerID 
 */
export async function play(playerID: string) {

    //get room data

    let roomData = await getRoom(playerID)

    if (roomData) {

        if (roomData.playerTurn) {

            let dice = randomInt(1, 8); // throw dice
            let playerArr = [roomData.playerPos + dice] // add the new value to destination
            if (Object.hasOwn(TRAPS, playerArr[0] as number)) { // is it a trap?
                playerArr.push(TRAPS[playerArr[0] as number] as number) // if so take the player to a new destination

            }

            return playerArr;


        } else {
            return false;
        }

    } else {

        return false;
    }

}