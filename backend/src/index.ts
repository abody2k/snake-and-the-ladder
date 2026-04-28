import express from 'express';
import { createRoom, getRoom, initRoom, type MultiplayerRoomData } from './rooms.ts';
import { CreateRedisClient, flushingDB, getTokenData, initDotEnv, isUserAuthorized } from './util.ts';
import { login, register } from './auth.ts';
import { pcPlay, play, startGame } from './gameLogic.ts';
import * as io from "socket.io"
import { createServer } from "http"
import { joinRoom, playMultiplayer, startMultiplayerGame } from './multiplayerLogic.ts';




initDotEnv();

let client = await CreateRedisClient();

await flushingDB()
await initRoom()


let app = express()
let server = createServer(app)
let socketIOServer = new io.Server(server)
app.use(express.json())

socketIOServer.on('connection', (socket) => {




    socket.on("leaderboard", () => {


        socket.join("leaderboard");

    })


    socket.on("play", async (data: { roomID: string, token: string }) => {

        const tokenData = getTokenData(data.token)

        if (tokenData) {

            let playerPosition = await playMultiplayer(tokenData.userID, tokenData.username, socketIOServer)
            if (playerPosition != false) {

                socketIOServer.to(data.roomID).emit(JSON.stringify(playerPosition))
            }
        }

    })

    socket.on("joinRoom", async (data: { token: string, roomID: string }) => {

        const tokenData = getTokenData(data.token)

        if (tokenData) {
            const roomData = await getRoom(data.roomID);
            if (roomData != null) {
                await joinRoom(tokenData.userID, roomData as MultiplayerRoomData, data.roomID)
                //leave previous rooms
                const rooms = socket.rooms
                if (rooms.size > 1) {
                    let arr = rooms.values().toArray()
                    for (let i = 1; i < arr.length; i++) {
                        await socket.leave(arr[i] as string)
                    }
                }
                socket.join(data.roomID)
                socket.emit(JSON.stringify(roomData))
            }

        } else {
            socket.disconnect(true);
        }
    })


    socket.on("lb", () => { //leave leaderboard room

        socket.leave("leaderboard");

    })

})


app.get("/", async (req, res) => {

    res.send("englizzeee")

    console.log(await (client).get("keyy"));
    client.set("keyy", Date())

})





app.get("/getRoom/:roomID", async (req, res) => {



    if (req.params.roomID) {

        try {
            let roomData = await getRoom(req.params.roomID);
            res.json(roomData);

        } catch (error) {
            res.sendStatus(400);

        }
    }
})



app.post("/register", async (req, res) => {



    try {
        if (req.body.username && req.body.password) {
            let token = await register({ username: req.body.username, password: req.body.password });
            res.send({
                "token": token
            })

        } else {


            res.sendStatus(400);
        }
    } catch (error) {
        console.log(error);

        res.sendStatus(400);

    }

})

app.post("/login", async (req, res) => {


    try {
        if (req.body.username && req.body.password) {

            let token = await login({ username: req.body.username, password: req.body.password })

            if (token) {
                console.log("USER DOES EXIST");
                res.json({ token: token })
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



app.post("/startGame", async (req, res) => {


    let token = isUserAuthorized(req.headers);

    if (token) {
        const userID = token.userID;
        await startGame(userID);
        res.sendStatus(201);
    } else {

        res.sendStatus(400);
    }
})



app.post("/startGameM", async (req, res) => { // multiplayer game


    let token = isUserAuthorized(req.headers);

    if (token) {
        const userID = token.userID;
        await startMultiplayerGame(userID);
        res.sendStatus(201);
    } else {

        res.sendStatus(400);
    }
})



app.post("/play", async (req, res) => {


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
