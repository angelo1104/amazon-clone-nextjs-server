import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import firebaseAdmin from "../firebase/firebaseAdmin.js";
import User from "../mongoDB/User.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send('I am auth Provider hello hello hello robert kiyosaki here.')
});

router.post('/idtoken', async (req, res) => {
    const {idToken} = req.body;

    const token = await firebaseAdmin.auth().verifyIdToken(idToken);

    res.status(200).json(token)
})

router.post('/new/user',(req, res) => {
    const {name,email,seller, uid} = req.body;

    const user = new User({
        name: name,
        email: email,
        seller: seller,
        uid: uid,
    });

    user.save((error, doc)=>{
        if (error){
            console.log(error);
            res.status(501).json({
                message: 'We encountered an error.'
            })
        }else {
            res.status(200).json(doc)
        }
    })
})

router.post('/user',(req, res) => {
    const {filter} = req.body;

    console.log(filter)

    User.findOne(filter,(error, user)=>{
        if (error){
            console.log(error);
            res.status(500).json({
                message: 'There is an error'
            })
        }else if (!user){
          res.status(404).json({
              message: 'There are no such users.'
          })
        } else {
            res.status(200).json(user)
        }
    })
})

router.patch('/update/user', (req, res) => {
    const {filter, update} = req.body;

    User.findOneAndUpdate(filter,update,(error,doc)=>{
        if (error){
            res.status(500).json({
                message: 'We encountered an error.'
            })
        }else {
            if (!doc){
                res.status(404).json({
                    message: 'There is no such user'
                })
            }else {
                User.findOne({
                    uid: doc.uid
                },(error, user)=>{
                    if (error){
                        res.status(500).json({
                            message: 'We encountered an error.'
                        })
                    }else {
                        res.status(200).json(user)
                    }
                })
            }
        }
    })
})

router.delete('/delete/user',(req, res) => {
    const {filter} = req.body;

    User.findOneAndDelete(filter,(error)=>{
        if (error){
            res.status(500).json({
                message: 'We encountered an error.'
            })
        }else {
            res.status(200).json({
                message: 'User was successfully deleted'
            })
        }
    })
})

export default router;