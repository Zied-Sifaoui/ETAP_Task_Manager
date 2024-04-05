const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String,required: true,},
    project_name: {type: String,required: true,},
    assignedTo: {type: String, required: true, },
    priority: {type: Number,
      min: 0,
      max: 100, // Example enumeration for priority levels
      default: 50, required: true, },
    progress: {type: Number,
      min: 0,
      max: 100, // Example enumeration for priority levels
      default: 0, required: true, },
    start_date: {type: Date, required: true, },
    end_date: {type: Date, required: true, },
    description: {type: String, required: true, },
  },
  { timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
