import { CreateRedisClient, increasePlayers } from "./util.ts";
import { hash, verify } from "argon2"

/**
 * creates an account using given username and password
 * on success the function will return a json web token containing playerID
 * on failure it will throw an error
 * @param param0 username and password as strings
 */
export async function register({ username, password }: { username: string, password: string }) {


    let client = await CreateRedisClient();

    if (await client.get(username)) { // check if user already exists
        client.destroy();
        throw new Error("Username already exist!"); // throw an error

    } else {

        await client.set(username, await hash(password)); // set the username and password
        let playerID = await increasePlayers();

        
        client.destroy();
    }


}

/**
 * logs in and return userID
 * @param param0 username and password
 */
export async function login({ username, password }: { username: string, password: string }) {




}