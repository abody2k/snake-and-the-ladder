import test, { expect } from "@playwright/test";
import { register } from "../api/auth.api";
import { joinRoom } from "../socket/multiplayer";
import { multiplayRoomSchema } from "../util/schemas";

test.describe("Socket tests goes here", () => {






    test("Joins a room when a valid roomID and token are provided", async () => {


        let res = await register("some random username", "haha")

        const token: string = res.data.token
        const userID = res.data.userID

        let response = JSON.parse(await joinRoom(userID, token))


        expect(multiplayRoomSchema.safeParse(response).success).toBeTruthy()


    })
})