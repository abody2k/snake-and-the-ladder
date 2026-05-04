import express from 'express';
import { createMultiplayerRoom, createRoom, getRoom, initRoom, type MultiplayerRoomData } from './rooms.ts';
import { CreateRedisClient, flushingDB, getTokenData, initDotEnv, isUserAuthorized } from './util.ts';
import { login, register } from './auth.ts';
import { pcPlay, play, startGame } from './gameLogic.ts';
import * as io from "socket.io"
import { createServer } from "http"
import { joinRoom, playMultiplayer, startMultiplayerGame } from './multiplayerLogic.ts';
import { getLeaderboard } from './leaderboard.ts';

import cors from "cors"


initDotEnv();

let client = await CreateRedisClient();

await flushingDB()
await initRoom()


let app = express()
let server = createServer(app)
let socketIOServer = new io.Server(server, {
    cors: {
        origin: "*"
    }

})
app.use(cors({
    origin: "*"
}));
app.use(express.json())

socketIOServer.on('connection', (socket) => {


    console.log("What a man world")

    socket.on("leaderboard", async (_, ack) => {

        console.log([_, ack]);

        socket.join("leaderboard");
        ack(200);
        socket.emit("lbu", await getLeaderboard())

    })


    socket.on("play", async (data: { roomID: string, token: string }, ack) => {

        const tokenData = getTokenData(data.token)

        if (tokenData) {

            let playerPosition = await playMultiplayer(tokenData.userID, data.roomID, tokenData.username, socketIOServer)
            if (playerPosition != false) {

                socketIOServer.to(data.roomID).emit("played", JSON.stringify(playerPosition))
                ack(200);
            } else {
                ack(403);
            }
        } else {
            ack(401);
        }

    })

    socket.on("joinRoom", async (data: { token: string, roomID: string }, ack) => {

        const tokenData = getTokenData(data.token)

        if (tokenData) {
            let roomData = await getRoom(data.roomID);
            if (roomData != null) {
                await joinRoom(tokenData.userID,tokenData.username, roomData as MultiplayerRoomData, data.roomID)
                //leave previous rooms
                const rooms = socket.rooms;
                if (rooms.size > 1) {
                    let arr = rooms.values().toArray()
                    for (let i = 1; i < arr.length; i++) {
                        await socket.leave(arr[i] as string)
                    }
                }



                roomData = await getRoom(data.roomID); // sends to them the new data
                socketIOServer.to(data.roomID).emit("someoneJoined", roomData)
                socket.join(data.roomID)
                ack(JSON.stringify(roomData))
                console.log(`Joining room with UD ${data.roomID}`);
                console.log("JOINED A ROOM");

            } else if (tokenData.userID === data.roomID) { // create multiplayer room


                console.log("CREATED A ROOM");

                await createMultiplayerRoom(tokenData.userID,tokenData.username)
                roomData = await getRoom(tokenData.userID);
                socket.join(tokenData.userID)
                console.log(`Making room with UD ${tokenData.userID}`);


                ack(JSON.stringify(roomData))



            } else {

                socket.disconnect();
            }

        } else {
            socket.disconnect(true);
        }
    })


    socket.on("lb", (_, ack) => { //leave leaderboard room

        socket.leave("leaderboard");
        ack(200);

    })


    socket.on("disconnect", () => {
        console.log("USER LEFT");

    })

})


app.get("/api", async (req, res) => {

    res.send("englizzeee")

    console.log(await (client).get("keyy"));
    client.set("keyy", Date())

})





app.get("/api/getRoom/:roomID", async (req, res) => {



    if (req.params.roomID) {

        try {
            let roomData = await getRoom(req.params.roomID);
            res.json(roomData);

        } catch (error) {
            res.sendStatus(400);

        }
    }
})



app.post("/api/register", async (req, res) => {



    try {
        if (req.body.username && req.body.password) {
            let token = await register({ username: req.body.username, password: req.body.password });
            res.status(201).send({
                "token": token.token,
                "userID": (token.userID.toString())
            })

        } else {


            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);

        res.sendStatus(400);

    }

})

app.post("/api/login", async (req, res) => {


    try {
        if (req.body.username && req.body.password) {

            let data = await login({ username: req.body.username, password: req.body.password })

            if (data) {

                console.log("USER DOES EXIST");
                res.json({ token: data.token, userID: data.userID })
            } else {
                console.log("USER DOES NOT EXIST");

                res.sendStatus(400);
            }
        } else {
            console.log("MISSING DATA");
            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);

        res.sendStatus(400);

    }



})



app.post("/api/startGame", async (req, res) => {


    let token = isUserAuthorized(req.headers);

    if (token) {
        const userID = token.userID;
        await startGame(userID);
        res.sendStatus(201);
    } else {

        res.sendStatus(400);
    }
})



app.post("/api/startGameM", async (req, res) => { // multiplayer game


    let token = isUserAuthorized(req.headers);

    if (token) {
        const userID = token.userID;
        await startMultiplayerGame(userID,token.username);
        res.sendStatus(201);
    } else {

        res.sendStatus(400);
    }
})



app.post("/api/play", async (req, res) => {


    let token = isUserAuthorized(req.headers);

    if (token) {
        const userID = token.userID;
        let arr = await play(userID, token.username, socketIOServer); // play as a player

        if (arr) {

            let pcArr = await pcPlay(userID);
            res.json({
                plyrPos: arr,
                pcPos: pcArr
            })
        } else {

            res.sendStatus(403);
        }
    } else {

        res.sendStatus(400);
    }
})




server.listen(3000, async () => {


    console.log('LISTENING ');


})
