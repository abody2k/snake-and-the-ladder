import { io } from "socket.io-client"

/**
 * a helper class to make connecting to sockets and sending
 * and handling data over sockets easier.
 * IT AUTOMATICALLY CONNECTS TO THE SERVER!
 */

export class SocketIoClient {

    socket
    constructor() {

        this.socket = io(process.env.BASE_URL)

    }

    /**
     * Sends the data in a sync way
     * @param event 
     * @param data 
     */
    send(event: string, data: {}) {

        this.socket.emit(event, data)
    }

    /**
     * sends the data and waits for an acknowledgement
     * @param event 
     * @param data 
     */
    async sendAndWaitForAck(event: string, data: {}) {

        try {
            let response = await this.socket.emitWithAck(event, data);
            console.log(response);
            
            return response;

        } catch (error) {
            console.log(error);

        }
    }

    disconnect(){

        this.socket.disconnect()
    }

}