// Barcha 52 ta xodimga pasport, diplom, shartnoma qo'shish
const generateAllDocuments = () => {
    const docs = [];
    let docId = 1;
    
    // Har bir xodim uchun 3 ta hujjat
    sampleEmployees.forEach(emp => {
        // 1. Shartnoma (majburiy)
        docs.push({
            id: `DOC-${String(docId++).padStart(3, '0')}`,
            employeeId: emp.employeeId,
            employee: emp.fullName,
            type: 'contract',
            name: 'Mehnat Shartnomasi',
            uploadDate: emp.hireDate,
            size: '1.8 MB',
            status: 'verified'
        });
        
        // 2. Pasport
        docs.push({
            id: `DOC-${String(docId++).padStart(3, '0')}`,
            employeeId: emp.employeeId,
            employee: emp.fullName,
            type: 'passport',
            name: 'Pasport',
            uploadDate: emp.hireDate,
            size: '2.2 MB',
            status: 'verified'
        });
        
        // 3. Diplom
        docs.push({
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
    
    return docs;
};

// Export
console.log(JSON.stringify(generateAllDocuments(), null, 2));
