import dotenv from "dotenv"
import path from "path"


console.log('CONFIGURING EVERYTHING...');

dotenv.config({

    path:path.resolve(__dirname,"../.env")
})



