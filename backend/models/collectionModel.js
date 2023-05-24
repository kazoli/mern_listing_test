const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Name field of collection must have to be set'],
    },
  },
  {
    collection: 'collections',
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Collection', collectionSchema);
