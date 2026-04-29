import { io } from "socket.io-client"

/**
 * a helper class to make connecting to sockets and sending
 * and handling data over sockets easier
 */

export class SocketIoClient {

    socket
    constructor() {

        this.socket = io("http://app:3000")

    }




}