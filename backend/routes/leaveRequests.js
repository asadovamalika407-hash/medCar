const express = require('express');
const router = express.Router();
const LeaveRequest = require('../models/LeaveRequest');

// Get all leave requests
router.get('/', async (req, res) => {
    try {
        const { status } = req.query;
        const query = status && status !== 'all' ? { status } : {};
        
        const leaveRequests = await LeaveRequest.find(query)
            .sort({ submittedAt: -1 });
        
        res.json({
            success: true,
            count: leaveRequests.length,
            data: leaveRequests
        });
    } catch (error) {
        console.error('Error fetching leave requests:', error);
        res.status(500).json({
            success: false,
            message: 'Xatolik yuz berdi',
            error: error.message
        });
    }
});

// Get single leave request
router.get('/:id', async (req, res) => {
    try {
        const leaveRequest = await LeaveRequest.findOne({ requestId: req.params.id });
        
        if (!leaveRequest) {
            return res.status(404).json({
                success: false,
                message: 'Ariza topilmadi'
            });
        }
        
        res.json({
            success: true,
            data: leaveRequest
        });
    } catch (error) {
        console.error('Error fetching leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Xatolik yuz berdi',
            error: error.message
        });
    }
});

// Create new leave request
router.post('/', async (req, res) => {
    try {
        const {
            employeeId,
            employeeName,
            employeePosition,
            leaveType,
            startDate,
            endDate,
            days,
            reason
        } = req.body;

        // Generate unique request ID
        const count = await LeaveRequest.countDocuments();
        const requestId = `AR-${String(count + 1).padStart(3, '0')}`;

        // Map leave type to label
        const leaveTypeLabels = {
            'paid': 'Ta\'til',
            'unpaid': 'Ta\'til',
            'sick': 'Kasallik',
            'personal': 'Shaxsiy'
        };

        const leaveRequest = new LeaveRequest({
            requestId,
            employeeId,
            employeeName,
            employeePosition,
            leaveType,
            leaveTypeLabel: leaveTypeLabels[leaveType] || 'Ta\'til',
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            days,
            reason,
            status: 'pending'
        });

        await leaveRequest.save();

        res.status(201).json({
            success: true,
            message: 'Ariza muvaffaqiyatli yuborildi',
            data: leaveRequest
        });
    } catch (error) {
        console.error('Error creating leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Ariza yuborishda xatolik',
            error: error.message
        });
    }
});

// Approve leave request
router.patch('/:id/approve', async (req, res) => {
    try {
        const { approvedBy } = req.body;
        
        const leaveRequest = await LeaveRequest.findOneAndUpdate(
            { requestId: req.params.id },
            {
                status: 'approved',
                approvedBy: approvedBy || 'Admin',
                processedAt: new Date()
            },
            { new: true }
        );

        if (!leaveRequest) {
            return res.status(404).json({
                success: false,
                message: 'Ariza topilmadi'
            });
        }

        res.json({
            success: true,
            message: 'Ariza tasdiqlandi',
            data: leaveRequest
        });
    } catch (error) {
        console.error('Error approving leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Arizani tasdiqlashda xatolik',
            error: error.message
        });
    }
});

// Reject leave request
router.patch('/:id/reject', async (req, res) => {
    try {
        const { rejectionReason, rejectedBy } = req.body;
        
        const leaveRequest = await LeaveRequest.findOneAndUpdate(
            { requestId: req.params.id },
            {
                status: 'rejected',
                rejectionReason: rejectionReason || 'Rad etildi',
                approvedBy: rejectedBy || 'Admin',
                processedAt: new Date()
            },
            { new: true }
        );

        if (!leaveRequest) {
            return res.status(404).json({
                success: false,
                message: 'Ariza topilmadi'
            });
        }

        res.json({
            success: true,
            message: 'Ariza rad etildi',
            data: leaveRequest
        });
    } catch (error) {
        console.error('Error rejecting leave request:', error);
        res.status(500).json({
            success: false,
            message: 'Arizani rad etishda xatolik',
            error: error.message
        });
    }
});

// Get statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await LeaveRequest.countDocuments();
        const pending = await LeaveRequest.countDocuments({ status: 'pending' });
        const approved = await LeaveRequest.countDocuments({ status: 'approved' });
        const rejected = await LeaveRequest.countDocuments({ status: 'rejected' });

        res.json({
            success: true,
            data: {
                total,
                pending,
                approved,
                rejected
            }
        });
    } catch (error) {
        console.error('Error fetching statistics:', error);
        res.status(500).json({
            success: false,
            message: 'Statistikani olishda xatolik',
            error: error.message
        });
    }
});

module.exports = router;
