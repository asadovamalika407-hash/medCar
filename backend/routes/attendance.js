const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

// Get all attendance
router.get('/', async (req, res) => {
  try {
    const { date, employeeId } = req.query;
    let query = {};
    if (date) query.date = new Date(date);
    if (employeeId) query.employeeId = employeeId;
    
    const attendance = await Attendance.find(query).sort({ date: -1 });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Mark attendance
router.post('/', async (req, res) => {
  try {
    const attendance = new Attendance(req.body);
    await attendance.save();
    res.status(201).json({ message: 'Davomat belgilandi!', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

// Update attendance
router.put('/:id', async (req, res) => {
  try {
    const attendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json({ message: 'Davomat yangilandi!', attendance });
  } catch (error) {
    res.status(500).json({ message: 'Server xatosi', error: error.message });
  }
});

module.exports = router;
