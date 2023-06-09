import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    collection_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Collection',
    },
    name: {
      type: String,
      default: '',
      required: [true, 'Name field of task must have to be set'],
    },
    complete: {
      type: Boolean,
      default: false,
      required: [true, 'Complete field of task must have to be set'],
    },
    tags: [
      {
        type: String,
        required: [true, 'Tags field of task must have to be set'],
      },
    ],
  },
  {
    collection: 'tasks',
    timestamps: true,
    versionKey: false,
  },
);

export const Task = mongoose.model('Task', taskSchema);
