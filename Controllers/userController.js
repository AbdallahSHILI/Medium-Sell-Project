const User = require("../models/UserModel");

//get current user using the getUserByID
exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

// find all clients for admin
exports.findAllClients = async (req, res, next) => {
  try {
    // Test if there is clients
    const doc = await User.find({ role: "client" });
    return res.status(200).json({
      status: "succes",
      result: doc.length,
      data: {
        doc,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "echec",
      data: err,
    });
  }
};

// find all admins for admin
exports.findAllAdmins = async (req, res, next) => {
  try {
    // Test if there is admins
    const doc = await User.find({ role: "admin" });
    return res.status(200).json({
      status: "succes",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  } catch (err) {
    return res.status(404).json({
      status: "echec",
      data: err,
    });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    // Test if there is user
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json({
        status: "succes",
        data: {
          user,
        },
      });
    }
    return res.status(404).json({
      status: "No user with that id!! ",
    });
  } catch (err) {
    return res.status(404).json({
      status: "echec",
      data: err,
    });
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    // Update new changes
    let doc = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
      runValidators: true,
    });
    // Test if document was update successfuly
    if (doc) {
      return res.status(200).json({
        status: "succes",
        data: {
          doc,
        },
      });
    }
    return res.status(404).json({
      status: "No doc with that id !!",
    });
  } catch (err) {
    return res.status(404).json({
      status: "echec",
      data: err,
    });
  }
};

exports.deleteOneUser = async (req, res, next) => {
  try {
    // Find user and delete it
    const doc = await User.findByIdAndDelete(req.params.idUser);
    if (!doc)
      return res.status(400).json({
        status: "No user with that id!!",
      });
    return res.status(200).json({
      status: "succes",
      data: null,
    });
  } catch (err) {
    return res.status(404).json({
      status: "echec",
      data: err,
    });
  }
};
