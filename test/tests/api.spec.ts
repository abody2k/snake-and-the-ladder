import { expect, test } from "@playwright/test"
import { login, register } from "../api/auth.api"
import { authSchema } from "../util/schemas";



test.describe("Api tests goes here", () => {




    test("registers a user when a valid credientals are provided", async ({ }) => {

        
        let response = await register("some usernamee", "some password");
        
        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(201)// http status
        expect(response.statusText).toBe("Created")



    })

    test("returns token when valid credentials are provided", async ({ }) => {

        
        let response = await login("some usernamee", "some password");
        
        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(200)// http status
        expect(response.statusText).toBe("OK")



    })



})