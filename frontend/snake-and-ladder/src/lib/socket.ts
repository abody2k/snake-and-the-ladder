import { io, Socket } from "socket.io-client";

let socket: Socket


export function getSocket() {

    if (!socket) {
        socket = io("http://app:3000/", {
            autoConnect: false
        });

    }

    return socket;
}