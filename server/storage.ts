import { users, contactSubmissions, type User, type InsertUser, type ContactSubmission, type InsertContactSubmission } from "@shared/schema";
import { createSupabaseClient, connectMongoDB, DatabaseType, getActiveDatabaseType } from "./config/database";
import { 
  UserModel, 
  ContactSubmissionModel, 
  userDocumentToUser, 
  contactSubmissionDocumentToContactSubmission 
} from "./models/mongoose";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
}

// Memory Storage Implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private currentUserId: number;
  private currentContactId: number;

  constructor() {
    this.users = new Map();
    this.contactSubmissions = new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
}

// Supabase Storage Implementation
export class SupabaseStorage implements IStorage {
  private supabase;

  constructor() {
    this.supabase = createSupabaseClient();
    if (!this.supabase) {
      throw new Error('Supabase client could not be initialized');
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();
    
    if (error || !data) return undefined;
    return data as User;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert(insertUser)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data as User;
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const { data, error } = await this.supabase
      .from('contact_submissions')
      .insert(insertSubmission)
      .select()
      .single();
    
    if (error) throw new Error(`Failed to create contact submission: ${error.message}`);
    return data as ContactSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    const { data, error } = await this.supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw new Error(`Failed to get contact submissions: ${error.message}`);
    return (data || []) as ContactSubmission[];
  }
}

// MongoDB Storage Implementation
export class MongoStorage implements IStorage {
  private isConnected: boolean = false;

  constructor() {
    this.initConnection();
  }

  private async initConnection() {
    const connection = await connectMongoDB();
    this.isConnected = !!connection;
    if (!this.isConnected) {
      throw new Error('MongoDB connection could not be established');
    }
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      await this.initConnection();
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    await this.ensureConnection();
    
    try {
      const doc = await UserModel.findOne({ 
        $or: [
          { _id: id },
          { _id: id.toString() }
        ]
      });
      return doc ? userDocumentToUser(doc) : undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await this.ensureConnection();
    
    try {
      const doc = await UserModel.findOne({ username });
      return doc ? userDocumentToUser(doc) : undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.ensureConnection();
    
    try {
      const doc = await UserModel.create(insertUser);
      return userDocumentToUser(doc);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    await this.ensureConnection();
    
    try {
      const doc = await ContactSubmissionModel.create(insertSubmission);
      return contactSubmissionDocumentToContactSubmission(doc);
    } catch (error) {
      throw new Error(`Failed to create contact submission: ${error}`);
    }
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    await this.ensureConnection();
    
    try {
      const docs = await ContactSubmissionModel.find()
        .sort({ createdAt: -1 });
      return docs.map(contactSubmissionDocumentToContactSubmission);
    } catch (error) {
      throw new Error(`Failed to get contact submissions: ${error}`);
    }
  }
}

// Storage Factory
function createStorage(): IStorage {
  const dbType = getActiveDatabaseType();
  
  console.log(`Initializing storage with database type: ${dbType}`);
  
  switch (dbType) {
    case DatabaseType.SUPABASE:
      try {
        return new SupabaseStorage();
      } catch (error) {
        console.warn('Failed to initialize Supabase storage, falling back to memory:', error);
        return new MemStorage();
      }
    
    case DatabaseType.MONGODB:
      try {
        return new MongoStorage();
      } catch (error) {
        console.warn('Failed to initialize MongoDB storage, falling back to memory:', error);
        return new MemStorage();
      }
    
    default:
      return new MemStorage();
  }
}

export const storage = createStorage();
