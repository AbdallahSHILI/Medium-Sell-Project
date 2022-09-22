const express = require("express");
const router = express.Router();
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");

//create ew compte
router.post("/signup", authController.signup);

//login by address and psw
router.post("/login", authController.login);

//get profile by current user
router.get(
  "/me",
  authController.protect,
  //  req.user.id and put it in req.params.id
  userController.getMe,
  userController.getUserById
);

// List of all clients for admin
router.get(
  "/AllClients",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findAllClients
);

// List of all admins for admin
router.get(
  "/AllAdmins",
  authController.protect,
  authController.restrictTo("admin"),
  userController.findAllAdmins
);

//get user by id for admin
router.get(
  "/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.getUserById
);

//update user
router.patch("/:id", authController.protect, userController.updateProfile);

//delete user for admin
router.delete(
  "/:idUser",
  authController.protect,
  authController.restrictTo("admin"),
  userController.deleteOneUser
);

module.exports = router;
