const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const token =
    req.cookies.token || req.headers.authorization || req.headers.Authorization;
  const role = req.cookies["_GS728&d"] || req.headers.ldjaldjal;
  let hash = role == "admin" ? process.env.ADMINHASH : process.env.USERHASH;
  if (!token) {
    return res.status(401).json({
      message: ["No token, authorization denied"],
      status: false,
    });
  }

  try {
    const decoded = jwt.verify(token, hash);
    req.user = decoded;
    next();
  } catch (e) {
    // console.log(e);
    return res.status(400).json({
      message: "Unauthorized",
      status: false,
    });
  }
};

exports.authorize = authorize;
