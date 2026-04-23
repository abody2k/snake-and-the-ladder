import express from 'express';


let app = express()
app.use(express.json())
// app.use


app.get("/", (req, res) => {

    res.send("englizzeee")
})

app.post("/login", (req, res) => {



    if (req.body.username && req.body.password) {



    }
})

app.listen(3000, () => {


    console.log('LISTENING ');

})
