const express = require('express');
const router = express.Router();

let parents = [
  {id: 1, name: 'Charles Xavier', email: 'charlesxavier@idukay.com', isEligible: true},
  {id: 2, name: 'Scott Summers', email: 'scottsummers@idukay.com', isEligible: true},
  {id: 3, name: 'Jean Grey', email: 'jeangrey@idukay.com', isEligible: true}
];

router.get('/', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: parents,
      count: parents.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server error ocurred while fetching parents: ${error}`
    });
  }
});

router.get('/:id', (req, res) => {
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
    res.status(500).json({
      success: false,
      message: `Server error ocurred while fetching parent: ${error}`
    });
  }
});

module.exports = router;
