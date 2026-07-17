# Vercel Environment Variables o'rnatish script

Write-Host "🚀 MedCare - Vercel Environment Variables" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# MongoDB URI
Write-Host "1️⃣  MONGODB_URI ni qo'shish..." -ForegroundColor Yellow
$mongoUri = "mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.mongodb.net/medcare_clinic?retryWrites=true&w=majority"
$mongoUri | vercel env add MONGODB_URI production --force 2>&1 | Out-Null

Write-Host "2️⃣  JWT_SECRET ni qo'shish..." -ForegroundColor Yellow
$jwtSecret = "medcare_secret_key_2025"
$jwtSecret | vercel env add JWT_SECRET production --force 2>&1 | Out-Null

Write-Host "3️⃣  NODE_ENV ni qo'shish..." -ForegroundColor Yellow
$nodeEnv = "production"
$nodeEnv | vercel env add NODE_ENV production --force 2>&1 | Out-Null

Write-Host ""
Write-Host "✅ Environment variables qo'shildi!" -ForegroundColor Green
Write-Host ""
Write-Host "Endi deploy qilish uchun:" -ForegroundColor Cyan
Write-Host "  vercel --prod" -ForegroundColor White
