const mongoose = require("mongoose");

const connection = mongoose
  .connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((e) => console.log("DB Connected "))
  .catch((e) => console.log(e));
