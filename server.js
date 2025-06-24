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

app.post('/parents', (req,res) => {
  try {
    const { name, email, isEligible} = req.body;

    if (!name || !email || isEligible === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and isEligible are required'
      });
    }

    const existingParent = parents.find(parent => parent.email === email);

    if (existingParent) {
      return res.status(400).json({
        success: false,
        message: 'A parent with this email already exists'
      });

    }

    const newParent = {
      id: parents.length > 0 ? Math.max(...parents.map(parent => parent.id)) + 1 : 1,
      name,
      email,
      isEligible
    };

    parents.push(newParent);

    res.status(201).json({
      success: true,
      data: newParent,
      message: 'Parent created successfully'
    });
  } catch (error) {
    console.error('An error ocurred creating parent: ', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while creating parent'
    })
  }
});

app.put('/parents/:id', (req, res) => {
  try {
    const { name, email, isEligible } = req.body;
    const parentId = parseInt(req.params.id);
    const parentSelected = parents.find(parent => parent.id === parentId);

    if(!parentSelected) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    if (name) parentSelected.name = name;
    if (email) parentSelected.email = email;
    if (isEligible !== undefined) parentSelected.isEligible = isEligible;

    res.status(200).json({
      success: true,
      data: parentSelected,
      message: 'Parent updated successfully'
    });
  } catch (error) {
    console.error('An error ocurred updating parent: ', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while updating parent'
    });
  }
});

app.delete('/parents/:id', (req, res) => {
  try {
    const parentId = parseInt(req.params.id);
    const parentIndex = parents.findIndex(parent => parent.id === parentId);

    if (parentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Parent not found'
      });
    }

    const deletedParent = parents.splice(parentIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedParent,
      message: 'Parent deleted successfully'
    });

  } catch (error) {
    console.error('An error ocurred deleting parent: ', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while deleting parent'
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

app.post('/students', (req, res) => {
  try {
    const { name, email, isEligible } = req.body;

    if (!name || !email || isEligible === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and isEligible are required'
      });
    }

    const existingStudentMail = students.find(student => student.email === email);

    if (existingStudentMail) {
      res.status(400).json({
        success: false,
        message: 'A student with this email already exists'
      });
    }

    const newStudent = {
      id: students.length > 0 ? Math.max(...students.map(student => student.id)) + 1 : 1,
      name,
      email,
      isEligible
    };

    students.push(newStudent);

    res.status(200).json({
      success: true,
      data: newStudent,
      message: 'Student created successfully'
    })
  } catch (error) {
    console.error('An error ocurred adding new student');

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while adding new student'
    })
  }
});

app.put('/students/:id', (req, res) => {
  try {
    const { name, email, isEligible } = req.body;
    const studentId = parseInt(req.params.id);
    const studentSelected = students.find(student => student.id === studentId);

    if (!studentSelected) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    if (name) studentSelected.name = name;
    if (email) studentSelected.email = email;
    if (isEligible !== undefined) studentSelected.isEligible = isEligible;

    res.status(200).json({
      success: true,
      data: studentSelected,
      message: 'Student updated successfully'
    });
  } catch (error) {
    console.error('An error ocurred updating the student', error);

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while updating the student'
    });
  }
});

app.delete('/students/:id', (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex(student => student.id === studentId)

    if (studentIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      })
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];

    res.status(200).json({
      success: true,
      data: deletedStudent,
      message: 'Student deleted successfully'
    })
  } catch (error) {
    console.error('An errof ocurred deleting the student');

    res.status(500).json({
      success: false,
      message: 'Server error ocurred while deleting the student'
    })
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