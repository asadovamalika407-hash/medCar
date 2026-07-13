// Dorilar ma'lumotlar bazasi
const medicines = [
    { id: 1, name: "Metformin 500mg", category: "Antidiabetik", quantity: "60 dona/quti", price: 18000, stock: 45 },
    { id: 2, name: "Lisinopril 10mg", category: "Gipotonziv", quantity: "30 dona/quti", price: 22000, stock: 120 },
    { id: 3, name: "Amoksisillin 500mg", category: "Antibiotik", quantity: "20 dona/quti", price: 35000, stock: 8 },
    { id: 4, name: "Omeprazol 20mg", category: "Antiulser", quantity: "14 dona/quti", price: 15000, stock: 85 },
    { id: 5, name: "Insulin Glargin", category: "Insulin", quantity: "5 ml/flakon", price: 120000, stock: 15 },
    { id: 6, name: "Paracetamol 500mg", category: "Og'riq qoldiruvchi", quantity: "20 dona/quti", price: 8500, stock: 200 },
    { id: 7, name: "Vitamin D3 2000IU", category: "Vitamin", quantity: "60 dona/quti", price: 25000, stock: 110 },
    { id: 8, name: "Aspirin 100mg", category: "Qon suyuqlashtiruvchi", quantity: "56 dona/quti", price: 12000, stock: 90 }
];

// Savat
let cart = [];

// Sahifa yuklanganda
document.addEventListener('DOMContentLoaded', function() {
    displayMedicines();
    updateCartBadge();
});

// Dorilarni jadvalda ko'rsatish
function displayMedicines() {
    const table = document.getElementById('medicineTable');
    table.innerHTML = '';
    
    medicines.forEach((med, index) => {
        const stockText = med.stock === 0 ? 'Tugagan' : med.stock < 20 ? 'Kam qoldi' : 'Mavjud';
        const stockBg = med.stock === 0 ? '#fee2e2' : med.stock < 20 ? '#fef3c7' : '#d1fae5';
        const stockColor = med.stock === 0 ? '#dc2626' : med.stock < 20 ? '#d97706' : '#059669';
        
        const row = document.createElement('tr');
        row.style.borderBottom = '1px solid #f0f0f0';
        row.innerHTML = `
            <td style="padding: 20px 25px; color: #6b7280; font-weight: 500;">${String(index + 1).padStart(2, '0')}</td>
            <td style="padding: 20px; color: #1f2937; font-weight: 600;">
                <i class="fas fa-pills" style="color: #2563eb; margin-right: 8px;"></i>${med.name}
            </td>
            <td style="padding: 20px; color: #4b5563;">${med.category}</td>
            <td style="padding: 20px; color: #4b5563;">${med.quantity}</td>
            <td style="padding: 20px; color: #1f2937; font-weight: 600;">${med.price.toLocaleString('uz-UZ')} so'm</td>
            <td style="padding: 20px;">
                <span style="background: ${stockBg}; color: ${stockColor}; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; display: inline-block;">
                    ${stockText}
                </span>
            </td>
            <td style="padding: 20px 25px; text-align: center;">
                ${med.stock > 0 ? `
                    <button onclick="addToCart(${med.id})" style="background: #e0f2fe; color: #0284c7; border: none; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; transition: all 0.3s;">
                        <i class="fas fa-cart-plus"></i> Qo'shish
                    </button>
                ` : `
                    <button disabled style="background: #f3f4f6; color: #9ca3af; border: none; padding: 8px 16px; border-radius: 8px; cursor: not-allowed; font-weight: 600; font-size: 13px;">
                        Yo'q
                    </button>
                `}
            </td>
        `;
        
        row.addEventListener('mouseenter', () => row.style.backgroundColor = '#f8faff');
        row.addEventListener('mouseleave', () => row.style.backgroundColor = 'transparent');
        
        table.appendChild(row);
    });
}

// Savatga qo'shish
function addToCart(medId) {
    const medicine = medicines.find(m => m.id === medId);
    if (!medicine || medicine.stock === 0) return;
    
    const existingItem = cart.find(item => item.id === medId);
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...medicine, qty: 1 });
    }
    
    updateCartBadge();
    showNotification(`✅ ${medicine.name} savatga qo'shildi!`);
}

// Savatdan o'chirish
function removeFromCart(medId) {
    cart = cart.filter(item => item.id !== medId);
    updateCartBadge();
    renderCart();
}

// Cart badge yangilash
function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    
    if (totalItems > 0) {
        badge.textContent = totalItems;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// Savat oynasini ochish
function openCart() {
    document.getElementById('cartModal').classList.add('active');
    renderCart();
}

// Savat oynasini yopish
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
}

// Savatni render qilish
function renderCart() {
    const cartBody = document.getElementById('cartBody');
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <h3>Savat bo'sh</h3>
                <p>Dorilarni tanlang va savatga qo'shing</p>
            </div>
        `;
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    
    cartBody.innerHTML = `
        <div class="cart-items">
            ${cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">
                            <i class="fas fa-pills"></i> ${item.name}
                        </div>
                        <div class="cart-item-details">
                            ${item.category} • ${item.quantity}
                        </div>
                        <div class="cart-item-price">
                            ${item.price.toLocaleString('uz-UZ')} so'm × ${item.qty} = 
                            ${(item.price * item.qty).toLocaleString('uz-UZ')} so'm
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `).join('')}
        </div>

        <div class="cart-summary">
            <div class="summary-row">
                <span>Mahsulotlar soni:</span>
                <strong>${cart.reduce((sum, item) => sum + item.qty, 0)} dona</strong>
            </div>
            <div class="summary-row">
                <span>Jami narx:</span>
                <strong>${total.toLocaleString('uz-UZ')} so'm</strong>
            </div>
            <div class="summary-row">
                <span>Yetkazib berish:</span>
                <strong style="color: #059669;">Bepul</strong>
            </div>
            <div class="summary-total">
                <span>To'lov summasi:</span>
                <span>${total.toLocaleString('uz-UZ')} so'm</span>
            </div>
        </div>

        <div class="delivery-form">
            <h3 style="margin-bottom: 20px; color: #1e40af;">
                <i class="fas fa-map-marker-alt"></i> Yetkazib berish ma'lumotlari
            </h3>
            
            <div class="form-group">
                <label><i class="fas fa-user"></i> Bemor F.I.O. *</label>
                <input type="text" id="patientName" placeholder="Masalan: Aliyev Vali Jonovich" required>
            </div>

            <div class="form-group">
                <label><i class="fas fa-id-card"></i> Bemor ID raqami *</label>
                <input type="text" id="patientId" placeholder="Masalan: P-00421" required>
            </div>

            <div class="form-group">
                <label><i class="fas fa-building"></i> Bino / Blok *</label>
                <select id="building" required>
                    <option value="">Tanlang</option>
                    <option value="A">A Bino</option>
                    <option value="B">B Bino</option>
                    <option value="C">C Bino (Jarrohlik)</option>
                    <option value="D">D Bino (Pediatriya)</option>
                </select>
            </div>

            <div class="form-group">
                <label><i class="fas fa-door-open"></i> Palata / Xona raqami *</label>
                <input type="number" id="roomNumber" placeholder="Masalan: 305" min="100" max="999" required>
            </div>

            <div class="form-group">
                <label><i class="fas fa-phone"></i> Telefon raqam *</label>
                <input type="tel" id="phone" placeholder="+998 __ ___ __ __" required>
            </div>

            <div class="form-group">
                <label><i class="fas fa-comment"></i> Qo'shimcha izoh</label>
                <input type="text" id="notes" placeholder="Maxsus ko'rsatmalar (ixtiyoriy)">
            </div>

            <button class="checkout-btn" onclick="processOrder()">
                <i class="fas fa-check-circle"></i>
                Buyurtmani tasdiqlash va to'lash
            </button>
        </div>
    `;
}

// Buyurtmani rasmiylashtirish
function processOrder() {
    const patientName = document.getElementById('patientName').value.trim();
    const patientId = document.getElementById('patientId').value.trim();
    const building = document.getElementById('building').value;
    const roomNumber = document.getElementById('roomNumber').value;
    const phone = document.getElementById('phone').value.trim();
    
    // Validatsiya
    if (!patientName || !patientId || !building || !roomNumber || !phone) {
        showNotification('❌ Iltimos, barcha majburiy maydonlarni to\'ldiring!', 'error');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const items = cart.map(item => `${item.name} × ${item.qty}`).join('\n');
    const address = `${building} bino, ${roomNumber}-xona`;
    
    const confirmMessage = `
🛒 BUYURTMA MA'LUMOTLARI

👤 Bemor: ${patientName}
🆔 ID: ${patientId}
📍 Manzil: ${address}
📞 Telefon: ${phone}

📦 Mahsulotlar:
${items}

💰 To'lov summasi: ${total.toLocaleString('uz-UZ')} so'm

✅ Buyurtmani tasdiqlaysizmi?
Dorilar 15-20 daqiqa ichida yetkazib beriladi.
    `;
    
    if (confirm(confirmMessage)) {
        // Buyurtma muvaffaqiyatli
        showNotification('✅ Buyurtma qabul qilindi! Dorilar tez orada yetkaziladi.', 'success');
        
        // Savatni tozalash
        cart = [];
        updateCartBadge();
        closeCart();
        
        // Optional: Backend ga yuborish
        console.log('Buyurtma ma\'lumotlari:', {
            patientName,
            patientId,
            building,
            roomNumber,
            phone,
            items: cart,
            total
        });
    }
}

// Xabar ko'rsatish
function showNotification(message, type = 'success') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    };
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.2);
        z-index: 3000;
        font-weight: 600;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS animatsiyalar
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
