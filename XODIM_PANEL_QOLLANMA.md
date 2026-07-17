# 🏥 MedCare HR Dashboard - Xodim Paneli Qo'llanma

## 📋 Umumiy Ma'lumot

Xodim paneli orqali xodimlar o'zlarining profilini, davomat, maosh va ta'til ma'lumotlarini ko'rishlari mumkin. Admin panel orqali HR bo'limi barcha xodimlarni boshqaradi.

---

## 🔐 Tizimga Kirish

### Admin Panel
- **URL**: `pages/hr-dashboard.html`
- **Login**: admin
- **Parol**: admin123

### Xodim Panel
- **URL**: `pages/employee-dashboard.html`
- **Login**: E-001 dan E-052 gacha (52 ta xodim)
- **Parol**: 12345 (barcha xodimlar uchun)

---

## 👨‍💼 HR Dashboard (Admin Panel)

### 1. **Xodimlar Ro'yxati**
- 52 ta xodim (Bosh Vrach, shifokorlar, hamshiralar, laborantlar, va h.k.)
- Har bir xodim ID, ism, lavozim, bo'lim, telefon, ish boshlagan sana
- Tahrirlash va o'chirish tugmalari

### 2. **Davomat Tizimi** ✅
- **"Davomat Belgilash"** tugmasi
- Xodimni tanlash
- 3 ta holat:
  - ✅ **Keldi** - kelish va ketish vaqti avtomatik to'ldiriladi
  - ⏰ **Kech qoldi** - vaqt o'zgartirilishi mumkin
  - ❌ **Kelmadi** - vaqt ko'rsatilmaydi
- Kelish vaqti: joriy vaqt
- Ketish vaqti: +8 soat avtomatik
- Jadvalda natijalar ko'rsatiladi

### 3. **Maosh Tizimi** 💰
- Barcha 52 ta xodimning maoshi
- **Statistika kartochkalari**:
  - Jami maosh fondi
  - O'rtacha maosh
  - Eng yuqori maosh
  - Eng past maosh
- **Jadval**:
  - Asosiy maosh
  - Bonus
  - Chegirmalar (10%)
  - Jami to'lov
- Oy bo'yicha filter (Yanvar 2024 - Dekabr 2024)

### 4. **Ta'til Tizimi** ✈️
- **3 xil ta'til turi**:
  - 💰 **Klinika Hisobidan Ta'til** (Pullik)
  - 💼 **O'z Hisobidan Ta'til** (Maoshsiz)
  - 🤒 **Kasallik Varaqasi**
- **Statistika**:
  - Kutilmoqda
  - Tasdiqlangan
  - Rad etilgan
  - Ta'tilda
- **Arizalar jadvali**:
  - Xodim, lavozim
  - Ta'til turi
  - Boshlanish va tugash sanasi
  - Kunlar soni (avtomatik hisoblanadi)
  - Sabab
  - Holat
- **Admin amallari**:
  - ✅ Tasdiqlash
  - ❌ Rad etish

### 5. **Hujjatlar Tizimi** 📄 (YANGILANDI)

#### **Yaxshilangan Interfeysь**:
✅ **Eski versiya**: 5 ta tugma (Pasport, Shartnoma, Diplom, Tibbiy, Boshqa)
✅ **Yangi versiya**: Bitta "Hujjatlar" tab - barcha hujjatlar bir joyda

#### **Hujjat turlari**:
- 🪪 **Pasport** - pasport nusxasi
- 📄 **Shartnoma** - mehnat shartnomasi
- 🎓 **Diplom** - ta'lim hujjati
- 🏥 **Tibbiy** - tibbiy ko'rik natijasi
- 🏆 **Sertifikat** - professional sertifikatlar
- ✉️ **Tavsiya** - tavsiya xatlari
- 📁 **Boshqa** - boshqa hujjatlar

#### **Imkoniyatlar**:
1. **Hujjat yuklash**:
   - Xodimni tanlash
   - Hujjat turini tanlash
   - Hujjat nomi
   - Fayl yuklash (PDF, DOC, DOCX, JPG, JPEG, PNG)
   - Izoh qo'shish
   
2. **Barcha hujjatlarni ko'rish**:
   - Bir jadvalda barcha hujjatlar
   - Xodim nomi
   - Hujjat nomi
   - Turi (ikonka bilan)
   - Yuklangan sana
   - Fayl hajmi
   - Holat
   
3. **PDF yuklab olish** ✅:
   - Har bir hujjat uchun "Yuklab Olish" tugmasi
   - Avtomatik PDF format
   - MedCare branding
   - Hujjat ma'lumotlari to'liq
   
4. **O'chirish**:
   - Tasdiqlash bilan o'chirish

---

## 👤 Xodim Panel

### **Kirish**
1. `pages/employee-login.html` sahifasiga o'tish
2. Xodim ID kiriting (E-001 dan E-052 gacha)
3. Parol: `12345`

### **Dashboard**
4 ta tab mavjud:

#### 1. **Profil** 👤
- Xodim ID
- To'liq ism
- Lavozim
- Bo'lim
- Telefon
- Ish boshlagan sana

#### 2. **Ta'til** ✈️
- Ta'til so'rovi yuborish:
  - 3 xil ta'til turi tanlash
  - Boshlanish va tugash sanasi
  - Kunlar soni avtomatik hisoblanadi
  - Sabab yozish
- Yuborilgan arizalarni ko'rish:
  - Holat: Kutilmoqda, Tasdiqlangan, Rad etilgan
  - Admin tomonidan ko'rib chiqiladi

#### 3. **Davomat** 📅
- O'z davomat tarixini ko'rish
- Kelish va ketish vaqtlari
- Holat (Keldi, Kech qoldi, Kelmadi)
- Izohlar

#### 4. **Maosh** 💰
- Oylik maosh ma'lumotlari:
  - Asosiy maosh
  - Bonus
  - Chegirmalar
  - Jami to'lov
- Oy bo'yicha filter

---

## 🔄 Ish Jarayoni

### **Ta'til So'rash** (Xodim → Admin):
1. Xodim panelga kiradi (E-XXX / 12345)
2. **Ta'til** tabini ochadi
3. **"Ta'til So'rovi"** tugmasini bosadi
4. Ta'til turini tanlaydi (3 ta variant)
5. Sanalarni tanlaydi (kunlar avtomatik hisoblanadi)
6. Sababni yozadi
7. **"Yuborish"** tugmasini bosadi
8. ✅ Ariza admin paneliga yuboriladi

### **Ta'til Tasdiqlash** (Admin):
1. HR Dashboard ga kiradi (admin / admin123)
2. **Ta'til** tabini ochadi
3. Kutilayotgan arizalarni ko'radi (sariq badge)
4. Arizani ko'rib chiqadi
5. Ikki variant:
   - ✅ **Tasdiqlash** - yashil tugma
   - ❌ **Rad etish** - qizil tugma
6. Xodim panelida holat yangilanadi

### **Davomat Belgilash** (Admin):
1. **Davomat** tabini ochadi
2. **"Davomat Belgilash"** tugmasini bosadi
3. Xodimni ro'yxatdan tanlaydi
4. Holatni tanlaydi:
   - Keldi → kelish/ketish vaqti avtomatik
   - Kech qoldi → vaqtni o'zgartirish mumkin
   - Kelmadi → vaqt ko'rsatilmaydi
5. Izoh qo'shadi (ixtiyoriy)
6. **"Saqlash"** tugmasini bosadi
7. Jadvalga qo'shiladi

### **Hujjat Yuklash** (Admin):
1. **Hujjatlar** tabini ochadi
2. **"Hujjat Yuklash"** tugmasini bosadi
3. Xodimni tanlaydi
4. Hujjat turini tanlaydi (7 ta variant)
5. Hujjat nomini yozadi
6. Faylni tanlaydi yoki tortadi
7. Izoh qo'shadi (ixtiyoriy)
8. **"Yuklash"** tugmasini bosadi
9. Jadvalda ko'rsatiladi

### **Hujjat PDF Yuklab Olish** (Admin):
1. Hujjatlar jadvalida kerakli qatorni topadi
2. **"Yuklab Olish"** tugmasini bosadi
3. PDF avtomatik yuklab olinadi
4. PDF da:
   - MedCare logotipi
   - Hujjat ma'lumotlari
   - Xodim ma'lumotlari
   - Sana va holat

---

## 📊 Statistika

### **Dashboard Kartochkalari**:
- 📊 **Jami Xodimlar**: 52
- ✅ **Bugun Keldi**: ~48 (92%)
- ❌ **Bugun Kelmadi**: ~4 (8%)
- ✈️ **Ta'tilda**: ~3 (6%)

### **Maosh Statistikasi**:
- 💰 **Jami Maosh Fondi**: ~280,000,000 so'm
- 📊 **O'rtacha Maosh**: ~5,400,000 so'm
- ⬆️ **Eng Yuqori**: 28,800,000 so'm (Bosh Vrach)
- ⬇️ **Eng Past**: 2,970,000 so'm (Tozalovchi)

### **Ta'til Statistikasi**:
- ⏳ **Kutilmoqda**: 2
- ✅ **Tasdiqlangan**: 3
- ❌ **Rad Etilgan**: 1
- ✈️ **Ta'tilda**: 3

---

## 🎨 Dizayn Xususiyatlari

### **Ranglar**:
- 🔵 **Ko'k** (#1976d2) - asosiy rang
- 🟢 **Yashil** (#2e7d32) - muvaffaqiyat
- 🟡 **Sariq** (#ed6c02) - ogohlantirish
- 🔴 **Qizil** (#d32f2f) - xato/rad

### **Ikonlar**:
- Barcha emojlar Font Awesome iconkalariga almashtirilgan
- Professional ko'rinish
- Yaxshi ko'rinish barcha ekranlarda

### **Animatsiyalar**:
- Tugmalar ustiga borganda kattalashadi
- Smooth transition effektlari
- Modal ochilishi va yopilishi animatsiyalangan

---

## 🔧 Texnik Ma'lumotlar

### **Frontend**:
- HTML5, CSS3, JavaScript (Vanilla JS)
- Font Awesome 6.5.1 (iconkalar)
- jsPDF 2.5.1 (PDF generatsiya)

### **Backend**:
- Node.js + Express (5000 port)
- MongoDB Atlas (medcare_clinic database)
- REST API

### **Ma'lumotlar**:
- LocalStorage (xodim paneli)
- Backend API (HR dashboard)
- Sample data (API yo'q bo'lsa)

### **Xavfsizlik**:
- Parol bilan himoyalangan
- Admin va xodim rollar
- Session storage

---

## ✅ Test Qilingan Funksiyalar

### **Hujjatlar Tizimi** (Yangilandi):
- ✅ Barcha hujjatlarni bir jadvalda ko'rsatish
- ✅ Hujjat yuklash (7 ta tur)
- ✅ PDF yuklab olish (jsPDF)
- ✅ Hujjat o'chirish
- ✅ Fayl tanlash va ko'rsatish
- ✅ Xodimlar ro'yxati

### **Davomat**:
- ✅ 3 ta holat tugmalari
- ✅ Vaqt avtomatik to'ldirilishi
- ✅ Jadvalga qo'shilishi
- ✅ Izoh qo'shish

### **Maosh**:
- ✅ 52 ta xodim maoshi
- ✅ Statistika kartalari
- ✅ Chegirmalar hisoblash
- ✅ Oy filtri

### **Ta'til**:
- ✅ 3 xil ta'til turi
- ✅ Kunlar avtomatik hisoblanadi
- ✅ Admin tasdiqlash/rad etish
- ✅ Xodim so'rov yuborish

---

## 📝 O'zgarishlar Tarixi

### **Versiya 2.0** (2024-12-XX):
- ✅ Hujjatlar tabini soddalashtirish
- ✅ 5 ta filter tugmasini olib tashlash
- ✅ Barcha hujjatlarni bir jadvalda ko'rsatish
- ✅ PDF yuklab olish funksiyasi
- ✅ Ketish vaqti qo'shish (davomat)

### **Versiya 1.0** (2024-12-XX):
- ✅ HR Dashboard yaratish
- ✅ 52 ta xodim qo'shish
- ✅ Davomat tizimi
- ✅ Maosh tizimi
- ✅ Ta'til tizimi
- ✅ Hujjatlar tizimi
- ✅ Xodim paneli
- ✅ Login tizimi

---

## 🚀 Kelajak Rejalar

1. **Hisobotlar**:
   - Excel eksport
   - PDF hisobotlar
   - Statistika grafiklari

2. **Bildirishnomalar**:
   - Email bildirishnomalar
   - SMS xabarlar
   - Push notifications

3. **Kalendar**:
   - Ta'til kalendari
   - Ish jadvali
   - Tug'ilgan kunlar

4. **Yuklash**:
   - Bulk xodim yuklash
   - CSV import/export

5. **Sozlamalar**:
   - Parolni o'zgartirish
   - Profil rasmini yuklash
   - Email sozlamalari

---

## 📞 Qo'llab-quvvatlash

Savol yoki muammo bo'lsa, IT bo'limi bilan bog'laning:
- **Email**: it@medcare.uz
- **Telefon**: +998 71 200 10 10
- **Telegram**: @medcare_support

---

## 📄 Litsenziya

© 2024 MedCare Klinikasi. Barcha huquqlar himoyalangan.

---

**Muvaffaqiyatli ishlashni tilaymiz! 🎉**
