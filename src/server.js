const express = require('express');
const connectDB = require('./db/mongodb.js');
const parentsModule = require('./modules/parents/module.js');
const studentsModule = require('./modules/students/module.js');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: {
      parents: '/parents',
      students: '/students'
    }
  });
});

app.use(express.json());
parentsModule(app);
studentsModule(app);

app.use((req, res) => {
  res.status(404).send({
    success: false,
    message: 'Route not found'
  });
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
