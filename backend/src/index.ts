import express from 'express';
import { CreateRedisClient, createRoom } from './rooms.ts';
import type { RedisClientType } from 'redis';


let client = await CreateRedisClient();



let app = express()
app.use(express.json())
// app.use


app.get("/", async (req, res) => {

    res.send("englizzeee")

    console.log(await (client).get("keyy"));
    client.set("keyy", Date())

})

app.post("/login", (req, res) => {



    if (req.body.username && req.body.password) {



    }
})



app.post("/createRoom", async (req, res) => {



    if (req.body.playerID) {

        try {
            await createRoom(req.body.playerID);
            res.sendStatus(200);

        } catch (error) {
            res.sendStatus(400);

        }
    }
})


app.listen(3000, async () => {

    console.log('LISTENING ');


})
