const express = require("express");
const router = express.Router();
const clothesController = require("../controllers/clothesController");

//sell product by current client
router.post(
  "/",
  authController.protect,
  authController.restrictTo("client"),
  clothesController.sellSomething
);

//Reserve one product by curent client
router.patch(
  "/:idProduct",
  authController.protect,
  authController.restrictTo("client"),
  commandeController.ReserveOneProduct
);

// Liste of products to reserve for current client
router.get(
  "/",
  authController.protect,
  authController.restrictTo("client"),
  userController.getAllProducts
);

// Liste of products maked by current client
router.get(
  "/MyProducts",
  authController.protect,
  authController.restrictTo("client"),
  userController.getAllMyProducts
);

//get one product by id for current client
router.get(
  "/:idProdcut",
  authController.protect,
  authController.restrictTo("client"),
  userController.getOneProductById
);

//Choose one client by cuurent client
router.patch(
  "/Choose/:idProduct/:idClient",
  authController.protect,
  authController.restrictTo("designer"),
  commandeController.ChooseClientToSell
);

// Get one product for an admin
router.get(
  "/Administrator/:idProduct",
  authController.protect,
  authController.restrictTo("admin"),
  commandeController.getOneProductForAdmn
);

module.exports = router;
