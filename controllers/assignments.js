var mongoose = require('mongoose');
var createError = require('http-errors');
var Assignment = require('../models/assignment');

// Check IDs before querying MongoDB.
function checkedId(id) {
  if (!mongoose.isObjectIdOrHexString(id)) {
    throw createError(404, 'Assignment not found');
  }

  return id;
}

async function findAssignment(id) {
  var assignment = await Assignment.findById(checkedId(id));

  if (!assignment) {
    throw createError(404, 'Assignment not found');
  }

  return assignment;
}

// Read all assignments and display the directory.
exports.list = async function(req, res, next) {
  try {
    var assignments = await Assignment.find({}).sort({ dueDate: 1 });
    res.render('assignments', {
      title: 'Assignments',
      assignments: assignments
    });
  } catch (error) {
    next(error);
  }
};

exports.showAddForm = function(req, res) {
  res.render('assignment-form', {
    title: 'Add Assignment',
    formAction: '/assignments',
    assignment: { title: '', course: '', dueDate: '', status: 'To Do' },
    error: null
  });
};

// Create a Mongoose document from the form and save it.
exports.create = async function(req, res, next) {
  var body = req.body || {};
  var values = {
    title: body.title,
    course: body.course,
    dueDate: body.dueDate,
    status: body.status || ''
  };

  try {
    var assignment = new Assignment(values);
    await assignment.save();
    res.redirect('/assignments');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).render('assignment-form', {
        title: 'Add Assignment',
        formAction: '/assignments',
        assignment: values,
        error: 'Check that all four fields are valid.'
      });
    }

    next(error);
  }
};

exports.showEditForm = async function(req, res, next) {
  try {
    var assignment = await findAssignment(req.params.id);
    res.render('assignment-form', {
      title: 'Edit Assignment',
      formAction: '/assignments/' + assignment.id + '/edit',
      assignment: {
        title: assignment.title,
        course: assignment.course,
        dueDate: assignment.dueDate.toISOString().slice(0, 10),
        status: assignment.status
      },
      error: null
    });
  } catch (error) {
    next(error);
  }
};

// Update the existing Mongoose document and save it.
exports.update = async function(req, res, next) {
  var body = req.body || {};

  try {
    var assignment = await findAssignment(req.params.id);
    assignment.title = body.title;
    assignment.course = body.course;
    assignment.dueDate = body.dueDate;
    assignment.status = body.status || '';
    await assignment.save();

    res.redirect('/assignments');
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).render('assignment-form', {
        title: 'Edit Assignment',
        formAction: '/assignments/' + req.params.id + '/edit',
        assignment: body,
        error: 'Check that all four fields are valid.'
      });
    }

    next(error);
  }
};

// Show the record before asking the user to confirm.
exports.showDeleteConfirmation = async function(req, res, next) {
  try {
    var assignment = await findAssignment(req.params.id);
    res.render('delete-assignment', {
      title: 'Delete Assignment',
      assignment: assignment
    });
  } catch (error) {
    next(error);
  }
};

// The confirmation form sends a POST request to delete one record.
exports.remove = async function(req, res, next) {
  try {
    var result = await Assignment.deleteOne({ _id: checkedId(req.params.id) });

    if (result.deletedCount === 0) {
      throw createError(404, 'Assignment not found');
    }

    res.redirect('/assignments');
  } catch (error) {
    next(error);
  }
};