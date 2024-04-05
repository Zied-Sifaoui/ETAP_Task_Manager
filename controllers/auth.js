const Employee = require('../models/employees'); // Import the Employee model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
      const { cin, firstName, lastName, password, role } = req.body;
      console.log(req.body);

      // Check if the cin is already registered
      const existingEmployee = await Employee.findOne({ cin });
      if (existingEmployee) {
        return res.status(400).json({ error: 'CIN already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new employee
      const newEmployee = new Employee({ cin, firstName, lastName, password: hashedPassword, role });
      await newEmployee.save();
  
      res.status(201).json({ message: 'Employee registered successfully' });
    } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.login = async (req, res) => {
    try {
      const { cin, password } = req.body;
  
      // Check if the employee exists
      const employee = await Employee.findOne({ cin });
      if (!employee) {
        return res.status(401).json({ error: 'Invalid credentials no cin' });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, employee.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials password'});
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: employee._id }, 'your_secret_key', { expiresIn: '1h' });
  
      res.json({ token });
    } catch (error) {
      console.error('Error logging in employee:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };