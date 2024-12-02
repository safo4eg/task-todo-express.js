import express from 'express'
import mongoose from 'mongoose'
import {PORT, DB_URL} from '../configs/app.js'
import seeder from "../database/seeders/Seeder.js";
import apiRouter from '../routes/api.js'

const app = express();

// загружаем в

app.use(express.json());
app.use('/api', apiRouter);


async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        await seeder.handle();

        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT));
    } catch (e) {
        console.log(e);
    }
}

startApp();