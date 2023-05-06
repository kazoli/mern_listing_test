const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
  {
    collection_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Collection',
    },
    name: {
      type: String,
      required: [true, 'Name field of task must have to be set'],
    },
    complete: {
      type: Boolean,
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
  },
);

module.exports = mongoose.model('Task', taskSchema);
