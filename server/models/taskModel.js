const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        priority: {
            type: String,
            enum: ['LOW', 'MODERATE', 'HIGH'],
            required: true
        },
        checklist: [{
            subtask: {
                type: String,
                required: true,
            },
            isDone: {
                type: Boolean,
                default: false,
            },
        }],
        dueDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ['Backlog', 'To Do', 'In progress', 'Done'],
            default: 'To Do'
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
