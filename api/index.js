/**
 * Vercel Serverless Function Entry Point
 * 
 * This file serves as the main entry point for the Vercel serverless function.
 * It wraps the Express app to work with Vercel's serverless runtime and manages
 * MongoDB connections in a serverless-friendly manner.
 * 
 * Architecture:
 * 1. Establish MongoDB connection (cached across warm invocations)
 * 2. Pass request to Express app for routing and processing
 * 3. Handle connection errors gracefully
 * 
 * Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 4.1, 4.6, 6.2, 8.1
 */

const app = require('../backend/server');
const { connectToDatabase } = require('../backend/lib/mongodb');

/**
 * Main serverless function handler with performance monitoring
 * 
 * This function is invoked by Vercel for each incoming HTTP request.
 * It ensures the database connection is established before processing
 * the request through the Express app, and logs performance metrics.
 * 
 * Flow:
 * 1. Start performance timer
 * 2. Check/establish MongoDB connection (uses cached connection if warm)
 * 3. Delegate request to Express app
 * 4. Express app processes through middleware stack and routes
 * 5. Log performance metrics
 * 6. Return response to client
 * 
 * @param {VercelRequest} req - Incoming HTTP request from Vercel
 * @param {VercelResponse} res - HTTP response object
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
  // Start performance timer
  const startTime = Date.now();
  const requestId = Math.random().toString(36).substring(7);
  
  console.log(`🔄 [${requestId}] Request started: ${req.method} ${req.url}`);
  
  try {
    // Track connection timing separately
    const connectionStart = Date.now();
    await connectToDatabase();
    const connectionDuration = Date.now() - connectionStart;
    
    // Log connection timing (helps identify cold starts)
    if (connectionDuration > 100) {
      console.log(`🔌 [${requestId}] MongoDB connection: ${connectionDuration}ms (cold start)`);
    } else {
      console.log(`✅ [${requestId}] MongoDB connection: ${connectionDuration}ms (warm/cached)`);
    }
    
    // Intercept response to log total duration
    const originalSend = res.send;
    const originalJson = res.json;
    
    const logAndSend = (data) => {
      const totalDuration = Date.now() - startTime;
      
      // Log performance metrics
      console.log(`📊 [${requestId}] Request completed:`, {
        method: req.method,
        path: req.url,
        statusCode: res.statusCode,
        connectionTime: connectionDuration,
        totalTime: totalDuration,
        timestamp: new Date().toISOString()
      });
      
      // Warn if request is slow (>5 seconds)
      if (totalDuration > 5000) {
        console.warn(`⚠️ [${requestId}] SLOW REQUEST DETECTED: ${totalDuration}ms (threshold: 5000ms)`);
      }
      
      return data;
    };
    
    // Override send methods to log performance
    res.send = function(data) {
      logAndSend(data);
      return originalSend.call(this, data);
    };
    
    res.json = function(data) {
      logAndSend(data);
      return originalJson.call(this, data);
    };
    
    // Pass the request to the Express app for routing and processing
    // The Express app has all middleware, routes, and error handlers configured
    return app(req, res);
  } catch (error) {
    const totalDuration = Date.now() - startTime;
    
    // Handle database connection failures
    console.error(`❌ [${requestId}] Serverless function error:`, {
      message: error.message,
      code: error.code,
      duration: totalDuration,
      timestamp: new Date().toISOString()
    });
    
    // Return 503 Service Unavailable for connection failures
    // This indicates the service is temporarily unavailable due to database issues
    return res.status(503).json({
      success: false,
      message: 'Service temporarily unavailable',
      error: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Database connection failed'
    });
  }
};
