const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

function dbconnect() {
  return mongoose.connect(process.env.MONGO_URL);
}

module.exports = dbconnect;
