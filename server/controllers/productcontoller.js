const productRouter = require("express").Router();
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const uploadFile = require("../common/fileupload");
const supabase = require("../config/supabase.config");
const { authorize } = require("../middlewares/authorize");
const razorpay = require("../config/razorpay.config");
const TotalCart = require("../models/TotalOrders.model");

const getAllProducts = async (req, res) => {
  let allProducts = await Product.find();
  res.status(200).json({
    message: "All products",
    status: true,
    data: allProducts,
  });
};

const addProduct = async (req, res) => {
  const { productName, price, description, category, size, gsm, paper, how } =
    req.body;

  // check for the product name
  let exisistingProduct = await Product.findOne({ productName: productName });

  if (exisistingProduct) {
    return res.status(400).json({
      message: ["Product already exists"],
      status: false,
    });
  }

  if (!req.files) {
    return res.status(400).json({
      message: ["Product Must Need One Image"],
      status: false,
    });
  }

  // upload files
  let fileKeys = [];
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      const randomhash =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      let newFileName = `${randomhash}-${file.originalname}`;
      fileKeys.push(newFileName);
      file.originalname = newFileName;
      uploadFile(file).then(({ error }) => {
        if (error) return;
      });
    });
  }

  // get public link of the uploaded files
  let fileLinks = [];
  fileKeys.forEach((file) => {
    const { data, error } = supabase.storage
      .from("productimages")
      .getPublicUrl(file);

    if (error) {
      console.log(error);
    }

    let { publicURL } = data;

    fileLinks.push(publicURL);
  });

  if (!productName || !price || !description || !category) {
    return res.status(400).json({
      message: ["Please fill all the fields"],
      status: false,
    });
  }

  const product = new Product({
    productName: productName,
    price: price,
    description: description,
    category: category,
    size: size,
    gsm: gsm,
    paper: paper,
    how: how,
    image: [...fileLinks],
  });

  await product.save();

  res.status(200).json({
    message: ["Product Added Successfully"],
    status: true,
    product: product,
  });
};

const getSingleProduct = async (req, res) => {
  const { productId } = req.params;
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({
      message: ["Product Not Found"],
      status: false,
    });
  }
  res.status(200).json({
    message: ["Product Found"],
    status: true,
    data: product,
  });
};

const productImage = async (req, res) => {
  const { productName } = req.params;

  const { data, error } = supabase.storage
    .from("productimages")
    .getPublicUrl(`${productName}`);

  if (error) {
    return res.status(500).json({
      message: ["Something went wrong"],
      status: false,
    });
  }

  res.status(200).json({
    message: ["Product Image"],
    status: true,
    data: data,
  });
};

const addtoCart = async (req, res) => {
  const { productId } = req.body;
  let product = await Product.findById(productId);
  if (!product) {
    return res.status(400).json({
      message: ["Product not found!"],
      status: false,
    });
  }
  let user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({
      message: ["User not found"],
      status: false,
    });
  }

  if (user.cart.includes(productId)) {
    return res.status(400).json({
      message: ["Product already in cart"],
      status: false,
    });
  }

  user.cart.push(product._id);
  user.save();
  res.status(200).json({
    message: ["Product added to cart"],
    status: true,
  });
};

// buy product

const ByeProduct = async (req, res) => {
  const { productId, amount, currency, count } = req.params;

  let _options = {
    productId: productId,
    amount: amount * count,
    currency: "INR",
    receipt: "rec1",
  };

  razorpay.orders.create(_options, function (err, order) {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: ["Something went wrong"],
        status: false,
      });
    }
    res.status(200).json({
      message: ["Order created successfully"],
      status: true,
      data: order,
    });
  });
};

// edit product
const editProduct = (req, res) => {
  const { name, price, description, image, category } = req.body;
  const { id } = req.params;

  Product.findById(id).then((product) => {
    if (!product) {
      return res.status(400).json({
        message: ["Product not found"],
      });
    }
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.category = category || product.category;
    product.save();
    res.status(200).json({
      message: ["Product edited successfully"],
    });
  });
};

// delete product
const deleteProduct = (req, res) => {
  const { id } = req.params;
  Product.findByIdAndDelete(id).then((product) => {
    if (!product) {
      return res.status(400).json({
        message: ["Product not found"],
      });
    }
    res.status(200).json({
      message: ["Product deleted successfully"],
    });
  });
};

// buy the product

productRouter.route("/").get(getAllProducts);
productRouter.route("/image/:productName").get(productImage);
productRouter.route("/getsingle/:productId").get(getSingleProduct);
productRouter.use(authorize);
productRouter.route("/add").post(addProduct);
productRouter.route("/addtocart").post(addtoCart);
productRouter.route("/edit/:id").post(editProduct);
productRouter.route("/delete/:id").delete(deleteProduct);

module.exports = productRouter;
