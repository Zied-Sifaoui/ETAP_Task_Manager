const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const { getAllTasks, createTask, deleteTask, updateTask ,getTaskById} = require('../controllers/tasks');

// GET all tasks 
router.get('/tasks', getAllTasks);

// GET a specific task by ID 
router.get('/tasks/:taskId', authMiddleware, getTaskById);

// POST a new task 
router.post('/tasks', createTask);

// DELETE a task by ID 
router.delete('/tasks/:taskId', authMiddleware, deleteTask);

// PUT a task by ID 
router.delete('/tasks/:taskId', authMiddleware, updateTask);

module.exports = router;
