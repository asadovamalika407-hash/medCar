#!/bin/bash
# Vercel Environment Variables Auto-Setup Script
# This script automatically configures all required environment variables

echo "🚀 MedCare Vercel Environment Setup"
echo "===================================="
echo ""

# MongoDB URI
echo "Setting up MONGODB_URI..."
vercel env add MONGODB_URI production <<EOF
mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.mongodb.net/medcare_clinic?retryWrites=true&w=majority
EOF

vercel env add MONGODB_URI preview <<EOF
mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.mongodb.net/medcare_clinic?retryWrites=true&w=majority
EOF

vercel env add MONGODB_URI development <<EOF
mongodb+srv://medcare_admin:HqvwsGtqri5HqI11@cluster0.mongodb.net/medcare_clinic?retryWrites=true&w=majority
EOF

echo "✅ MONGODB_URI configured for all environments"
echo ""

# JWT Secret
echo "Setting up JWT_SECRET..."
vercel env add JWT_SECRET production <<EOF
medcare_secret_key_2025
EOF

vercel env add JWT_SECRET preview <<EOF
medcare_secret_key_2025
EOF

vercel env add JWT_SECRET development <<EOF
medcare_secret_key_2025
EOF

echo "✅ JWT_SECRET configured for all environments"
echo ""

echo "🎉 All environment variables configured!"
echo "Now run: vercel --prod"
