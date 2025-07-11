import mongoose, { Schema, Document } from 'mongoose';
import { User, ContactSubmission } from '@shared/schema';

// MongoDB User Model
export interface UserDocument extends Document, Omit<User, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const UserSchema = new Schema<UserDocument>({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

// MongoDB Contact Submission Model
export interface ContactSubmissionDocument extends Document, Omit<ContactSubmission, 'id' | 'createdAt'> {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ContactSubmissionSchema = new Schema<ContactSubmissionDocument>({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  service: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true
});

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
export const ContactSubmissionModel = mongoose.model<ContactSubmissionDocument>('ContactSubmission', ContactSubmissionSchema);

// Helper functions to convert between MongoDB documents and app types
export function userDocumentToUser(doc: UserDocument): User {
  return {
    id: parseInt(doc._id.toString().slice(-8), 16), // Convert ObjectId to numeric ID
    username: doc.username,
    password: doc.password
  };
}

export function contactSubmissionDocumentToContactSubmission(doc: ContactSubmissionDocument): ContactSubmission {
  return {
    id: parseInt(doc._id.toString().slice(-8), 16), // Convert ObjectId to numeric ID
    name: doc.name,
    email: doc.email,
    service: doc.service,
    message: doc.message,
    createdAt: doc.createdAt
  };
}