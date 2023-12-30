const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    userid: {
      type: String,
      required: true,
    },
  },
  {
    timestampse: true,
  }
);

const imgModel = new mongoose.model("img", imageSchema);

module.exports = imgModel;
