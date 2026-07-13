const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.json({ message: 'Leave API - ishlab chiqilmoqda' });
});

module.exports = router;
