import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name value'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email value'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password value'],
    },
  },
  {
    collection: 'users',
    timestamps: true,
    versionKey: false,
  },
);

export const User = mongoose.model('User', userSchema);
