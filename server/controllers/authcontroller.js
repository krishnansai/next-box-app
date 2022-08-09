const authRouter = require("express").Router();
const UserModel = require("../models/User.model");
const { authorize } = require("../middlewares/authorize");

const jwt = require("jsonwebtoken");

const signIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: ["Please fill all the fields"],
      status: false,
    });
  }

  UserModel.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: ["Something went wrong"],
        status: false,
      });
    }
    if (!user) {
      return res.status(400).json({
        message: ["User not found"],
        status: false,
      });
    }
    if (!user.ComparePassword(password)) {
      return res.status(400).json({
        message: ["Password is incorrect"],
        status: false,
      });
    }

    let token;

    if (user.role === "admin") {
      token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.ADMINHASH,
        {
          expiresIn: "1h",
        }
      );
    } else {
      token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.USERHASH,
        {
          expiresIn: "18h",
        }
      );
    }

    let redirectUrl = user.role == "admin" ? "/admin/dashboard" : "/";

    return res
      .cookie("token", token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: "none",
      })
      .cookie("_GS728&d", user.role, {
        maxAge: 3600000,
        sameSite: "none",
      })
      .cookie("NQi6OMGG0sa_7UW_noxIn1ZS0-XVk&d", "ok", {
        maxAge: 3600000,
        sameSite: "none",
      })
      .cookie("G_URESID002@RASSO", user._id, {
        maxAge: 3600000,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        message: ["Login successful"],
        status: true,
        data: { _id: user._id, role: user.role },
        redirectUrl,
        token,
      });
  });
};

const Register = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: ["Please fill all the fields"],
      status: false,
    });
  }

  if (role === "admin") {
    return res.status(400).json({
      message: ["Not allowed to register as admin"],
      status: false,
    });
  }

  if (role !== "user") {
    return res.status(400).json({
      message: ["Invalid role"],
      status: false,
    });
  }

  UserModel.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500).json({
        message: ["Something went wrong"],
        status: false,
      });
    }
    if (user) {
      return res.status(400).json({
        message: ["User already exists"],
        status: false,
      });
    }
    const newUser = new UserModel({
      name,
      email,
      password,
      role,
    });
    newUser.save((err, user) => {
      if (err) {
        return res.status(500).json({
          message: ["Something went wrong"],
          status: false,
        });
      }
      return res.status(200).json({
        message: ["Register success"],
        status: true,
        user: user,
      });
    });
  });
};

const checkLogin = (req, res) => {
  return res.status(200).json({
    message: ["You are already logged in"],
    status: true,
  });
};

const Logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("_GS728&d");
  return res.status(200).json({
    message: ["Logout successful"],
    status: true,
  });
};

authRouter.post("/login", signIn);
authRouter.post("/register", Register);
authRouter.get("/check", authorize, checkLogin);
authRouter.get("/logout", Logout);

module.exports = authRouter;
