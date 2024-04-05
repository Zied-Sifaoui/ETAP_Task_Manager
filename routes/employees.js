// routes/employees.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
  getAllEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployeeById,
  getEmployeeById
} = require('../controllers/employees');

// GET all employees (protected route)
router.get('/employees', authMiddleware, getAllEmployees);

// GET a specific employee by ID (protected route)
router.get('/employees/:cin', authMiddleware, getEmployeeById);

// POST a new employee (protected route)
router.post('/employees', authMiddleware, createEmployee);

// DELETE an employee by ID (protected route)
router.delete('/employees/:cin', authMiddleware, deleteEmployee);

// PUT update an employee by ID (protected route)
router.put('/employees/:cin', authMiddleware, updateEmployeeById);


module.exports = router;
