import { getSocket } from "$lib/socket";
import type { Socket } from "socket.io-client";



type MultiplayerRoomData = {

    wins: [string, number][], //array of arrays to support more than 2 players [playerID, wins]
    playerTurn: string, //playerID of the player whose turn it is
    playerPos: [string, number][], //array of arrays to support more than 2 players [playerID, position]
}


export async function postRequest(url: string, data: {}, token?: string) {

    if (token) {
        return await fetch(`/api/` + url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "Application/json",
                'Authorization': `Bearer ${token}`
            },

        });
    } else {

        return await fetch(`/api/` + url, {
            body: JSON.stringify(data),
            method: "POST",
            headers: {
                'Content-Type': "Application/json"
            },

        });
    }


}


export async function getRequest(url: string,) {


    return await fetch(`/api/` + url, {
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
    console.log({ token, roomID });

    if (token && roomID)
        response = await socket.emitWithAck("joinRoom", { token, roomID })
    else
        throw new Error("You are not signed in or your token has expired");

    return JSON.parse(response);

}


export async function joinRoom(socket: Socket, roomID: any): Promise<MultiplayerRoomData> {

    const token = localStorage.getItem("token");
    let response;
    console.log({ token, roomID });

    if (token && roomID)
        response = await socket.emitWithAck("joinRoom", { token, roomID })
    else
        throw new Error("You are not signed in or your token has expired");

    return JSON.parse(response);

}



export async function playAgainstPlayer(roomID : string) {
    console.log("Playing invoked .......");
    console.log(roomID);
    
    let socket = getSocket();
    const token = localStorage.getItem("token");
    let response;
    if (token && roomID)
        response = await socket.emitWithAck("play", { token, roomID })
    else
        throw new Error("You are not signed in or your token has expired");

    console.log(response);
    
    return response == 200;
}


export function listenToAllEvents(socket: Socket) {

    console.log("listening");

    socket.on("played", (data) => {
        console.log("PLAYED GOT FIRED");
        console.log(JSON.parse(data));

        window[0].gameUpdated(data);
    });

    socket.on("someoneJoined", (data: any) => {

        //talk to godot and share the info
        console.log(typeof data);
        console.log("someone joined GOT FIRED");
        window[0].userJoined(JSON.stringify(data));

    });
}


export function initUserWithData(data: any,roomID : any) {
    let randomInterval = setInterval(() => {

        if (window[0]) {

            if (window[0].init) {
                data["userID"] = localStorage.getItem("userID")
                data["myTurn"] = data.playerTurn == data["userID"];
                data["roomID"] = roomID
                let item = ((data.playerPos as []).find((value) => value[0] == data["userID"]))
                if (item) {
                    data["pos"] = item[1];
                }
                window[0].init(JSON.stringify(data))
                clearInterval(randomInterval)
            }

        }
    }, 100);
}