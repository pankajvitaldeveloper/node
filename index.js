const express = require("express");
const config = require("./config");
const productRoutes = require("./routes/productRoutes");
const app = express();
app.use(express.json());


// Use product routes
app.use("/api/products", productRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

