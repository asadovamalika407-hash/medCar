# MedCare Clinic - Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account**: Create account at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally with `npm i -g vercel`
3. **MongoDB Atlas**: Database cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
4. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket

---

## 🔐 Environment Variables

The following environment variables are **required** for deployment:

### 1. MONGODB_URI
**Description**: MongoDB Atlas connection string  
**Required**: ✅ Yes  
**Example**:
```
mongodb+srv://username:password@cluster.mongodb.net/medcare_clinic?retryWrites=true&w=majority
```

**How to get**:
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<database>` with `medcare_clinic`

### 2. JWT_SECRET
**Description**: Secret key for JWT token signing  
**Required**: ✅ Yes  
**Example**:
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

**How to generate**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. NODE_ENV (Optional)
**Description**: Node environment  
**Required**: ❌ No (Vercel sets this automatically to 'production')  
**Default**: `production`

### 4. PORT (Optional)
**Description**: Port for local development  
**Required**: ❌ No (only used locally)  
**Default**: `5000`

---

## 🚀 Deployment Steps

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push Code to Git
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

#### Step 2: Import Project to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Project"
3. Select your Git repository
4. Vercel will auto-detect the framework settings

#### Step 3: Configure Environment Variables
1. In project settings, go to "Environment Variables"
2. Add the following variables:
   - **Name**: `MONGODB_URI`  
     **Value**: Your MongoDB connection string
   - **Name**: `JWT_SECRET`  
     **Value**: Your generated JWT secret

3. Select environments: `Production`, `Preview`, `Development`
4. Click "Save"

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for build to complete (~2-3 minutes)
3. Your API will be available at: `https://your-project.vercel.app/api/*`

---

### Method 2: Deploy via Vercel CLI

#### Step 1: Login to Vercel
```bash
vercel login
```

#### Step 2: Link Project (First Time Only)
```bash
vercel link
```

#### Step 3: Add Environment Variables
```bash
# Add MONGODB_URI
vercel env add MONGODB_URI

# When prompted, paste your MongoDB connection string
# Select: Production, Preview, Development (press Space to select, Enter to confirm)

# Add JWT_SECRET
vercel env add JWT_SECRET

# When prompted, paste your generated JWT secret
# Select: Production, Preview, Development
```

#### Step 4: Deploy to Production
```bash
vercel --prod
```

#### Step 5: Get Deployment URL
After deployment completes, Vercel will provide:
- **Production URL**: `https://your-project.vercel.app`
- **API Base URL**: `https://your-project.vercel.app/api`

---

## 🧪 Testing Deployment

### Test API Root Endpoint
```bash
curl https://your-project.vercel.app/api
```

**Expected Response**:
```json
{
  "message": "MedCare Clinic API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "auth": "/api/auth",
    "employees": "/api/employees",
    "patients": "/api/patients",
    "doctors": "/api/doctors",
    ...
  }
}
```

### Test Authentication
```bash
curl -X POST https://your-project.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### Test Other Endpoints
```bash
# Get all employees
curl https://your-project.vercel.app/api/employees

# Get all patients
curl https://your-project.vercel.app/api/patients

# Get all doctors
curl https://your-project.vercel.app/api/doctors
```

---

## 🔍 Monitoring & Debugging

### View Function Logs
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click "Functions" tab
4. Click on `api/index.js`
5. View real-time logs and invocation history

### Monitor Performance
- **Cold Start Times**: Check logs for "cold start" messages
- **Connection Timing**: Look for MongoDB connection duration logs
- **Error Rate**: Monitor 5xx errors in the dashboard
- **Invocation Count**: Track request volume

### Common Issues

#### 1. "Database connection failed"
- **Cause**: MongoDB URI incorrect or network access not configured
- **Solution**:
  - Verify MONGODB_URI in Vercel environment variables
  - Check MongoDB Atlas Network Access: add `0.0.0.0/0` to allow all IPs

#### 2. "Service temporarily unavailable"
- **Cause**: MongoDB connection timeout
- **Solution**:
  - Check MongoDB cluster status
  - Verify connection string format
  - Ensure cluster is not paused

#### 3. "Invalid or expired token"
- **Cause**: JWT_SECRET mismatch
- **Solution**:
  - Verify JWT_SECRET is set in Vercel environment variables
  - Redeploy after updating environment variables

#### 4. CORS Errors
- **Cause**: Frontend origin not allowed
- **Solution**:
  - Check `vercel.json` CORS headers configuration
  - Verify Access-Control-Allow-Origin header

---

## 🔄 Updating Deployment

### Update Code
```bash
git add .
git commit -m "Update feature"
git push origin main
```

Vercel will automatically trigger a new deployment.

### Update Environment Variables
Via Dashboard:
1. Go to Project Settings → Environment Variables
2. Edit the variable
3. Redeploy for changes to take effect

Via CLI:
```bash
vercel env rm MONGODB_URI production
vercel env add MONGODB_URI production
```

### Rollback to Previous Deployment
1. Go to Deployments tab
2. Find the working deployment
3. Click "..." → "Promote to Production"

---

## 📊 Performance Optimization

### Cold Start Optimization
- Current configuration: 1024MB memory, 10s timeout
- Connection caching reduces warm invocation time to ~5-50ms
- Cold starts typically take 500ms-2s

### Scaling Considerations
- Vercel automatically scales based on demand
- Each function invocation gets its own instance
- MongoDB connection pool: 10 connections per instance
- Monitor concurrent invocations to avoid connection exhaustion

### Recommended MongoDB Atlas Tier
- **Development**: M0 (Free) - 500 connections
- **Production**: M10+ - 1500+ connections

---

## 🔒 Security Best Practices

1. **Never commit `.env` files** - Use `.gitignore`
2. **Use strong JWT secrets** - Generate with crypto.randomBytes
3. **Rotate secrets regularly** - Update JWT_SECRET every 3-6 months
4. **Monitor API usage** - Set up alerts for unusual activity
5. **Use MongoDB IP whitelist** - Add only Vercel IPs if possible
6. **Enable MongoDB authentication** - Use strong database passwords

---

## 📞 Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Project Issues**: Check Vercel function logs

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created and running
- [ ] MONGODB_URI environment variable set in Vercel
- [ ] JWT_SECRET environment variable set in Vercel
- [ ] Code pushed to Git repository
- [ ] Project imported/linked to Vercel
- [ ] Deployment successful (check dashboard)
- [ ] API root endpoint returns expected response
- [ ] Authentication endpoint works (returns JWT token)
- [ ] All route endpoints accessible
- [ ] MongoDB connection reuse verified in logs
- [ ] Error responses include appropriate status codes
- [ ] CORS headers allow frontend requests
- [ ] Function logs show no errors
- [ ] Cold start performance acceptable (<2s)

---

© 2025 MedCare Clinic - Vercel Deployment Guide
