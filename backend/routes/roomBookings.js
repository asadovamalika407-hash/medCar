const express = require('express');
const router = express.Router();
const RoomBooking = require('../models/RoomBooking');

// Get all room bookings
router.get('/', async (req, res) => {
    try {
        const { status, paymentStatus } = req.query;
        const query = {};
        
        if (status) query.status = status;
        if (paymentStatus) query.paymentStatus = paymentStatus;
        
        const bookings = await RoomBooking.find(query).sort({ bookingDate: -1 });
        
        res.json({
            success: true,
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({
            success: false,
            message: 'Xatolik yuz berdi',
            error: error.message
        });
    }
});

// Get single booking
router.get('/:id', async (req, res) => {
    try {
        const booking = await RoomBooking.findOne({ bookingId: req.params.id });
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Bron topilmadi'
            });
        }
        
        res.json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Error fetching booking:', error);
        res.status(500).json({
            success: false,
            message: 'Xatolik yuz berdi',
            error: error.message
        });
    }
});

// Create new booking
router.post('/', async (req, res) => {
    try {
        const {
            fullName,
            passport,
            birthDate,
            phone,
            checkInDate,
            checkOutDate,
            diagnosis,
            roomType,
            roomPrice,
            services,
            days,
            totalPrice
        } = req.body;

        // Generate unique booking ID
        const count = await RoomBooking.countDocuments();
        const bookingId = `BR-${String(count + 1).padStart(4, '0')}`;

        const booking = new RoomBooking({
            bookingId,
            fullName,
            passport,
            birthDate: new Date(birthDate),
            phone,
            checkInDate: new Date(checkInDate),
            checkOutDate: new Date(checkOutDate),
            diagnosis: diagnosis || '',
            roomType,
            roomPrice,
            services: services || [],
            days,
            totalPrice,
            status: 'pending',
            paymentStatus: 'pending'
        });

        await booking.save();

        res.status(201).json({
            success: true,
            message: 'Palata muvaffaqiyatli band qilindi',
            data: booking
        });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({
            success: false,
            message: 'Band qilishda xatolik',
            error: error.message
        });
    }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status, roomNumber, notes } = req.body;
        
        const updateData = { status };
        if (roomNumber) updateData.roomNumber = roomNumber;
        if (notes) updateData.notes = notes;
        
        const booking = await RoomBooking.findOneAndUpdate(
            { bookingId: req.params.id },
            updateData,
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Bron topilmadi'
            });
        }

        res.json({
            success: true,
            message: 'Holat yangilandi',
            data: booking
        });
    } catch (error) {
        console.error('Error updating booking status:', error);
        res.status(500).json({
            success: false,
            message: 'Holatni yangilashda xatolik',
            error: error.message
        });
    }
});

// Update payment status
router.patch('/:id/payment', async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        
        const booking = await RoomBooking.findOneAndUpdate(
            { bookingId: req.params.id },
            { paymentStatus },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Bron topilmadi'
            });
        }

        res.json({
            success: true,
            message: 'To\'lov holati yangilandi',
            data: booking
        });
    } catch (error) {
        console.error('Error updating payment status:', error);
        res.status(500).json({
            success: false,
            message: 'To\'lov holatini yangilashda xatolik',
            error: error.message
        });
    }
});

// Get statistics
router.get('/stats/summary', async (req, res) => {
    try {
        const total = await RoomBooking.countDocuments();
        const pending = await RoomBooking.countDocuments({ status: 'pending' });
        const confirmed = await RoomBooking.countDocuments({ status: 'confirmed' });
        const checkedIn = await RoomBooking.countDocuments({ status: 'checked-in' });
        const checkedOut = await RoomBooking.countDocuments({ status: 'checked-out' });
        
        const totalRevenue = await RoomBooking.aggregate([
            { $match: { paymentStatus: 'paid' } },
            { $group: { _id: null, total: { $sum: '$totalPrice' } } }
        ]);

        res.json({
            success: true,
            data: {
                total,
                pending,
                confirmed,
                checkedIn,
                checkedOut,
                totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0
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

// Delete booking (cancel)
router.delete('/:id', async (req, res) => {
    try {
        const booking = await RoomBooking.findOneAndUpdate(
            { bookingId: req.params.id },
            { status: 'cancelled' },
            { new: true }
        );

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Bron topilmadi'
            });
        }

        res.json({
            success: true,
            message: 'Bron bekor qilindi',
            data: booking
        });
    } catch (error) {
        console.error('Error cancelling booking:', error);
        res.status(500).json({
            success: false,
            message: 'Bronni bekor qilishda xatolik',
            error: error.message
        });
    }
});

module.exports = router;
