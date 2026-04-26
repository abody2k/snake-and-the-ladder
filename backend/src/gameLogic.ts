//start a new game

import { createRoom } from "./rooms.ts";


//play


//leave the game



export async function startGame(playerID: string) {

    //make a new room #it will purge the previous one if a previous one exists

    await createRoom(playerID);


}

