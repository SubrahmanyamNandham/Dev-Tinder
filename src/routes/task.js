const express = require('express');
const controller = require('../controllers/tasks');

const router = express.Router();

router.post('/', controller.createTask);
router.get('/', controller.listTasks);
router.get('/:id', controller.getTask);
router.put('/:id', controller.updateTask);
router.delete('/:id', controller.deleteTask);

module.exports = router;
