const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { fetchAllTasks, createTask, fetchTask, updateTask, deleteTask } = require('../controllers/taskController');

router.get('/all', requireAuth, fetchAllTasks);
router.post('/create', requireAuth, createTask);
router.get('/:taskId', fetchTask); //sharable
router.put('/:taskId', requireAuth, updateTask);
router.delete('/:taskId', requireAuth, deleteTask);
// router.get('/analytics');
// router.put('/:taskId/:subtaskIndex');

module.exports = router;