const mongoose = require('mongoose');

const roomBookingSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    diagnosis: {
        type: String,
        default: ''
    },
    roomType: {
        type: String,
        required: true,
        enum: ['general', 'double', 'vip']
    },
    roomPrice: {
        type: Number,
        required: true
    },
    services: [{
        name: String,
        price: Number
    }],
    days: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'checked-in', 'checked-out', 'cancelled'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    roomNumber: {
        type: String,
        default: null
    },
    notes: {
        type: String,
        default: ''
    },
    bookingDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RoomBooking', roomBookingSchema);
