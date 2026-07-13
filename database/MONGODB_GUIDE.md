# MongoDB Atlas - To'liq Yo'riqnoma

## 🎯 MongoDB Atlas nima?

MongoDB Atlas - bu bulutda (cloud) joylashgan MongoDB database xizmati.
- ✅ O'rnatish kerak emas
- ✅ 512 MB gacha bepul
- ✅ Professional
- ✅ Har yerdan kirish mumkin

---

## 📋 Sizning ma'lumotlaringiz:

```
Username: medcare_admin
Password: HqvwsGtqri5HqI11
Database: medcare_clinic
```

---

## 🚀 QADAMMA-QADAM

### 1. MongoDB Atlas ga kirish

**Link:** https://www.mongodb.com/cloud/atlas/login

- Email va parol bilan kiring

---

### 2. Database ni topish

- Chap menuda **"Database"** ni bosing
- Sizning cluster ko'rinadi

---

### 3. Ma'lumotlarni import qilish (Manual)

#### 3.1 Collection ochish:
- **"Browse Collections"** tugmasini bosing
- **"patients"** collection ni tanlang

#### 3.2 Document qo'shish:
- **"INSERT DOCUMENT"** tugmasini bosing
- Quyidagi ma'lumotni paste qiling:

```json
{
  "patient_id": "P-001",
  "full_name": "Aliyev Vali Jonovich",
  "birth_date": "1985-03-15",
  "phone": "+998 90 123 45 67",
  "address": "Toshkent sh., Chilonzor tumani",
  "diagnosis": "Arterial gipertenziya",
  "status": "active"
}
```

- **"Insert"** tugmasini bosing

---

### 4. Connection String olish

#### 4.1 Connect tugmasi:
- Database sahifasida **"Connect"** tugmasini bosing

#### 4.2 Connection method:
- **"Drivers"** ni tanlang
- **Driver:** Node.js
- **Version:** 5.5 yoki oxirgi

#### 4.3 Connection String:
```
mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.xxxxx.mongodb.net/medcare_clinic
```

**⚠️ Bu string ni eslab qoling!**

---

## 💻 Node.js bilan ishlash

### 5. MongoDB Driver o'rnatish

Terminal/CMD da:
```bash
npm install mongodb
```

### 6. Ulanish va ma'lumot olish

**Fayl:** `server.js`

```javascript
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.xxxxx.mongodb.net/";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB ga ulandi!");

    const database = client.db('medcare_clinic');
    
    // Bemorlarni olish
    const patients = database.collection('patients');
    const result = await patients.find().toArray();
    console.log(result);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
```

### 7. Ishga tushirish:
```bash
node server.js
```

---

## 🌐 Frontend bilan ishlash (Fetch API)

### 8. Backend API yaratish

**Fayl:** `api.js`

```javascript
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();

const uri = "mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.xxxxx.mongodb.net/";
const client = new MongoClient(uri);

// Bemorlarni olish
app.get('/api/patients', async (req, res) => {
  await client.connect();
  const database = client.db('medcare_clinic');
  const patients = database.collection('patients');
  const result = await patients.find().toArray();
  res.json(result);
});

// Yangi bemor qo'shish
app.post('/api/patients', async (req, res) => {
  await client.connect();
  const database = client.db('medcare_clinic');
  const patients = database.collection('patients');
  const result = await patients.insertOne(req.body);
  res.json(result);
});

app.listen(3000, () => {
  console.log('✅ Server 3000 portda ishlayapti');
});
```

### 9. Frontend da ishlatish:

```javascript
// Bemorlarni olish
fetch('http://localhost:3000/api/patients')
  .then(res => res.json())
  .then(data => console.log(data));

// Yangi bemor qo'shish
fetch('http://localhost:3000/api/patients', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    patient_id: 'P-005',
    full_name: 'Yangi Bemor',
    phone: '+998 99 999 99 99'
  })
});
```

---

## 📊 CRUD Operatsiyalar

### Create (Qo'shish):
```javascript
await patients.insertOne({
  patient_id: 'P-005',
  full_name: 'Yangi Bemor'
});
```

### Read (O'qish):
```javascript
// Barchasi
await patients.find().toArray();

// ID bo'yicha
await patients.findOne({ patient_id: 'P-001' });
```

### Update (O'zgartirish):
```javascript
await patients.updateOne(
  { patient_id: 'P-001' },
  { $set: { phone: '+998 99 999 99 99' } }
);
```

### Delete (O'chirish):
```javascript
await patients.deleteOne({ patient_id: 'P-001' });
```

---

## 🔐 Xavfsizlik

### 1. Environment Variables

`.env` fayl yarating:
```
MONGODB_URI=mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.xxxxx.mongodb.net/
```

### 2. Kodda:
```javascript
require('dotenv').config();
const uri = process.env.MONGODB_URI;
```

---

## 🎯 Keyingi qadamlar

1. ✅ MongoDB Atlas ga kiring
2. ✅ Cluster yarating
3. ✅ Database yarating: `medcare_clinic`
4. ✅ Collections yarating: patients, doctors, medicines...
5. ✅ Ma'lumotlarni import qiling
6. ✅ Node.js backend yarating
7. ✅ Frontend bilan bog'lang

---

## 📞 Foydali linklar

- **MongoDB Atlas:** https://www.mongodb.com/cloud/atlas
- **Documentation:** https://www.mongodb.com/docs/
- **Node.js Driver:** https://www.mongodb.com/docs/drivers/node/

---

© 2025 MedCare - MongoDB Guide
