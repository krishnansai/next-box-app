const express = require("express");
require("dotenv").config();
const connection = require("./config/db.config");
const supabase = require("./config/supabase.config");
const razorpay = require("./config/razorpay.config");
const app = express();

// import middlewares
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieparser = require("cookie-parser");
const upload = require("multer");

//third party middleware
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieparser());
app.use(upload().array("file"));

const authRouter = require("./controllers/authcontroller");
const productRouter = require("./controllers/productcontoller");
const userRouter = require("./controllers/usercontroller");

// routers
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/user", userRouter);

module.exports = app;
