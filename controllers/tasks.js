const Task = require('../models/tasks');

// Controller function to get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to create a new task
exports.createTask = async (req, res) => {
    try {
        // Extract task data from request body
        const { title, project_name, assignedTo,priority, progress, start_date, end_date, description } = req.body;

        // Create a new task document
        const newTask = new Task({ title, project_name, assignedTo,priority, progress, start_date, end_date, description });

        // Save the new task to the database
        const savedTask = await newTask.save();

        res.json(savedTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;

        // Find the task by ID and delete it
        const deletedTask = await Task.findByIdAndDelete(taskId);

        // Check if the task was found and deleted successfully
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json({ message: 'Task deleted successfully', deletedTask });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { project_name, assignedTo, priority, progress, start_date, end_date, description } = req.body;

        // Check if the task exists
        const existingTask = await Task.findByIdAndUpdate(taskId, { project_name, assignedTo, priority, progress, start_date, end_date, description }, { new: true });

        if (!existingTask) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(existingTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Controller function to get a specific task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { taskId } = req.params;
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error('Error fetching task by ID:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
