import dotenv from 'dotenv';
dotenv.config()
//imports
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser'

//app define
const port = process.env.PORT || 3000
const app = express();

//database realtime stuff
mongoose.connect(process.env.MONGOOSE_URL, {useNewUrlParser: true, useUnifiedTopology:true},(error)=>{
    console.log(error)
})

const db = mongoose.connection;

db.once('open',()=>{
    console.log('MongoDB connected to the remote db.')
})

//middlewares
app.use(cors())

//api routes
app.get('/',(req, res) => {
    res.send('Hello is this amazon you are in the correct palace.')
})

//listen command
app.listen(port,()=>{
    console.log('Server started on port ' + port);
});


//password - VzOxKm4IFm6zEIiR