import dotenv from "dotenv";
dotenv.config();

//imports
import express from "express";
import Product from "../mongoDB/Product.js";
import db from "../mongoDB/connection.js";
import client from "../algolia/algolia.js";

//router
const router = express.Router();

const productIndex = client.initIndex("amazon_products");

//middlewares

//mongodb stuff
db.once("open", () => {
  const productCollection = db.collection("products");

  const changeStream = productCollection.watch();

  changeStream.on("change", (change) => {
    const index = client.initIndex("amazon_products");

    if (change.operationType === "insert") {
      //do create stuff

      // get id of product by change.documentKey._id
      // get product by change.fullDocument

      const product = change.fullDocument;

      const algoliaProduct = {
        name: product.name,
        brand: product.brand,
        description: product.shortDescription,
        avatar: product.avatar,
        price: product.price,
      };

      index
        .saveObject({ ...algoliaProduct, objectID: product._id })
        .then((object) => {
          console.log(object);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (change.operationType === "update") {
      //do update stuff

      // get id of product by change.documentKey._id
      // get updated fields by change.updateDescription.updatedFields
      const updatedFields = change.updateDescription.updatedFields;

      const productID = change.documentKey._id;

      Product.findOne({ _id: productID }, (error, product) => {
        if (error) {
          console.log(error);
        } else if (!product) {
          console.log("No such product");
        } else {
          const algoliaProduct = {
            name: product.name,
            brand: product.brand,
            description: product.shortDescription,
          };

          index
            .partialUpdateObject(
              { ...algoliaProduct, objectID: productID },
              {
                createIfNotExists: false,
              }
            )
            .then((object) => {
              console.log(object);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else if (change.operationType === "delete") {
      //do delete stuff

      // get id of product by change.documentKey._id
      const objectID = change.documentKey._id;

      index
        .deleteObject(objectID.toString())
        .then((object) => {
          console.log(object);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });
});

//routes
router.get("/", (req, res) => {
  res.status(400).json({
    mess: "Hello hello Robert Kiyosaki in the products here.",
  });
});

router.post("/read", (req, res) => {
  const { filter } = req.body;

  Product.findOne({ ...filter }, (error, product) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error.",
      });
    } else if (!product) {
      res.status(500).json({
        message: "No product found.",
      });
    } else {
      res.status(200).json({
        message: "Success",
        product: product,
      });
    }
  });
});

router.post("/paginate", async (req, res) => {
  const { page, query } = req.body;

  const resultsPerPage = 12;

  try {
    const { hits, nbPages } = await productIndex.search(query, {
      page: parseInt(page) - 1,
      hitsPerPage: resultsPerPage,
      typoTolerance: "min",
    });

    if (nbPages > parseInt(page)) {
      //there are pages left means next...
      res.status(200).json({
        next: true,
        hits: hits,
      });
    } else if (nbPages === parseInt(page)) {
      //it is last page no next
      res.status(200).json({
        next: false,
        hits: hits,
      });
    } else if (nbPages < parseInt(page)) {
      //page is greater than number have so send nothing left you consumed all you beautiful young hot sexy girl.
      res.status(200).json({
        next: false,
        hits: hits,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/create", (req, res) => {
  const { product } = req.body;

  const createProduct = new Product({ ...product });

  createProduct.save((error, document) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error.",
      });
    } else {
      res.status(200).json(document);
    }
  });
});

router.patch("/updateStatus", (req, res) => {
  const { status, filter } = req.body;

  Product.findOneAndUpdate(filter, { status: status }, (error, doc) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error.",
      });
    } else if (!doc) {
      res.status(400).json({
        message: "No such product",
      });
    } else {
      Product.findOne(filter, (error, product) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Internal server error.",
          });
        } else if (!product) {
          res.status(400).json({
            message: "Product not found.",
          });
        } else {
          res.status(200).json({
            message: "Successfully updated",
            product: product,
          });
        }
      });
    }
  });
});

router.put("/update", (req, res) => {
  const { filter, update } = req.body;

  Product.findOneAndUpdate(filter, { ...update }, (error, doc) => {
    if (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server error.",
      });
    } else if (!doc) {
      res.status(400).json({
        message: "No product found.",
      });
    } else {
      Product.findOne(filter, (error, product) => {
        if (error) {
          console.log(error);
          res.status(500).json({
            message: "Internal server error.",
          });
        } else if (!product) {
          res.status(400).json({
            message: "No such product",
          });
        } else {
          res.status(200).json({
            message: "Product successfully updated.",
            product: product,
          });
        }
      });
    }
  });
});

router.delete("/delete", (req, res) => {
  const { filter } = req.body;

  Product.findOneAndDelete(filter, (error, products) => {
    if (error) {
      console.log(error);

      res.status(500).json({
        message: "Internal server error.",
      });
    } else if (!products) {
      res.status(400).json({
        message: "No such product",
      });
    } else {
      res.status(200).json({
        message: "Successfully deleted",
        deletedProduct: products,
      });
    }
  });
});

//exports
export default router;
