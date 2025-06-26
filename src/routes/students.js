const express = require('express');
const router = express.Router();

let students = [
  {id: 1, name: 'Calvin Montgomery', email: 'calvinmontgomery@idukay.com', isEligible: true},
  {id: 2, name: 'Kevin Sydney', email: 'kevinsydney@idukay.com', isEligible: true},
  {id: 3, name: 'Lorna Dane', email: 'lornadane@idukay.com', isEligible: true}
];

router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: students,
      count: students.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ocurred while fetching students: ${error}`
    });
  }
});

router.get('/:id', (req, res) => {
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
    res.status(500).json({
      success: false,
      message: `Server error ocurred while fetching the student: ${error}`
    });
  }
});

module.exports = router;
