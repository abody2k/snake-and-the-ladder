import { expect, test } from "@playwright/test"
import { login, register } from "../api/auth.api"
import { authSchema } from "../util/schemas";


import dotenv from "dotenv"
import path from "path"


console.log('CONFIGURING EVERYTHING...');
console.log(path.resolve(__dirname,"../.env"));

dotenv.config({

    path:path.resolve(__dirname,"../.env")
})





console.log([process.env.CLIENT,process.env.BASE_URL]);


test.describe("Api tests goes here", () => {




    test("registers a user when a valid credientals are provided", async ({ }) => {


        let response = await register("some usernamee", "some password");

        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(201)// http status
        expect(response.statusText).toBe("Created")



    })

    test("returns token when valid credentials are provided", async ({ }) => {

        let registerResponse = await register("some username", "some password");
        let response = await login("some username", "some password");
        if (authSchema.safeParse(response.data).error){
            console.log(authSchema.safeParse(response.data).error);
            
        }
        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(200)// http status
        expect(response.statusText).toBe("OK");

    })



})