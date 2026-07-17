// Employee Dashboard JavaScript

// Check if logged in
if (localStorage.getItem('employeeLoggedIn') !== 'true') {
    window.location.href = 'employee-login.html';
}

const currentEmployeeId = localStorage.getItem('employeeId');

// Sample employee data (bu ma'lumotlar HR Dashboard dan keladi)
const employeesData = [
    { employeeId: 'E-001', fullName: 'Prof. Dr. Rahimov Aziz Shokirovich', position: 'Bosh Vrach', department: 'Boshqaruv', phone: '+998 90 123 45 67', hireDate: '2015-01-10', email: 'rahimov@medcare.uz' },
    { employeeId: 'E-002', fullName: 'Dr. Karimov Javohir Mahmudovich', position: 'Kardiolog', department: 'Kardiologiya', phone: '+998 90 234 56 78', hireDate: '2018-03-15', email: 'karimov@medcare.uz' },
    { employeeId: 'E-003', fullName: 'Dr. Shukurova Dilnoza Akmalovna', position: 'Nevrolog', department: 'Nevrologiya', phone: '+998 91 345 67 89', hireDate: '2019-05-20', email: 'shukurova@medcare.uz' },
    { employeeId: 'E-015', fullName: 'Nurmatova Gulnora Sharipovna', position: 'Hamshira', department: 'Kardiologiya', phone: '+998 98 567 89 01', hireDate: '2019-05-18', email: 'nurmatova@medcare.uz' },
    // ... boshqa xodimlar (hamma 52 ta xodimni qo'shish mumkin)
];

// Salary data
const salaryData = {
    'E-001': { baseSalary: 25000000, bonus: 5000000 },
    'E-002': { baseSalary: 15000000, bonus: 2000000 },
    'E-003': { baseSalary: 14000000, bonus: 1800000 },
    'E-015': { baseSalary: 5500000, bonus: 700000 },
};

// Leave requests
let myLeaveRequests = JSON.parse(localStorage.getItem('employeeLeaveRequests_' + currentEmployeeId)) || [];

// Current employee
let currentEmployee = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadEmployeeProfile();
    loadMyLeaveRequests();
    updateLeaveStats();
    loadMySalary();
});

// Load employee profile
function loadEmployeeProfile() {
    // Oddiy ma'lumot - haqiqiy loyihada API dan keladi
    currentEmployee = employeesData.find(e => e.employeeId === currentEmployeeId);
    
    if (!currentEmployee) {
        // Agar topilmasa, oddiy ma'lumot yaratamiz
        const idNum = currentEmployeeId.replace('E-', '');
        currentEmployee = {
            employeeId: currentEmployeeId,
            fullName: 'Xodim ' + idNum,
            position: 'Lavozim',
            department: 'Bo\'lim',
            phone: '+998 XX XXX XX XX',
            hireDate: '2020-01-01',
            email: 'xodim' + idNum + '@medcare.uz'
        };
    }
    
    // Display name
    document.getElementById('employeeName').textContent = currentEmployee.fullName;
    document.getElementById('employeeIdDisplay').textContent = currentEmployee.employeeId;
    document.getElementById('employeePosition').textContent = currentEmployee.position;
    
    // Profile info
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
        <div class="info-item">
            <label>To'liq Ism</label>
            <div class="value">${currentEmployee.fullName}</div>
        </div>
        <div class="info-item">
            <label>Xodim ID</label>
            <div class="value">${currentEmployee.employeeId}</div>
        </div>
        <div class="info-item">
            <label>Lavozim</label>
            <div class="value">${currentEmployee.position}</div>
        </div>
        <div class="info-item">
            <label>Bo'lim</label>
            <div class="value">${currentEmployee.department}</div>
        </div>
        <div class="info-item">
            <label>Telefon</label>
            <div class="value">${currentEmployee.phone}</div>
        </div>
        <div class="info-item">
            <label>Email</label>
            <div class="value">${currentEmployee.email}</div>
        </div>
        <div class="info-item">
            <label>Ishga Qabul Qilingan</label>
            <div class="value">${formatDate(currentEmployee.hireDate)}</div>
        </div>
        <div class="info-item">
            <label>Holat</label>
            <div class="value"><span class="badge success">Faol</span></div>
        </div>
    `;
}

// Load my leave requests
function loadMyLeaveRequests() {
    const tbody = document.getElementById('myLeaveTableBody');
    
    if (myLeaveRequests.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 40px; color: #999;">
                    <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                    Sizda hali ta'til so'rovlari yo'q.<br>
                    <button class="btn-primary" onclick="openLeaveRequestModal()" style="margin-top: 15px;">
                        <i class="fas fa-plus"></i> Birinchi So'rov
                    </button>
                </td>
            </tr>
        `;
        return;
    }
    
    const leaveTypes = {
        'paid': '<i class="fas fa-money-bill-wave"></i> Klinika Hisobidan',
        'unpaid': '<i class="fas fa-briefcase"></i> O\'z Hisobidan',
        'sick': '<i class="fas fa-notes-medical"></i> Kasallik Varaqasi'
    };
    
    tbody.innerHTML = myLeaveRequests.map(req => {
        let statusBadge = '';
        if (req.status === 'pending') {
            statusBadge = '<span class="badge warning">Kutilmoqda</span>';
        } else if (req.status === 'approved') {
            statusBadge = '<span class="badge success">Tasdiqlangan</span>';
        } else if (req.status === 'rejected') {
            statusBadge = '<span class="badge danger">Rad etilgan</span>';
        }
        
        return `
            <tr>
                <td>${req.id}</td>
                <td>${leaveTypes[req.type]}</td>
                <td>${formatDate(req.startDate)}</td>
                <td>${formatDate(req.endDate)}</td>
                <td style="font-weight: 600;">${req.days} kun</td>
                <td style="max-width: 200px;">${req.reason}</td>
                <td>${statusBadge}</td>
            </tr>
        `;
    }).join('');
}

// Update leave stats
function updateLeaveStats() {
    const total = myLeaveRequests.length;
    const approved = myLeaveRequests.filter(r => r.status === 'approved').length;
    const pending = myLeaveRequests.filter(r => r.status === 'pending').length;
    
    document.getElementById('myTotalLeaves').textContent = total;
    document.getElementById('myApprovedLeaves').textContent = approved;
    document.getElementById('myPendingLeaves').textContent = pending;
}

// Load my salary
function loadMySalary() {
    const salary = salaryData[currentEmployeeId] || { baseSalary: 3000000, bonus: 300000 };
    const deductions = Math.floor((salary.baseSalary + salary.bonus) * 0.10);
    const totalPay = salary.baseSalary + salary.bonus - deductions;
    
    document.getElementById('mySalary').textContent = totalPay.toLocaleString() + ' so\'m';
    
    // Detailed salary
    const salaryDetails = document.getElementById('mySalaryDetails');
    salaryDetails.innerHTML = `
        <div style="max-width: 600px;">
            <h4 style="margin-bottom: 20px; color: #667eea;">Dekabr 2024 - Maosh Varaqasi</h4>
            
            <table style="width: 100%; margin-bottom: 20px;">
                <tr style="background: #f5f5f5;">
                    <td style="padding: 15px; font-weight: 600;">Asosiy Maosh</td>
                    <td style="padding: 15px; text-align: right; font-weight: 600;">${salary.baseSalary.toLocaleString()} so'm</td>
                </tr>
                <tr>
                    <td style="padding: 15px;">Bonus</td>
                    <td style="padding: 15px; text-align: right; color: #10b981;">+${salary.bonus.toLocaleString()} so'm</td>
                </tr>
                <tr style="background: #f5f5f5;">
                    <td style="padding: 15px;">Chegirmalar (10%)</td>
                    <td style="padding: 15px; text-align: right; color: #ef4444;">-${deductions.toLocaleString()} so'm</td>
                </tr>
                <tr style="border-top: 2px solid #667eea;">
                    <td style="padding: 15px; font-weight: 700; font-size: 18px;">Jami To'lov</td>
                    <td style="padding: 15px; text-align: right; font-weight: 700; font-size: 18px; color: #667eea;">${totalPay.toLocaleString()} so'm</td>
                </tr>
            </table>
            
            <div style="background: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #2e7d32;">
                <p style="margin: 0; color: #2e7d32;">
                    <i class="fas fa-check-circle"></i> <strong>To'landi</strong> - 2024-12-01
                </p>
            </div>
        </div>
    `;
}

// Switch tabs
function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    event.target.classList.add('active');
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Open leave request modal
function openLeaveRequestModal() {
    document.getElementById('leaveRequestModal').classList.add('active');
    document.getElementById('leaveRequestForm').reset();
    document.getElementById('empLeaveDays').value = '';
}

// Close leave request modal
function closeLeaveRequestModal() {
    document.getElementById('leaveRequestModal').classList.remove('active');
    document.getElementById('leaveRequestForm').reset();
}

// Calculate leave days
document.getElementById('empLeaveStartDate')?.addEventListener('change', calculateEmpLeaveDays);
document.getElementById('empLeaveEndDate')?.addEventListener('change', calculateEmpLeaveDays);

function calculateEmpLeaveDays() {
    const startDate = document.getElementById('empLeaveStartDate').value;
    const endDate = document.getElementById('empLeaveEndDate').value;
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        document.getElementById('empLeaveDays').value = diffDays;
    }
}

// Submit leave request
document.getElementById('leaveRequestForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    
    const newRequest = {
        id: 'L-' + Date.now(),
        employeeId: currentEmployeeId,
        employee: currentEmployee.fullName,
        position: currentEmployee.position,
        type: formData.get('leaveType'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        days: parseInt(formData.get('days')),
        reason: formData.get('reason'),
        status: 'pending',
        submittedDate: new Date().toISOString()
    };
    
    myLeaveRequests.unshift(newRequest);
    
    // Save to localStorage
    localStorage.setItem('employeeLeaveRequests_' + currentEmployeeId, JSON.stringify(myLeaveRequests));
    
    // HR Dashboard uchun ham saqlash (admin ko'rishi uchun)
    let allLeaveRequests = JSON.parse(localStorage.getItem('allLeaveRequests')) || [];
    allLeaveRequests.unshift(newRequest);
    localStorage.setItem('allLeaveRequests', JSON.stringify(allLeaveRequests));
    
    closeLeaveRequestModal();
    loadMyLeaveRequests();
    updateLeaveStats();
    
    alert('✅ Ta\'til so\'rovingiz yuborildi!\n\nAdmin tomonidan ko\'rib chiqiladi.');
});

// Logout
function logout() {
    if (confirm('Rostdan ham chiqmoqchimisiz?')) {
        localStorage.removeItem('employeeLoggedIn');
        localStorage.removeItem('employeeId');
        window.location.href = 'employee-login.html';
    }
}

// Format date
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('uz-UZ');
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('leaveRequestModal');
    if (event.target === modal) {
        closeLeaveRequestModal();
    }
}
