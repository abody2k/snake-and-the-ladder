import { expect, test } from "@playwright/test"
import { register } from "../api/auth.api"
import { authSchema } from "../util/schemas";



test.describe("Api tests goes here", () => {




    test("registers a user when a valid credientals are provided", async ({ }) => {


        let response = await register("some username", "some password");
        expect(authSchema.safeParse(response.data).success).toBeTruthy()// matches schema
        expect(response.status).toBe(201)// http status
        expect(response.statusText).toBe("Created")



    })





})