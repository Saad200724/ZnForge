import { createSupabaseClient, connectMongoDB, DatabaseType, getActiveDatabaseType } from "../config/database";
import { UserModel, ContactSubmissionModel } from "../models/mongoose";

// Supabase table creation SQL
const SUPABASE_TABLES_SQL = `
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
`;

async function initSupabase() {
  const supabase = createSupabaseClient();
  if (!supabase) {
    throw new Error('Supabase client not available');
  }

  console.log('Initializing Supabase tables...');
  
  // Note: In production, you would run this SQL directly in Supabase dashboard
  // or use migrations. For development, you can use the SQL editor in Supabase.
  console.log('Please run the following SQL in your Supabase SQL editor:');
  console.log(SUPABASE_TABLES_SQL);
  
  return true;
}

async function initMongoDB() {
  const connection = await connectMongoDB();
  if (!connection) {
    throw new Error('MongoDB connection not available');
  }

  console.log('Initializing MongoDB collections...');
  
  try {
    // Create indexes for better performance
    await UserModel.createIndexes();
    await ContactSubmissionModel.createIndexes();
    
    console.log('MongoDB indexes created successfully');
    return true;
  } catch (error) {
    console.error('Error creating MongoDB indexes:', error);
    throw error;
  }
}

export async function initializeDatabase() {
  const dbType = getActiveDatabaseType();
  
  console.log(`Initializing database for type: ${dbType}`);
  
  try {
    switch (dbType) {
      case DatabaseType.SUPABASE:
        await initSupabase();
        break;
      
      case DatabaseType.MONGODB:
        await initMongoDB();
        break;
      
      case DatabaseType.MEMORY:
        console.log('Using in-memory storage - no initialization required');
        break;
      
      default:
        console.log('Unknown database type, using in-memory storage');
    }
    
    console.log('Database initialization completed');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Run initialization if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase()
    .then(() => {
      console.log('Database initialization completed successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database initialization failed:', error);
      process.exit(1);
    });
}