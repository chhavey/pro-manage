const Task = require('../models/taskModel');
const handleResponse = require('../utils/handleResponse');
const errorHandler = require('../middlewares/errorHandler');

//Fetch all tasks
const fetchAllTasks = async (req, res) => {
    try {
        const userId = req.body.userId;
        const allTasks = await Task.find({ user: userId });

        handleResponse(res, 200, 'All tasks fetched successfully', {
            Tasks: allTasks
        });
    }
    catch (error) {
        errorHandler(res, error);
    }
}

//Create new task
const createTask = async (req, res) => {
    try {
        const { title, priority, checklist, deadline } = req.body;
        const userId = req.body.userId;
        const newTask = new Task({
            title,
            priority,
            checklist,
            deadline,
            user: userId
        });

        await newTask.save();

        handleResponse(res, 201, 'Task created successfully', { id: newTask._id });
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

        handleResponse(res, 200, 'Task fetched successfully', task);

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

        // Find the existing task
        let existingTask = await Task.findOne({ _id: taskId, user: userId });

        // Check if the task exists and user is authorized to edit
        if (!existingTask) {
            return handleResponse(res, 404, 'Task not found.');
        }

        // Update task fields
        existingTask.title = title || existingTask.title;
        existingTask.priority = priority || existingTask.priority;
        existingTask.checklist = checklist || existingTask.checklist;
        existingTask.deadline = deadline || existingTask.deadline;

        // Save the updated task
        existingTask = await existingTask.save();

        // handleResponse(res, 200, 'Task updated successfully', { id: existingTask._id });
        handleResponse(res, 200, 'Task updated successfully', existingTask);
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
        handleResponse(res, 200, 'Task deleted successfully');
    } catch (error) {
        errorHandler(res, error);
    }
}


module.exports = { fetchAllTasks, createTask, fetchTask, updateTask, deleteTask }