import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes)

app.listen(5000, () =>{
    console.log("Servidor disponível em http://localhost:5000")
})