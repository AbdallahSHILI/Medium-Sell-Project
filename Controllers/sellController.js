const User = require("../Models/userModel");
const Sell = require("../Models/sellModel");

exports.sellSomething = async (req, res, next) => {
  try {
    // put information about product
    const product = await Sell.create(req.body);
    // Test if product was created
    if (product) {
      // Push the id of current client in new product
      await Sell.findByIdAndUpdate(product.id, {
        $push: { UserID: req.user.id },
      });
      //Add the id of product in the profile current client
      await User.findByIdAndUpdate(req.user.id, {
        $push: { ProductsSelling: product.id },
      });
      return res.status(201).json({
        status: "Success",
        data: {
          product,
        },
      });
    }
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

// Reserve one product
exports.ReserveOneProduct = async (req, res) => {
  try {
    currentUser = req.user;
    // Test if there is a product
    let product = await Sell.findById(req.params.idProduct);
    if (!product) {
      return res.status(400).send({
        message: "No product with that id !! ",
      });
    }
    // Test if the product was open
    if (product.Status == "Open") {
      // Test if the current user send a request
      if (product.ListReserve.includes(currentUser.id)) {
        return res.status(400).send({
          message: "You already want to reserve that one !! ",
        });
      }
      //Add th id of current user in the specific product
      await product.findByIdAndUpdate(req.params.idProduct, {
        $push: { ListReserve: currentUser.id },
      });
      //Add  the id of product in the profile of current user
      await User.findByIdAndUpdate(currentUser.id, {
        $push: {
          RequestSend: req.params.idProduct,
        },
      });
      return res.status(200).json({
        status: "Success",
        data: {
          currentUser,
        },
      });
    }
    return res.status(404).json({
      status: "Product has been reserved !! ",
      err,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};

// Get all products that current user don't send request to it
exports.getAllProducts = async (req, res, next) => {
  try {
    // Test if there is products
    const products = await Sell.find({
      ListReserve: { $ne: req.user.id },
      Status: "Open",
    });
    if (products) {
      return res.status(200).json({
        status: "Success",
        result: products.length,
        data: {
          products,
        },
      });
    }
    return res.status(404).json({
      status: "No products ! ",
      data: err,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

//get all products created by current client
exports.getAllMyProducts = async (req, res) => {
  try {
    // Test if there is products
    const products = await Sell.find({
      UserID: req.user.id,
    });
    if (!products) {
      return res
        .status(400)
        .send({ message: "You don't have any Products !! " });
    }
    return res.status(200).json({
      status: "Success",
      products,
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      err,
    });
  }
};

//get one product by current user
exports.getOneProductById = async (req, res) => {
  try {
    // Test if there is a product
    const product = await Sell.findById(req.params.idProduct);
    if (!product) {
      return res.status(400).send({
        message: "No product with that id !! ",
      });
    }
    // Test if current client is the responsible to this product
    if (product.UserID == req.user.id) {
      return res.status(200).json({
        status: "Success",
        data: {
          product,
        },
      });
    }
    return res.status(404).json({
      status: "You are not the responsible of this product !!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};

// Choose an user to sell product by current user
exports.ChooseClientToSell = async (req, res) => {
  try {
    // Test if there is a product
    let product = await Sell.findById(req.params.idProduct);
    if (!product) {
      return res.status(400).send({
        message: "No product with that id !!",
      });
    }
    if (product.UserID == req.user.id) {
      if (!product.ClientChosen) {
        if (product.ListReserve.includes(req.params.idClient)) {
          product.ClientChosen = req.params.idClient;
          product.Status = "Close";
          await User.findByIdAndUpdate(req.params.idClient, {
            $push: { BuyProducts: req.params.idProduct },
          });
          //save the last changes
          product.save();
          return res.status(200).send({
            status: "Success",
            data: {
              product,
            },
          });
        }
        return res.status(400).send({
          message: "This doesn't send any request!! ",
        });
      }
      return res.status(400).send({
        message: "You already select a user for that product !! ",
      });
    }
    return res.status(400).send({
      message: "You are not the responsible of this product !! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      message: err,
    });
  }
};
//get one product by admin
exports.getOneProductForAdmin = async (req, res) => {
  try {
    // Test if there is a product
    const product = await Sell.findById(req.params.idProduct);
    if (!product) {
      return res.status(400).send({
        message: "No product with that id !! ",
      });
    }
    return res.status(200).json({
      status: "Success",
      data: {
        product,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "Failed",
      data: err,
    });
  }
};
