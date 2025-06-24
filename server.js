const express = require('express');
const app = express();
const PORT = 3000;

let parents = [
  {id: 1, name: 'Charles Xavier', email: 'charlesxavier@idukay.com', isEligible: true},
  {id: 2, name: 'Scott Summers', email: 'scottsummers@idukay.com', isEligible: true},
  {id: 3, name: 'Jean Grey', email: 'jeangrey@idukay.com', isEligible: true},
];

let students = [
  {id: 1, name: 'Calvin Montgomery', email: 'calvinmontgomery@idukay.com', isEligible: true},
  {id: 2, name: 'Kevin Sydney', email: 'kevinsydney@idukay.com', isEligible: true},
  {id: 3, name: 'Lorna Dane', email: 'lornadane@idukay.com', isEligible: true},
];

app.use(express.json());

app.get('/parents', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: parents,
      count: parents.length
    });
  } catch (error) {
    console.error('An error ocurred fetching the data: ', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while fetching parents'
    });
  }
});

app.get('/parents/:id', (req, res) => {
  try {
      const parentId = parseInt(req.params.id);
      const parent = parents.find(parent => parent.id === parentId);

      if (!parent) {
        return res.status(404).json({
          success: false,
          message: 'Parent not found'
        });
      }

      res.status(200).json({
        success: true,
        data: parent
      });
  } catch (error) {
    console.error('An error ocurred fetching the parent: ', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while fetching parent'
    });
  }
});

app.get('/students', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    console.error('An error ocurred fetching students: ', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while fetching students'
    });
  }
});

app.get('/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const student = students.find(student => student.id === studentId);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      data: student
    });

  } catch (error) {
    console.error('An error ocurred fetching the student:', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while fetching the student'
    });
  }
});

app.get('/', (req, res) => {
  res.json({
    message: 'API is running',
    endpoints: {
      parents: '/parents',
      students: '/students'
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;