const router = require('express').Router();
const requireAuth = require('../middlewares/requireAuth');
const { createTask, fetchTask, updateTask, deleteTask, filterTasks, fetchAnalytics, updateSubtaskStatus, updateStatus } = require('../controllers/taskController');

router.get('/filter', requireAuth, filterTasks);
router.get('/analytics', requireAuth, fetchAnalytics);
router.post('/create', requireAuth, createTask);
router.get('/:taskId', fetchTask); //sharable
router.put('/:taskId', requireAuth, updateTask);
router.delete('/:taskId', requireAuth, deleteTask);
router.post('/subtask', requireAuth, updateSubtaskStatus);
router.post('/taskStatus', requireAuth, updateStatus);

module.exports = router;