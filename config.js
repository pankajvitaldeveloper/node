const mongoose = require("mongoose");

// Connect to MongoDB
module.exports = mongoose.connect("mongodb://localhost:27017/first").then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

