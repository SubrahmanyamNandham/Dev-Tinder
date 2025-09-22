const mongoose = require('mongoose');

const VALID_STATUSES = ['todo', 'in_progress', 'done'];

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, trim: true, maxlength: 2000 },
    status: { type: String, enum: VALID_STATUSES, default: 'todo', index: true },
  },
  { timestamps: true }
);

TaskSchema.index({ status: 1, createdAt: -1 });
TaskSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Task', TaskSchema);
