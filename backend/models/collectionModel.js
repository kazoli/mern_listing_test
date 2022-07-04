const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name field of collection must have to be set"],
    },
  },
  {
    collection: "collections",
    timestamps: true,
  }
);

module.exports = mongoose.model("Collection", collectionSchema);
