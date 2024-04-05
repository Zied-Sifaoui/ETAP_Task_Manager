const mongoose = require('mongoose');
require('dotenv').config();

const databaseUrl = `mongodb://localhost:27017/${process.env.db_name}`;

mongoose.connect(databaseUrl)
.then(() => {
  console.log(`Mongoose connected to ${databaseUrl}`);
})
.catch((err) => {
  console.error(`Mongoose connection error: ${err}`);
});

const db = mongoose.connection;

db.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', () => {
  db.close(() => {
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
});

module.exports = db;
