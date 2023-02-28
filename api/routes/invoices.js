const Invoice = require('../models/Invoice.js');
const express = require("express");
const router = express.Router();

//get all invoice
router.get("/get-all",async (req, res) => {
    try {
        const invoices = await Invoice.find();
        res.status(200).json(invoices);
    } catch (error) {
        res.status(400).json(error)
    }
})

//add a new invoice
router.post("/add-invoice", async (req, res) => {
    try {
        const newInvoice = new Invoice(req.body);
        await newInvoice.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(400).json(error)
    }
})


module.exports = router;