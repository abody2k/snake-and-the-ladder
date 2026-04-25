import express from 'express';
import { createRoom, getRoom, initRoom } from './rooms.ts';
import { CreateRedisClient, initDotEnv } from './util.ts';
import { login, register } from './auth.ts';


initDotEnv();

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


app.listen(3000, async () => {

    console.log('LISTENING ');


})
