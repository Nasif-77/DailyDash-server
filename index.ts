import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import { router } from "./routes/routes";
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()

const app = express()


mongoose.connect(process.env.DATABASE_URL as string, {
})
const db = mongoose.connection
db.on('error', (err) => {
    console.log(err);
})
db.once('open', () => {
    console.log('connected to database');
})

app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)


const port = process.env.PORT


app.listen(port, () => {
    console.log(`port connected in ${port}`)
}) 