# MySQL Workbench bilan Database Yaratish - To'liq Yo'riqnoma

## 📌 MUHIM: Boshlashdan oldin

Bu yo'riqnomani **bosqichma-bosqich** o'qing va bajaring. Har bir bosqichni diqqat bilan bajaring!

---

## 🎯 **QISQA YO'L (Video Darslar)**

Agar o'qishni yoqtirmasangiz, videolarni tomosha qiling:

### **O'zbek tilida:**
1. **MySQL o'rnatish:** https://www.youtube.com/watch?v=WuBcTJnIuzo
2. **Database yaratish:** https://www.youtube.com/watch?v=7S_tz1z_5bA

### **Rus tilida:**
1. **MySQL Workbench:** https://www.youtube.com/watch?v=DBpilcJbUII

### **Ingliz tilida:**
1. **MySQL Setup:** https://www.youtube.com/watch?v=u96rVINbAUI

---

## 📥 **BOSQICH 1: MySQL Server ni yuklab olish**

### 1.1 Brauzeringizni oching

### 1.2 Ushbu linkka kiring:
```
https://dev.mysql.com/downloads/installer/
```

### 1.3 Sahifada:
- **"Windows (x86, 32-bit), MSI Installer"** ni toping (birinchi variant)
- **Hajmi:** 2.4 MB (mysql-installer-web-community)
- O'ng tarafda **"Download"** tugmasini bosing

### 1.4 Yangi sahifada:
- **"No thanks, just start my download"** ni bosing
- Fayl yuklab olinadi (1-2 daqiqa)

---

## 🔧 **BOSQICH 2: Visual Studio Redistributable (Kerakli fayl)**

### 2.1 Yangi tab ochib, ushbu linkka kiring:
```
https://aka.ms/vs/17/release/vc_redist.x64.exe
```

### 2.2 Fayl avtomatik yuklab olinadi (14 MB, 1 daqiqa)

### 2.3 Yuklab olingan faylni oching:
- Downloads papkada: `vc_redist.x64.exe`
- Ikki marta bosing

### 2.4 O'rnatish:
- ✅ "I agree to the license..." ni belgilang
- **"Install"** tugmasini bosing
- Kutib turing (1-2 daqiqa)
- **"Close"** tugmasini bosing

---

## 💿 **BOSQICH 3: MySQL Server ni o'rnatish**

### 3.1 Downloads papkada faylni toping:
- Nomi: `mysql-installer-web-community-8.0.xx.msi`
- Ikki marta bosing

### 3.2 "Yes" tugmasini bosing (Windows so'rasa)

### 3.3 MySQL Installer ochiladi:

---

### 3.4 "Choosing a Setup Type":
- ✅ **"Developer Default"** ni tanlang (ikkinchi variant)
- **"Next"** tugmasini bosing

---

### 3.5 "Check Requirements":
- **"Execute"** tugmasini bosing
- Barcha kerakli fayllar o'rnatiladi (3-5 daqiqa)
- Hammasida ✅ ko'ringach **"Next"** ni bosing

---

### 3.6 "Installation":
- **"Execute"** tugmasini bosing
- Barcha komponentlar o'rnatiladi (10-15 daqiqa)
- ☕ Bir oz kuting...
- Hammasida ✅ ko'ringach **"Next"** ni bosing

---

### 3.7 "Product Configuration":
- **"Next"** tugmasini bosing

---

## ⚙️ **BOSQICH 4: MySQL Server sozlash**

### 4.1 "Type and Networking":
- Hech narsani o'zgartirmang
- **"Next"** tugmasini bosing

---

### 4.2 "Authentication Method":
- Birinchi variantni tanlang (default)
- **"Next"** tugmasini bosing

---

### 4.3 "Accounts and Roles" (ENG MUHIM!):

#### Root Password:
- **MySQL Root Password:** `admin123` yozing
- **Repeat Password:** `admin123` yozing

⚠️ **BU PAROLNI ESLAB QOLING!** Yoki qog'ozga yozib qo'ying!

#### User Accounts:
- Hech narsa qo'shmaslik kerak (bo'sh qoldiring)

- **"Next"** tugmasini bosing

---

### 4.4 "Windows Service":
- Hech narsani o'zgartirmang
- **"Next"** tugmasini bosing

---

### 4.5 "Server File Permissions":
- Hech narsani o'zgartirmang  
- **"Next"** tugmasini bosing

---

### 4.6 "Apply Configuration":
- **"Execute"** tugmasini bosing
- Kutib turing (2-3 daqiqa)
- Hammasida ✅ ko'ringach **"Finish"** ni bosing

---

### 4.7 "Product Configuration":
- **"Next"** tugmasini bosing

---

### 4.8 "MySQL Router Configuration":
- **"Finish"** tugmasini bosing

---

### 4.9 "Connect To Server":
- **Password:** `admin123` (yoki siz o'rnatgan parol)
- **"Check"** tugmasini bosing
- ✅ **"Connection succeeded"** ko'rinishi kerak
- **"Next"** tugmasini bosing

---

### 4.10 "Apply Configuration":
- **"Execute"** tugmasini bosing
- **"Finish"** tugmasini bosing

---

### 4.11 "Product Configuration":
- **"Next"** tugmasini bosing

---

### 4.12 "Installation Complete":
- ✅ **"Start MySQL Workbench after Setup"** ni belgilang
- **"Finish"** tugmasini bosing

---

## 🖥️ **BOSQICH 5: MySQL Workbench ni ochish**

### 5.1 MySQL Workbench avtomatik ochilishi kerak

### 5.2 Agar ochilmasa:
- Windows Search: **"MySQL Workbench"** yozing
- Dasturni oching

---

## 🔌 **BOSQICH 6: Database ga ulanish**

### 6.1 MySQL Workbench da:
- **"MySQL Connections"** ko'rinadi
- **"Local instance MySQL80"** kartochkasi bor

### 6.2 Kartochkani ikki marta bosing

### 6.3 Parol oynasi:
- **Password:** `admin123` (yoki siz o'rnatgan)
- ✅ **"Save password in vault"** ni belgilang
- **"OK"** tugmasini bosing

### 6.4 ✅ Ulandi! Query oynasi ochiladi

---

## 📂 **BOSQICH 7: Database yaratish (SQL faylni import)**

### 7.1 Yuqori menuda **"File"** ni bosing

### 7.2 **"Open SQL Script..."** ni tanlang

### 7.3 Fayl tanlash:
- Ushbu joyga boring:
```
C:\Users\777\Desktop\kiro 3\database
```
- **`medcare_database.sql`** faylini tanlang
- **"Open"** tugmasini bosing

### 7.4 SQL kod oynada ko'rinadi (ko'p qatorli)

### 7.5 Yuqorida ⚡ **"Execute"** tugmasini bosing
- Yoki: `Ctrl + Shift + Enter`

### 7.6 Pastda "Action Output" da natijalar:
```
✅ CREATE DATABASE... 0.015 sec
✅ CREATE TABLE users... 0.031 sec  
✅ INSERT INTO users... 0.002 sec
✅ CREATE TABLE patients... 0.028 sec
...
```

### 7.7 Kutib turing (10-15 soniya)

### 7.8 Hammasida ✅ OK bo'lishi kerak

---

## ✅ **BOSQICH 8: Database tekshirish**

### 8.1 Chap tarafda **"SCHEMAS"** paneli

### 8.2 Yuqorida 🔄 **"Refresh"** tugmasini bosing

### 8.3 **`medcare_clinic`** database ko'rinadi!

### 8.4 **`medcare_clinic`** ni bosing (▶️ belgisi)
- Kengayadi

### 8.5 **"Tables"** ni bosing (▶️ belgisi)
- 9 ta jadval ko'rinadi:
```
✅ appointments
✅ clinic_info
✅ doctors
✅ medicines
✅ patients
✅ payments_expense
✅ payments_income
✅ pharmacy_orders
✅ users
```

---

## 👀 **BOSQICH 9: Ma'lumotlarni ko'rish**

### 9.1 **`patients`** jadvalini tanlang (bir marta bosing)

### 9.2 O'ng tugmani bosing (mouse)

### 9.3 **"Select Rows - Limit 1000"** ni bosing

### 9.4 ✅ Bemorlar ma'lumotlari ko'rinadi!
```
P-001 | Aliyev Vali Jonovich      | 1985-03-15
P-002 | Rahimova Malika Akramovna | 1990-07-22
P-003 | Toshmatov Sardor Anvarovich | 1978-11-10
P-004 | Hasanova Aziza Shavkatovna | 1995-08-05
```

### 9.5 Boshqa jadvallarni ham xuddi shunday ko'rishingiz mumkin!

---

## 🎉 **TAYYOR! Database ishlayapti!**

---

## 🔍 **Test SQL Queries**

Query oynaga yozing va Execute bosing:

### Barcha bemorlar:
```sql
SELECT * FROM medcare_clinic.patients;
```

### Barcha shifokorlar:
```sql
SELECT * FROM medcare_clinic.doctors;
```

### Barcha dorilar:
```sql
SELECT * FROM medcare_clinic.medicines;
```

### Statistika:
```sql
SELECT 
    (SELECT COUNT(*) FROM medcare_clinic.patients) AS Bemorlar,
    (SELECT COUNT(*) FROM medcare_clinic.doctors) AS Shifokorlar,
    (SELECT COUNT(*) FROM medcare_clinic.medicines) AS Dorilar;
```

---

## 🚨 **Muammolar va yechimlar**

### ❌ "Access denied for user 'root'"
**Yechim:** Parol noto'g'ri. MySQL ni qayta o'rnating.

### ❌ "Can't connect to MySQL server"  
**Yechim:**
1. Windows Search: **"services.msc"**
2. Services dasturini oching
3. **"MySQL80"** ni toping
4. O'ng tugma → **"Start"**

### ❌ "Database already exists"
**Yechim:** 
```sql
DROP DATABASE IF EXISTS medcare_clinic;
```
Keyin qayta import qiling.

---

## 💾 **Database Backup**

### Export:
1. Server → Data Export
2. Schema: `medcare_clinic`
3. Export to Self-Contained File
4. Start Export

### Import:
1. Server → Data Import  
2. Import from Self-Contained File
3. Faylni tanlang
4. Start Import

---

## 📞 **Yordam**

- **Video:** https://www.youtube.com/watch?v=u96rVINbAUI
- **Docs:** https://dev.mysql.com/doc/workbench/en/

---

## ✅ **Endi nima qilish mumkin?**

- ✅ Ma'lumotlarni ko'rish
- ✅ Yangi ma'lumot qo'shish
- ✅ Ma'lumotlarni o'zgartirish
- ✅ Backend bilan bog'lash
- ✅ Real proyekt yaratish

---

© 2025 MedCare Klinika - MySQL Workbench Guide

