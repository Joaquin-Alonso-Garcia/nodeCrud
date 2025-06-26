const express = require('express');
const app = express();
const PORT = 3000;
const parentsRouter = require('./routes/parents');
const studentsRouter = require('./routes/students');

app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: {
      parents: '/parents',
      students: '/students'
    }
  });
});

app.use('/parents', parentsRouter);
app.use('/students', studentsRouter);

app.use((res) => {
  res.status(404).send({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
