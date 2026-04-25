import express from 'express';
import { createRoom, getRoom, initRoom } from './rooms.ts';
import { CreateRedisClient } from './util.ts';


let client = await CreateRedisClient();
await initRoom()


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



app.get("/createRoom", async (req, res) => {



        try {
            
            res.send(await createRoom());

        } catch (error) {
            res.sendStatus(400);

        }

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

app.listen(3000, async () => {

    console.log('LISTENING ');


})
