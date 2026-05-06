import { ApiClient } from "./client";

export async function getRoomData(roomID?: string) {

    const client = await ApiClient.createClient();

    return await client.get(roomID ? `/api/getRoom/${roomID}` : `/api/getRoom`);
}




export async function createRoom(token?: string) {

    const client = await ApiClient.createClient();

    return await client.post(`/api/startGame`, {}, token);
}