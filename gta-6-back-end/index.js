import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import * as dotenv from 'dotenv';

dotenv.config();

import User from './models/user.js'


const app = express();
const port = 3000;

mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log('Connect with db!'))
    .catch((error) => console.log(error))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/api', (req, res) => {
    const { name, email } = req.body;

    console.log(`Name: ${name}, email: ${email}`);

    const user = new User({ name, email });
    // console.dir(user);
    user
        .save()
        .then((result) => {
          res.send({ isSuccess: true, result });
        })
        .catch((error) => {
          console.log(error);
          res.send({ isSuccess: false, error }); 
        })
});

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});
