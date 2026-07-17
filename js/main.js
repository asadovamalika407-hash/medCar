// MedCare Klinika - JavaScript
console.log('MedCare klinika saytiga xush kelibsiz!');

// Backend API URL configuration
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';

// Simulated patient login (in real app, use proper authentication)
let currentPatient = null;

// Sample data - Bu yerda backend dan kelgan ma'lumotlar bo'ladi
const patients = [
    { id: 'P-00421', name: 'Hasanova Aziza', diagnosis: 'Gipertoniya I daraja', doctor: 'Dr. Rahimova', admitDate: '01.03.2025', status: 'Davolanmoqda' },
    { id: 'P-00418', name: 'Tursunov Ilhom', diagnosis: 'Qon tomir kasalligi', doctor: 'Dr. Ergasheva', admitDate: '10.01.2025', status: 'Kuzatuvda' },
    { id: 'P-00419', name: 'Mirzayeva Kamola', diagnosis: 'Gastrit', doctor: 'Dr. Karimov', admitDate: '15.04.2025', status: 'Tugagan' }
];

// Patient login function
function patientLogin(patientId) {
    currentPatient = patients.find(p => p.id === patientId);
    if (currentPatient) {
        localStorage.setItem('currentPatient', JSON.stringify(currentPatient));
        return true;
    }
    return false;
}

// Get current logged-in patient
function getCurrentPatient() {
    const stored = localStorage.getItem('currentPatient');
    return stored ? JSON.parse(stored) : null;
}

// Logout function
function patientLogout() {
    localStorage.removeItem('currentPatient');
    currentPatient = null;
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'var(--danger-color)';
            isValid = false;
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });
    
    return isValid;
}

// Phone number formatting
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (!value.startsWith('998')) {
            value = '998' + value;
        }
    }
    input.value = '+' + value;
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ===========================================
// PALATA BOOKING SYSTEM
// ===========================================

let bookingData = {
    roomType: '',
    roomPrice: 0,
    services: [],
    servicesTotal: 0,
    days: 0,
    totalPrice: 0
};

// Scroll to Palata section
function scrollToPalata(event) {
    event.preventDefault();
    const section = document.getElementById('palata-section');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Step navigation
function goToStep(stepNumber) {
    document.querySelectorAll('.booking-step').forEach(step => {
        step.classList.remove('active');
    });
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
    // Scroll to top of booking container
    document.querySelector('.booking-container').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Select room
function selectRoom(roomType, price) {
    bookingData.roomType = roomType;
    bookingData.roomPrice = price;
    
    // Update summary
    const roomNames = {
        'general': 'Umumiy Palata',
        'double': 'Ikki Kishilik Palata',
        'vip': 'VIP Palata (Lyuks)'
    };
    
    document.getElementById('summaryRoom').textContent = roomNames[roomType];
    document.getElementById('summaryRoomPrice').textContent = price.toLocaleString() + ' so\'m/kun';
    
    // Go to next step
    goToStep(2);
}

// Update services
function updateServices() {
    const checkboxes = document.querySelectorAll('#step2 input[type="checkbox"]:checked');
    bookingData.services = [];
    bookingData.servicesTotal = 0;
    
    checkboxes.forEach(checkbox => {
        const serviceName = checkbox.dataset.service;
        const servicePrice = parseInt(checkbox.dataset.price);
        
        bookingData.services.push({
            name: serviceName,
            price: servicePrice
        });
        
        bookingData.servicesTotal += servicePrice;
    });
    
    calculateTotal();
}

// Calculate days
function calculateDays() {
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    
    if (checkIn && checkOut) {
        const date1 = new Date(checkIn);
        const date2 = new Date(checkOut);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        bookingData.days = diffDays;
        document.getElementById('summaryDays').textContent = diffDays + ' kun';
        
        calculateTotal();
    }
}

// Calculate total
function calculateTotal() {
    const roomTotal = bookingData.roomPrice * bookingData.days;
    const servicesTotal = bookingData.servicesTotal * bookingData.days;
    bookingData.totalPrice = roomTotal + servicesTotal;
    
    // Update services summary
    const servicesSummary = document.getElementById('servicesSummary');
    if (bookingData.services.length > 0) {
        servicesSummary.innerHTML = bookingData.services.map(service => {
            const serviceNames = {
                'fitness': 'Fitnes Klub',
                'kitchen': 'Oshxona (Premium)',
                'pharmacy': 'Dorixona Xizmati'
            };
            return `
                <div class="summary-row">
                    <span>${serviceNames[service.name]}:</span>
                    <span>${(service.price * bookingData.days).toLocaleString()} so'm</span>
                </div>
            `;
        }).join('');
    } else {
        servicesSummary.innerHTML = '';
    }
    
    // Update total
    document.getElementById('summaryTotal').textContent = bookingData.totalPrice.toLocaleString() + ' so\'m';
}

// Handle form submission
document.getElementById('patientBookingForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    // Prepare booking data
    const patientData = {
        fullName: formData.get('fullName'),
        passport: formData.get('passport'),
        birthDate: formData.get('birthDate'),
        phone: formData.get('phone'),
        checkInDate: formData.get('checkInDate'),
        checkOutDate: formData.get('checkOutDate'),
        diagnosis: formData.get('diagnosis'),
        roomType: bookingData.roomType,
        roomPrice: bookingData.roomPrice,
        services: bookingData.services,
        days: bookingData.days,
        totalPrice: bookingData.totalPrice,
        bookingDate: new Date().toISOString(),
        status: 'pending', // pending, confirmed, checked-in, checked-out
        paymentStatus: 'pending' // pending, paid, refunded
    };
    
    try {
        // Send to backend API
        const response = await fetch(`${API_URL}/room-bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patientData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('✅ Palata muvaffaqiyatli band qilindi!\n\n' + 
                  'Bemor: ' + patientData.fullName + '\n' +
                  'Palata: ' + bookingData.roomType + '\n' +
                  'Jami: ' + bookingData.totalPrice.toLocaleString() + ' so\'m\n\n' +
                  'Ma\'lumotlar admin paneliga yuborildi.\n' +
                  'Tez orada siz bilan bog\'lanamiz!');
            
            // Reset form
            e.target.reset();
            bookingData = {
                roomType: '',
                roomPrice: 0,
                services: [],
                servicesTotal: 0,
                days: 0,
                totalPrice: 0
            };
            goToStep(1);
        } else {
            alert('❌ Xatolik: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting booking:', error);
        alert('❌ Band qilishda xatolik yuz berdi!\n\n' +
              'Iltimos, telefon orqali bog\'laning: +998 71 200 10 10');
    }
});

// Set minimum date for check-in (today)
const checkInInput = document.getElementById('checkInDate');
const checkOutInput = document.getElementById('checkOutDate');

if (checkInInput) {
    const today = new Date().toISOString().split('T')[0];
    checkInInput.setAttribute('min', today);
    
    checkInInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        selectedDate.setDate(selectedDate.getDate() + 1);
        const minCheckOut = selectedDate.toISOString().split('T')[0];
        checkOutInput.setAttribute('min', minCheckOut);
    });
}
