const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ message: 'Documents API - ishlab chiqilmoqda' });
});

module.exports = router;
