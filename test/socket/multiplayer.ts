import { SocketIoClient } from "./socket-client";

let socket = new SocketIoClient()




export async function joinRoom(roomID: string, userToken: string) {

    return await socket.sendAndWaitForAck("joinRoom", {

        token: userToken,
        roomID: roomID
    })

}




export function listenToLeaderboard() {

    socket.send("leaderboard",{})

}


