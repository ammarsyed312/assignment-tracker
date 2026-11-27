var mongoose = require('mongoose');

// Define the fields stored for each assignment.
var assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  course: { type: String, required: true, trim: true },
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Complete'],
    default: 'To Do'
  }
});

module.exports = mongoose.model('Assignment', assignmentSchema);