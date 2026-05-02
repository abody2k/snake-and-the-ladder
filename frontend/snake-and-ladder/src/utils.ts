import type { Socket } from "socket.io-client";



type MultiplayerRoomData = {

    wins: [string, number][], //array of arrays to support more than 2 players [playerID, wins]
    playerTurn: string, //playerID of the player whose turn it is
    playerPos: [string, number][], //array of arrays to support more than 2 players [playerID, position]
}


export async function postRequest(url: string, data: {}, token?: string) {

    if (token) {
        return await fetch("http://localhost:3000/api/" + url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "Application/json",
                'Authorization': `Bearer ${token}`
            },

        });
    } else {

        return await fetch("http://localhost:3000/api/" + url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "Application/json"
            },

        });
    }


}


export async function getRequest(url: string,) {


    return await fetch("http://localhost:3000/api/" + url, {
        method: "GET",
        headers: {
            'Content-Type': "Application/json"
        },

    })

}


export async function handleAuthData(data: Response, username: string) {


    const responseObj = await data.json();
    let token = responseObj.token;
    let userID = responseObj.userID;

    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);

}




export async function makeRoom() {


    await postRequest("startGame", {}, localStorage.getItem("token") as string)
}



export async function playAgainstAI() {

    return await (await postRequest("play", {}, localStorage.getItem("token") as string)).json()

}



export async function startMultiplayerGame(socket: Socket): Promise<MultiplayerRoomData> {

    const token = localStorage.getItem("token");
    const roomID = localStorage.getItem("userID");
    let response;
    if (token && roomID)
        response = await socket.emitWithAck("joinRoom", { token, roomID })
    else
        throw new Error("You are not signed in or your token has expired");

    return response;



}




export async function playAgainstPlayer(socket: Socket) {


    const token = localStorage.getItem("token");
    const roomID = localStorage.getItem("userID");
    let response;
    if (token && roomID)
        response = await socket.emitWithAck("play", { token, roomID })
    else
        throw new Error("You are not signed in or your token has expired");

    return response == 200;
}
