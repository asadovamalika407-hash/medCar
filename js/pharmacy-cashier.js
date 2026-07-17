// === KASSIR TIZIMI (POS) ===

// Kassir tizimi uchun ma'lumotlar
let cart = [];
let availableMedicines = [];

// LocalStorage dan dorilarni yuklash
function loadMedicinesFromStorage() {
    const savedMedicines = localStorage.getItem('medcare_medicines');
    if (savedMedicines) {
        const medicines = JSON.parse(savedMedicines);
        // Kassir uchun format
        availableMedicines = medicines.map(med => ({
            id: 'M-' + String(med.id).padStart(3, '0'),
            name: med.name,
            price: med.price,
            stock: med.stock,
            barcode: med.barcode,
            originalId: med.id
        }));
    } else {
        // LocalStorage bo'sh bo'lsa, bo'sh massiv
        availableMedicines = [];
    }
}

// Dorilar yangilanganda avtomatik qayta yuklash
window.addEventListener('medicinesUpdated', function() {
    console.log('Dorilar yangilandi, kassir ro\'yxatini yangilash...');
    loadMedicinesFromStorage();
    loadProducts();
});

// Mahsulotlarni yuklash (faqat qidirilgan mahsulotlar uchun)
function loadProducts(filteredProducts = []) {
    console.log('loadProducts() ishga tushdi!');
    
    // Avval LocalStorage dan yangi ma'lumotlarni yuklash
    loadMedicinesFromStorage();
    
    const container = document.getElementById('productsList');
    if (!container) {
        console.error('productsList element topilmadi!');
        return;
    }
    
    // Agar filtrlangan mahsulotlar bo'lmasa, bo'sh xabar ko'rsat
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 80px 40px; color: #9ca3af;"><i class="fas fa-barcode" style="font-size: 64px; margin-bottom: 20px; opacity: 0.2;"></i><p style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Mahsulot qidiring</p><p style="font-size: 14px;">Barcode skanerini bosing yoki mahsulot nomini kiriting</p></div>';
        return;
    }
    
    container.innerHTML = filteredProducts.map(product => `
        <div onclick="addToCart('${product.id}')" style="background: #f9fafb; padding: 20px; border-radius: 12px; cursor: pointer; transition: all 0.3s; border: 2px solid transparent;" onmouseover="this.style.borderColor='#7c3aed'; this.style.transform='translateY(-3px)'" onmouseout="this.style.borderColor='transparent'; this.style.transform='translateY(0)'">
            <div style="text-align: center;">
                <i class="fas fa-pills" style="font-size: 32px; color: #7c3aed; margin-bottom: 12px;"></i>
                <div style="font-weight: 700; color: #1f2937; margin-bottom: 8px; font-size: 14px; min-height: 40px;">${product.name}</div>
                <div style="color: #10b981; font-size: 20px; font-weight: 700; margin-bottom: 8px;">${product.price.toLocaleString()} so'm</div>
                <div style="color: #6b7280; font-size: 12px;">
                    <i class="fas fa-box"></i> Stock: ${product.stock}
                </div>
            </div>
        </div>
    `).join('');
    console.log('Mahsulotlar ko\'rsatildi:', filteredProducts.length, 'ta');
}

// Mahsulot qidirish
function searchProducts() {
    const query = document.getElementById('productSearch').value.toLowerCase().trim();
    
    if (query === '') {
        // Bo'sh bo'lsa - skanerlangan mahsulotlarni ko'rsat
        displayScannedProducts();
        return;
    }
    
    const filtered = availableMedicines.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.barcode.includes(query) ||
        p.id.toLowerCase().includes(query)
    );

    const container = document.getElementById('productsList');
    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #9ca3af;"><i class="fas fa-search" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i><p>Mahsulot topilmadi</p><p style="font-size: 14px; margin-top: 10px; color: #ef4444;">Qidiruv: "' + query + '"</p></div>';
    } else {
        loadProducts(filtered); // Filtrlangan mahsulotlarni ko'rsat
        
        // Agar bitta natija bo'lsa va barcode bilan qidirilgan bo'lsa, avtomatik savatchaga qo'sh
        if (filtered.length === 1 && query === filtered[0].barcode) {
            setTimeout(() => {
                addToCart(filtered[0].id);
                showToast('✅ Mahsulot avtomatik qo\'shildi!', 'success');
            }, 300);
        }
    }
}

// Skanerlangan mahsulotlarni ko'rsatish
function displayScannedProducts() {
    const container = document.getElementById('productsList');
    
    if (cart.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 80px 40px; color: #9ca3af;"><i class="fas fa-barcode" style="font-size: 64px; margin-bottom: 20px; opacity: 0.2;"></i><p style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">Mahsulot qidiring</p><p style="font-size: 14px;">Barcode skanerini bosing yoki mahsulot nomini kiriting</p></div>';
        return;
    }
    
    // Savatdagi mahsulotlarni chap tomonda ko'rsatish
    const scannedProducts = cart.map(item => {
        const product = availableMedicines.find(p => p.id === item.id);
        return product;
    }).filter(p => p); // null'larni olib tashlash
    
    if (scannedProducts.length > 0) {
        loadProducts(scannedProducts);
    }
}

// Savatchaga qo'shish
function addToCart(productId) {
    const product = availableMedicines.find(p => p.id === productId);
    if (!product) {
        showToast('⚠️ Mahsulot topilmadi!', 'error');
        return;
    }

    if (product.stock === 0) {
        showToast('⚠️ Bu mahsulot qolmagan!', 'error');
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showToast('⚠️ Stock yetarli emas!', 'error');
            return;
        }
        existingItem.quantity++;
        showToast('➕ Miqdor oshirildi', 'success');
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            stock: product.stock,
            originalId: product.originalId
        });
        showToast('✅ Savatchaga qo\'shildi: ' + product.name, 'success');
    }

    updateCart();
    
    // Chap tomonda skanerlangan mahsulotlarni ko'rsatish
    displayScannedProducts();
}

// Toast xabar ko'rsatish (kichik notification)
function showToast(message, type = 'success') {
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b'
    };
    
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: ${colors[type]};
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 3000;
        font-weight: 600;
        font-size: 14px;
        animation: slideInUp 0.3s ease;
        max-width: 350px;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Savatchani yangilash
function updateCart() {
    const container = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 40px 20px; color: #9ca3af;"><i class="fas fa-shopping-basket" style="font-size: 48px; margin-bottom: 15px; opacity: 0.3;"></i><p>Savatcha bo\'sh</p></div>';
        document.getElementById('totalAmount').textContent = '0 so\'m';
        document.getElementById('totalItems').textContent = '0 ta';
        return;
    }

    container.innerHTML = cart.map(item => `
        <div style="background: #f9fafb; padding: 15px; border-radius: 10px; margin-bottom: 10px; border-left: 4px solid #7c3aed;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <div style="flex: 1;">
                    <div style="font-weight: 700; color: #1f2937; font-size: 14px; margin-bottom: 5px;">${item.name}</div>
                    <div style="color: #7c3aed; font-weight: 600;">${item.price.toLocaleString()} so'm</div>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background: #fee2e2; color: #dc2626; border: none; width: 30px; height: 30px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="decreaseQuantity('${item.id}')" style="width: 32px; height: 32px; background: #e5e7eb; border: none; border-radius: 8px; cursor: pointer; font-weight: 700; color: #1f2937;">-</button>
                    <span style="font-weight: 700; color: #1f2937; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="increaseQuantity('${item.id}')" style="width: 32px; height: 32px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 700;">+</button>
                </div>
                <div style="font-weight: 700; color: #10b981; font-size: 16px;">${(item.price * item.quantity).toLocaleString()} so'm</div>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.getElementById('totalAmount').textContent = total.toLocaleString() + ' so\'m';
    document.getElementById('totalItems').textContent = totalQty + ' ta';
}

// Miqdorni oshirish
function increaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity < item.stock) {
        item.quantity++;
        updateCart();
    } else {
        alert('⚠️ Stock yetarli emas!');
    }
}

// Miqdorni kamaytirish
function decreaseQuantity(productId) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(i => i.id !== productId);
        }
        updateCart();
    }
}

// Savatchadan o'chirish
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    displayScannedProducts(); // Chap tomonni ham yangilash
}

// Savatchani tozalash
function clearCart() {
    if (cart.length === 0) return;
    if (confirm('Savatchani tozalamoqchimisiz?')) {
        cart = [];
        updateCart();
        displayScannedProducts(); // Chap tomonni ham yangilash
    }
}

// To'lovni amalga oshirish
function processPayment(method) {
    if (cart.length === 0) {
        showToast('⚠️ Savatcha bo\'sh!', 'warning');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const methodText = method === 'cash' ? 'Naqd pul' : 'Plastik karta';

    // Chek yaratish
    generateReceipt(method, total);
    
    // LocalStorage dagi stockni yangilash
    updateStockInStorage();

    // Savatchani tozalash
    cart = [];
    updateCart();
    loadProducts([]); // Mahsulotlarni yana yashirish (bo'sh ro'yxat)

    showToast(`✅ To'lov qabul qilindi! (${methodText})\n\nChek chiqarilmoqda...`, 'success');
}

// LocalStorage dagi stockni yangilash
function updateStockInStorage() {
    const savedMedicines = localStorage.getItem('medcare_medicines');
    if (!savedMedicines) return;
    
    const medicines = JSON.parse(savedMedicines);
    
    // Har bir savatcha elementini tekshirish va stockni kamaytirish
    cart.forEach(cartItem => {
        const medicine = medicines.find(m => m.id === cartItem.originalId);
        if (medicine) {
            medicine.stock -= cartItem.quantity;
            console.log(`Stock yangilandi: ${medicine.name} - ${medicine.stock}`);
        }
    });
    
    // Yangilangan ma'lumotlarni saqlash
    localStorage.setItem('medcare_medicines', JSON.stringify(medicines));
    
    // Dorilar sahifasiga xabar yuborish
    window.dispatchEvent(new Event('medicinesUpdated'));
}

// Chek yaratish va chiqarish
function generateReceipt(method, total) {
    const now = new Date();
    const receiptNumber = 'CHK-' + now.getTime().toString().slice(-8);
    const methodText = method === 'cash' ? 'Naqd pul' : 'Plastik karta';

    let receiptHTML = `
        <html>
        <head>
            <title>Chek - ${receiptNumber}</title>
            <style>
                body { font-family: 'Courier New', monospace; padding: 20px; }
                .receipt { width: 350px; margin: 0 auto; background: white; padding: 20px; }
                .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 15px; margin-bottom: 15px; }
                .header h2 { margin: 0 0 5px 0; }
                .header p { margin: 0; font-size: 12px; }
                .info { margin-bottom: 15px; font-size: 12px; }
                .info p { margin: 5px 0; }
                .items { border-top: 2px dashed #000; border-bottom: 2px dashed #000; padding: 15px 0; margin-bottom: 15px; }
                .item { margin-bottom: 10px; }
                .item-name { font-weight: bold; font-size: 13px; }
                .item-detail { display: flex; justify-content: space-between; font-size: 12px; }
                .total { font-size: 14px; margin-bottom: 15px; }
                .total-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .grand-total { display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; padding-top: 10px; border-top: 1px solid #000; }
                .payment { display: flex; justify-content: space-between; margin-top: 5px; font-size: 13px; }
                .footer { text-align: center; border-top: 2px dashed #000; padding-top: 15px; font-size: 12px; }
                .footer p { margin: 0; }
                @media print {
                    body { padding: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="receipt">
                <div class="header">
                    <h2>MedCare Dorixona</h2>
                    <p>Toshkent sh., Yunusobod tumani</p>
                    <p>Tel: +998 71 200 10 10</p>
                </div>

                <div class="info">
                    <p>Chek: ${receiptNumber}</p>
                    <p>Sana: ${now.toLocaleDateString('uz-UZ')} ${now.toLocaleTimeString('uz-UZ')}</p>
                    <p>Kassir: Dorixona Admin</p>
                </div>

                <div class="items">
                    ${cart.map(item => `
                        <div class="item">
                            <div class="item-name">${item.name}</div>
                            <div class="item-detail">
                                <span>${item.quantity} x ${item.price.toLocaleString()}</span>
                                <span><strong>${(item.price * item.quantity).toLocaleString()} so'm</strong></span>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="total">
                    <div class="total-row">
                        <span>Mahsulotlar:</span>
                        <span>${cart.reduce((sum, item) => sum + item.quantity, 0)} ta</span>
                    </div>
                    <div class="grand-total">
                        <span>JAMI:</span>
                        <span>${total.toLocaleString()} so'm</span>
                    </div>
                    <div class="payment">
                        <span>To'lov turi:</span>
                        <span>${methodText}</span>
                    </div>
                </div>

                <div class="footer">
                    <p>Xaridingiz uchun rahmat!</p>
                    <p style="margin-top: 5px; font-size: 11px;">www.medcare.uz</p>
                </div>
            </div>

            <div class="no-print" style="text-align: center; margin-top: 20px;">
                <button onclick="window.print()" style="padding: 12px 24px; background: #7c3aed; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600;">
                    <i class="fas fa-print"></i> Chekni chiqarish
                </button>
                <button onclick="window.close()" style="padding: 12px 24px; background: #6b7280; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; margin-left: 10px;">
                    Yopish
                </button>
            </div>
        </body>
        </html>
    `;

    // Chekni yangi oynada ochish
    const printWindow = window.open('', '', 'width=450,height=700');
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
}


// === KASSIR TAB NAVIGATION ===
function showCashierTab(tabName) {
    // Barcha tablarni yashirish
    document.querySelectorAll('.cashier-content').forEach(tab => {
        tab.style.display = 'none';
    });

    // Barcha tab tugmalarini reset qilish
    document.querySelectorAll('.cashier-tab').forEach(btn => {
        btn.style.background = '#f9fafb';
        btn.style.color = '#6b7280';
    });

    // Tanlangan tabni ko'rsatish
    if (tabName === 'pos') {
        document.getElementById('posTab').style.display = 'block';
        document.getElementById('tabPos').style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
        document.getElementById('tabPos').style.color = 'white';
        loadProducts([]); // Bo'sh ro'yxat bilan boshlash
    } else if (tabName === 'receipts') {
        document.getElementById('receiptsTab').style.display = 'block';
        document.getElementById('tabReceipts').style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
        document.getElementById('tabReceipts').style.color = 'white';
    } else if (tabName === 'customers') {
        document.getElementById('customersTab').style.display = 'block';
        document.getElementById('tabCustomers').style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
        document.getElementById('tabCustomers').style.color = 'white';
    } else if (tabName === 'reports') {
        document.getElementById('reportsTab').style.display = 'block';
        document.getElementById('tabReports').style.background = 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%)';
        document.getElementById('tabReports').style.color = 'white';
    }
}

// === BARCODE SCANNER - TO'LIQ QAYTA YOZILGAN ===
let isScanning = false;

function startBarcodeScanner() {
    console.log('=== BARCODE SKANER BOSHLANDI ===');
    
    // 1. QuaggaJS borligini tekshirish
    if (typeof Quagga === 'undefined') {
        alert('❌ Xato: QuaggaJS kutubxonasi yuklanmagan!\n\nSahifani yangilang (F5 bosing)');
        return;
    }

    // 2. HTML elementlarni topish
    const modal = document.getElementById('barcodeScannerModal');
    const container = document.getElementById('cameraContainer');
    const status = document.getElementById('scannerStatus');
    const resultDiv = document.getElementById('scannerResult');
    
    if (!modal || !container || !status || !resultDiv) {
        alert('❌ Xato: Skaner elementlari topilmadi!');
        return;
    }
    
    // 3. Modalni ochish
    modal.classList.add('active');
    resultDiv.style.display = 'none';
    status.innerHTML = '📸 Kamera ishga tushirilmoqda...<br><small>Brauzerda "Allow" tugmasini bosing</small>';
    status.style.color = '#f59e0b';
    isScanning = true;

    // 4. Eski sessiyani to'xtatish
    try {
        Quagga.stop();
        Quagga.offDetected();
    } catch(e) {
        console.log('Eski sessiya yo\'q');
    }

    console.log('QuaggaJS ni ishga tushirish...');

    // 5. Quagga'ni ishga tushirish - ENG ODDIY SOZLAMALAR
    Quagga.init({
        inputStream: {
            type: "LiveStream",
            target: container,
            constraints: {
                width: 1280,
                height: 720,
                facingMode: "environment"
            }
        },
        decoder: {
            readers: [
                "ean_reader",
                "code_128_reader",
                "code_39_reader",
                "upc_reader"
            ]
        },
        locate: true
    }, function(err) {
        if (err) {
            console.error('XATO:', err);
            status.innerHTML = `❌ <strong>Kamera xatosi!</strong><br><br>${err.name}<br><small>${err.message}</small>`;
            status.style.color = '#ef4444';
            
            if (err.name === 'NotAllowedError') {
                alert('❌ Kamera ruxsati berilmadi!\n\nBrauzerni yopib, qaytadan oching va "Allow" bosing.');
            }
            return;
        }
        
        console.log('✅ Quagga muvaffaqiyatli boshlandi!');
        status.innerHTML = '📸 <strong>TAYYOR!</strong><br>Barcode ni kamera oldiga qo\'ying';
        status.style.color = '#10b981';
        
        // Quagga'ni start qilish
        Quagga.start();
        console.log('Quagga.start() chaqirildi');
    });

    // 6. Barcode topilganda
    let lastCode = '';
    let lastTime = 0;
    
    Quagga.onDetected(function(data) {
        if (!isScanning) return;
        
        const code = data.codeResult.code;
        const now = Date.now();
        
        console.log('🔍 TOPILDI:', code);
        
        // Faqat BIR XIL barcode'ni 2 soniya ichida qayta qabul qilmaslik
        // BOSHQA barcode'lar darhol qabul qilinadi!
        if (code === lastCode && (now - lastTime) < 2000) {
            console.log('⏩ Takroriy (bir xil barcode), o\'tkazildi');
            return;
        }
        
        // Yangi barcode yoki 2 soniyadan keyin
        lastCode = code;
        lastTime = now;
        
        console.log('✅ QABUL QILINDI:', code);
        
        // Ekranda ko'rsatish
        document.getElementById('scannedBarcode').textContent = code;
        resultDiv.style.display = 'block';
        status.innerHTML = '✅ <strong>TOPILDI!</strong><br>Keyingisini skanerlang';
        status.style.color = '#10b981';
        
        // Toast
        showToast('✅ ' + code, 'success');
        
        // Mahsulotni qidirish
        handleBarcodeInput(code);
        
        // 1.5 soniya keyin yashirish va davom etish
        setTimeout(() => {
            if (isScanning) {
                resultDiv.style.display = 'none';
                status.innerHTML = '📸 <strong>Keyingi barcode</strong>';
            }
        }, 1500);
    });
    
    console.log('onDetected listener qo\'shildi');
}

// Barcode kiritilganda ishlov berish (umumiy funksiya)
function handleBarcodeInput(code) {
    console.log('🔍 Barcode qidirilmoqda:', code);
    
    // LocalStorage dan eng yangi ma'lumotlarni olish
    loadMedicinesFromStorage();
    
    const product = availableMedicines.find(p => p.barcode === code);
    
    if (product) {
        console.log('✅ Mahsulot topildi:', product.name);
        
        if (product.stock === 0) {
            showToast('❌ Bu mahsulot qolmagan!', 'error');
        } else {
            // Qidiruv qutisiga barcode qo'yish va qidirish
            const searchBox = document.getElementById('productSearch');
            if (searchBox) {
                searchBox.value = code;
                searchProducts();
            }
            
            // Avtomatik savatchaga qo'shish
            setTimeout(() => {
                addToCart(product.id);
                showToast('✅ Savatchaga qo\'shildi: ' + product.name, 'success');
            }, 300);
        }
    } else {
        console.log('❌ Mahsulot topilmadi:', code);
        showToast('❌ Barcode topilmadi: ' + code, 'error');
    }
}

function stopBarcodeScanner() {
    console.log('🛑 Skaner to\'xtatilmoqda...');
    isScanning = false;
    scanAttempts = 0;
    
    const modal = document.getElementById('barcodeScannerModal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Quagga'ni to'liq to'xtatish
    if (typeof Quagga !== 'undefined') {
        try {
            Quagga.offDetected();
            Quagga.offProcessed();
            Quagga.stop();
            console.log("✅ Quagga to'xtatildi");
        } catch(e) {
            console.error('Quagga stop xatosi:', e);
        }
    }
}

// Barcode topilganda (eski funksiya, endi ishlatilmaydi)
function onBarcodeDetected(barcode) {
    // Bu funksiya endi ishlatilmaydi - Quagga.onDetected ishlatiladi
}


// Sahifa yuklanganda avtomatik dorilarni yuklash
window.addEventListener('DOMContentLoaded', function() {
    console.log('Kassir sahifasi yuklandi');
    loadMedicinesFromStorage();
    console.log('Dorilar LocalStorage dan yuklandi:', availableMedicines.length, 'ta');
});

// LocalStorage o'zgarishlarini tinglash (boshqa tab/oynalardan)
window.addEventListener('storage', function(e) {
    if (e.key === 'medcare_medicines') {
        console.log('Dorilar boshqa oynada o\'zgartirildi, qayta yuklash...');
        loadMedicinesFromStorage();
        loadProducts();
    }
});


// Barcode kiritilganda ishlov berish
function handleBarcodeInput(code) {
    console.log('🔍 Mahsulot qidirilmoqda:', code);
    
    // LocalStorage'dan eng yangi ma'lumotlarni olish
    loadMedicinesFromStorage();
    
    const product = availableMedicines.find(p => p.barcode === code);
    
    if (product) {
        console.log('✅ Mahsulot topildi:', product.name);
        
        if (product.stock === 0) {
            showToast('❌ Bu mahsulot qolmagan!', 'error');
        } else {
            // Qidiruv qutisiga qo'yish
            const searchBox = document.getElementById('productSearch');
            if (searchBox) {
                searchBox.value = code;
                searchProducts();
            }
            
            // Avtomatik savatchaga qo'shish
            setTimeout(() => {
                addToCart(product.id);
                showToast('✅ Qo\'shildi: ' + product.name, 'success');
            }, 300);
        }
    } else {
        console.log('❌ Mahsulot topilmadi:', code);
        showToast('❌ Barcode topilmadi: ' + code, 'error');
        
        // LocalStorage'dagi barcode'larni console'ga chiqarish (debug uchun)
        console.log('LocalStorage dagi barcode\'lar:', availableMedicines.map(m => `${m.barcode} - ${m.name}`));
    }
}
