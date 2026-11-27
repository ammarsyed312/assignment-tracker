var express = require('express');
var router = express.Router();

// Display the splash page.
router.get('/', function(req, res) {
  res.render('index', { title: 'Assignment Tracker' });
});

module.exports = router;