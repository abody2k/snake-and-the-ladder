import test, { expect } from "@playwright/test";
import { register } from "../api/auth.api";
import { joinRoom, leaveLeaderboard, listenToLeaderboard, play } from "../socket/multiplayer";
import { multiplayRoomSchema } from "../util/schemas";

test.describe("Socket tests goes here", () => {






    test("Joins a room when a valid roomID and token are provided", async () => {


        let res = await register("some random username", "haha")

        const token: string = res.data.token
        const userID = res.data.userID

        let response = JSON.parse(await joinRoom(userID, token))


        expect(multiplayRoomSchema.safeParse(response).success).toBeTruthy()


    })




    test("Returns status 200 when joining leaderboard room", async () => {


        let response = await listenToLeaderboard()



        expect(response).toBe(200)


    })



    test("Returns status 200 when user plays in their turn", async () => {

        //make an account

        let res = await register("special multiplayer username", "haha")

        const token: string = res.data.token
        const userID = res.data.userID
        //make a room and join it

        await joinRoom(userID, token);
        //play
        let playResponse = await play(userID, token)
        expect(playResponse).toBe(200)





    })




    test("Returns status 200 when leaving leaderboard room", async () => {


        let response = await leaveLeaderboard()



        expect(response).toBe(200)


    })
})