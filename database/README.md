# MedCare Klinika Database

## 📊 Database Strukturasi

Database loyihasi uchun 2 xil format:
1. **JSON** - Frontend test va development uchun
2. **SQL** - Production MySQL/MariaDB database uchun

---

## 📁 Fayllar

### 1. `medcare_database.json`
- Frontend development uchun
- JavaScript bilan ishlash uchun
- LocalStorage/SessionStorage test uchun

### 2. `medcare_database.sql`
- Production MySQL/MariaDB uchun
- PHPMyAdmin orqali import qilish mumkin
- Backend integratsiyasi uchun

---

## 🗄️ Database Tuzilmasi

### Jadvallar (9 ta):

#### 1. **users** - Foydalanuvchilar
- `id` - Unique ID
- `username` - Login
- `password` - Parol
- `role` - Rol (admin, doctor, pharmacy)
- `full_name` - F.I.O.
- `email` - Email
- `phone` - Telefon
- `status` - Holat

#### 2. **patients** - Bemorlar
- `id` - Unique ID
- `patient_id` - Bemor ID (P-001)
- `full_name` - F.I.O.
- `birth_date` - Tug'ilgan sana
- `phone` - Telefon
- `address` - Manzil
- `diagnosis` - Tashxis
- `status` - Holat

#### 3. **doctors** - Shifokorlar
- `id` - Unique ID
- `doctor_id` - Shifokor ID (D-001)
- `full_name` - F.I.O.
- `specialty` - Mutaxassislik
- `phone` - Telefon
- `email` - Email
- `experience_years` - Tajriba (yil)
- `status` - Holat

#### 4. **appointments** - Qabullar
- `id` - Unique ID
- `appointment_id` - Qabul ID (Q-001)
- `patient_id` - Bemor ID (foreign key)
- `doctor_id` - Shifokor ID (foreign key)
- `department` - Bo'lim
- `appointment_date` - Qabul sanasi
- `appointment_time` - Qabul vaqti
- `status` - Holat (pending, completed, cancelled)
- `notes` - Izohlar

#### 5. **medicines** - Dorilar
- `id` - Unique ID
- `name` - Dori nomi
- `category` - Kategoriya
- `quantity_per_package` - Qadoqdagi miqdor
- `price` - Narxi
- `stock` - Stock miqdori
- `description` - Tavsif
- `status` - Holat (available, low_stock, out_of_stock)

#### 6. **pharmacy_orders** - Dorixona buyurtmalari
- `id` - Unique ID
- `order_number` - Buyurtma raqami (B-001)
- `patient_id` - Bemor ID (foreign key)
- `patient_name` - Bemor ismi
- `room` - Palata raqami
- `phone` - Telefon
- `products` - Mahsulotlar
- `amount` - Summa
- `status` - Holat (pending, delivered, cancelled)
- `notes` - Izohlar
- `order_date` - Buyurtma sanasi
- `delivered_date` - Yetkazib berilgan sana

#### 7. **payments_income** - Kirimlar
- `id` - Unique ID
- `income_id` - Kirim ID (K-001)
- `patient_name` - Bemor ismi
- `service_type` - Xizmat turi
- `amount` - Summa
- `payment_method` - To'lov usuli
- `payment_date` - To'lov sanasi
- `status` - Holat

#### 8. **payments_expense** - Chiqimlar
- `id` - Unique ID
- `expense_id` - Chiqim ID (CH-001)
- `description` - Tavsif
- `category` - Kategoriya
- `amount` - Summa
- `payment_method` - To'lov usuli
- `payment_date` - To'lov sanasi
- `status` - Holat

#### 9. **clinic_info** - Klinika ma'lumotlari
- `id` - Unique ID
- `name` - Klinika nomi
- `address` - Manzil
- `phone` - Telefon
- `email` - Email
- `website` - Website
- `working_hours` - Ish vaqti
- `pharmacy_location` - Dorixona joylashuvi
- `pharmacy_manager` - Dorixona mudiri
- `pharmacy_phone` - Dorixona telefoni

---

## 🚀 Database Import (MySQL)

### 1. PHPMyAdmin orqali:
```
1. PHPMyAdmin ni oching
2. "Import" ni bosing
3. "medcare_database.sql" faylini tanlang
4. "Go" tugmasini bosing
```

### 2. MySQL Command Line orqali:
```bash
mysql -u username -p < medcare_database.sql
```

### 3. XAMPP/WAMP orqali:
```
1. XAMPP/WAMP ni ishga tushiring
2. PHPMyAdmin ga kiring
3. Yangi database yarating: medcare_clinic
4. SQL faylini import qiling
```

---

## 📊 Demo Ma'lumotlar

### Foydalanuvchilar:
- **Admin:** admin / admin123
- **Shifokor:** doctor / doctor123
- **Dorixona:** pharmacy / pharmacy123

### Statistika:
- 3 ta foydalanuvchi
- 4 ta bemor
- 4 ta shifokor
- 5 ta qabul
- 8 ta dori
- 5 ta dorixona buyurtmasi
- 5 ta kirim
- 5 ta chiqim

---

## 🔐 Xavfsizlik

⚠️ **Muhim:**
- Production uchun parollarni hashla (bcrypt, md5)
- SQL Injection himoyasini qo'sh
- API tokenlar qo'sh
- HTTPS ishlatish
- Database backup qil

---

## 🛠 Backend Integratsiyasi

### Tavsiya qilingan texnologiyalar:
- **Backend:** Node.js + Express.js yoki PHP + Laravel
- **Database:** MySQL 8.0+ yoki MariaDB 10.5+
- **ORM:** Sequelize (Node.js) yoki Eloquent (Laravel)
- **API:** RESTful API yoki GraphQL

### API Endpoints (misol):
```
POST   /api/login
GET    /api/patients
POST   /api/patients
PUT    /api/patients/:id
DELETE /api/patients/:id
GET    /api/medicines
POST   /api/pharmacy-orders
GET    /api/payments/income
GET    /api/payments/expense
```

---

## 📞 Yordam

Savollar bo'lsa:
- Email: info@medcare.uz
- Telefon: +998 71 200 10 10

---

© 2025 MedCare Klinika. Barcha huquqlar himoyalangan.
