# Design Document: Vercel Serverless Deployment

## Overview

This design document specifies the architecture and implementation approach for migrating the MedCare Clinic Management System backend from a traditional Express.js server to Vercel's serverless platform. The migration preserves all existing functionality while adapting the architecture to leverage serverless benefits including automatic scaling, zero infrastructure management, and pay-per-execution pricing.

The design maintains the existing Express.js application structure while wrapping it appropriately for Vercel's serverless runtime. This approach minimizes code changes to existing route handlers and middleware while ensuring optimal performance in a serverless context.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                       │
│                   (Global CDN & Routing)                     │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ├─── /api/* ──────────┐
                      │                      │
                      ├─── /pages/*         │
                      │                      │
                      └─── /css/*, /js/*    │
                                             ▼
              ┌────────────────────────────────────────┐
              │    Vercel Serverless Functions         │
              │    (Node.js Runtime)                   │
              │                                        │
              │  ┌──────────────────────────────┐     │
              │  │  Express App Wrapper         │     │
              │  │  - CORS Middleware           │     │
              │  │  - Body Parsers              │     │
              │  │  - MongoDB Connection        │     │
              │  │  - Route Registration        │     │
              │  │  - Error Handler             │     │
              │  └──────────────────────────────┘     │
              │                                        │
              │  ┌──────────────────────────────┐     │
              │  │  Route Modules               │     │
              │  │  - /auth                     │     │
              │  │  - /employees                │     │
              │  │  - /patients                 │     │
              │  │  - /doctors                  │     │
              │  │  - /attendance               │     │
              │  │  - /salary                   │     │
              │  │  - /leave                    │     │
              │  │  - /leave-requests           │     │
              │  │  - /room-bookings            │     │
              │  │  - /documents                │     │
              │  └──────────────────────────────┘     │
              └──────────────┬─────────────────────────┘
                             │
                             ▼
                  ┌──────────────────────┐
                  │   MongoDB Atlas      │
                  │   (Cloud Database)   │
                  │   - Connection Pool  │
                  │   - Global Cluster   │
                  └──────────────────────┘
```

### Serverless Function Model

Unlike traditional servers that run continuously, Vercel serverless functions are:
- **Stateless**: Each invocation is independent with no persistent state
- **Event-driven**: Triggered by HTTP requests
- **Auto-scaling**: Vercel automatically creates instances based on demand
- **Time-limited**: Functions have a maximum execution time (default 10s on Hobby, 60s on Pro)
- **Ephemeral**: Function instances may be destroyed after handling requests

### File Structure

The backend will be restructured to follow Vercel's conventions:

```
/
├── api/
│   └── index.js              # Main serverless function entry point
├── backend/
│   ├── routes/               # Existing route modules (unchanged)
│   │   ├── auth.js
│   │   ├── employees.js
│   │   ├── patients.js
│   │   ├── doctors.js
│   │   ├── attendance.js
│   │   ├── salary.js
│   │   ├── leave.js
│   │   ├── leaveRequests.js
│   │   ├── roomBookings.js
│   │   └── documents.js
│   ├── models/               # Mongoose models (unchanged)
│   │   ├── User.js
│   │   ├── Employee.js
│   │   ├── Attendance.js
│   │   ├── LeaveRequest.js
│   │   └── RoomBooking.js
│   ├── lib/                  # New utilities directory
│   │   └── mongodb.js        # MongoDB connection manager
│   ├── server.js             # Express app (modified for serverless)
│   └── package.json
├── vercel.json               # Vercel configuration
├── pages/                    # Frontend HTML files
├── css/                      # Stylesheets
└── js/                       # Frontend JavaScript
```

**Key Architectural Decision**: We use a single serverless function (`/api/index.js`) that wraps the entire Express app rather than creating separate serverless functions per route. This approach:
- Minimizes code changes to existing route handlers
- Preserves Express middleware execution order
- Simplifies MongoDB connection management
- Maintains route organization through Express routers
- Reduces cold start complexity

## Components and Interfaces

### 1. MongoDB Connection Manager (`backend/lib/mongodb.js`)

**Purpose**: Manages MongoDB connections in a serverless-friendly manner by implementing connection caching and reuse.

**Interface**:
```javascript
/**
 * Establishes and caches MongoDB connection
 * @returns {Promise<mongoose.Connection>} The MongoDB connection
 * @throws {Error} If connection fails
 */
async function connectToDatabase(): Promise<mongoose.Connection>
```

**Implementation Strategy**:
- Cache connection at module scope to reuse across warm invocations
- Implement lazy initialization (connect only when needed)
- Configure connection options for serverless environment:
  - `serverSelectionTimeoutMS: 5000` - Fail fast on connection issues
  - `socketTimeoutMS: 10000` - Prevent hanging connections
  - `maxPoolSize: 10` - Limit connection pool for single function instance
  - `minPoolSize: 1` - Maintain at least one connection when warm
- Check connection state before reusing cached connection
- Handle connection errors gracefully with detailed logging

**Module-Level Caching Pattern**:
```javascript
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection && cachedConnection.readyState === 1) {
    return cachedConnection; // Reuse existing connection
  }
  
  // Create new connection with serverless-optimized settings
  cachedConnection = await mongoose.connect(uri, options);
  return cachedConnection;
}
```

### 2. Express App Wrapper (`backend/server.js`)

**Purpose**: Configures and exports the Express application for use as a serverless function.

**Modifications from Original**:
1. **Conditional Server Startup**: Only call `app.listen()` when running locally
2. **Connection Management**: Replace direct `mongoose.connect()` with lazy connection manager
3. **Export Express App**: Export the configured Express app for Vercel's serverless runtime
4. **Environment Detection**: Use `require.main === module` to detect local vs serverless execution

**Interface**:
```javascript
// Exported for Vercel serverless function
module.exports = app;

// Local development server (conditionally executed)
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
```

**Middleware Stack** (order is critical):
1. **CORS**: Enable cross-origin requests from frontend
2. **Body Parsers**: `express.json()` and `express.urlencoded()` for request parsing
3. **Request Logging**: Log incoming requests in development mode
4. **Route Handlers**: All route modules registered with their prefixes
5. **Error Handler**: Catch-all error middleware at the end

### 3. Serverless Function Entry Point (`api/index.js`)

**Purpose**: Wraps the Express app to work with Vercel's serverless runtime.

**Interface**:
```javascript
/**
 * Serverless function handler
 * @param {VercelRequest} req - Incoming HTTP request
 * @param {VercelResponse} res - HTTP response object
 */
module.exports = async (req, res) => {
  // Ensure database connection before handling request
  await connectToDatabase();
  
  // Pass request to Express app
  return app(req, res);
};
```

**Responsibilities**:
- Import the configured Express app from `backend/server.js`
- Import the MongoDB connection manager
- Establish database connection before processing requests
- Delegate request handling to Express app
- Handle connection errors gracefully

**Connection Timing**: The connection is established before the Express app processes the request to ensure routes have database access. The connection manager's caching prevents reconnection on every request.

### 4. Route Modules (Unchanged)

**Existing Structure**: All route modules in `backend/routes/` remain unchanged. They continue to:
- Export Express Router instances
- Use async/await for database operations
- Return JSON responses
- Handle errors with try/catch blocks

**Example Route Module** (no changes required):
```javascript
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
```

### 5. Mongoose Models (Unchanged)

**Existing Structure**: All Mongoose models in `backend/models/` remain unchanged. They continue to:
- Define schemas with validation rules
- Implement pre-save hooks (e.g., password hashing)
- Provide instance methods (e.g., `comparePassword`)
- Export model constructors

**Model Registration**: Mongoose models are registered once when the module is first loaded. Subsequent invocations reuse the registered models from Mongoose's internal cache.

### 6. Deployment Configuration (`vercel.json`)

**Purpose**: Configures how Vercel builds and routes the application.

**Interface**:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/index.js"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "functions": {
    "api/index.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**Configuration Sections**:
1. **builds**: Specifies the serverless function to build using `@vercel/node` runtime
2. **routes**: Defines URL routing rules (API routes take precedence over static files)
3. **env**: Sets environment variables for all functions
4. **functions**: Configures memory and timeout limits per function

## Data Models

### MongoDB Connection State

The connection manager maintains the following state:

```javascript
{
  cachedConnection: mongoose.Connection | null,  // Cached connection instance
  connectionState: {
    readyState: 0 | 1 | 2 | 3,  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
    host: string,                // MongoDB host
    name: string,                // Database name
    models: object               // Registered Mongoose models
  }
}
```

### Environment Variables

Required environment variables that must be configured in Vercel:

```javascript
{
  MONGODB_URI: string,      // MongoDB Atlas connection string (required)
  JWT_SECRET: string,       // Secret key for JWT token signing (required)
  NODE_ENV: string,         // Environment: 'development' | 'production' (optional)
  PORT: number              // Port for local development (optional, default: 5000)
}
```

### Request/Response Flow

```
Client Request
    ↓
Vercel Edge Network
    ↓
Serverless Function Invocation (api/index.js)
    ↓
MongoDB Connection Check (cached or new)
    ↓
Express Middleware Pipeline
    ├─ CORS
    ├─ Body Parser
    ├─ Request Logger
    └─ Route Handler
        ↓
    Database Query (Mongoose)
        ↓
    JSON Response
        ↓
Client Response
```

## Error Handling

### Error Categories and Responses

1. **Database Connection Errors**
   - **Cause**: MongoDB connection fails or times out
   - **Response**: 503 Service Unavailable
   - **Message**: "Database connection failed"
   - **Logging**: Full error stack with connection details

2. **Authentication Errors**
   - **Cause**: Invalid or expired JWT token
   - **Response**: 401 Unauthorized
   - **Message**: "Invalid or expired token"
   - **Logging**: Token validation failure details

3. **Validation Errors**
   - **Cause**: Mongoose validation fails on save/update
   - **Response**: 400 Bad Request
   - **Message**: Specific validation error messages
   - **Logging**: Validation errors with field details

4. **Resource Not Found**
   - **Cause**: Queried document doesn't exist
   - **Response**: 404 Not Found
   - **Message**: "Resource not found"
   - **Logging**: Requested resource ID

5. **Server Errors**
   - **Cause**: Unexpected errors in route handlers
   - **Response**: 500 Internal Server Error
   - **Message**: "Server error"
   - **Logging**: Full error stack (development) or sanitized message (production)

6. **Timeout Errors**
   - **Cause**: Function execution exceeds time limit
   - **Response**: 504 Gateway Timeout
   - **Message**: "Request timeout"
   - **Logging**: Request duration and timeout threshold

### Error Handler Middleware

```javascript
app.use((err, req, res, next) => {
  // Log error with context
  console.error('[Error]', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    method: req.method,
    path: req.path,
    timestamp: new Date().toISOString()
  });

  // Determine status code
  const statusCode = err.statusCode || 500;
  
  // Send error response
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});
```

### MongoDB Connection Error Handling

```javascript
async function connectToDatabase() {
  try {
    if (cachedConnection && cachedConnection.readyState === 1) {
      return cachedConnection;
    }

    const startTime = Date.now();
    cachedConnection = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 10000,
      maxPoolSize: 10,
      minPoolSize: 1
    });
    
    const duration = Date.now() - startTime;
    console.log(`✅ MongoDB connected in ${duration}ms`);
    
    return cachedConnection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    throw new Error('Database connection failed');
  }
}
```

## Testing Strategy

This migration involves transforming the application's deployment architecture and infrastructure configuration rather than implementing new business logic or algorithms. The existing route handlers, models, and business logic remain unchanged.

### Testing Approach

Given that this is an **infrastructure transformation** (Express.js → Vercel serverless) rather than new feature development, the appropriate testing strategy focuses on:

1. **Integration Testing**
   - Test each API endpoint in the serverless environment
   - Verify all routes return expected responses
   - Confirm MongoDB connections work correctly
   - Validate authentication flow with JWT tokens
   - Test error handling across different scenarios

2. **Deployment Verification Testing**
   - Verify environment variables are correctly configured
   - Confirm static file serving works alongside API routes
   - Test CORS configuration with actual frontend
   - Validate function timeouts and memory limits
   - Check cold start performance

3. **Migration Validation Testing**
   - Compare responses between old Express server and new serverless deployment
   - Verify all existing route handlers work without modification
   - Confirm database queries execute correctly
   - Test concurrent request handling
   - Validate session/token persistence across invocations

### Why Property-Based Testing Is Not Applicable

Property-based testing (PBT) is designed for testing **pure functions and universal properties** across a wide input space. This migration does not involve:
- Pure functions with clear mathematical properties
- Algorithms requiring validation across random inputs
- Data transformations with invariants to verify
- Serialization/parsing logic requiring round-trip testing

Instead, this is about:
- Infrastructure configuration (Vercel deployment settings)
- Connection management (MongoDB pooling in serverless context)
- Ensuring existing code runs in a new runtime environment
- Deployment architecture and routing configuration

### Recommended Testing Tools

1. **Local Testing**: Use Vercel CLI (`vercel dev`) to test serverless functions locally
2. **Integration Tests**: Use Postman/Insomnia or automated test suites (Jest + Supertest)
3. **Manual Testing**: Test each endpoint after deployment to staging environment
4. **Monitoring**: Use Vercel's built-in function logs and analytics

### Test Coverage Priorities

**High Priority** (Must Test):
- All 10 API route modules respond correctly
- MongoDB connection establishment and reuse
- Authentication with JWT tokens
- Error responses for invalid requests

**Medium Priority** (Should Test):
- Cold start performance and timing
- Concurrent request handling
- Function memory usage
- Connection pool behavior

**Low Priority** (Nice to Have):
- Static file serving for frontend
- Root endpoint API documentation
- Request logging in production

### Testing Checklist

After deployment, verify:
- [ ] `/api/auth/login` accepts credentials and returns JWT token
- [ ] `/api/employees` returns employee list
- [ ] `/api/patients` returns patient list
- [ ] `/api/doctors` returns doctor list
- [ ] `/api/attendance` handles attendance records
- [ ] `/api/salary` processes salary data
- [ ] `/api/leave` and `/api/leave-requests` handle leave management
- [ ] `/api/room-bookings` manages room bookings
- [ ] `/api/documents` serves document endpoints
- [ ] MongoDB connection reuse works across warm invocations
- [ ] Error responses include appropriate status codes
- [ ] CORS headers allow frontend requests
- [ ] Authentication middleware blocks unauthorized requests
- [ ] Environment variables are read correctly from Vercel

## Performance Considerations

### Cold Start Optimization

**Cold Start Definition**: When a serverless function is invoked after being idle, Vercel must:
1. Download the function code
2. Initialize the Node.js runtime
3. Load all required modules
4. Execute module-level code
5. Handle the incoming request

**Optimization Strategies**:

1. **Lazy Database Connection**: Connect to MongoDB only when needed (not at module load time)
   ```javascript
   // GOOD: Lazy connection
   module.exports = async (req, res) => {
     await connectToDatabase();  // Connect when request arrives
     return app(req, res);
   };
   
   // BAD: Eager connection
   mongoose.connect(uri);  // Connects at module load, blocking cold start
   module.exports = app;
   ```

2. **Connection Caching**: Reuse connections across warm invocations
   ```javascript
   let cachedConnection = null;
   
   async function connectToDatabase() {
     if (cachedConnection?.readyState === 1) {
       return cachedConnection;  // Reuse cached connection
     }
     cachedConnection = await mongoose.connect(uri);
     return cachedConnection;
   }
   ```

3. **Minimize Dependencies**: Keep the function bundle size small
   - Use only necessary npm packages
   - Avoid importing large libraries at module scope
   - Consider lazy imports for rarely-used modules

4. **Fast Connection Settings**: Use aggressive timeouts to fail fast
   ```javascript
   {
     serverSelectionTimeoutMS: 5000,  // Fail after 5s if can't connect
     socketTimeoutMS: 10000,           // Close idle sockets after 10s
   }
   ```

### MongoDB Connection Pooling

**Challenge**: Traditional servers maintain long-lived connection pools. Serverless functions are ephemeral.

**Solution**: Configure MongoDB for serverless environment:

```javascript
const mongooseOptions = {
  maxPoolSize: 10,     // Max 10 connections per function instance
  minPoolSize: 1,      // Keep 1 connection alive when warm
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 10000,
  family: 4            // Use IPv4 (faster than IPv6 in some regions)
};
```

**Connection Lifecycle**:
1. **First Request (Cold Start)**: Create new connection (adds ~200-500ms)
2. **Subsequent Requests (Warm)**: Reuse cached connection (adds ~0-5ms)
3. **After Idle Period**: Function instance terminated, connection closed
4. **Next Request**: New cold start, new connection

**Monitoring**: Log connection timing to identify cold starts:
```javascript
const startTime = Date.now();
await connectToDatabase();
const duration = Date.now() - startTime;
console.log(`DB connection: ${duration}ms ${cachedConnection ? '(cached)' : '(new)'}`);
```

### Function Configuration

**Memory Allocation**: Set in `vercel.json`
```json
{
  "functions": {
    "api/index.js": {
      "memory": 1024,      // 1GB RAM (recommended for MongoDB operations)
      "maxDuration": 10    // 10s timeout (10s on Hobby, 60s on Pro)
    }
  }
}
```

**Memory Considerations**:
- 512MB: Minimal, may struggle with large database queries
- 1024MB: Recommended, good balance for typical operations
- 2048MB: High, use for complex queries or large data processing

**Timeout Considerations**:
- Hobby tier: 10s maximum (set `maxDuration: 10`)
- Pro tier: 60s maximum (can increase to `maxDuration: 60`)
- Most API operations should complete within 1-3 seconds

### Request Performance Targets

| Operation Type | Target Time | Notes |
|---------------|-------------|-------|
| Simple GET (cached connection) | < 100ms | Employee/patient list retrieval |
| POST/PUT/DELETE (cached) | < 200ms | Create/update/delete operations |
| Cold start + simple GET | < 1000ms | Initial request after idle |
| Complex query (cached) | < 500ms | Aggregations, joins |
| Authentication | < 150ms | Login with JWT generation |

### Scaling Behavior

**Automatic Scaling**: Vercel automatically creates function instances based on demand:
- 1-10 concurrent requests: 1-10 function instances
- Each instance handles one request at a time
- Instances may be reused (warm) or created new (cold)

**Connection Limits**: With 100 concurrent requests and 10 connections per instance:
- Worst case: 1000 MongoDB connections (100 instances × 10 connections)
- Typical case: Much lower due to warm instances and connection reuse

**MongoDB Atlas Limits**: Ensure your cluster can handle the connection load:
- M0 (Free): 500 connections
- M10+: 1500+ connections
- Monitor connection count in Atlas dashboard

## Implementation Notes

### Environment Variables in Vercel

Configure via Vercel Dashboard or CLI:

```bash
# Via Vercel CLI
vercel env add MONGODB_URI
vercel env add JWT_SECRET

# Via Vercel Dashboard
# Project Settings → Environment Variables
# Add: MONGODB_URI, JWT_SECRET, NODE_ENV
```

**Security**: Never commit `.env` files with production credentials to version control.

### Local Development

Run locally using Vercel CLI for accurate serverless simulation:

```bash
# Install Vercel CLI
npm i -g vercel

# Run local dev server
vercel dev

# Server runs on http://localhost:3000
# API accessible at http://localhost:3000/api/*
```

**Alternative**: Run the Express server directly (without serverless wrapper):
```bash
cd backend
node server.js  # Runs on http://localhost:5000
```

### Deployment Process

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Link Project**: `vercel link` (first time only)
3. **Set Environment Variables**: `vercel env add MONGODB_URI` and `vercel env add JWT_SECRET`
4. **Deploy**: `vercel --prod`
5. **Verify**: Test all endpoints on deployment URL

### Migration Checklist

- [ ] Create `backend/lib/mongodb.js` with connection manager
- [ ] Modify `backend/server.js` to use connection manager
- [ ] Create `api/index.js` as serverless entry point
- [ ] Create `vercel.json` with deployment configuration
- [ ] Set environment variables in Vercel dashboard
- [ ] Test locally with `vercel dev`
- [ ] Deploy to staging/preview environment
- [ ] Verify all API endpoints work correctly
- [ ] Check MongoDB connection behavior in logs
- [ ] Monitor cold start performance
- [ ] Deploy to production
- [ ] Update frontend API base URL if needed

### Troubleshooting Common Issues

1. **"Cannot find module" errors**: Check that all dependencies are in `package.json` and paths use relative imports correctly

2. **Database connection timeouts**: Increase `serverSelectionTimeoutMS` or check MongoDB Atlas network access settings (allow Vercel IPs)

3. **CORS errors**: Ensure CORS middleware is configured before route handlers and allows the frontend origin

4. **Function timeout**: Reduce `maxDuration` in `vercel.json` or optimize slow database queries

5. **Cold starts too slow**: Review dependency loading, consider lazy imports, check MongoDB connection time

### Post-Deployment Monitoring

Use Vercel's dashboard to monitor:
- Function invocation count
- Execution duration (p50, p95, p99)
- Error rate and error logs
- Cold start frequency
- Memory usage

Use MongoDB Atlas to monitor:
- Connection count over time
- Query performance
- Database operations per second
- Network throughput

## Conclusion

This design provides a comprehensive blueprint for migrating the MedCare backend to Vercel's serverless platform. The architecture maintains compatibility with existing code while optimizing for serverless execution patterns, particularly MongoDB connection management and cold start performance.

The migration strategy minimizes risk by:
- Keeping existing route handlers and models unchanged
- Using a single serverless function wrapper approach
- Implementing robust connection caching
- Providing clear testing and verification steps
- Including rollback paths (can revert to traditional Express server)

Next steps involve implementing the components specified in this design according to the task plan that will be created in Phase 3.
