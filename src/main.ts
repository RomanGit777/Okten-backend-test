import express from "express"
import mongoose from "mongoose";
import {config} from "./configs/config";
import {apiRouter} from "./routers/api.router";
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

const dbConnection = async () => {
    let dbCon = false;

    while (!dbCon) {
        try {
            console.log('Connecting to db...');
            await mongoose.connect(config.MONGO_URI)
            dbCon = true;
            console.log('Database is available');

        }
        catch (e) {
            console.log('Databaise unavailable, wait 3 seconds...');
            await new Promise((resolve) => setTimeout(resolve, 3000))
        }
    }
}

const start = async () => {
    try {
        await dbConnection();
        app.listen(7000, () => {
            console.log(`Server is running on port 7000`)
        })
    } catch (e) {
        // @ts-ignore
        console.log('Error:', e.message);
    }
}

start();