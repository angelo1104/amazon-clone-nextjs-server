import dotenv from "dotenv";
dotenv.config();

//imports
import express from "express";
import Order from "../mongoDB/Order";

//define router
const router = express.Router();


//middlewares


//routes
router.get('/',(req, res) => {
    res.json({
        message: 'Hello hello hello order Kiyosaki here.'
    })
});


export default router;