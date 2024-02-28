const Task = require('../models/taskModel');
const handleResponse = require('../utils/handleResponse');
const errorHandler = require('../middlewares/errorHandler');
const moment = require('moment');

//Create new task
const createTask = async (req, res) => {
    try {
        const { title, priority, checklist, deadline } = req.body;
        const userId = req.body.userId;

        if (!title || !priority || !checklist) {
            return handleResponse(res, 400, 'All fields marked with * are required.');
        }

        const newTask = new Task({
            title,
            priority,
            checklist,
            deadline,
            user: userId
        });

        await newTask.save();

        handleResponse(res, 201, 'Task added', { id: newTask._id });
    }
    catch (error) {
        errorHandler(res, error);
    }
}

//Fetch task
const fetchTask = async (req, res) => {
    const taskId = req.params.taskId;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            handleResponse(res, 404, 'Task not found.');
            return;
        }

        const totalSubtasks = task.checklist.length;
        const completedSubtasks = task.checklist.filter(subtask => subtask.isDone).length;

        handleResponse(res, 200, 'Task fetched successfully', { task, totalSubtasks, completedSubtasks });

    } catch (error) {
        errorHandler(res, error);
    }
}

//Update task
const updateTask = async (req, res) => {
    try {
        const { title, priority, checklist, deadline } = req.body;
        const taskId = req.params.taskId;
        const userId = req.body.userId;

        let existingTask = await Task.findOne({ _id: taskId, user: userId });

        if (!existingTask) {
            return handleResponse(res, 404, 'Task not found.');
        }

        if (!title || !priority || !checklist) {
            return handleResponse(res, 400, 'All fields marked with * are required.');
        }

        existingTask.title = title || existingTask.title;
        existingTask.priority = priority || existingTask.priority;
        existingTask.checklist = checklist || existingTask.checklist;
        existingTask.deadline = deadline || existingTask.deadline;

        existingTask = await existingTask.save();

        handleResponse(res, 200, 'Task updated', existingTask);
    }
    catch (error) {
        errorHandler(res, error);
    }
}

//Delete Task
const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        await Task.findByIdAndDelete(taskId);
        handleResponse(res, 200, 'Task deleted');
    } catch (error) {
        errorHandler(res, error);
    }
}

//Filter Task
const filterTasks = async (req, res) => {
    try {
        const userId = req.body.userId;
        const filterType = req.query.filterType;
        let startDate, endDate;

        // Default to filtering tasks for the current week
        startDate = moment().startOf('week');
        endDate = moment().endOf('week');

        switch (filterType) {
            case 'Today':
                startDate = moment().startOf('day');
                endDate = moment().endOf('day');
                break;
            case 'This Week':
                //Default case, already set above
                break;
            case 'This Month':
                startDate = moment().startOf('month');
                endDate = moment().endOf('month');
                break;
            default:
                return handleResponse(res, 400, 'Invalid filter type');
        }

        const filteredTasks = await Task.find({
            user: userId,
            createdAt: { $gte: startDate, $lte: endDate }
        });

        // Calculating total and completed subtasks for each task
        const tasksWithSubtaskInfo = filteredTasks.map(task => {
            const totalSubtasks = task.checklist.length;
            const completedSubtasks = task.checklist.filter(subtask => subtask.isDone).length;
            return {
                ...task.toObject(),
                totalSubtasks,
                completedSubtasks
            };
        });

        handleResponse(res, 200, 'Tasks filtered successfully', { Tasks: tasksWithSubtaskInfo });
    } catch (error) {
        errorHandler(res, error);
    }
}

//Fetch analytics of all tasks
const fetchAnalytics = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Fetching tasks based on different categories
        const backlogTasks = await Task.countDocuments({ user: userId, status: 'Backlog' });
        const todoTasks = await Task.countDocuments({ user: userId, status: 'To Do' });
        const inProgressTasks = await Task.countDocuments({ user: userId, status: 'In Progress' });
        const doneTasks = await Task.countDocuments({ user: userId, status: 'Done' });

        const lowPriorityTasks = await Task.countDocuments({ user: userId, priority: 'LOW' });
        const moderatePriorityTasks = await Task.countDocuments({ user: userId, priority: 'MODERATE' });
        const highPriorityTasks = await Task.countDocuments({ user: userId, priority: 'HIGH' });

        // Fetch tasks with due dates
        const dueDateTasks = await Task.countDocuments({ user: userId, status: { $ne: 'Done' }, deadline: { $ne: null } });

        const tasksByCategory = {
            backlogTasks,
            todoTasks,
            inProgressTasks,
            doneTasks,
            lowPriorityTasks,
            moderatePriorityTasks,
            highPriorityTasks,
            dueDateTasks
        };

        handleResponse(res, 200, 'Tasks fetched successfully', tasksByCategory);
    } catch (error) {
        errorHandler(res, error);
    }
}

const updateStatus = async (req, res) => {
    try {
        const { taskId, status } = req.body;
        const task = await Task.findById(taskId);

        if (!task) {
            return handleResponse(res, 404, 'Task not found.');
        }
        task.status = status;
        await task.save();

        handleResponse(res, 200, 'Task status updated successfully', { updatedStatus: status });
    } catch (error) {
        errorHandler(res, error);
    }
}

const updateSubtaskStatus = async (req, res) => {
    try {
        const { taskId, subtaskIndex, isDone } = req.body;

        const task = await Task.findById(taskId);

        if (!task) {
            return handleResponse(res, 404, 'Task not found.');
        }

        if (subtaskIndex < 0 || subtaskIndex >= task.checklist.length) {
            return handleResponse(res, 400, 'Invalid subtask');
        }

        task.checklist[subtaskIndex].isDone = isDone;

        await task.save();

        handleResponse(res, 200, 'Subtask status updated successfully', { updatedTask: task });
    } catch (error) {
        errorHandler(res, error);
    }
};



module.exports = { createTask, fetchTask, updateTask, deleteTask, filterTasks, fetchAnalytics, updateSubtaskStatus, updateStatus }