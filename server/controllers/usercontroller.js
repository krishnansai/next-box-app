const userRouter = require("express").Router();
const User = require("../models/User.model");
const Product = require("../models/Product.model");
const { authorize } = require("../middlewares/authorize");

const getUserList = async (req, res) => {
  let allUsers = await User.find({
    role: "user",
  });

  return res.status(200).json({
    status: true,
    data: allUsers,
    message: "Users Retrived",
  });
};

const getSingleUserInfo = async (req, res) => {
  let user = await User.findById(req.user.id);

  if (!user) {
    return res.status(404).json({
      status: false,
      message: "User Not Found",
    });
  }

  user.password = undefined;

  return res.status(200).json({
    status: true,
    data: user,
    message: "User Retrived",
  });
};

const addUserProfile = async (req, res) => {
  let { firstName, email, address, phone, postCode, state } = req.body;

  let user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({
      status: false,
      message: "User not found",
    });
  }

  user.name = firstName || user.name;
  user.address = address || user.address;
  user.phone = phone || user.phone;
  user.postCode = postCode || user.postCode;
  user.state = state || user.state;

  await user.save();

  return res.status(200).json({
    status: true,
    message: ["Your Profile Updated Successfully"],
  });
};

const getCart = async (req, res) => {
  let id = req.user.id;

  let user = await User.findById(id);

  if (!user) {
    return res.status(400).json({
      message: ["User not found"],
      status: false,
    });
  }

  let data = [];

  for (let i = 0; i < user.cart.length; i++) {
    let product = await Product.findById(user.cart[i]);
    data.push(product);
  }

  return res.status(200).json({
    status: true,
    data: data,
    message: "Cart Retrived",
  });
};

const deleteFromCart = async (req, res) => {
  const {
    id: { productId },
  } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({
      status: false,
      message: "User not found",
    });
  }

  user.cart = user.cart.filter((item) => item !== productId);

  await user.save();

  return res.status(200).json({
    status: true,
    message: "Product Deleted From Cart",
  });
};

userRouter.use(authorize);
userRouter.get("/", getUserList);
userRouter.get("/cart", getCart);
userRouter.post("/addprofile", addUserProfile);
userRouter.get("/getuserinfo", getSingleUserInfo);
userRouter.post("/deletefromcart", deleteFromCart);

module.exports = userRouter;
