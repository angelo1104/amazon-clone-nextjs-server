import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import User from "../mongoDB/User.js";
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const router = express.Router()

router.get('/', (req, res) => {
    res.json('Hello Become stripe no square yUPP!')
})

router.post('/create/express-account',async (req, res) => {
    const { email, country } = req.body;

    try {
        const account = await stripe.accounts.create({
            type: "express",
            country: country,
            email: email,
        })

        const accountLink = await stripe.accountLinks.create({
                account: account.id,
                refresh_url: 'https://example.com/reauth',
                return_url: 'http://localhost:3000/seller/products/auth/stripe/handleRedirect',
                type: 'account_onboarding',
            }
        )

        User.findOneAndUpdate({email: email},{
            accountID: account.id
        },(err)=>{
            if (err) console.log(err)
        })

        res.status(200).json(accountLink)
    }catch (error){
        console.log(error)
        res.status(404).json(error)
    }
})

export default router;

//ji