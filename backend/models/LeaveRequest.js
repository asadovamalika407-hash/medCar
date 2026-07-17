const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
    requestId: {
        type: String,
        required: true,
        unique: true
    },
    employeeId: {
        type: String,
        required: true
    },
    employeeName: {
        type: String,
        required: true
    },
    employeePosition: {
        type: String,
        required: true
    },
    leaveType: {
        type: String,
        required: true,
        enum: ['paid', 'unpaid', 'sick', 'personal']
    },
    leaveTypeLabel: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    days: {
        type: Number,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    approvedBy: {
        type: String,
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    },
    submittedAt: {
        type: Date,
        default: Date.now
    },
    processedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LeaveRequest', leaveRequestSchema);
