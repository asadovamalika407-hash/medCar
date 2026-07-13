# MongoDB Atlas - Barcha Ma'lumotlar

## 📋 Qolgan 8 ta Collection

Har bir collection uchun quyidagi tartibda ishlang:

1. **Chap tarafda medcare_clinic** yonidagi **"+"** tugmasini bosing
2. **"Create Collection"** ni tanlang
3. Collection nomini kiriting
4. **"Create"** ni bosing
5. Collection ochilganda **"ADD DATA → Insert Document"** ni bosing
6. Quyidagi ma'lumotlarni paste qiling
7. **"Insert"** ni bosing

---

## 1️⃣ PATIENTS COLLECTION

### Collection nomi: `patients`

### Birinchi bemor:
```json
{
  "patient_id": "P-001",
  "full_name": "Aliyev Vali Jonovich",
  "birth_date": "1985-03-15",
  "phone": "+998 90 123 45 67",
  "address": "Toshkent sh., Chilonzor tumani",
  "diagnosis": "Arterial gipertenziya",
  "status": "active",
  "created_at": "2025-01-15T09:30:00Z"
}
```

### Ikkinchi bemor:
```json
{
  "patient_id": "P-002",
  "full_name": "Rahimova Malika Akramovna",
  "birth_date": "1990-07-22",
  "phone": "+998 91 234 56 78",
  "address": "Toshkent sh., Yunusobod tumani",
  "diagnosis": "Migren",
  "status": "active",
  "created_at": "2025-02-10T10:15:00Z"
}
```

### Uchinchi bemor:
```json
{
  "patient_id": "P-003",
  "full_name": "Toshmatov Sardor Anvarovich",
  "birth_date": "1978-11-10",
  "phone": "+998 93 345 67 89",
  "address": "Toshkent sh., Yakkasaroy tumani",
  "diagnosis": "Qandli diabet 2-tur",
  "status": "active",
  "created_at": "2025-01-20T11:00:00Z"
}
```

### To'rtinchi bemor:
```json
{
  "patient_id": "P-004",
  "full_name": "Hasanova Aziza Shavkatovna",
  "birth_date": "1995-08-05",
  "phone": "+998 94 456 78 90",
  "address": "Toshkent sh., Sergeli tumani",
  "diagnosis": "Bronxial astma",
  "status": "active",
  "created_at": "2025-03-05T13:45:00Z"
}
```

---

## 2️⃣ DOCTORS COLLECTION

### Collection nomi: `doctors`

### Birinchi doktor:
```json
{
  "doctor_id": "D-001",
  "full_name": "Dr. Karimov Javohir",
  "specialty": "Kardiolog",
  "phone": "+998 90 111 22 33",
  "email": "karimov@medcare.uz",
  "experience_years": 15,
  "status": "active",
  "created_at": "2025-01-01T08:00:00Z"
}
```

### Ikkinchi doktor:
```json
{
  "doctor_id": "D-002",
  "full_name": "Dr. Shukurova Dilnoza",
  "specialty": "Nevrolog",
  "phone": "+998 91 222 33 44",
  "email": "shukurova@medcare.uz",
  "experience_years": 12,
  "status": "active",
  "created_at": "2025-01-01T08:00:00Z"
}
```

### Uchinchi doktor:
```json
{
  "doctor_id": "D-003",
  "full_name": "Dr. Abdullayev Otabek",
  "specialty": "Terapevt",
  "phone": "+998 93 333 44 55",
  "email": "abdullayev@medcare.uz",
  "experience_years": 10,
  "status": "active",
  "created_at": "2025-01-01T08:00:00Z"
}
```

### To'rtinchi doktor:
```json
{
  "doctor_id": "D-004",
  "full_name": "Dr. Yusupova Nodira",
  "specialty": "Pediatr",
  "phone": "+998 94 444 55 66",
  "email": "yusupova@medcare.uz",
  "experience_years": 8,
  "status": "active",
  "created_at": "2025-01-01T08:00:00Z"
}
```

---

## 3️⃣ APPOINTMENTS COLLECTION

### Collection nomi: `appointments`

### Birinchi qabul:
```json
{
  "appointment_id": "Q-001",
  "patient_id": "P-001",
  "patient_name": "Aliyev Vali",
  "doctor_id": "D-001",
  "doctor_name": "Dr. Karimov Javohir",
  "department": "Kardiologiya",
  "appointment_date": "2025-06-06",
  "appointment_time": "14:30:00",
  "status": "completed",
  "notes": "Qon bosimi tekshiruvi",
  "created_at": "2025-06-05T10:00:00Z"
}
```

### Ikkinchi qabul:
```json
{
  "appointment_id": "Q-002",
  "patient_id": "P-002",
  "patient_name": "Rahimova Malika",
  "doctor_id": "D-002",
  "doctor_name": "Dr. Shukurova Dilnoza",
  "department": "Nevrologiya",
  "appointment_date": "2025-06-06",
  "appointment_time": "15:00:00",
  "status": "pending",
  "notes": "Bosh og'rig'i shikoyati",
  "created_at": "2025-06-05T11:30:00Z"
}
```

### Uchinchi qabul:
```json
{
  "appointment_id": "Q-003",
  "patient_id": "P-003",
  "patient_name": "Toshmatov Sardor",
  "doctor_id": "D-003",
  "doctor_name": "Dr. Abdullayev Otabek",
  "department": "Terapiya",
  "appointment_date": "2025-06-06",
  "appointment_time": "15:30:00",
  "status": "pending",
  "notes": "Umumiy ko'rik",
  "created_at": "2025-06-05T12:00:00Z"
}
```

### To'rtinchi qabul:
```json
{
  "appointment_id": "Q-004",
  "patient_id": "P-004",
  "patient_name": "Hasanova Aziza",
  "doctor_id": "D-004",
  "doctor_name": "Dr. Yusupova Nodira",
  "department": "Pediatriya",
  "appointment_date": "2025-06-06",
  "appointment_time": "16:00:00",
  "status": "completed",
  "notes": "Bola tekshiruvi",
  "created_at": "2025-06-05T13:00:00Z"
}
```

### Beshinchi qabul:
```json
{
  "appointment_id": "Q-005",
  "patient_id": "P-001",
  "patient_name": "Aliyev Vali",
  "doctor_id": "D-001",
  "doctor_name": "Dr. Karimov Javohir",
  "department": "Kardiologiya",
  "appointment_date": "2025-06-07",
  "appointment_time": "09:00:00",
  "status": "pending",
  "notes": "Qayta ko'rik",
  "created_at": "2025-06-06T10:00:00Z"
}
```

---

## 4️⃣ MEDICINES COLLECTION

### Collection nomi: `medicines`

### 1) Metformin:
```json
{
  "medicine_id": "M-001",
  "name": "Metformin 500mg",
  "category": "Antidiabetik",
  "quantity_per_package": "60 dona/quti",
  "price": 18000,
  "stock": 45,
  "description": "Qandli diabet 2-tur uchun",
  "status": "available",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 2) Lisinopril:
```json
{
  "medicine_id": "M-002",
  "name": "Lisinopril 10mg",
  "category": "Gipotonziv",
  "quantity_per_package": "30 dona/quti",
  "price": 22000,
  "stock": 120,
  "description": "Yuqori qon bosimi uchun",
  "status": "available",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 3) Amoksisillin:
```json
{
  "medicine_id": "M-003",
  "name": "Amoksisillin 500mg",
  "category": "Antibiotik",
  "quantity_per_package": "20 dona/quti",
  "price": 35000,
  "stock": 8,
  "description": "Bakterial infeksiyalar uchun",
  "status": "low_stock",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 4) Omeprazol:
```json
{
  "medicine_id": "M-004",
  "name": "Omeprazol 20mg",
  "category": "Antiulser",
  "quantity_per_package": "14 dona/quti",
  "price": 15000,
  "stock": 85,
  "description": "Oshqozon kasalliklari uchun",
  "status": "available",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 5) Insulin:
```json
{
  "medicine_id": "M-005",
  "name": "Insulin Glargin",
  "category": "Insulin",
  "quantity_per_package": "5 ml/flakon",
  "price": 120000,
  "stock": 15,
  "description": "Qandli diabet 1-tur uchun",
  "status": "low_stock",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 6) Paracetamol:
```json
{
  "medicine_id": "M-006",
  "name": "Paracetamol 500mg",
  "category": "Og'riq qoldiruvchi",
  "quantity_per_package": "20 dona/quti",
  "price": 8500,
  "stock": 200,
  "description": "Harorat va og'riq uchun",
  "status": "available",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 7) Vitamin D3:
```json
{
  "medicine_id": "M-007",
  "name": "Vitamin D3 2000IU",
  "category": "Vitamin",
  "quantity_per_package": "60 dona/quti",
  "price": 25000,
  "stock": 110,
  "description": "Vitamin yetishmasligi uchun",
  "status": "available",
  "created_at": "2025-01-01T09:00:00Z"
}
```

### 8) Aspirin:
```json
{
  "medicine_id": "M-008",
  "name": "Aspirin 100mg",
  "category": "Qon suyuqlashtiruvchi",
  "quantity_per_package": "56 dona/quti",
  "price": 12000,
  "stock": 90,
  "description": "Qon ivishini oldini olish uchun",
  "status": "available",
  "created_at": "2025-01-01T09:00:00Z"
}
```

---

## 5️⃣ PHARMACY_ORDERS COLLECTION

### Collection nomi: `pharmacy_orders`

### 1) Birinchi buyurtma:
```json
{
  "order_number": "B-001",
  "patient_id": "P-001",
  "patient_name": "Aliyev Vali",
  "room": "A-305",
  "phone": "+998 90 123 45 67",
  "products": "Metformin, Lisinopril",
  "amount": 40000,
  "status": "delivered",
  "notes": "Tezkor yetkazib berish",
  "order_date": "2025-06-06T14:30:00Z",
  "delivered_date": "2025-06-06T14:50:00Z"
}
```

### 2) Ikkinchi buyurtma:
```json
{
  "order_number": "B-002",
  "patient_id": "P-002",
  "patient_name": "Rahimova Malika",
  "room": "B-212",
  "phone": "+998 91 234 56 78",
  "products": "Amoksisillin",
  "amount": 35000,
  "status": "pending",
  "notes": "",
  "order_date": "2025-06-06T15:00:00Z",
  "delivered_date": null
}
```

### 3) Uchinchi buyurtma:
```json
{
  "order_number": "B-003",
  "patient_id": "P-003",
  "patient_name": "Toshmatov Sardor",
  "room": "C-408",
  "phone": "+998 93 345 67 89",
  "products": "Insulin, Vitamin D3",
  "amount": 145000,
  "status": "delivered",
  "notes": "Muzlatgichda saqlash",
  "order_date": "2025-06-06T16:20:00Z",
  "delivered_date": "2025-06-06T16:40:00Z"
}
```

### 4) To'rtinchi buyurtma:
```json
{
  "order_number": "B-004",
  "patient_id": "P-004",
  "patient_name": "Hasanova Aziza",
  "room": "D-115",
  "phone": "+998 94 456 78 90",
  "products": "Paracetamol",
  "amount": 8500,
  "status": "pending",
  "notes": "",
  "order_date": "2025-06-06T17:00:00Z",
  "delivered_date": null
}
```

### 5) Beshinchi buyurtma:
```json
{
  "order_number": "B-005",
  "patient_id": "P-001",
  "patient_name": "Mirzayev Jamshid",
  "room": "A-201",
  "phone": "+998 95 567 89 01",
  "products": "Aspirin, Omeprazol",
  "amount": 27000,
  "status": "pending",
  "notes": "",
  "order_date": "2025-06-06T18:15:00Z",
  "delivered_date": null
}
```

---

## 6️⃣ PAYMENTS_INCOME COLLECTION

### Collection nomi: `payments_income`

### 1) Birinchi kirim:
```json
{
  "income_id": "K-001",
  "patient_name": "Aliyev Vali",
  "service_type": "Kardiologiya konsultatsiya",
  "amount": 250000,
  "payment_method": "Click",
  "payment_date": "2025-06-06T14:30:00Z",
  "status": "completed"
}
```

### 2) Ikkinchi kirim:
```json
{
  "income_id": "K-002",
  "patient_name": "Rahimova Malika",
  "service_type": "MRI tekshiruvi",
  "amount": 850000,
  "payment_method": "Payme",
  "payment_date": "2025-06-06T15:00:00Z",
  "status": "completed"
}
```

### 3) Uchinchi kirim:
```json
{
  "income_id": "K-003",
  "patient_name": "Toshmatov Sardor",
  "service_type": "Qon tahlili",
  "amount": 150000,
  "payment_method": "Naqd",
  "payment_date": "2025-06-06T15:30:00Z",
  "status": "completed"
}
```

### 4) To'rtinchi kirim:
```json
{
  "income_id": "K-004",
  "patient_name": "Hasanova Aziza",
  "service_type": "Pediatr konsultatsiya",
  "amount": 200000,
  "payment_method": "UzCard",
  "payment_date": "2025-06-06T16:00:00Z",
  "status": "completed"
}
```

### 5) Beshinchi kirim:
```json
{
  "income_id": "K-005",
  "patient_name": "Mirzayev Jamshid",
  "service_type": "EKG tekshiruvi",
  "amount": 180000,
  "payment_method": "Click",
  "payment_date": "2025-06-06T16:30:00Z",
  "status": "completed"
}
```

---

## 7️⃣ PAYMENTS_EXPENSE COLLECTION

### Collection nomi: `payments_expense`

### 1) Birinchi xarajat:
```json
{
  "expense_id": "CH-001",
  "description": "Dorilar xaridi",
  "category": "Dorixona",
  "amount": 12500000,
  "payment_method": "Bank o'tkazma",
  "payment_date": "2025-06-05T10:00:00Z",
  "status": "completed"
}
```

### 2) Ikkinchi xarajat:
```json
{
  "expense_id": "CH-002",
  "description": "Tibbiy asboblar",
  "category": "Uskunalar",
  "amount": 8200000,
  "payment_method": "Bank o'tkazma",
  "payment_date": "2025-06-04T14:00:00Z",
  "status": "completed"
}
```

### 3) Uchinchi xarajat:
```json
{
  "expense_id": "CH-003",
  "description": "Xodimlar maoshi",
  "category": "Ish haqi",
  "amount": 45000000,
  "payment_method": "Bank o'tkazma",
  "payment_date": "2025-06-01T09:00:00Z",
  "status": "completed"
}
```

### 4) To'rtinchi xarajat:
```json
{
  "expense_id": "CH-004",
  "description": "Kommunal xizmatlar",
  "category": "Xarajatlar",
  "amount": 3500000,
  "payment_method": "Naqd",
  "payment_date": "2025-06-01T11:00:00Z",
  "status": "completed"
}
```

### 5) Beshinchi xarajat:
```json
{
  "expense_id": "CH-005",
  "description": "Laboratoriya reagentlari",
  "category": "Uskunalar",
  "amount": 5800000,
  "payment_method": "Bank o'tkazma",
  "payment_date": "2025-06-03T13:00:00Z",
  "status": "completed"
}
```

---

## 8️⃣ CLINIC_INFO COLLECTION

### Collection nomi: `clinic_info`

### Klinika ma'lumotlari (faqat bitta document):
```json
{
  "name": "MedCare Xususiy Klinikasi",
  "address": "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 108-uy",
  "phone": "+998 71 200 10 10",
  "phone_2": "+998 90 100 20 30",
  "email": "info@medcare.uz",
  "website": "www.medcare.uz",
  "working_hours_weekdays": "08:00 - 20:00",
  "working_hours_sunday": "09:00 - 15:00",
  "pharmacy_location": "A Bino, 1-qavat, 105-xona",
  "pharmacy_manager": "Farmatsevt Qodirov Jahongir",
  "pharmacy_phone": "+998 90 555 66 77",
  "pharmacy_working_hours": "08:00 - 20:00 (har kuni)"
}
```

---

## ✅ TUGALLANDI!

Barcha 9 ta collection:
1. ✅ users (3 ta user)
2. patients (4 ta bemor)
3. doctors (4 ta shifokor)
4. appointments (5 ta qabul)
5. medicines (8 ta dori)
6. pharmacy_orders (5 ta buyurtma)
7. payments_income (5 ta kirim)
8. payments_expense (5 ta xarajat)
9. clinic_info (1 ta ma'lumot)

**JAMI: 35 ta document + 1 klinika ma'lumoti = 36 ta document**

---

© 2025 MedCare Database - MongoDB Atlas
