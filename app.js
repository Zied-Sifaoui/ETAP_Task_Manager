const express = require('express');
const bodyParser = require('body-parser');
const employeesRoutes = require('./routes/employees');
const tasksRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
const morgan = require('morgan');

require('dotenv').config();
require('./db');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Mount authentification routes
app.use('/', authRoutes);

// Mount employees routes
app.use('/', employeesRoutes);

// Mount tasks routes
app.use('/', tasksRoutes);



const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
