import { ApiClient } from "./client";

export async function getRoomData(roomID? : string) {
    
    const client = await ApiClient.createClient();

    return await client.get(`/api/getRoom/${roomID}`);
}