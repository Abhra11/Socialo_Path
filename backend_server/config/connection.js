const mongoose = require("mongoose");
require("dotenv").config();

const connection = () => {
  mongoose
    .connect(process.env.mongo_url)
    .then(() => {
      console.log({ msg: "DB connected successfully!" });
    })
    .catch((err) => {
      console.log("DB connection failed !", err);
    });
};

module.exports = { connection };
