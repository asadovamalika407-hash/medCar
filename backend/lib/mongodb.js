/**
 * MongoDB Connection Manager for Serverless Environment
 * 
 * This module manages MongoDB connections in a serverless-friendly manner
 * by implementing connection caching and reuse across warm function invocations.
 * 
 * Features:
 * - Connection caching at module scope
 * - Serverless-optimized connection options (timeouts, pool sizes)
 * - Connection state checking before reusing cached connections
 * - Detailed error handling and logging
 * - Performance monitoring for cold starts
 * 
 * Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 8.2
 */

const mongoose = require('mongoose');

/**
 * Cached MongoDB connection instance
 * Stored at module scope to persist across warm serverless function invocations
 * @type {mongoose.Connection | null}
 */
let cachedConnection = null;

/**
 * Serverless-optimized MongoDB connection options
 * 
 * These settings are tuned for ephemeral serverless functions:
 * - serverSelectionTimeoutMS: Fail fast (5s) if MongoDB is unreachable
 * - socketTimeoutMS: Close idle sockets after 10s to prevent hanging connections
 * - maxPoolSize: Limit to 10 connections per function instance
 * - minPoolSize: Maintain at least 1 connection when warm for faster subsequent requests
 * - family: Use IPv4 for faster DNS resolution in some regions
 */
const connectionOptions = {
  serverSelectionTimeoutMS: 5000,  // 5 seconds - fail fast on connection issues
  socketTimeoutMS: 10000,           // 10 seconds - prevent hanging connections
  maxPoolSize: 10,                  // Max 10 connections per function instance
  minPoolSize: 1,                   // Keep 1 connection alive when warm
  family: 4                         // Use IPv4 (faster than IPv6 in some regions)
};

/**
 * Establishes and caches MongoDB connection for serverless environment
 * 
 * This function implements the following strategy:
 * 1. Check if a cached connection exists and is in a healthy state
 * 2. If yes, reuse the cached connection (warm invocation - fast)
 * 3. If no, create a new connection with serverless-optimized settings (cold start - slower)
 * 4. Cache the new connection for future invocations
 * 5. Log connection timing for performance monitoring
 * 
 * Connection States (mongoose.connection.readyState):
 * - 0: disconnected
 * - 1: connected
 * - 2: connecting
 * - 3: disconnecting
 * 
 * @returns {Promise<mongoose.Connection>} The MongoDB connection instance
 * @throws {Error} If connection fails or MONGODB_URI is not configured
 */
async function connectToDatabase() {
  // Check if we have a valid cached connection
  if (cachedConnection) {
    const readyState = cachedConnection.readyState;
    
    // readyState === 1 means connected and ready
    if (readyState === 1) {
      console.log('✅ Using cached MongoDB connection (warm invocation)');
      return cachedConnection;
    }
    
    // readyState === 2 means connection is in progress
    if (readyState === 2) {
      console.log('⏳ MongoDB connection in progress, waiting...');
      // Wait for the connection to complete
      await new Promise((resolve) => {
        cachedConnection.once('connected', resolve);
      });
      return cachedConnection;
    }
    
    // For other states (0: disconnected, 3: disconnecting), we'll create a new connection
    console.log(`⚠️ Cached connection in invalid state (${readyState}), reconnecting...`);
    cachedConnection = null;
  }

  // Validate environment variable
  if (!process.env.MONGODB_URI) {
    const error = new Error('MONGODB_URI environment variable is not configured');
    console.error('❌ Configuration error:', error.message);
    throw error;
  }

  try {
    // Track connection timing for performance monitoring
    const startTime = Date.now();
    
    console.log('🔄 Establishing new MongoDB connection (cold start)...');
    
    // Create new connection with serverless-optimized options
    await mongoose.connect(process.env.MONGODB_URI, connectionOptions);
    
    // Cache the connection for future invocations
    cachedConnection = mongoose.connection;
    
    // Calculate and log connection duration
    const duration = Date.now() - startTime;
    console.log(`✅ MongoDB connected successfully in ${duration}ms (cold start)`);
    
    // Log warning if cold start is slow
    if (duration > 1000) {
      console.warn(`⚠️ Slow cold start detected: ${duration}ms (threshold: 1000ms)`);
    }
    
    // Log connection details (helpful for debugging)
    console.log('📊 Connection details:', {
      host: cachedConnection.host,
      name: cachedConnection.name,
      readyState: cachedConnection.readyState,
      poolSize: connectionOptions.maxPoolSize
    });
    
    return cachedConnection;
  } catch (error) {
    // Log detailed error information for troubleshooting
    console.error('❌ MongoDB connection failed:', {
      message: error.message,
      code: error.code,
      name: error.name,
      uri: process.env.MONGODB_URI ? 'configured' : 'missing'
    });
    
    // Clear cached connection on failure
    cachedConnection = null;
    
    // Throw a user-friendly error
    const connectionError = new Error('Database connection failed');
    connectionError.statusCode = 503; // Service Unavailable
    connectionError.originalError = error;
    throw connectionError;
  }
}

/**
 * Get the current connection state
 * Useful for debugging and monitoring
 * 
 * @returns {Object} Connection state information
 */
function getConnectionState() {
  if (!cachedConnection) {
    return {
      connected: false,
      readyState: 0,
      message: 'No cached connection'
    };
  }

  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    connected: cachedConnection.readyState === 1,
    readyState: cachedConnection.readyState,
    readyStateText: states[cachedConnection.readyState],
    host: cachedConnection.host,
    name: cachedConnection.name
  };
}

/**
 * Close the cached connection
 * Useful for cleanup in testing or graceful shutdown
 * 
 * @returns {Promise<void>}
 */
async function closeConnection() {
  if (cachedConnection && cachedConnection.readyState !== 0) {
    console.log('🔌 Closing MongoDB connection...');
    await cachedConnection.close();
    cachedConnection = null;
    console.log('✅ MongoDB connection closed');
  }
}

// Export the connection manager functions
module.exports = {
  connectToDatabase,
  getConnectionState,
  closeConnection
};
