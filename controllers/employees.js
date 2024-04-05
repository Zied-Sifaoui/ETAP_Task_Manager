// controllers/employees.js

const Employee = require('../models/employees');

// Controller function to get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to create a new employee
exports.createEmployee = async (req, res) => {
  try {
    // Extract employee data from request body
    const { name, email, role } = req.body;

    // Create a new employee document
    const newEmployee = new Employee({ name, email, role });

    // Save the new employee to the database
    const savedEmployee = await newEmployee.save();

    res.json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete an employee by ID
exports.deleteEmployee = async (req, res) => {
  try {
    const { cin } = req.params;

    // Find the employee by ID and delete it
    const deletedEmployee = await Employee.findByIdAndDelete(cin);

    // Check if the employee was found and deleted successfully
    if (!deletedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully', deletedEmployee });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
      const { cin } = req.params;
      const { firstName, lastName, email, position } = req.body;

      // Find the employee by ID and update their information
      const updatedEmployee = await Employee.findByIdAndUpdate(cin, {
          firstName,
          lastName,
          password,
          role
      }, { new: true });

      if (!updatedEmployee) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      res.json(updatedEmployee);
  } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get a specific employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
      const { cin } = req.params;

      // Find the employee by ID
      const employee = await Employee.findById(cin);

      if (!employee) {
          return res.status(404).json({ error: 'Employee not found' });
      }

      res.json(employee);
  } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};