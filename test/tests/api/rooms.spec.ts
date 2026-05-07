import { expect, test } from "@playwright/test"
import { register } from "../../api/auth.api"


import dotenv from "dotenv"
import path from "path"
import { randomInt } from "crypto";
import { createRoom, getRoomData } from "../../api/rooms.api";


dotenv.config({

    path: path.resolve(__dirname, "../../.env")
})



test.describe("Api tests goes here", () => {


    test("fails to return room data when no roomID is provided ", async ({ }) => {
        const response = await getRoomData();
        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })



    test("fails to return room data when an invalid roomID is provided ", async ({ }) => {
        const response = await getRoomData("Xsdcds");
        // all room IDs are made of numbers hence sending an ID with
        //a character means a room does not exist

        expect(response.status).toBe(400)// http status
        expect(response.statusText).toBe("Bad Request");

    })







    test("Returns room data when valid roomID is provided ", async ({ }) => {


        const username = "username : " + randomInt(100000);
        const authData = await register(username, "random password");
        const token = authData.data.token;
        const roomID = authData.data.userID;
        await createRoom(token);
        const response = await getRoomData(roomID);
        expect(response.status).toBe(200)// http status
        expect(response.statusText).toBe("OK");

    })


    test("Fails to create a room when valid token is not provided ", async ({ }) => {

        const response = await createRoom();
        expect(response.status).toBe(403)// http status
        expect(response.statusText).toBe("Forbidden");

    })


    test("Creates a room when valid token is provided ", async ({ }) => {

        const username = "username : " + randomInt(100000);
        const authData = await register(username, "random password");
        const token = authData.data.token;
        const response = await createRoom(token);
        expect(response.status).toBe(201)// http status
        expect(response.statusText).toBe("Created");

    })


})