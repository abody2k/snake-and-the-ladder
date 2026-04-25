import { createClient } from "redis";

export async function CreateRedisClient() {

    let client = await createClient({
        url: "redis://redis"
    }).connect();

    return client;

}