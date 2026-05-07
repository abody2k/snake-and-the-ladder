import { expect, test } from "@playwright/test"
import { login, register } from "../../api/auth.api"
import { authSchema } from "../../util/schemas";


import dotenv from "dotenv"
import path from "path"
import { randomInt } from "crypto";

dotenv.config({

    path: path.resolve(__dirname, "../../.env")
})





test.describe("Api auth tests goes here", () => {




    test("registers a user when a valid credientals are provided", async ({ }) => {

        const username = "username : " + randomInt(100);
        let response = await register(username, "some password");

        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(201)// http status
        expect(response.statusText).toBe("Created")



    })

    test("Logs in when valid credentials are provided", async ({ }) => {
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




    test("Fails to log in when username is not provided", async ({ }) => {
        const username = "username : " + randomInt(100);
        await register(username, "some password");
        let response = await login(username);
        expect(authSchema.safeParse(response.data).success).toBeFalsy()// matches schema
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })



    test("Fails to log in when password is not provided", async ({ }) => {
        const username = "username : " + randomInt(100000);
        await register(username, "some password");
        let response = await login(undefined, "some password");
        expect(authSchema.safeParse(response.data).success).toBeFalsy()// matches schema
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })


    test("Fails to log in when no credentials are provided", async ({ }) => {
        const username = "username : " + randomInt(100000);
        await register(username, "some password");
        let response = await login();
        expect(authSchema.safeParse(response.data).success).toBeFalsy()// matches schema
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })
})