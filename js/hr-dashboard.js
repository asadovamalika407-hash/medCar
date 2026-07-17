// HR Dashboard JavaScript
// Backend URL - production uchun avtomatik o'zgaradi
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : '/api';
let employees = [];

// Sample data (API dan kelguncha) - 52 ta xodim
const sampleEmployees = [
    // 1. Bosh Vrach
    { _id: '1', employeeId: 'E-001', fullName: 'Prof. Dr. Rahimov Aziz Shokirovich', position: 'Bosh Vrach', department: 'Boshqaruv', phone: '+998 90 123 45 67', hireDate: '2015-01-10', status: 'active' },
    
    // 2-13. Shifokorlar (12 ta)
    { _id: '2', employeeId: 'E-002', fullName: 'Dr. Karimov Javohir Mahmudovich', position: 'Kardiolog', department: 'Kardiologiya', phone: '+998 90 234 56 78', hireDate: '2018-03-15', status: 'active' },
    { _id: '3', employeeId: 'E-003', fullName: 'Dr. Shukurova Dilnoza Akmalovna', position: 'Nevrolog', department: 'Nevrologiya', phone: '+998 91 345 67 89', hireDate: '2019-05-20', status: 'active' },
    { _id: '4', employeeId: 'E-004', fullName: 'Dr. Yusupov Sardorbek Nurmatovich', position: 'Terapevt', department: 'Terapiya', phone: '+998 93 456 78 90', hireDate: '2017-09-12', status: 'active' },
    { _id: '5', employeeId: 'E-005', fullName: 'Dr. Abdullayeva Nodira Rashidovna', position: 'Pediatr', department: 'Pediatriya', phone: '+998 94 567 89 01', hireDate: '2020-02-18', status: 'active' },
    { _id: '6', employeeId: 'E-006', fullName: 'Dr. Aliyev Bobur Valiyevich', position: 'Xirurg', department: 'Jarrohlik', phone: '+998 95 678 90 12', hireDate: '2016-07-25', status: 'active' },
    { _id: '7', employeeId: 'E-007', fullName: 'Dr. Mahmudova Zarina Ilhomovna', position: 'Ginekolog', department: 'Ginekologiya', phone: '+998 97 789 01 23', hireDate: '2019-11-08', status: 'active' },
    { _id: '8', employeeId: 'E-008', fullName: 'Dr. Tursunov Jasur Abduvaliyvich', position: 'Oftalmolog', department: 'Oftalmologiya', phone: '+998 98 890 12 34', hireDate: '2018-04-14', status: 'active' },
    { _id: '9', employeeId: 'E-009', fullName: 'Dr. Ibragimova Malika Yunusovna', position: 'Dermatolog', department: 'Dermatologiya', phone: '+998 90 901 23 45', hireDate: '2021-06-22', status: 'active' },
    { _id: '10', employeeId: 'E-010', fullName: 'Dr. Ergashev Otabek Shavkatovich', position: 'LOR Vrach', department: 'Otorinolaringologiya', phone: '+998 91 012 34 56', hireDate: '2017-12-05', status: 'active' },
    { _id: '11', employeeId: 'E-011', fullName: 'Dr. Saidova Laylo Karimovna', position: 'Endokrinolog', department: 'Endokrinologiya', phone: '+998 93 123 45 67', hireDate: '2020-08-30', status: 'active' },
    { _id: '12', employeeId: 'E-012', fullName: 'Dr. Nazarov Timur Anvarovich', position: 'Urolog', department: 'Urologiya', phone: '+998 94 234 56 78', hireDate: '2019-01-17', status: 'active' },
    { _id: '13', employeeId: 'E-013', fullName: 'Dr. Hasanova Sevara Rustamovna', position: 'Travmatolog', department: 'Travmatologiya', phone: '+998 95 345 67 89', hireDate: '2018-10-09', status: 'active' },
    
    // 14-28. Hamshiralar (15 ta)
    { _id: '14', employeeId: 'E-014', fullName: 'Rahimova Malika Azimovna', position: 'Bosh Hamshira', department: 'Hamshiralik', phone: '+998 97 456 78 90', hireDate: '2016-03-12', status: 'active' },
    { _id: '15', employeeId: 'E-015', fullName: 'Nurmatova Gulnora Sharipovna', position: 'Hamshira', department: 'Kardiologiya', phone: '+998 98 567 89 01', hireDate: '2019-05-18', status: 'active' },
    { _id: '16', employeeId: 'E-016', fullName: 'Ismoilova Dildora Bakhodirovna', position: 'Hamshira', department: 'Nevrologiya', phone: '+998 90 678 90 12', hireDate: '2020-07-22', status: 'active' },
    { _id: '17', employeeId: 'E-017', fullName: 'Tojiyeva Nilufar Davronovna', position: 'Hamshira', department: 'Terapiya', phone: '+998 91 789 01 23', hireDate: '2018-09-14', status: 'active' },
    { _id: '18', employeeId: 'E-018', fullName: 'Karimova Feruza Murodovna', position: 'Hamshira', department: 'Pediatriya', phone: '+998 93 890 12 34', hireDate: '2021-02-28', status: 'active' },
    { _id: '19', employeeId: 'E-019', fullName: 'Sharipova Madina Olimovna', position: 'Hamshira', department: 'Jarrohlik', phone: '+998 94 901 23 45', hireDate: '2017-11-05', status: 'active' },
    { _id: '20', employeeId: 'E-020', fullName: 'Toshmatova Zulfiya Abdullayevna', position: 'Hamshira', department: 'Ginekologiya', phone: '+998 95 012 34 56', hireDate: '2019-04-19', status: 'active' },
    { _id: '21', employeeId: 'E-021', fullName: 'Yuldasheva Nigora Hasanovna', position: 'Hamshira', department: 'Oftalmologiya', phone: '+998 97 123 45 67', hireDate: '2020-06-11', status: 'active' },
    { _id: '22', employeeId: 'E-022', fullName: 'Alimova Shoira Iskandarovna', position: 'Hamshira', department: 'Dermatologiya', phone: '+998 98 234 56 78', hireDate: '2018-08-23', status: 'active' },
    { _id: '23', employeeId: 'E-023', fullName: 'Azimova Dilbar Ravshanovna', position: 'Hamshira', department: 'Otorinolaringologiya', phone: '+998 90 345 67 89', hireDate: '2021-10-07', status: 'active' },
    { _id: '24', employeeId: 'E-024', fullName: 'Mustafayeva Kamola Sobir qizi', position: 'Hamshira', department: 'Endokrinologiya', phone: '+998 91 456 78 90', hireDate: '2019-12-15', status: 'active' },
    { _id: '25', employeeId: 'E-025', fullName: 'Hamidova Sevara Bahodir qizi', position: 'Hamshira', department: 'Urologiya', phone: '+998 93 567 89 01', hireDate: '2020-03-29', status: 'active' },
    { _id: '26', employeeId: 'E-026', fullName: 'Nosirova Gulchehra Jamshid qizi', position: 'Hamshira', department: 'Travmatologiya', phone: '+998 94 678 90 12', hireDate: '2018-05-17', status: 'active' },
    { _id: '27', employeeId: 'E-027', fullName: 'Qodirova Mohinur Shuhrat qizi', position: 'Hamshira', department: 'Terapiya', phone: '+998 95 789 01 23', hireDate: '2021-07-21', status: 'active' },
    { _id: '28', employeeId: 'E-028', fullName: 'Safarova Nozima Rustam qizi', position: 'Hamshira', department: 'Pediatriya', phone: '+998 97 890 12 34', hireDate: '2019-09-03', status: 'active' },
    
    // 29-33. Laborantlar (5 ta)
    { _id: '29', employeeId: 'E-029', fullName: 'Toshmatov Sardor Akramovich', position: 'Bosh Laborant', department: 'Laboratoriya', phone: '+998 98 901 23 45', hireDate: '2017-02-14', status: 'active' },
    { _id: '30', employeeId: 'E-030', fullName: 'Abdullayev Farxod Aziz o\'g\'li', position: 'Laborant', department: 'Laboratoriya', phone: '+998 90 012 34 56', hireDate: '2019-06-08', status: 'active' },
    { _id: '31', employeeId: 'E-031', fullName: 'Mirzayeva Umida Karim qizi', position: 'Laborant', department: 'Laboratoriya', phone: '+998 91 123 45 67', hireDate: '2020-11-12', status: 'active' },
    { _id: '32', employeeId: 'E-032', fullName: 'Xolmatov Botir Shavkat o\'g\'li', position: 'Laborant', department: 'Laboratoriya', phone: '+998 93 234 56 78', hireDate: '2018-04-26', status: 'active' },
    { _id: '33', employeeId: 'E-033', fullName: 'Rustamova Diyora Mansur qizi', position: 'Laborant', department: 'Laboratoriya', phone: '+998 94 345 67 89', hireDate: '2021-08-19', status: 'active' },
    
    // 34-37. Farmatsevtlar (4 ta)
    { _id: '34', employeeId: 'E-034', fullName: 'Mahmudov Sanjar Tursunovich', position: 'Bosh Farmatsevt', department: 'Dorixona', phone: '+998 95 456 78 90', hireDate: '2016-05-22', status: 'active' },
    { _id: '35', employeeId: 'E-035', fullName: 'Salimova Nilufar Baxtiyor qizi', position: 'Farmatsevt', department: 'Dorixona', phone: '+998 97 567 89 01', hireDate: '2019-10-11', status: 'active' },
    { _id: '36', employeeId: 'E-036', fullName: 'Usmonov Jasurbek Nodir o\'g\'li', position: 'Farmatsevt', department: 'Dorixona', phone: '+998 98 678 90 12', hireDate: '2020-01-27', status: 'active' },
    { _id: '37', employeeId: 'E-037', fullName: 'Qosimova Dilfuza Sobir qizi', position: 'Farmatsevt', department: 'Dorixona', phone: '+998 90 789 01 23', hireDate: '2018-12-05', status: 'active' },
    
    // 38-40. Administratorlar (3 ta)
    { _id: '38', employeeId: 'E-038', fullName: 'Olimov Sherali Ibragimovich', position: 'Administrator', department: 'Boshqaruv', phone: '+998 91 890 12 34', hireDate: '2017-07-19', status: 'active' },
    { _id: '39', employeeId: 'E-039', fullName: 'Hasanova Munira Anvar qizi', position: 'Administrator', department: 'Qabul', phone: '+998 93 901 23 45', hireDate: '2019-03-14', status: 'active' },
    { _id: '40', employeeId: 'E-040', fullName: 'Zakirov Farhod Rustam o\'g\'li', position: 'Administrator', department: 'Qabul', phone: '+998 94 012 34 56', hireDate: '2020-09-08', status: 'active' },
    
    // 41-45. Texnik Xodimlar (5 ta)
    { _id: '41', employeeId: 'E-041', fullName: 'Ismoilov Sherzod Abdulla o\'g\'li', position: 'Texnik', department: 'Texnik Xizmat', phone: '+998 95 123 45 67', hireDate: '2018-02-21', status: 'active' },
    { _id: '42', employeeId: 'E-042', fullName: 'Rasulov Bekzod Jamshid o\'g\'li', position: 'Elektrik', department: 'Texnik Xizmat', phone: '+998 97 234 56 78', hireDate: '2019-06-15', status: 'active' },
    { _id: '43', employeeId: 'E-043', fullName: 'Normatov Dilshod Aziz o\'g\'li', position: 'Santexnik', department: 'Texnik Xizmat', phone: '+998 98 345 67 89', hireDate: '2020-11-29', status: 'active' },
    { _id: '44', employeeId: 'E-044', fullName: 'Mamatov Ulugbek Karim o\'g\'li', position: 'IT Mutaxassis', department: 'IT Bo\'lim', phone: '+998 90 456 78 90', hireDate: '2017-04-12', status: 'active' },
    { _id: '45', employeeId: 'E-045', fullName: 'Qurbonov Sardorbek Mansur o\'g\'li', position: 'Haydovchi', department: 'Transport', phone: '+998 91 567 89 01', hireDate: '2018-08-07', status: 'active' },
    
    // 46-49. Tozalovchilar (4 ta)
    { _id: '46', employeeId: 'E-046', fullName: 'Rahmonova Gulnora Olim qizi', position: 'Tozalovchi', department: 'Xizmat', phone: '+998 93 678 90 12', hireDate: '2019-01-23', status: 'active' },
    { _id: '47', employeeId: 'E-047', fullName: 'Yusupova Dilfuza Shavkat qizi', position: 'Tozalovchi', department: 'Xizmat', phone: '+998 94 789 01 23', hireDate: '2020-05-18', status: 'active' },
    { _id: '48', employeeId: 'E-048', fullName: 'Nazarova Munisa Rustam qizi', position: 'Tozalovchi', department: 'Xizmat', phone: '+998 95 890 12 34', hireDate: '2018-10-09', status: 'active' },
    { _id: '49', employeeId: 'E-049', fullName: 'Maxmudova Zarina Nodir qizi', position: 'Tozalovchi', department: 'Xizmat', phone: '+998 97 901 23 45', hireDate: '2021-03-15', status: 'active' },
    
    // 50-52. Qorovullar (3 ta)
    { _id: '50', employeeId: 'E-050', fullName: 'Ergashev Otabek Valiyevich', position: 'Qorovul', department: 'Xavfsizlik', phone: '+998 98 012 34 56', hireDate: '2017-09-26', status: 'active' },
    { _id: '51', employeeId: 'E-051', fullName: 'Aliyev Jahongir Baxtiyor o\'g\'li', position: 'Qorovul', department: 'Xavfsizlik', phone: '+998 90 123 45 67', hireDate: '2019-12-11', status: 'active' },
    { _id: '52', employeeId: 'E-052', fullName: 'Tursunov Sardor Aziz o\'g\'li', position: 'Qorovul', department: 'Xavfsizlik', phone: '+998 91 234 56 78', hireDate: '2020-07-04', status: 'active' },
];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();
    loadSalaryData(); // Maosh ma'lumotlarini yuklash
    loadDocuments(); // Hujjatlarni yuklash
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
    
    // Agar maosh tabini ochsa, maosh jadvalini yangilash
    if (tabName === 'salary') {
        loadSalaryData();
    }
    
    // Agar ta'til tabini ochsa, ta'til jadvalini yangilash
    if (tabName === 'leave') {
        loadLeaveRequests();
    }
    
    // Agar hujjatlar tabini ochsa, hujjatlarni yangilash
    if (tabName === 'documents') {
        loadDocuments(currentDocumentFilter);
    }
}

// === HUJJATLAR TIZIMI ===

// Hujjatlar ma'lumotlari - BARCHA 52 ta xodimga MAJBURIY 3 ta hujjat (pasport, diplom, shartnoma)
// Jami: 156 ta hujjat
let documents = [];

// Har bir xodimga 3 ta hujjat qo'shish funksiyasi
function initializeDocuments() {
    let docId = 1;
    
    sampleEmployees.forEach(emp => {
        // 1. SHARTNOMA (MAJBURIY)
        documents.push({
            id: `DOC-${String(docId++).padStart(3, '0')}`,
            employeeId: emp.employeeId,
            employee: emp.fullName,
            type: 'contract',
            name: 'Mehnat Shartnomasi',
            uploadDate: emp.hireDate,
            size: '1.8 MB',
            status: 'verified'
        });
        
        // 2. PASPORT (MAJBURIY)
        documents.push({
            id: `DOC-${String(docId++).padStart(3, '0')}`,
            employeeId: emp.employeeId,
            employee: emp.fullName,
            type: 'passport',
            name: 'Pasport',
            uploadDate: emp.hireDate,
            size: '2.2 MB',
            status: 'verified'
        });
        
        // 3. DIPLOM (MAJBURIY)
        documents.push({
            id: `DOC-${String(docId++).padStart(3, '0')}`,
            employeeId: emp.employeeId,
            employee: emp.fullName,
            type: 'diploma',
            name: 'Diplom',
            uploadDate: emp.hireDate,
            size: '2.8 MB',
            status: 'verified'
        });
    });
}

// Hujjatlarni yuklash
initializeDocuments();

let currentDocumentFilter = 'all';

// Load documents
function loadDocuments() {
    const tbody = document.getElementById('documentsTableBody');
    if (!tbody) return;
    
    if (documents.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 40px; color: #999;">
                    <i class="fas fa-folder-open" style="font-size: 48px; margin-bottom: 10px; display: block;"></i>
                    Hujjatlar topilmadi
                </td>
            </tr>
        `;
        return;
    }
    
    const typeIcons = {
        'passport': '<i class="fas fa-id-card"></i>',
        'contract': '<i class="fas fa-file-contract"></i>',
        'diploma': '<i class="fas fa-graduation-cap"></i>',
        'certificate': '<i class="fas fa-certificate"></i>',
        'recommendation': '<i class="fas fa-envelope"></i>',
        'other': '<i class="fas fa-folder"></i>'
    };
    
    const typeNames = {
        'passport': 'Pasport',
        'contract': 'Shartnoma',
        'diploma': 'Diplom',
        'certificate': 'Sertifikat',
        'recommendation': 'Tavsiya',
        'other': 'Boshqa'
    };
    
    // Xodimlar bo'yicha guruhlash
    const groupedDocs = {};
    documents.forEach(doc => {
        if (!groupedDocs[doc.employee]) {
            groupedDocs[doc.employee] = [];
        }
        groupedDocs[doc.employee].push(doc);
    });
    
    // Jadvalga chiqarish
    tbody.innerHTML = Object.keys(groupedDocs).map(employeeName => {
        const employeeDocs = groupedDocs[employeeName];
        
        // Xodimning lavozimini topish
        const employee = employees.find(emp => emp.fullName === employeeName);
        const position = employee ? employee.position : '-';
        
        // Shartnoma borligini tekshirish
        const hasContract = employeeDocs.some(doc => doc.type === 'contract');
        
        // Eng yangi hujjatning sanasi
        const latestDate = employeeDocs.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))[0].uploadDate;
        
        // Jami hajm
        const totalSize = employeeDocs.reduce((sum, doc) => {
            const size = parseFloat(doc.size.replace(' MB', ''));
            return sum + size;
        }, 0).toFixed(1) + ' MB';
        
        return `
            <tr>
                <td style="font-weight: 600;">${employeeName}</td>
                <td style="color: #666;">${position}</td>
                <td>
                    <button class="btn-add" style="padding: 8px 16px; font-size: 13px;" onclick="viewEmployeeDocuments('${employeeName.replace(/'/g, "\\'")}')">
                        <i class="fas fa-folder-open"></i> Hujjatlarni Ko'rish (${employeeDocs.length})
                    </button>
                </td>
                <td>${formatDate(latestDate)}</td>
                <td>${totalSize}</td>
                <td>
                    ${hasContract 
                        ? '<span class="badge success"><i class="fas fa-check"></i> Shartnoma Bor</span>' 
                        : '<span class="badge danger"><i class="fas fa-times"></i> Shartnoma Yo\'q</span>'}
                </td>
            </tr>
        `;
    }).join('');
}

// View employee documents modal
function viewEmployeeDocuments(employeeName) {
    const employeeDocs = documents.filter(doc => doc.employee === employeeName);
    
    if (employeeDocs.length === 0) {
        alert('⚠️ Bu xodim uchun hujjatlar topilmadi!');
        return;
    }
    
    const typeIcons = {
        'passport': '<i class="fas fa-id-card"></i>',
        'contract': '<i class="fas fa-file-contract"></i>',
        'diploma': '<i class="fas fa-graduation-cap"></i>',
        'certificate': '<i class="fas fa-certificate"></i>',
        'recommendation': '<i class="fas fa-envelope"></i>',
        'other': '<i class="fas fa-folder"></i>'
    };
    
    const typeNames = {
        'passport': 'Pasport',
        'contract': 'Shartnoma',
        'diploma': 'Diplom',
        'certificate': 'Sertifikat',
        'recommendation': 'Tavsiya',
        'other': 'Boshqa'
    };
    
    // Hujjatlar ro'yxatini yaratish
    const docsList = employeeDocs.map(doc => `
        <div style="display: flex; align-items: center; gap: 12px; padding: 12px; border: 1px solid #e0e0e0; border-radius: 8px; margin-bottom: 10px; background: #f9f9f9;">
            <div style="font-size: 32px; color: #1976d2;">${typeIcons[doc.type]}</div>
            <div style="flex: 1;">
                <div style="font-weight: bold; font-size: 15px; color: #333;">${typeNames[doc.type]}</div>
                <div style="font-size: 12px; color: #666;">
                    <i class="fas fa-calendar"></i> ${formatDate(doc.uploadDate)} | 
                    <i class="fas fa-file"></i> ${doc.size}
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button class="btn-download" onclick="downloadDocument('${doc.id}'); event.stopPropagation();">
                    <i class="fas fa-download"></i> Yuklab Olish
                </button>
                <button class="btn-icon btn-delete" onclick="if(confirm('Rostdan ham bu hujjatni o\\'chirmoqchimisiz?')) { deleteDocument('${doc.id}'); closeDocumentsModal(); } event.stopPropagation();">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    // Modal yaratish
    const modalHtml = `
        <div id="viewDocumentsModal" class="modal active">
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h3><i class="fas fa-folder-open"></i> ${employeeName} - Hujjatlar</h3>
                    <button class="close-modal" onclick="closeDocumentsModal()">&times;</button>
                </div>
                <div style="max-height: 500px; overflow-y: auto; padding: 10px;">
                    ${docsList}
                </div>
                <div class="form-actions" style="margin-top: 20px;">
                    <button class="btn-cancel" onclick="closeDocumentsModal()">Yopish</button>
                </div>
            </div>
        </div>
    `;
    
    // Modal qo'shish
    document.body.insertAdjacentHTML('beforeend', modalHtml);
}

// Close documents modal
function closeDocumentsModal() {
    const modal = document.getElementById('viewDocumentsModal');
    if (modal) {
        modal.remove();
        loadDocuments(); // Jadval yangilanadi
    }
}

// Filter documents (endi kerak emas, lekin qoldiramiz agar kerak bo'lsa)
function filterDocuments(type) {
    // Bu funksiya endi ishlatilmaydi, chunki filter tugmalari olib tashlandi
    loadDocuments();
}

// Open upload document modal
function openUploadDocumentModal() {
    document.getElementById('uploadDocumentModal').classList.add('active');
    
    // Xodimlar ro'yxatini yuklash
    const select = document.getElementById('docEmployeeSelect');
    select.innerHTML = '<option value="">Xodim tanlang...</option>' + 
        employees.map(emp => `<option value="${emp.employeeId}">${emp.fullName} - ${emp.position}</option>`).join('');
    
    document.getElementById('uploadDocumentForm').reset();
    document.getElementById('selectedFileName').textContent = '';
}

// Close upload document modal
function closeUploadDocumentModal() {
    document.getElementById('uploadDocumentModal').classList.remove('active');
    document.getElementById('uploadDocumentForm').reset();
}

// Handle file selection
document.getElementById('documentFile')?.addEventListener('change', function() {
    const fileName = this.files[0] ? this.files[0].name : '';
    document.getElementById('selectedFileName').textContent = fileName ? '✅ ' + fileName : '';
});

// Upload document form submit
document.getElementById('uploadDocumentForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const employeeId = formData.get('employeeId');
    const employee = employees.find(e => e.employeeId === employeeId);
    
    if (!employee) {
        alert('⚠️ Xodim topilmadi!');
        return;
    }
    
    const file = document.getElementById('documentFile').files[0];
    if (!file) {
        alert('⚠️ Iltimos fayl tanlang!');
        return;
    }
    
    const newDoc = {
        id: 'DOC-' + String(documents.length + 1).padStart(3, '0'),
        employeeId: employeeId,
        employee: employee.fullName,
        type: formData.get('documentType'),
        name: formData.get('documentName'),
        uploadDate: new Date().toISOString().split('T')[0],
        size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
        status: 'verified'
    };
    
    documents.unshift(newDoc);
    
    closeUploadDocumentModal();
    loadDocuments(); // Barcha hujjatlarni ko'rsatish
    
    alert('✅ Hujjat yuklandi!\n\nXodim: ' + employee.fullName + '\nFayl: ' + file.name);
});

// Download document (PDF)
function downloadDocument(docId) {
    const doc = documents.find(d => d.id === docId);
    if (!doc) return;
    
    // jsPDF bilan PDF yaratish
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
    
    // PDF mazmuni
    pdf.setFontSize(20);
    pdf.text('MedCare Klinikasi', 105, 20, { align: 'center' });
    
    pdf.setFontSize(16);
    pdf.text('Xodim Hujjati', 105, 30, { align: 'center' });
    
    pdf.setLineWidth(0.5);
    pdf.line(20, 35, 190, 35);
    
    // Hujjat ma'lumotlari
    pdf.setFontSize(12);
    let y = 50;
    
    pdf.text('Hujjat ID:', 20, y);
    pdf.text(doc.id, 70, y);
    y += 10;
    
    pdf.text('Xodim:', 20, y);
    pdf.text(doc.employee, 70, y);
    y += 10;
    
    pdf.text('Hujjat Nomi:', 20, y);
    pdf.text(doc.name, 70, y);
    y += 10;
    
    const typeNames = {
        'passport': 'Pasport',
        'contract': 'Shartnoma',
        'diploma': 'Diplom',
        'certificate': 'Sertifikat',
        'recommendation': 'Tavsiya',
        'other': 'Boshqa'
    };
    
    pdf.text('Turi:', 20, y);
    pdf.text(typeNames[doc.type] || doc.type, 70, y);
    y += 10;
    
    pdf.text('Yuklangan Sana:', 20, y);
    pdf.text(formatDate(doc.uploadDate), 70, y);
    y += 10;
    
    pdf.text('Fayl Hajmi:', 20, y);
    pdf.text(doc.size, 70, y);
    y += 10;
    
    pdf.text('Holat:', 20, y);
    pdf.text('Tasdiqlangan', 70, y);
    y += 20;
    
    // Footer
    pdf.setLineWidth(0.5);
    pdf.line(20, y, 190, y);
    y += 10;
    
    pdf.setFontSize(10);
    pdf.text('MedCare Klinikasi - Xodimlar Hujjatlari', 105, y, { align: 'center' });
    y += 5;
    pdf.text('Toshkent sh., Yunusobod tumani', 105, y, { align: 'center' });
    y += 5;
    pdf.text('Tel: +998 71 200 10 10 | www.medcare.uz', 105, y, { align: 'center' });
    
    // PDF ni saqlash
    pdf.save(doc.id + '_' + doc.employee.replace(/\s+/g, '_') + '.pdf');
    
    alert('✅ PDF yuklab olindi!\n\nHujjat: ' + doc.name + '\nXodim: ' + doc.employee);
}

// Delete document
function deleteDocument(docId) {
    if (!confirm('Rostdan ham bu hujjatni o\'chirmoqchimisiz?')) return;
    
    documents = documents.filter(d => d.id !== docId);
    loadDocuments(); // Barcha hujjatlarni qayta yuklash
    alert('✅ Hujjat o\'chirildi!');
}

// === TA'TIL TIZIMI ===

// Ta'til so'rovlari ma'lumotlari
let leaveRequests = [
    { id: 'L-001', employeeId: 'E-003', employee: 'Dr. Shukurova Dilnoza', position: 'Nevrolog', type: 'paid', startDate: '2024-12-20', endDate: '2024-12-27', days: 7, reason: 'Yillik dam olish', status: 'approved' },
    { id: 'L-002', employeeId: 'E-015', employee: 'Nurmatova Gulnora', position: 'Hamshira', type: 'sick', startDate: '2024-12-15', endDate: '2024-12-18', days: 3, reason: 'Kasallik (gripp)', status: 'approved' },
    { id: 'L-003', employeeId: 'E-028', employee: 'Safarova Nozima', position: 'Hamshira', type: 'unpaid', startDate: '2024-12-22', endDate: '2024-12-23', days: 2, reason: 'Shaxsiy oilaviy vaziyat', status: 'pending' },
    { id: 'L-004', employeeId: 'E-042', employee: 'Rasulov Bekzod', position: 'Elektrik', type: 'paid', startDate: '2025-01-10', endDate: '2025-01-20', days: 10, reason: 'Dam olish', status: 'pending' },
    { id: 'L-005', employeeId: 'E-007', employee: 'Dr. Mahmudova Zarina', position: 'Ginekolog', type: 'sick', startDate: '2024-12-01', endDate: '2024-12-10', days: 10, reason: 'Kasallik', status: 'approved' },
    { id: 'L-006', employeeId: 'E-051', employee: 'Aliyev Jahongir', position: 'Qorovul', type: 'unpaid', startDate: '2024-12-25', endDate: '2024-12-30', days: 5, reason: 'Xususiy sabab', status: 'rejected' },
];

// Open leave request modal
function openLeaveRequestModal() {
    document.getElementById('leaveRequestModal').classList.add('active');
    
    // Xodimlar ro'yxatini yuklash
    const select = document.getElementById('leaveEmployeeSelect');
    select.innerHTML = '<option value="">Xodim tanlang...</option>' + 
        employees.map(emp => `<option value="${emp.employeeId}">${emp.fullName} - ${emp.position}</option>`).join('');
    
    // Formani reset qilish
    document.getElementById('leaveRequestForm').reset();
    document.getElementById('leaveDays').value = '';
}

// Close leave request modal
function closeLeaveRequestModal() {
    document.getElementById('leaveRequestModal').classList.remove('active');
    document.getElementById('leaveRequestForm').reset();
}

// Calculate leave days
document.getElementById('leaveStartDate')?.addEventListener('change', calculateLeaveDays);
document.getElementById('leaveEndDate')?.addEventListener('change', calculateLeaveDays);

function calculateLeaveDays() {
    const startDate = document.getElementById('leaveStartDate').value;
    const endDate = document.getElementById('leaveEndDate').value;
    
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 kunni o'zi ham hisobga olish
        document.getElementById('leaveDays').value = diffDays;
    }
}

// Leave request form submit
document.getElementById('leaveRequestForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const employeeId = formData.get('employeeId');
    const employee = employees.find(e => e.employeeId === employeeId);
    
    if (!employee) {
        alert('⚠️ Xodim topilmadi!');
        return;
    }
    
    // Prepare data for API
    const leaveData = {
        employeeId: employeeId,
        employeeName: employee.fullName,
        employeePosition: employee.position,
        leaveType: formData.get('leaveType'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate'),
        days: parseInt(formData.get('days')),
        reason: formData.get('reason')
    };
    
    try {
        // Send to backend API
        const response = await fetch(`${API_URL}/leave-requests`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(leaveData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Add to local array
            const leaveTypes = {
                'paid': 'Klinika Hisobidan',
                'unpaid': 'O\'z Hisobidan',
                'sick': 'Kasallik Varaqasi',
                'personal': 'Shaxsiy'
            };
            
            const newRequest = {
                id: result.data.requestId,
                employeeId: employeeId,
                employee: employee.fullName,
                position: employee.position,
                type: formData.get('leaveType'),
                startDate: formData.get('startDate'),
                endDate: formData.get('endDate'),
                days: parseInt(formData.get('days')),
                reason: formData.get('reason'),
                status: 'pending'
            };
            
            leaveRequests.unshift(newRequest);
            
            // Refresh tab if active
            if (document.getElementById('leave-tab').classList.contains('active')) {
                loadLeaveRequests();
            }
            
            closeLeaveRequestModal();
            alert('✅ Ta\'til so\'rovi muvaffaqiyatli yuborildi!\n\nXodim: ' + employee.fullName + '\nTuri: ' + leaveTypes[newRequest.type] + '\n\nAriza Admin paneliga yuborildi.');
        } else {
            alert('❌ Xatolik: ' + result.message);
        }
    } catch (error) {
        console.error('Error submitting leave request:', error);
        alert('❌ Ariza yuborishda xatolik yuz berdi!\nXatolik: ' + error.message);
    }
});

// Load leave requests
function loadLeaveRequests() {
    const tbody = document.getElementById('leaveTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = leaveRequests.map(req => {
        let statusBadge = '';
        let actionButtons = '';
        
        if (req.status === 'pending') {
            statusBadge = '<span class="badge warning">Kutilmoqda</span>';
            actionButtons = `
                <div class="action-btns">
                    <button class="btn-icon" style="background: #e8f5e9; color: #2e7d32;" onclick="approveLeave('${req.id}')">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-icon" style="background: #ffebee; color: #d32f2f;" onclick="rejectLeave('${req.id}')">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
        } else if (req.status === 'approved') {
            statusBadge = '<span class="badge success">Tasdiqlangan</span>';
            actionButtons = '<span style="color: #2e7d32; font-size: 20px;"><i class="fas fa-check-circle"></i></span>';
        } else if (req.status === 'rejected') {
            statusBadge = '<span class="badge danger">Rad etilgan</span>';
            actionButtons = '<span style="color: #d32f2f; font-size: 20px;"><i class="fas fa-times-circle"></i></span>';
        }
        
        const leaveTypes = {
            'paid': '<i class="fas fa-money-bill-wave"></i> Klinika Hisobidan',
            'unpaid': '<i class="fas fa-briefcase"></i> O\'z Hisobidan',
            'sick': '<i class="fas fa-notes-medical"></i> Kasallik Varaqasi'
        };
        
        return `
            <tr>
                <td>${req.id}</td>
                <td>${req.employee}</td>
                <td>${req.position}</td>
                <td>${leaveTypes[req.type]}</td>
                <td>${formatDate(req.startDate)}</td>
                <td>${formatDate(req.endDate)}</td>
                <td style="font-weight: 600;">${req.days} kun</td>
                <td style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${req.reason}</td>
                <td>${statusBadge}</td>
                <td>${actionButtons}</td>
            </tr>
        `;
    }).join('');
    
    // Statistikani yangilash
    updateLeaveStats();
}

// Update leave statistics
function updateLeaveStats() {
    const pending = leaveRequests.filter(r => r.status === 'pending').length;
    const approved = leaveRequests.filter(r => r.status === 'approved').length;
    const rejected = leaveRequests.filter(r => r.status === 'rejected').length;
    
    // Hozirgi kunni olish
    const today = new Date();
    const ongoing = leaveRequests.filter(r => {
        const start = new Date(r.startDate);
        const end = new Date(r.endDate);
        return r.status === 'approved' && today >= start && today <= end;
    }).length;
    
    document.getElementById('leavePending').textContent = pending;
    document.getElementById('leaveApproved').textContent = approved;
    document.getElementById('leaveRejected').textContent = rejected;
    document.getElementById('leaveOngoing').textContent = ongoing;
}

// Approve leave
function approveLeave(id) {
    if (!confirm('Ushbu ta\'til so\'rovini tasdiqlaysizmi?')) return;
    
    const request = leaveRequests.find(r => r.id === id);
    if (request) {
        request.status = 'approved';
        loadLeaveRequests();
        alert('✅ Ta\'til so\'rovi tasdiqlandi!\n\nXodim: ' + request.employee);
    }
}

// Reject leave
function rejectLeave(id) {
    const reason = prompt('Rad etish sababini kiriting:');
    if (!reason) return;
    
    const request = leaveRequests.find(r => r.id === id);
    if (request) {
        request.status = 'rejected';
        request.rejectionReason = reason;
        loadLeaveRequests();
        alert('❌ Ta\'til so\'rovi rad etildi!\n\nXodim: ' + request.employee + '\nSabab: ' + reason);
    }
}

// === MAOSH TIZIMI ===

// Xodimlarning maosh ma'lumotlari (asosiy maosh)
const salaryData = {
    'E-001': { baseSalary: 25000000, bonus: 5000000 }, // Bosh Vrach
    'E-002': { baseSalary: 15000000, bonus: 2000000 }, // Kardiolog
    'E-003': { baseSalary: 14000000, bonus: 1800000 }, // Nevrolog
    'E-004': { baseSalary: 12000000, bonus: 1500000 }, // Terapevt
    'E-005': { baseSalary: 13000000, bonus: 1600000 }, // Pediatr
    'E-006': { baseSalary: 16000000, bonus: 2200000 }, // Xirurg
    'E-007': { baseSalary: 14000000, bonus: 1900000 }, // Ginekolog
    'E-008': { baseSalary: 13000000, bonus: 1700000 }, // Oftalmolog
    'E-009': { baseSalary: 12000000, bonus: 1500000 }, // Dermatolog
    'E-010': { baseSalary: 11000000, bonus: 1400000 }, // LOR
    'E-011': { baseSalary: 13000000, bonus: 1600000 }, // Endokrinolog
    'E-012': { baseSalary: 12000000, bonus: 1500000 }, // Urolog
    'E-013': { baseSalary: 13000000, bonus: 1700000 }, // Travmatolog
    
    // Hamshiralar
    'E-014': { baseSalary: 8000000, bonus: 1000000 },  // Bosh Hamshira
    'E-015': { baseSalary: 5500000, bonus: 700000 },
    'E-016': { baseSalary: 5500000, bonus: 700000 },
    'E-017': { baseSalary: 5500000, bonus: 700000 },
    'E-018': { baseSalary: 5500000, bonus: 700000 },
    'E-019': { baseSalary: 5500000, bonus: 700000 },
    'E-020': { baseSalary: 5500000, bonus: 700000 },
    'E-021': { baseSalary: 5500000, bonus: 700000 },
    'E-022': { baseSalary: 5500000, bonus: 700000 },
    'E-023': { baseSalary: 5500000, bonus: 700000 },
    'E-024': { baseSalary: 5500000, bonus: 700000 },
    'E-025': { baseSalary: 5500000, bonus: 700000 },
    'E-026': { baseSalary: 5500000, bonus: 700000 },
    'E-027': { baseSalary: 5500000, bonus: 700000 },
    'E-028': { baseSalary: 5500000, bonus: 700000 },
    
    // Laborantlar
    'E-029': { baseSalary: 7000000, bonus: 900000 },   // Bosh Laborant
    'E-030': { baseSalary: 5000000, bonus: 600000 },
    'E-031': { baseSalary: 5000000, bonus: 600000 },
    'E-032': { baseSalary: 5000000, bonus: 600000 },
    'E-033': { baseSalary: 5000000, bonus: 600000 },
    
    // Farmatsevtlar
    'E-034': { baseSalary: 7500000, bonus: 1000000 },  // Bosh Farmatsevt
    'E-035': { baseSalary: 5200000, bonus: 650000 },
    'E-036': { baseSalary: 5200000, bonus: 650000 },
    'E-037': { baseSalary: 5200000, bonus: 650000 },
    
    // Administratorlar
    'E-038': { baseSalary: 6500000, bonus: 800000 },
    'E-039': { baseSalary: 4500000, bonus: 500000 },
    'E-040': { baseSalary: 4500000, bonus: 500000 },
    
    // Texnik xodimlar
    'E-041': { baseSalary: 4000000, bonus: 400000 },
    'E-042': { baseSalary: 4200000, bonus: 450000 },
    'E-043': { baseSalary: 4000000, bonus: 400000 },
    'E-044': { baseSalary: 6000000, bonus: 800000 },   // IT
    'E-045': { baseSalary: 4500000, bonus: 500000 },
    
    // Tozalovchilar
    'E-046': { baseSalary: 3000000, bonus: 300000 },
    'E-047': { baseSalary: 3000000, bonus: 300000 },
    'E-048': { baseSalary: 3000000, bonus: 300000 },
    'E-049': { baseSalary: 3000000, bonus: 300000 },
    
    // Qorovullar
    'E-050': { baseSalary: 3500000, bonus: 350000 },
    'E-051': { baseSalary: 3500000, bonus: 350000 },
    'E-052': { baseSalary: 3500000, bonus: 350000 },
};

// Load salary data
function loadSalaryData() {
    const tbody = document.getElementById('salaryTableBody');
    if (!tbody) return;
    
    let totalFund = 0;
    let salaries = [];
    
    tbody.innerHTML = employees.map(emp => {
        const salary = salaryData[emp.employeeId] || { baseSalary: 3000000, bonus: 300000 };
        
        // Chegirmalar (10% - soliq, ijtimoiy)
        const deductions = Math.floor((salary.baseSalary + salary.bonus) * 0.10);
        
        // Jami to'lov
        const totalPay = salary.baseSalary + salary.bonus - deductions;
        
        totalFund += totalPay;
        salaries.push(totalPay);
        
        return `
            <tr>
                <td>${emp.employeeId}</td>
                <td>${emp.fullName}</td>
                <td>${emp.position}</td>
                <td>${emp.department}</td>
                <td style="font-weight: 600;">${salary.baseSalary.toLocaleString()} so'm</td>
                <td style="color: #10b981; font-weight: 600;">+${salary.bonus.toLocaleString()} so'm</td>
                <td style="color: #ef4444; font-weight: 600;">-${deductions.toLocaleString()} so'm</td>
                <td style="font-weight: 700; font-size: 15px; color: #1976d2;">${totalPay.toLocaleString()} so'm</td>
                <td><span class="badge success">To'landi</span></td>
            </tr>
        `;
    }).join('');
    
    // Statistikani yangilash
    document.getElementById('totalSalaryFund').textContent = totalFund.toLocaleString() + ' so\'m';
    document.getElementById('averageSalary').textContent = Math.floor(totalFund / employees.length).toLocaleString() + ' so\'m';
    document.getElementById('maxSalary').textContent = Math.max(...salaries).toLocaleString() + ' so\'m';
    document.getElementById('minSalary').textContent = Math.min(...salaries).toLocaleString() + ' so\'m';
}

// Filter salary by month
function filterSalaryByMonth() {
    const month = document.getElementById('salaryMonthFilter').value;
    const [year, monthNum] = month.split('-');
    
    // Oy nomlarini olish
    const monthNames = {
        '01': 'Yanvar', '02': 'Fevral', '03': 'Mart', '04': 'Aprel',
        '05': 'May', '06': 'Iyun', '07': 'Iyul', '08': 'Avgust',
        '09': 'Sentyabr', '10': 'Oktyabr', '11': 'Noyabr', '12': 'Dekabr'
    };
    
    // Ma'lumotlarni qayta yuklash
    loadSalaryData();
    
    // Success xabari
    console.log(`Maosh: ${monthNames[monthNum]} ${year}`);
}

// Export salary report to Excel
function exportSalaryReport() {
    const month = document.getElementById('salaryMonthFilter').value;
    const [year, monthNum] = month.split('-');
    
    const monthNames = {
        '01': 'Yanvar', '02': 'Fevral', '03': 'Mart', '04': 'Aprel',
        '05': 'May', '06': 'Iyun', '07': 'Iyul', '08': 'Avgust',
        '09': 'Sentyabr', '10': 'Oktyabr', '11': 'Noyabr', '12': 'Dekabr'
    };
    
    // Excel uchun HTML jadval yaratish
    let html = `
        <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
            <meta charset="UTF-8">
            <style>
                table { border-collapse: collapse; width: 100%; }
                th, td { border: 1px solid #000; padding: 8px; text-align: left; }
                th { background-color: #4472C4; color: white; font-weight: bold; }
                .header { font-size: 18px; font-weight: bold; text-align: center; margin-bottom: 10px; }
                .total { background-color: #E7E6E6; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="header">MedCare Klinikasi - Maosh Hisoboti</div>
            <div class="header">${monthNames[monthNum]} ${year}</div>
            <br>
            <table>
                <thead>
                    <tr>
                        <th>№</th>
                        <th>ID</th>
                        <th>Xodim</th>
                        <th>Lavozim</th>
                        <th>Bo'lim</th>
                        <th>Asosiy Maosh</th>
                        <th>Bonus</th>
                        <th>Chegirmalar (10%)</th>
                        <th>Jami To'lov</th>
                    </tr>
                </thead>
                <tbody>
    `;
    
    let totalFund = 0;
    let rowNum = 1;
    
    employees.forEach(emp => {
        const salary = salaryData[emp.employeeId] || { baseSalary: 3000000, bonus: 300000 };
        const deductions = Math.floor((salary.baseSalary + salary.bonus) * 0.10);
        const totalPay = salary.baseSalary + salary.bonus - deductions;
        totalFund += totalPay;
        
        html += `
            <tr>
                <td>${rowNum++}</td>
                <td>${emp.employeeId}</td>
                <td>${emp.fullName}</td>
                <td>${emp.position}</td>
                <td>${emp.department}</td>
                <td>${salary.baseSalary.toLocaleString()} so'm</td>
                <td>${salary.bonus.toLocaleString()} so'm</td>
                <td>${deductions.toLocaleString()} so'm</td>
                <td>${totalPay.toLocaleString()} so'm</td>
            </tr>
        `;
    });
    
    html += `
                    <tr class="total">
                        <td colspan="8" style="text-align: right;"><strong>JAMI:</strong></td>
                        <td><strong>${totalFund.toLocaleString()} so'm</strong></td>
                    </tr>
                </tbody>
            </table>
            <br>
            <p><strong>Jami xodimlar:</strong> ${employees.length} ta</p>
            <p><strong>O'rtacha maosh:</strong> ${Math.floor(totalFund / employees.length).toLocaleString()} so'm</p>
            <p><strong>Yaratilgan sana:</strong> ${new Date().toLocaleDateString('uz-UZ')}</p>
        </body>
        </html>
    `;
    
    // Excel faylini yuklab olish
    const blob = new Blob(['\ufeff' + html], {
        type: 'application/vnd.ms-excel;charset=utf-8'
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Maosh_Hisoboti_${monthNames[monthNum]}_${year}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    alert(`✅ Excel hisoboti yuklab olindi!\n\nFayl: Maosh_Hisoboti_${monthNames[monthNum]}_${year}.xls\nXodimlar: ${employees.length} ta\nJami: ${totalFund.toLocaleString()} so'm`);
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
    // Modalni ochish
    document.getElementById('markAttendanceModal').classList.add('active');
    
    // Xodimlar ro'yxatini yuklash
    const select = document.getElementById('attendanceEmployeeSelect');
    select.innerHTML = '<option value="">Xodim tanlang...</option>' + 
        employees.map(emp => `<option value="${emp._id}">${emp.fullName} - ${emp.position}</option>`).join('');
    
    // Formani reset qilish
    document.getElementById('markAttendanceForm').reset();
    document.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('selected'));
    document.getElementById('arrivalTimeGroup').style.display = 'none';
}

// Close attendance modal
function closeAttendanceModal() {
    document.getElementById('markAttendanceModal').classList.remove('active');
    document.getElementById('markAttendanceForm').reset();
    document.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('selected'));
}

// Select attendance status
function selectAttendanceStatus(status) {
    // Barcha tugmalardan "selected" class'ni olib tashlash
    document.querySelectorAll('.status-btn').forEach(btn => btn.classList.remove('selected'));
    
    // Tanlangan tugmaga "selected" class qo'shish
    const selectedBtn = document.querySelector(`.status-btn[data-status="${status}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('selected');
    }
    
    // Hidden input'ga qiymat qo'yish
    document.getElementById('attendanceStatus').value = status;
    
    // Agar "Keldi" yoki "Kech qoldi" tanlansa, vaqt input'larini ko'rsatish
    const arrivalTimeGroup = document.getElementById('arrivalTimeGroup');
    const departureTimeGroup = document.getElementById('departureTimeGroup');
    
    if (status === 'present' || status === 'late') {
        arrivalTimeGroup.style.display = 'block';
        departureTimeGroup.style.display = 'block';
        
        // Default vaqtlarni qo'yish
        const now = new Date();
        const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        document.getElementById('arrivalTime').value = currentTime;
        
        // Ketish vaqti (8 soat keyin)
        const departureHour = (now.getHours() + 8) % 24;
        const departureTime = departureHour.toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        document.getElementById('departureTime').value = departureTime;
    } else {
        arrivalTimeGroup.style.display = 'none';
        departureTimeGroup.style.display = 'none';
        document.getElementById('arrivalTime').value = '';
        document.getElementById('departureTime').value = '';
    }
}

// Mark attendance form submit
document.getElementById('markAttendanceForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const employeeId = document.getElementById('attendanceEmployeeSelect').value;
    const status = document.getElementById('attendanceStatus').value;
    const arrivalTime = document.getElementById('arrivalTime').value || '-';
    const departureTime = document.getElementById('departureTime').value || '-';
    const note = document.getElementById('attendanceNote').value || '-';
    
    if (!employeeId || !status) {
        alert('⚠️ Xodim va holatni tanlang!');
        return;
    }
    
    // Xodim ma'lumotlarini olish
    const employee = employees.find(e => e._id === employeeId);
    if (!employee) return;
    
    // Holat badge yaratish
    let statusBadge = '';
    if (status === 'present') {
        statusBadge = '<span class="badge success">Keldi</span>';
    } else if (status === 'late') {
        statusBadge = '<span class="badge warning">Kech qoldi</span>';
    } else if (status === 'absent') {
        statusBadge = '<span class="badge danger">Kelmadi</span>';
    }
    
    // Jadvalga qo'shish
    const tbody = document.getElementById('attendanceTableBody');
    const newRow = `
        <tr>
            <td>${employee.fullName}</td>
            <td>${arrivalTime}</td>
            <td>${departureTime}</td>
            <td>${statusBadge}</td>
            <td>${note}</td>
        </tr>
    `;
    
    // Yangi qatorni boshiga qo'shish
    tbody.insertAdjacentHTML('afterbegin', newRow);
    
    // Modalni yopish
    closeAttendanceModal();
    
    // Success xabari
    alert('✅ Davomat belgilandi: ' + employee.fullName + '\nKelish: ' + arrivalTime + '\nKetish: ' + departureTime);
    
    // Statistikani yangilash
    updateStats();
});

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
    const employeeModal = document.getElementById('addEmployeeModal');
    const attendanceModal = document.getElementById('markAttendanceModal');
    const leaveModal = document.getElementById('leaveRequestModal');
    const documentModal = document.getElementById('uploadDocumentModal');
    
    if (event.target === employeeModal) {
        closeAddEmployeeModal();
    }
    if (event.target === attendanceModal) {
        closeAttendanceModal();
    }
    if (event.target === leaveModal) {
        closeLeaveRequestModal();
    }
    if (event.target === documentModal) {
        closeUploadDocumentModal();
    }
}
