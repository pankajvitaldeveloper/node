const express = require('express');
const router = express.Router();
const productModel = require('../product');

const upload = require('../middleware/upload');//middleware to upload image
const path = require('path');

// Get all products
router.get("/list", async (req, res) => {
    try {
        const product = await productModel.find();
        res.send(product);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

// Get a product by ID
router.get("/get/:id", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        res.send(product);
    } catch (error) {
        console.error("Error getting product:", error);
        res.status(500).send("Error getting product");
    }
}); 

// Search products by name and email
router.get("/search", async (req, res) => {
    try {
        const { name, email } = req.query;
        const query = {};

        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        if (email) {
            query.email = { $regex: email, $options: "i" };
        }

        const products = await productModel.find(query);
        res.send(products);
    } catch (error) {
        console.error("Error searching products:", error);
        res.status(500).send("Error searching products");
    }
});

// Create a new product with image upload
router.post("/create", upload.single('image'), async (req, res) => {
    try {
        const productData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : null
        };
        const product = await productModel.create(productData);
        res.status(201).send(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send("Error creating product");
    }
});

// Update a product with image upload
router.put("/update/:id", upload.single('image'), async (req, res) => {
    try {
        const updateData = {
            ...req.body,
            image: req.file ? `/uploads/${req.file.filename}` : undefined
        };
        const product = await productModel.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send("Error updating product");
    }
});

// Delete a product
router.delete("/delete/:id", async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product);
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("Error deleting product");
    }
});

module.exports = router; 