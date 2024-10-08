import express from "express";
import router from "./src/routes/api.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use('/api',router)

export {app};
