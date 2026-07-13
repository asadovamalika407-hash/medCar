# 🚀 DEPLOY QILISH QO'LLANMASI

## Git va GitHub ga yuklash:

```bash
# 1. Git ni ishga tushirish (agar qilinmagan bo'lsa)
cd "C:\Users\777\Desktop\kiro 3"
git init

# 2. Barcha fayllarni qo'shish
git add .

# 3. Commit qilish
git commit -m "Production ready: Backend + Frontend + Barcode scanner"

# 4. Remote repository qo'shish
git remote add origin https://github.com/asadovamalika407-hash/medCar.git

# 5. Push qilish
git branch -M main
git push -u origin main --force
```

---

## RENDER.COM GA DEPLOY:

### 1. BACKEND DEPLOY:

1. https://render.com ga kiring (GitHub bilan)
2. **"New +"** → **"Web Service"**
3. Repository: `asadovamalika407-hash/medCar`
4. Sozlamalar:
   ```
   Name: medcare-backend
   Region: Singapore
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: node server.js
   Instance Type: Free
   ```
5. **Environment Variables:**
   ```
   PORT = 5000
   MONGODB_URI = mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.mongodb.net/medcare_clinic?retryWrites=true&w=majority
   JWT_SECRET = medcare_secret_key_2025
   NODE_ENV = production
   ```
6. **"Create Web Service"** tugmasini bosing

**Backend URL:** `https://medcare-backend.onrender.com`

---

### 2. FRONTEND DEPLOY:

1. **"New +"** → **"Static Site"**
2. Repository: `asadovamalika407-hash/medCar`
3. Sozlamalar:
   ```
   Name: medcare-frontend
   Branch: main
   Root Directory: (bo'sh)
   Build Command: (bo'sh)
   Publish Directory: .
   ```
4. **"Create Static Site"** tugmasini bosing

**Frontend URL:** `https://medcare-frontend.onrender.com`

---

### 3. FRONTEND NI BACKEND GA ULASH:

`js/hr-dashboard.js` faylida allaqachon sozlangan:
```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://medcare-backend.onrender.com/api';
```

---

## MONGODB ATLAS SOZLAMALARI:

1. https://cloud.mongodb.com ga kiring
2. **Network Access** → **Add IP Address** → **Allow Access from Anywhere** (0.0.0.0/0)
3. Bu Render.com dan ulanish uchun kerak!

---

## TESTING:

Backend test:
```
https://medcare-backend.onrender.com/
```

Frontend test:
```
https://medcare-frontend.onrender.com/
```

---

## MUHIM ESLATMALAR:

1. ✅ Free plan: Backend 15 daqiqa ishlamaganda uxlaydi (birinchi so'rovda uyg'onadi)
2. ✅ HTTPS avtomatik
3. ✅ MongoDB Atlas: 750 soat/oy bepul
4. ✅ GitHub push qilsangiz, avtomatik deploy bo'ladi

---

## MUAMMOLAR:

### Backend ishlamasa:
- Render logs ni tekshiring
- Environment variables to'g'ri kiritilganini tekshiring
- MongoDB Atlas IP whitelist ni tekshiring

### Frontend backend ga ulanmasa:
- Browser console ni tekshiring (F12)
- CORS sozlamalarini tekshiring
- Backend URL to'g'riligini tekshiring

---

## ✅ TAYYOR!

Loyihangiz endi internet orqali ochiq: 🎉

- Frontend: https://medcare-frontend.onrender.com
- Backend API: https://medcare-backend.onrender.com/api

Custom domain qo'shmoqchi bo'lsangiz, Render settings dan qo'shing!
