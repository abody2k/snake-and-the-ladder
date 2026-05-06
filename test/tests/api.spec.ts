import { expect, test } from "@playwright/test"
import { login, register } from "../api/auth.api"
import { authSchema } from "../util/schemas";


import dotenv from "dotenv"
import path from "path"
import { randomInt } from "crypto";


console.log('CONFIGURING EVERYTHING...');
console.log(path.resolve(__dirname, "../.env"));

dotenv.config({

    path: path.resolve(__dirname, "../.env")
})





console.log([process.env.CLIENT, process.env.BASE_URL]);


test.describe("Api tests goes here", () => {




    test("registers a user when a valid credientals are provided", async ({ }) => {

        const username = "username : " + randomInt(100);
        let response = await register(username, "some password");

        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(201)// http status
        expect(response.statusText).toBe("Created")



    })

    test("returns token when valid credentials are provided", async ({ }) => {
        const username = "username : " + randomInt(100);
        await register(username, "some password");
        let response = await login(username, "some password");
        if (authSchema.safeParse(response.data).error) {
            console.log(authSchema.safeParse(response.data).error);

        }
        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(200)// http status
        expect(response.statusText).toBe("OK");

    })




    test("returns Bad Request when registering without a username", async ({ }) => {


        const response = await register("", "some password");
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })



    test("returns Bad Request when registering without a password", async ({ }) => {
        const username = "username : " + randomInt(100000);
        const response = await register(username, "");
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })


    test("returns Bad Request when no credentials are provided", async ({ }) => {
        const response = await register("", "");
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })

})