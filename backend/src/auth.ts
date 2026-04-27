import { CreateRedisClient, increasePlayers } from "./util.ts";
import { hash, verify } from "argon2"
import jwt from "jsonwebtoken"
/**
 * creates an account using given username and password
 * on success the function will return a json web token containing playerID
 * on failure it will throw an error
 * @param param0 username and password as strings
 */
export async function register({ username, password }: { username: string, password: string }): Promise<string> {


    let client = await CreateRedisClient();

    if (await client.get(username)) { // check if user already exists
        client.destroy();
        throw new Error("Username already exist!"); // throw an error

    } else {

        await client.set(username, await hash(password)); // set the username and password

        let playerID = await increasePlayers();
        await client.set(`${username}ID`, playerID)
        client.destroy();

        return jwt.sign({ userID: playerID }, process.env.SECRET);
    }


}

/**
 * logs in and return userID
 * @param param0 username and password
 */
export async function login({ username, password }: { username: string, password: string }) {


    let client = await CreateRedisClient();

    let hashh = (await client.get(username))

    if (hashh) {
        console.log([hash, password, process.env.SECRET]);

        if (await verify(hashh, password)) {
            let playerID = (await client.get(`${username}ID`)) as string
            return jwt.sign({ userID: playerID, "username": username }, process.env.SECRET)
        } else {

            return false;
        }
    } else {

        return false;

    }
}