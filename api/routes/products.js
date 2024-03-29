const Product = require('../models/Product.js');
const express = require("express");
const router = express.Router();

//get all product
router.get("/get-all",async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error)
    }
})

//add a new product
router.post("/add-product", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(400).json(error)
    }
})

//update product element
router.put("/update-product",async (req, res) => {
    try {
       await Product.findOneAndUpdate({_id:req.body.productId}, req.body);
        res.status(200).json("Item updated successfully.");
    } catch (error) {
        res.status(400).json(error)
    }
})

//delete product element
router.delete("/delete-product",async (req, res) => {
    try {
       await Product.findOneAndDelete({_id:req.body.productId});
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        res.status(400).json(error)
    }
})

//search product element
router.get('/search', async (req, res) => {
    try {
      const category = req.query.category;
      const query = req.query.q;
      let regex = new RegExp(query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
      let products;
      if (category === 'All') {
        products = await Product.find({ title: regex });
      } else {
        products = await Product.find({ category: category, title: regex });
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;