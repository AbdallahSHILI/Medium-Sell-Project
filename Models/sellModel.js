const mongoose = require("mongoose");
const validator = require("validator");

// Clothes Schema
const sellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name "],
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "please enter your email ! "],
    validate: [validator.isEmail, "Please fill a valid email !! "],
  },
  Price: {
    type: Number,
    required: [true, "Please put the price !!  "],
    select: true,
    default: 1,
  },
  UserID: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: [true, "Please put the type of product !!  "],
    enum: [
      "Transport",
      "SchoolThings",
      "PCandPhone",
      "OtherThings",
      "HouseThings",
      "Food",
      "ClothesThings",
    ],
    default: "OtherThings",
  },
  img: {
    data: buffer,
    contentType: String,
  },
  Status: {
    type: String,
    enum: ["Open", "Close"],
    default: "Open",
  },
  ListeReserve: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  clientChoosen: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Sell = mongoose.model("Food", sellSchema);
module.exports = Sell;
