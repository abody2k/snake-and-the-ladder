import express from 'express';
import { CreateRedisClient } from './rooms.ts';
import type { RedisClientType } from 'redis';


let client = await CreateRedisClient();



let app = express()
app.use(express.json())
// app.use


app.get("/", async (req, res) => {

    res.send("englizzeee")

    console.log(await (client).get("keyy"));
    client.set("keyy",Date())
    
})

app.post("/login", (req, res) => {



    if (req.body.username && req.body.password) {



    }
})

app.listen(3000, async () => {

    console.log('LISTENING ');


})
