var express = require('express');
var router = express.Router();
var assignmentsController = require('../controllers/assignments');

router.get('/', assignmentsController.list);
router.get('/new', assignmentsController.showAddForm);
router.post('/', assignmentsController.create);

router.get('/:id/edit', assignmentsController.showEditForm);
router.post('/:id/edit', assignmentsController.update);

router.get('/:id/delete', assignmentsController.showDeleteConfirmation);
router.post('/:id/delete', assignmentsController.remove);

module.exports = router;