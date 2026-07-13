# MedCare Clinic - Klinika Boshqaruv Tizimi

Modern veb-based klinika boshqaruv tizimi - dorixona, HR, kassir va bemorlar boshqaruvi uchun.

## 🚀 Texnologiyalar

### Frontend:
- HTML5, CSS3, JavaScript (Vanilla)
- FontAwesome icons
- QuaggaJS (Barcode scanner)

### Backend:
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication

### Database:
- MongoDB Atlas

## 📦 O'rnatish (Local)

### 1. Repository ni clone qiling:
```bash
git clone https://github.com/asadovamalika407-hash/medCar.git
cd medCar
```

### 2. Backend ni o'rnating:
```bash
cd backend
npm install
```

### 3. Environment variables:
`backend/.env` faylini yarating:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### 4. Backend ni ishga tushiring:
```bash
npm start
```

### 5. Frontend ni ishga tushiring:
VS Code Live Server yoki oddiy web server:
```bash
# Agar Python o'rnatilgan bo'lsa:
python -m http.server 5500
```

## 🌐 Deploy (Render.com)

### Backend:
- Build Command: `npm install`
- Start Command: `node server.js`
- Environment Variables: PORT, MONGODB_URI, JWT_SECRET, NODE_ENV

### Frontend:
- Publish Directory: `.` (root)
- No build command needed

## 👥 Login ma'lumotlari:

- **Admin**: admin / admin123
- **Doctor**: doctor / doctor123
- **Pharmacy**: pharmacy / pharmacy123

## 📱 Modullar:

1. **Dashboard** - Umumiy statistika
2. **Kassir** - POS tizimi, barcode skaner
3. **Dorilar** - Dorilar bazasi
4. **Buyurtmalar** - Buyurtmalar boshqaruvi
5. **Hisobotlar** - Moliyaviy hisobotlar
6. **HR Tizimi** - Xodimlar boshqaruvi
7. **Chiqlar** - Xarajatlar

## 🔧 Texnik xususiyatlar:

- ✅ Barcode skaner (QuaggaJS)
- ✅ LocalStorage integratsiya
- ✅ Real-time stock management
- ✅ Chek chiqarish (print)
- ✅ Responsive design
- ✅ RESTful API

## 📞 Contact:

GitHub: https://github.com/asadovamalika407-hash
