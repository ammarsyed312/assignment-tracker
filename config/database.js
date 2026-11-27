var mongoose = require('mongoose');

module.exports = async function connectDatabase() {
  var uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is missing');
  }

  await mongoose.connect(uri, {
    dbName: 'assignment_tracker',
    serverSelectionTimeoutMS: 10000
  });
};