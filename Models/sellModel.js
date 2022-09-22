const mongoose = require("mongoose");
const validator = require("validator");

// Clothes Schema
const SellSchema = new mongoose.Schema({
  Called: {
    Type: String,
    required: [true, "please enter your Name "],
  },
  Email: {
    Type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "please enter your email ! "],
    validate: [validator.isEmail, "Please fill a valid email !! "],
  },
  Price: {
    Type: Number,
    required: [true, "Please put the price !!  "],
    select: true,
    default: 1,
  },
  UserID: {
    Type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  Type: {
    Type: String,
    required: [true, "Please put the Type of product !!  "],
    enum: [
      "Transport",
      "SchoolThings",
      "PcAndPhone",
      "OtherThings",
      "HouseThings",
      "Food",
      "ClothesThings",
    ],
    default: "OtherThings",
  },
  // Img: {
  // data: buffer,
  //   contentType: String,
  // },
  Status: {
    Type: String,
    enum: ["Open", "Close"],
    default: "Open",
  },
  ListReserve: [
    {
      Type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  ClientChosen: {
    Type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.models.sell || mongoose.model("sell", SellSchema);
