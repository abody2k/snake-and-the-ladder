import { ApiClient } from "./client";
const client = await ApiClient.createClient();


export async function register(username: string, password: string) {



    return await client.post("/api/register", {

        username: username,
        password: password
    })


}


export async function login(username: string, password: string) {


    
    return await client.post("/api/login", {

        username: username,
        password: password
    })
}