import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import firebaseAdmin from "../firebase/firebaseAdmin.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('I am auth Provider hello hello hello robert kiyosaki here.')
});

router.post('/idtoken', async (req, res) => {
    const {idToken} = req.body;

    const token = await firebaseAdmin.auth().verifyIdToken(idToken);

    res.send(token)
})

export default router;