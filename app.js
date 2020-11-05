import dotenv from 'dotenv';
dotenv.config()
//imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'
import authRouter from "./Routes/auth.js";

//app define
const port = process.env.PORT || 3001
const app = express();

//database realtime stuff
mongoose.connect(process.env.MONGOOSE_URL, {useNewUrlParser: true, useUnifiedTopology:true},(error)=>{
    console.log('Error in MongoDB --->',error)
})

const db = mongoose.connection;

db.once('open',()=>{
    console.log('MongoDB connected to the remote db.')
})

//middlewares
app.use(cors());

app.use(bodyParser.json())

app.use('/auth', authRouter)

//api routes
app.get('/',(req, res) => {
    res.send('Hello is this amazon you are in the correct palace.');
})

//listen command
app.listen(port,()=>{
    console.log('Server started on port ' + port);
});

