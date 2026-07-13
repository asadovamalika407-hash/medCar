const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ message: 'Doctors API - MongoDB ga ulanadi' });
});

module.exports = router;
