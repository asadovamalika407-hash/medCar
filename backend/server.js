const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware (development mode)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
  });
}

// MongoDB connection is now managed by the connection manager
// Connection will be established lazily in the serverless function entry point

// Routes (Vercel da /api/ prefix oldin qo'shilgan, shuning uchun bu yerda o'chirish kerak)
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/employees'));
app.use('/attendance', require('./routes/attendance'));
app.use('/salary', require('./routes/salary'));
app.use('/leave', require('./routes/leave'));
app.use('/leave-requests', require('./routes/leaveRequests'));
app.use('/room-bookings', require('./routes/roomBookings'));
app.use('/documents', require('./routes/documents'));
app.use('/patients', require('./routes/patients'));
app.use('/doctors', require('./routes/doctors'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'MedCare Clinic API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      employees: '/api/employees',
      attendance: '/api/attendance',
      salary: '/api/salary',
      leave: '/api/leave',
      leaveRequests: '/api/leave-requests',
      roomBookings: '/api/room-bookings',
      documents: '/api/documents',
      patients: '/api/patients',
      doctors: '/api/doctors'
    }
  });
});

// Error handling middleware (must be last)
app.use((err, req, res, next) => {
  // Log error with context
  console.error('[Error]', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString()
  });

  // Determine status code
  const statusCode = err.statusCode || err.status || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Vercel serverless function export
module.exports = app;

// Local development server
if (require.main === module) {
  const { connectToDatabase } = require('./lib/mongodb');
  const PORT = process.env.PORT || 5000;
  
  // Connect to MongoDB before starting the local server
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`🚀 Server ishga tushdi: http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('❌ Failed to connect to MongoDB:', err.message);
      process.exit(1);
    });
}
