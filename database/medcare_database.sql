-- MedCare Klinika Database
-- Versiya: 1.0.0
-- Yaratilgan: 2025-06-06

-- Database yaratish
CREATE DATABASE IF NOT EXISTS medcare_clinic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medcare_clinic;

-- 1. USERS (Foydalanuvchilar)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'doctor', 'pharmacy') NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    phone VARCHAR(20),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Users ma'lumotlari
INSERT INTO users (username, password, role, full_name, email, phone) VALUES
('admin', 'admin123', 'admin', 'Administrator', 'admin@medcare.uz', '+998 71 200 10 10'),
('doctor', 'doctor123', 'doctor', 'Dr. Shifokor', 'doctor@medcare.uz', '+998 71 200 10 11'),
('pharmacy', 'pharmacy123', 'pharmacy', 'Qodirov Jahongir', 'pharmacy@medcare.uz', '+998 90 555 66 77');

-- 2. PATIENTS (Bemorlar)
CREATE TABLE patients (
    id INT PRIMARY KEY AUTO_INCREMENT,
    patient_id VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address TEXT,
    diagnosis TEXT,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_patient_id (patient_id),
    INDEX idx_full_name (full_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Patients ma'lumotlari
INSERT INTO patients (patient_id, full_name, birth_date, phone, address, diagnosis) VALUES
('P-001', 'Aliyev Vali Jonovich', '1985-03-15', '+998 90 123 45 67', 'Toshkent sh., Chilonzor tumani', 'Arterial gipertenziya'),
('P-002', 'Rahimova Malika Akramovna', '1990-07-22', '+998 91 234 56 78', 'Toshkent sh., Yunusobod tumani', 'Migren'),
('P-003', 'Toshmatov Sardor Anvarovich', '1978-11-10', '+998 93 345 67 89', 'Toshkent sh., Yakkasaroy tumani', 'Qandli diabet 2-tur'),
('P-004', 'Hasanova Aziza Shavkatovna', '1995-08-05', '+998 94 456 78 90', 'Toshkent sh., Sergeli tumani', 'Bronxial astma');

-- 3. DOCTORS (Shifokorlar)
CREATE TABLE doctors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    doctor_id VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    specialty VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    experience_years INT DEFAULT 0,
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_doctor_id (doctor_id),
    INDEX idx_specialty (specialty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Doctors ma'lumotlari
INSERT INTO doctors (doctor_id, full_name, specialty, phone, email, experience_years) VALUES
('D-001', 'Dr. Karimov Javohir', 'Kardiolog', '+998 90 111 22 33', 'karimov@medcare.uz', 15),
('D-002', 'Dr. Shukurova Dilnoza', 'Nevrolog', '+998 91 222 33 44', 'shukurova@medcare.uz', 12),
('D-003', 'Dr. Abdullayev Otabek', 'Terapevt', '+998 93 333 44 55', 'abdullayev@medcare.uz', 10),
('D-004', 'Dr. Yusupova Nodira', 'Pediatr', '+998 94 444 55 66', 'yusupova@medcare.uz', 8);

-- 4. APPOINTMENTS (Qabullar)
CREATE TABLE appointments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    appointment_id VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    department VARCHAR(100) NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
    INDEX idx_appointment_id (appointment_id),
    INDEX idx_appointment_date (appointment_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Appointments ma'lumotlari
INSERT INTO appointments (appointment_id, patient_id, doctor_id, department, appointment_date, appointment_time, status, notes) VALUES
('Q-001', 1, 1, 'Kardiologiya', '2025-06-06', '14:30:00', 'completed', 'Qon bosimi tekshiruvi'),
('Q-002', 2, 2, 'Nevrologiya', '2025-06-06', '15:00:00', 'pending', 'Bosh og\'rig\'i shikoyati'),
('Q-003', 3, 3, 'Terapiya', '2025-06-06', '15:30:00', 'pending', 'Umumiy ko\'rik'),
('Q-004', 4, 4, 'Pediatriya', '2025-06-06', '16:00:00', 'completed', 'Bola tekshiruvi'),
('Q-005', 1, 1, 'Kardiologiya', '2025-06-07', '09:00:00', 'pending', 'Qayta ko\'rik');

-- 5. MEDICINES (Dorilar)
CREATE TABLE medicines (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    category VARCHAR(100) NOT NULL,
    quantity_per_package VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    description TEXT,
    status ENUM('available', 'low_stock', 'out_of_stock') DEFAULT 'available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_name (name),
    INDEX idx_category (category),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Medicines ma'lumotlari
INSERT INTO medicines (name, category, quantity_per_package, price, stock, description, status) VALUES
('Metformin 500mg', 'Antidiabetik', '60 dona/quti', 18000, 45, 'Qandli diabet 2-tur uchun', 'available'),
('Lisinopril 10mg', 'Gipotonziv', '30 dona/quti', 22000, 120, 'Yuqori qon bosimi uchun', 'available'),
('Amoksisillin 500mg', 'Antibiotik', '20 dona/quti', 35000, 8, 'Bakterial infeksiyalar uchun', 'low_stock'),
('Omeprazol 20mg', 'Antiulser', '14 dona/quti', 15000, 85, 'Oshqozon kasalliklari uchun', 'available'),
('Insulin Glargin', 'Insulin', '5 ml/flakon', 120000, 15, 'Qandli diabet 1-tur uchun', 'low_stock'),
('Paracetamol 500mg', 'Og\'riq qoldiruvchi', '20 dona/quti', 8500, 200, 'Harorat va og\'riq uchun', 'available'),
('Vitamin D3 2000IU', 'Vitamin', '60 dona/quti', 25000, 110, 'Vitamin yetishmasligi uchun', 'available'),
('Aspirin 100mg', 'Qon suyuqlashtiruvchi', '56 dona/quti', 12000, 90, 'Qon ivishini oldini olish uchun', 'available');

-- 6. PHARMACY ORDERS (Dorixona buyurtmalari)
CREATE TABLE pharmacy_orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_number VARCHAR(20) UNIQUE NOT NULL,
    patient_id INT NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    room VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    products TEXT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'delivered', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_date TIMESTAMP NULL,
    FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE,
    INDEX idx_order_number (order_number),
    INDEX idx_status (status),
    INDEX idx_order_date (order_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Pharmacy Orders ma'lumotlari
INSERT INTO pharmacy_orders (order_number, patient_id, patient_name, room, phone, products, amount, status, notes, order_date, delivered_date) VALUES
('B-001', 1, 'Aliyev Vali', 'A-305', '+998 90 123 45 67', 'Metformin, Lisinopril', 40000, 'delivered', 'Tezkor yetkazib berish', '2025-06-06 14:30:00', '2025-06-06 14:50:00'),
('B-002', 2, 'Rahimova Malika', 'B-212', '+998 91 234 56 78', 'Amoksisillin', 35000, 'pending', '', '2025-06-06 15:00:00', NULL),
('B-003', 3, 'Toshmatov Sardor', 'C-408', '+998 93 345 67 89', 'Insulin, Vitamin D3', 145000, 'delivered', 'Muzlatgichda saqlash', '2025-06-06 16:20:00', '2025-06-06 16:40:00'),
('B-004', 4, 'Hasanova Aziza', 'D-115', '+998 94 456 78 90', 'Paracetamol', 8500, 'pending', '', '2025-06-06 17:00:00', NULL),
('B-005', 1, 'Mirzayev Jamshid', 'A-201', '+998 95 567 89 01', 'Aspirin, Omeprazol', 27000, 'pending', '', '2025-06-06 18:15:00', NULL);

-- 7. PAYMENTS INCOME (Kirimlar)
CREATE TABLE payments_income (
    id INT PRIMARY KEY AUTO_INCREMENT,
    income_id VARCHAR(20) UNIQUE NOT NULL,
    patient_name VARCHAR(100) NOT NULL,
    service_type VARCHAR(200) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Naqd', 'Click', 'Payme', 'UzCard', 'Humo') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    INDEX idx_income_id (income_id),
    INDEX idx_payment_date (payment_date),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payments Income ma'lumotlari
INSERT INTO payments_income (income_id, patient_name, service_type, amount, payment_method, payment_date) VALUES
('K-001', 'Aliyev Vali', 'Kardiologiya konsultatsiya', 250000, 'Click', '2025-06-06 14:30:00'),
('K-002', 'Rahimova Malika', 'MRI tekshiruvi', 850000, 'Payme', '2025-06-06 15:00:00'),
('K-003', 'Toshmatov Sardor', 'Qon tahlili', 150000, 'Naqd', '2025-06-06 15:30:00'),
('K-004', 'Hasanova Aziza', 'Pediatr konsultatsiya', 200000, 'UzCard', '2025-06-06 16:00:00'),
('K-005', 'Mirzayev Jamshid', 'EKG tekshiruvi', 180000, 'Click', '2025-06-06 16:30:00');

-- 8. PAYMENTS EXPENSE (Chiqimlar)
CREATE TABLE payments_expense (
    id INT PRIMARY KEY AUTO_INCREMENT,
    expense_id VARCHAR(20) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('Naqd', 'Bank o\'tkazma', 'Click', 'Payme') NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'completed',
    INDEX idx_expense_id (expense_id),
    INDEX idx_category (category),
    INDEX idx_payment_date (payment_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Payments Expense ma'lumotlari
INSERT INTO payments_expense (expense_id, description, category, amount, payment_method, payment_date) VALUES
('CH-001', 'Dorilar xaridi', 'Dorixona', 12500000, 'Bank o\'tkazma', '2025-06-05 10:00:00'),
('CH-002', 'Tibbiy asboblar', 'Uskunalar', 8200000, 'Bank o\'tkazma', '2025-06-04 14:00:00'),
('CH-003', 'Xodimlar maoshi', 'Ish haqi', 45000000, 'Bank o\'tkazma', '2025-06-01 09:00:00'),
('CH-004', 'Kommunal xizmatlar', 'Xarajatlar', 3500000, 'Naqd', '2025-06-01 11:00:00'),
('CH-005', 'Laboratoriya reagentlari', 'Uskunalar', 5800000, 'Bank o\'tkazma', '2025-06-03 13:00:00');

-- 9. CLINIC INFO (Klinika ma'lumotlari)
CREATE TABLE clinic_info (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(200) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    phone_2 VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(100),
    working_hours_weekdays VARCHAR(50),
    working_hours_sunday VARCHAR(50),
    pharmacy_location VARCHAR(200),
    pharmacy_manager VARCHAR(100),
    pharmacy_phone VARCHAR(20),
    pharmacy_working_hours VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Clinic Info ma'lumotlari
INSERT INTO clinic_info (name, address, phone, phone_2, email, website, working_hours_weekdays, working_hours_sunday, pharmacy_location, pharmacy_manager, pharmacy_phone, pharmacy_working_hours) VALUES
('MedCare Xususiy Klinikasi', 'Toshkent sh., Yunusobod tumani, Amir Temur ko\'chasi, 108-uy', '+998 71 200 10 10', '+998 90 100 20 30', 'info@medcare.uz', 'www.medcare.uz', '08:00 - 20:00', '09:00 - 15:00', 'A Bino, 1-qavat, 105-xona', 'Farmatsevt Qodirov Jahongir', '+998 90 555 66 77', '08:00 - 20:00 (har kuni)');

-- Ma'lumotlar statistikasi
SELECT 'Database muvaffaqiyatli yaratildi!' AS Status;
SELECT COUNT(*) AS 'Foydalanuvchilar' FROM users;
SELECT COUNT(*) AS 'Bemorlar' FROM patients;
SELECT COUNT(*) AS 'Shifokorlar' FROM doctors;
SELECT COUNT(*) AS 'Qabullar' FROM appointments;
SELECT COUNT(*) AS 'Dorilar' FROM medicines;
SELECT COUNT(*) AS 'Dorixona buyurtmalari' FROM pharmacy_orders;
SELECT COUNT(*) AS 'Kirimlar' FROM payments_income;
SELECT COUNT(*) AS 'Chiqimlar' FROM payments_expense;
