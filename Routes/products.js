import dotenv from 'dotenv';
dotenv.config();

//imports
import express from 'express';
import Product from "../mongoDB/Product.js";


//router
const router = express.Router();


//middlewares



//mongodb stuff




//routes
router.get('/',(req, res) => {
    res.status(400).json({
        mess: 'Hello hello Robert Kiyosaki in the products here.'
    })
})

router.post('/create', (req, res) => {
    const {owner, helpers, product, assets, address} = req.body;

    const createProduct = new Product({
        owner: owner,
        helpers: helpers,
        product: product,
        assets: assets,
        address: address,
        status: 'LIVE'
    })

    createProduct.save((error, document)=>{
        if (error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error.'
            })
        }else {
            res.status(200).json(document)
        }
    })
})


router.patch('/updateStatus', (req, res) => {
    const {status, filter} = req.body;

    Product.findOneAndUpdate(filter, {status: status}, (error, doc)=>{
        if (error){
            console.log(error)
            res.status(500).json({
                message: 'Internal server error.'
            })
        }else if (!doc){
            res.status(400).json({
                message: 'No such product'
            })
        }else {
            
        }
    })
})


router.delete('/delete',(req, res) => {
    const {filter} = req.body;

    Product.findOneAndDelete(filter, (error, products)=>{
        if (error){
            console.log(error)

            res.status(500).json({
                message: 'Internal server error.'
            })
        }else if (!products){
            res.status(400).json({
                message: 'No such product'
            })
        }else {
            res.status(200).json({
                message: 'Successfully deleted',
                deletedProduct: products
            })
        }
    })
})



//exports
export default router