import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      default: '',
      required: [true, 'Name field of collection must have to be set'],
    },
  },
  {
    collection: 'collections',
    timestamps: true,
    versionKey: false,
  },
);

export const Collection = mongoose.model('Collection', collectionSchema);
