// MedCare Klinika - JavaScript
console.log('MedCare klinika saytiga xush kelibsiz!');

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
