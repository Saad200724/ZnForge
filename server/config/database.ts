import { createClient } from '@supabase/supabase-js';
import mongoose from 'mongoose';

// Supabase configuration
export function createSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials not found. Supabase features will be disabled.');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseAnonKey);
}

// MongoDB configuration
export async function connectMongoDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  
  if (!mongoUri) {
    console.warn('MongoDB URI not found. MongoDB features will be disabled.');
    return null;
  }
  
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null;
  }
}

// Database type enum
export enum DatabaseType {
  MEMORY = 'memory',
  SUPABASE = 'supabase',
  MONGODB = 'mongodb'
}

// Get active database type based on environment variables
export function getActiveDatabaseType(): DatabaseType {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    return DatabaseType.SUPABASE;
  }
  
  if (process.env.MONGODB_URI || process.env.DATABASE_URL) {
    return DatabaseType.MONGODB;
  }
  
  return DatabaseType.MEMORY;
}