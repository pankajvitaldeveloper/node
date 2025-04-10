const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/first");

const productSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
  });
const saveProduct = async () => {
 
  const UserModel = mongoose.model("products", productSchema);
  const user = await UserModel({ name: "John3", email: "john3@gmail.com", age: 21 });
  await user.save();
  console.log(user);
};

// saveProduct();

const updateProduct = async () => {
  const UserModel = mongoose.model("products", productSchema);
//   const user = await UserModel.findByIdAndUpdate("67f540373f86da4f7ac7daab", { name: "John4" });
const user = await UserModel.updateOne({name:"John3"},{email:"John4@gmail.com"});

  console.log(user);        
};

// updateProduct();

const deleteProduct = async () =>{
    const UserModel = mongoose.model("products", productSchema);
    // const user = await UserModel.findByIdAndDelete("67f540373f86da4f7ac7daab");
    const user = await UserModel.deleteOne({name:"John3"});
    console.log(user);
}

// deleteProduct();

const findProduct = async () =>{
    const UserModel = mongoose.model("products", productSchema);
    // const user = await UserModel.find();// it will return all the data
    const user = await UserModel.find({name:"John"});// it will return the data of the name John
    console.log(user);
}

findProduct();


app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {    
  console.log("Server is running on port 3000");
});

