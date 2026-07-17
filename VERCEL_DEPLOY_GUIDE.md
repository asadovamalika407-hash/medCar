# 🚀 VERCEL GA DEPLOY QILISH QO'LLANMASI

## LOYIHA HOLATI
- ✅ Vercel project yaratilgan: **medcare**
- ✅ Project ID: `prj_OcJByhZjpGDKss2zUKGhaZqVK8TM`
- ✅ `vercel.json` konfiguratsiya fayli yaratildi
- ✅ API URL'lar production uchun sozlandi

---

## 1-QADAM: VERCEL CLI NI O'RNATISH

```bash
npm install -g vercel
```

---

## 2-QADAM: VERCEL GA LOGIN QILISH

```bash
vercel login
```

Bu sizning email/GitHub akkauntingiz orqali login qiladi.

---

## 3-QADAM: ENVIRONMENT VARIABLES NI SOZLASH

Vercel dashboard dan environment variables qo'shing:

1. https://vercel.com ga kiring
2. **medcare** proyektini toping
3. **Settings** → **Environment Variables** ga boring
4. Quyidagi o'zgaruvchilarni qo'shing:

```
MONGODB_URI = mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.mongodb.net/medcare_clinic?retryWrites=true&w=majority

JWT_SECRET = medcare_secret_key_2025

NODE_ENV = production
```

**Muhim:** Har bir environment variable uchun **Production**, **Preview**, va **Development** checkboxlarini belgilang.

---

## 4-QADAM: MONGODB ATLAS NI SOZLASH

1. https://cloud.mongodb.com ga kiring
2. **Network Access** → **Add IP Address**
3. **Allow Access from Anywhere** tugmasini bosing (0.0.0.0/0)
4. Bu Vercel serverlariga ulanish uchun kerak!

---

## 5-QADAM: LOYIHANI DEPLOY QILISH

Loyiha papkasida:

```bash
cd "C:\Users\777\Desktop\kiro 3"
vercel --prod
```

Vercel CLI sizdan so'raydi:
- **Set up and deploy?** → `Y` (Yes)
- **Which scope?** → Sizning akkauntingizni tanlang
- **Link to existing project?** → `Y` (Yes, medcare proyektiga)
- **What's your project name?** → `medcare`

---

## 6-QADAM: BUILD VA DEPLOY JARAYONI

Vercel avtomatik ravishda:
1. ✅ Frontend fayllarini deploy qiladi (HTML, CSS, JS)
2. ✅ Backend ni serverless function sifatida deploy qiladi
3. ✅ Environment variables ni o'rnatadi
4. ✅ HTTPS sertifikatini o'rnatadi
5. ✅ Custom domain beradi: `https://medcare.vercel.app`

---

## 7-QADAM: DEPLOY HOLATINI TEKSHIRISH

```bash
vercel ls
```

Bu sizning barcha deploymentlaringizni ko'rsatadi.

Production URL:
```
https://medcare.vercel.app
```

---

## VERCEL.JSON TUSHUNTIRISH

```json
{
  "version": 2,
  "name": "medcare",
  "builds": [
    // Backend - Node.js serverless function
    { "src": "backend/server.js", "use": "@vercel/node" },
    
    // Frontend - Static files
    { "src": "index.html", "use": "@vercel/static" },
    { "src": "pages/**", "use": "@vercel/static" },
    { "src": "css/**", "use": "@vercel/static" },
    { "src": "js/**", "use": "@vercel/static" }
  ],
  "routes": [
    // API requests → backend
    { "src": "/api/(.*)", "dest": "backend/server.js" },
    
    // Boshqa hamma → frontend static files
    { "src": "/(.*)", "dest": "$1" }
  ]
}
```

---

## API URL SOZLAMALARI

Barcha JavaScript fayllarida API URL avtomatik o'zgaradi:

```javascript
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api'  // Local development
    : '/api';                        // Production (Vercel)
```

Bu quyidagi faylarda sozlangan:
- ✅ `js/main.js` - Room booking
- ✅ `js/hr-dashboard.js` - HR tizimi
- ✅ `pages/admin-panel.html` - Admin panel (leave requests, room bookings)

---

## TESTING

### Local test (deploy qilishdan oldin):
```bash
# Backend
cd backend
npm start

# Frontend (boshqa terminal)
npx http-server -p 8080
```

### Production test (deploy qilgandan keyin):
1. https://medcare.vercel.app - Bosh sahifa
2. https://medcare.vercel.app/pages/admin-panel.html - Admin panel
3. https://medcare.vercel.app/pages/hr-dashboard.html - HR dashboard
4. https://medcare.vercel.app/api - Backend API

---

## DEPLOYMENT LOGS NI KO'RISH

```bash
vercel logs
```

Yoki Vercel dashboard dan:
https://vercel.com/your-username/medcare/deployments

---

## YANGILANISHLARNI DEPLOY QILISH

Har safar kod o'zgartirsangiz:

```bash
git add .
git commit -m "Yangilanishlar"
git push origin main

# Vercel ga deploy
vercel --prod
```

Yoki Git bilan integratsiya qiling - har safar `git push` qilganingizda avtomatik deploy bo'ladi!

---

## MUAMMOLARNI HAL QILISH

### Problem: Backend ishlamayapti
**Yechim:**
1. Vercel dashboard → **Functions** → **Logs** ni tekshiring
2. Environment variables to'g'ri kiritilganini tekshiring
3. MongoDB Atlas IP whitelist ni tekshiring

### Problem: Frontend backend ga ulanmayapti
**Yechim:**
1. Browser console ni oching (F12)
2. Network tab ni tekshiring
3. API URL to'g'ri bo'lishi kerak: `/api/...`
4. CORS sozlamalarini tekshiring

### Problem: 404 Not Found
**Yechim:**
1. `vercel.json` routes to'g'ri sozlanganini tekshiring
2. File paths to'g'ri yozilganini tekshiring

### Problem: Vercel build failed
**Yechim:**
1. `package.json` faylida dependencies to'g'ri ko'rsatilganini tekshiring
2. Build logs ni o'qing: `vercel logs`
3. Local da test qiling: `npm start`

---

## CUSTOM DOMAIN QO'SHISH (IXTIYORIY)

1. Vercel dashboard → **medcare** → **Settings** → **Domains**
2. Domain nomini kiriting (masalan: `medcare.uz`)
3. DNS sozlamalarini yangilang
4. SSL sertifikat avtomatik o'rnatiladi

---

## XULOSA

✅ **Backend:** Serverless function sifatida (`/api/*`)
✅ **Frontend:** Static files sifatida
✅ **Database:** MongoDB Atlas (cloud)
✅ **HTTPS:** Avtomatik SSL
✅ **CDN:** Global tez yuklash
✅ **Monitoring:** Vercel analytics

---

## FOYDALI LINKLAR

- Vercel Dashboard: https://vercel.com
- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Docs: https://vercel.com/docs
- Project URL: https://medcare.vercel.app

---

## ✅ TAYYOR!

Endi `vercel --prod` buyrug'ini ishlating va loyihangiz internetga chiqadi! 🎉

Har qanday muammo bo'lsa, Vercel logs ni tekshiring:
```bash
vercel logs --follow
```
