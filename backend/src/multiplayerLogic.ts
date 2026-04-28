//make a room

import { createMultiplayerRoom } from "./rooms.ts";




export async function startMultiplayerGame(playerID: string) {


    await createMultiplayerRoom(playerID);


}
//play a turn

//leaving a room

