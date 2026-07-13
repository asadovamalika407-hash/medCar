// HR Dashboard JavaScript
// Backend URL - production uchun avtomatik o'zgaradi
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://medcare-backend.onrender.com/api';
let employees = [];

// Sample data (API dan kelguncha)
const sampleEmployees = [
    { _id: '1', employeeId: 'E-001', fullName: 'Dr. Karimov Javohir', position: 'Shifokor', department: 'Kardiologiya', phone: '+998 90 111 22 33', hireDate: '2020-01-15', status: 'active' },
    { _id: '2', employeeId: 'E-002', fullName: 'Dr. Shukurova Dilnoza', position: 'Shifokor', department: 'Nevrologiya', phone: '+998 91 222 33 44', hireDate: '2021-03-20', status: 'active' },
    { _id: '3', employeeId: 'E-003', fullName: 'Rahimova Malika', position: 'Hamshira', department: 'Terapiya', phone: '+998 93 333 44 55', hireDate: '2022-05-10', status: 'active' },
    { _id: '4', employeeId: 'E-004', fullName: 'Toshmatov Sardor', position: 'Laborant', department: 'Laboratoriya', phone: '+998 94 444 55 66', hireDate: '2021-08-01', status: 'active' },
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
});

// Load employees
async function loadEmployees() {
    try {
        // Try to fetch from API
        const response = await fetch(`${API_URL}/employees`);
        if (response.ok) {
            employees = await response.json();
        } else {
            // Use sample data if API not available
            employees = sampleEmployees;
        }
    } catch (error) {
        console.log('API unavailable, using sample data');
        employees = sampleEmployees;
    }
    
    renderEmployeesTable();
    updateStats();
}

// Render employees table
function renderEmployeesTable() {
    const tbody = document.getElementById('employeesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = employees.map(emp => `
        <tr>
            <td>${emp.employeeId}</td>
            <td>${emp.fullName}</td>
            <td>${emp.position}</td>
            <td>${emp.department}</td>
            <td>${emp.phone}</td>
            <td>${formatDate(emp.hireDate)}</td>
            <td><span class="badge success">${emp.status === 'active' ? 'Faol' : 'Faol emas'}</span></td>
            <td>
                <div class="action-btns">
                    <button class="btn-icon btn-edit" onclick="editEmployee('${emp._id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="deleteEmployee('${emp._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Update statistics
function updateStats() {
    document.getElementById('totalEmployees').textContent = employees.length;
    document.getElementById('presentToday').textContent = Math.floor(employees.length * 0.9);
    document.getElementById('absentToday').textContent = Math.floor(employees.length * 0.08);
    document.getElementById('onLeave').textContent = Math.floor(employees.length * 0.05);
}

// Switch tabs
function switchTab(tabName) {
    // Remove active from all tabs
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active to selected tab
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Modal functions
function openAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.add('active');
}

function closeAddEmployeeModal() {
    document.getElementById('addEmployeeModal').classList.remove('active');
    document.getElementById('addEmployeeForm').reset();
}

// Add employee form submit
document.getElementById('addEmployeeForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const employeeData = {
        employeeId: `E-${String(employees.length + 1).padStart(3, '0')}`,
        fullName: formData.get('fullName'),
        position: formData.get('position'),
        department: formData.get('department'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        salary: formData.get('salary') || 0,
        hireDate: new Date().toISOString(),
        status: 'active'
    };
    
    try {
        const response = await fetch(`${API_URL}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(employeeData)
        });
        
        if (response.ok) {
            alert('Xodim muvaffaqiyatli qo\'shildi!');
            loadEmployees();
            closeAddEmployeeModal();
        } else {
            // Add to local array if API not available
            employees.push({ ...employeeData, _id: String(Date.now()) });
            renderEmployeesTable();
            updateStats();
            closeAddEmployeeModal();
            alert('Xodim qo\'shildi! (Local mode)');
        }
    } catch (error) {
        // Add to local array if API not available
        employees.push({ ...employeeData, _id: String(Date.now()) });
        renderEmployeesTable();
        updateStats();
        closeAddEmployeeModal();
        alert('Xodim qo\'shildi! (Local mode)');
    }
});

// Edit employee
function editEmployee(id) {
    const employee = employees.find(e => e._id === id);
    if (!employee) return;
    
    alert(`Tahrirlash funksiyasi: ${employee.fullName}\n(Ishlab chiqilmoqda...)`);
}

// Delete employee
async function deleteEmployee(id) {
    if (!confirm('Rostdan ham bu xodimni o\'chirmoqchimisiz?')) return;
    
    try {
        const response = await fetch(`${API_URL}/employees/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Xodim o\'chirildi!');
            loadEmployees();
        } else {
            // Remove from local array
            employees = employees.filter(e => e._id !== id);
            renderEmployeesTable();
            updateStats();
            alert('Xodim o\'chirildi! (Local mode)');
        }
    } catch (error) {
        // Remove from local array
        employees = employees.filter(e => e._id !== id);
        renderEmployeesTable();
        updateStats();
        alert('Xodim o\'chirildi! (Local mode)');
    }
}

// Mark attendance
function markAttendance() {
    alert('Davomat belgilash funksiyasi ishlab chiqilmoqda...');
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
}

// Logout
function logout() {
    if (confirm('Rostdan ham chiqmoqchimisiz?')) {
        window.location.href = 'login.html';
    }
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('addEmployeeModal');
    if (event.target === modal) {
        closeAddEmployeeModal();
    }
}
