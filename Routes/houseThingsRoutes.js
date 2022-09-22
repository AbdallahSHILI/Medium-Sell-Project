const express = require("express");
const router = express.Router();
const sellController = require("../Controllers/sellController");
const authController = require("../Controllers/authController");

//sell product by current client
router.post(
  "/",
  authController.protect,
  authController.restrictTo("client"),
  sellController.sellSomething
);

//Reserve one product by current client
router.patch(
  "/:idProduct",
  authController.protect,
  authController.restrictTo("client"),
  sellController.ReserveOneProduct
);

// List of products to reserve for current client
router.get(
  "/",
  authController.protect,
  authController.restrictTo("client"),
  sellController.getAllProducts
);

// List of products created by current client
router.get(
  "/MyProducts",
  authController.protect,
  authController.restrictTo("client"),
  sellController.getAllMyProducts
);

//get one product by id for current client
router.get(
  "/:idProduct",
  authController.protect,
  authController.restrictTo("client"),
  sellController.getOneProductById
);

//Choose one client by current client
router.patch(
  "/Choose/:idProduct/:idClient",
  authController.protect,
  authController.restrictTo("designer"),
  sellController.ChooseClientToSell
);

// Get one product for an admin
router.get(
  "/Administrator/:idProduct",
  authController.protect,
  authController.restrictTo("admin"),
  sellController.getOneProductForAdmin
);

module.exports = router;
