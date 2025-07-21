import mongoose from 'mongoose';
import type { User, InsertUser, ContactSubmission, InsertContactSubmission, Service, InsertService, TeamMember, InsertTeamMember, PortfolioProject, InsertPortfolioProject } from "@shared/schema";
import { connectToDatabase, UserModel, ContactSubmissionModel, ServiceModel, TeamMemberModel, PortfolioProjectModel } from './db';

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Services management
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<boolean>;
  
  // Team members management
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(member: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: number): Promise<boolean>;
  
  // Portfolio projects management
  getPortfolioProjects(): Promise<PortfolioProject[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject>;
  deletePortfolioProject(id: number): Promise<boolean>;
}

// Memory Storage Implementation (fallback)
export class MemStorage implements IStorage {
  private users: Map<number, User> = new Map();
  private contactSubmissions: Map<number, ContactSubmission> = new Map();
  private services: Map<number, Service> = new Map();
  private teamMembers: Map<number, TeamMember> = new Map();
  private portfolioProjects: Map<number, PortfolioProject> = new Map();
  private currentUserId = 1;
  private currentContactId = 1;
  private currentServiceId = 1;
  private currentTeamId = 1;
  private currentPortfolioId = 1;

  constructor() {
    // Initialize with default data
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Default services
    const defaultServices: Service[] = [
      {
        id: 1,
        title: "Full-Stack Development",
        description: "Complete web applications built with modern technologies",
        icon: "Code",
        features: ["React/Vue/Angular", "Node.js/Python/PHP", "Database Design", "API Development"],
        price: "Starting at $2,999",
        isActive: true,
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: "VPS Hosting",
        description: "Reliable and scalable cloud hosting solutions",
        icon: "Server",
        features: ["99.9% Uptime", "SSL Certificates", "Daily Backups", "24/7 Support"],
        price: "Starting at $29/month",
        isActive: true,
        order: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        title: "SEO Optimization",
        description: "Boost your online visibility and search rankings",
        icon: "Search",
        features: ["Keyword Research", "On-page SEO", "Technical SEO", "Performance Optimization"],
        price: "Starting at $499/month",
        isActive: true,
        order: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    defaultServices.forEach(service => {
      this.services.set(service.id, service);
      this.currentServiceId = Math.max(this.currentServiceId, service.id + 1);
    });

    // Default team members
    const defaultTeam: TeamMember[] = [
      {
        id: 1,
        name: "Alex Johnson",
        position: "Full-Stack Developer",
        bio: "Passionate developer with 5+ years of experience in modern web technologies.",
        image: "",
        skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
        social: { github: "alexj", linkedin: "alex-johnson" },
        isActive: true,
        order: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        name: "Sarah Chen",
        position: "UI/UX Designer",
        bio: "Creative designer focused on user-centered design and modern interfaces.",
        image: "",
        skills: ["Figma", "Adobe Creative Suite", "User Research", "Prototyping"],
        social: { dribbble: "sarahc", linkedin: "sarah-chen" },
        isActive: true,
        order: 2,
        createdAt: new Date()
      }
    ];

    defaultTeam.forEach(member => {
      this.teamMembers.set(member.id, member);
      this.currentTeamId = Math.max(this.currentTeamId, member.id + 1);
    });

    // Default portfolio projects
    const defaultProjects: PortfolioProject[] = [
      {
        id: 1,
        title: "E-Commerce Platform",
        description: "Modern e-commerce solution with real-time inventory management",
        image: "",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "https://example-ecommerce.com",
        githubUrl: "https://github.com/znforge/ecommerce",
        category: "Web Development",
        isFeatured: true,
        isActive: true,
        order: 1,
        createdAt: new Date()
      },
      {
        id: 2,
        title: "Task Management App",
        description: "Collaborative task management tool with real-time updates",
        image: "",
        technologies: ["Vue.js", "Express", "Socket.io", "PostgreSQL"],
        liveUrl: "https://example-tasks.com",
        githubUrl: "https://github.com/znforge/task-manager",
        category: "Web Application",
        isFeatured: false,
        isActive: true,
        order: 2,
        createdAt: new Date()
      }
    ];

    defaultProjects.forEach(project => {
      this.portfolioProjects.set(project.id, project);
      this.currentPortfolioId = Math.max(this.currentPortfolioId, project.id + 1);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact methods
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

  // Service methods
  async getServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.isActive).sort((a, b) => a.order - b.order);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.currentServiceId++;
    const newService: Service = {
      ...service,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) throw new Error('Service not found');
    
    const updated: Service = {
      ...existing,
      ...service,
      updatedAt: new Date()
    };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: number): Promise<boolean> {
    return this.services.delete(id);
  }

  // Team member methods
  async getTeamMembers(): Promise<TeamMember[]> {
    return Array.from(this.teamMembers.values()).filter(m => m.isActive).sort((a, b) => a.order - b.order);
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    const id = this.currentTeamId++;
    const newMember: TeamMember = {
      ...member,
      id,
      createdAt: new Date()
    };
    this.teamMembers.set(id, newMember);
    return newMember;
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    const existing = this.teamMembers.get(id);
    if (!existing) throw new Error('Team member not found');
    
    const updated: TeamMember = {
      ...existing,
      ...member
    };
    this.teamMembers.set(id, updated);
    return updated;
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    return this.teamMembers.delete(id);
  }

  // Portfolio methods
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    return Array.from(this.portfolioProjects.values()).filter(p => p.isActive).sort((a, b) => a.order - b.order);
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const id = this.currentPortfolioId++;
    const newProject: PortfolioProject = {
      ...project,
      id,
      createdAt: new Date()
    };
    this.portfolioProjects.set(id, newProject);
    return newProject;
  }

  async updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject> {
    const existing = this.portfolioProjects.get(id);
    if (!existing) throw new Error('Portfolio project not found');
    
    const updated: PortfolioProject = {
      ...existing,
      ...project
    };
    this.portfolioProjects.set(id, updated);
    return updated;
  }

  async deletePortfolioProject(id: number): Promise<boolean> {
    return this.portfolioProjects.delete(id);
  }
}

// MongoDB Storage Implementation
export class MongoStorage implements IStorage {
  private isConnected = false;

  constructor() {
    this.initConnection();
  }

  private async initConnection() {
    try {
      await connectToDatabase();
      this.isConnected = true;
      console.log('MongoDB storage initialized successfully');
    } catch (error) {
      console.error('MongoDB connection failed:', error);
      throw new Error('MongoDB connection could not be established');
    }
  }

  private async ensureConnection() {
    if (!this.isConnected) {
      await this.initConnection();
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    await this.ensureConnection();
    try {
      const doc = await UserModel.findById(id);
      return doc ? { id: doc._id.toString(), username: doc.username, password: doc.password } : undefined;
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    await this.ensureConnection();
    try {
      const doc = await UserModel.findOne({ username });
      return doc ? { id: doc._id.toString(), username: doc.username, password: doc.password } : undefined;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    await this.ensureConnection();
    try {
      const doc = await UserModel.create(insertUser);
      return { id: doc._id.toString(), username: doc.username, password: doc.password };
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  // Contact methods
  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    await this.ensureConnection();
    try {
      const doc = await ContactSubmissionModel.create(insertSubmission);
      return {
        id: parseInt(doc._id.toString()),
        name: doc.name,
        email: doc.email,
        service: doc.service,
        message: doc.message,
        createdAt: doc.createdAt
      };
    } catch (error) {
      throw new Error(`Failed to create contact submission: ${error}`);
    }
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    await this.ensureConnection();
    try {
      const docs = await ContactSubmissionModel.find().sort({ createdAt: -1 });
      return docs.map(doc => ({
        id: parseInt(doc._id.toString()),
        name: doc.name,
        email: doc.email,
        service: doc.service,
        message: doc.message,
        createdAt: doc.createdAt
      }));
    } catch (error) {
      throw new Error(`Failed to get contact submissions: ${error}`);
    }
  }

  // Service methods
  async getServices(): Promise<Service[]> {
    await this.ensureConnection();
    try {
      const docs = await ServiceModel.find({ isActive: true }).sort({ order: 1 });
      return docs.map(doc => ({
        id: parseInt(doc._id.toString()),
        title: doc.title,
        description: doc.description,
        icon: doc.icon,
        features: doc.features,
        price: doc.price,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      }));
    } catch (error) {
      throw new Error(`Failed to get services: ${error}`);
    }
  }

  async createService(service: InsertService): Promise<Service> {
    await this.ensureConnection();
    try {
      const doc = await ServiceModel.create(service);
      return {
        id: parseInt(doc._id.toString()),
        title: doc.title,
        description: doc.description,
        icon: doc.icon,
        features: doc.features,
        price: doc.price,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      };
    } catch (error) {
      throw new Error(`Failed to create service: ${error}`);
    }
  }

  async updateService(id: number, service: Partial<InsertService>): Promise<Service> {
    await this.ensureConnection();
    try {
      const doc = await ServiceModel.findByIdAndUpdate(id, service, { new: true });
      if (!doc) throw new Error('Service not found');
      
      return {
        id: parseInt(doc._id.toString()),
        title: doc.title,
        description: doc.description,
        icon: doc.icon,
        features: doc.features,
        price: doc.price,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt,
        updatedAt: doc.updatedAt
      };
    } catch (error) {
      throw new Error(`Failed to update service: ${error}`);
    }
  }

  async deleteService(id: number): Promise<boolean> {
    await this.ensureConnection();
    try {
      const result = await ServiceModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting service:', error);
      return false;
    }
  }

  // Team member methods (similar pattern)
  async getTeamMembers(): Promise<TeamMember[]> {
    await this.ensureConnection();
    try {
      const docs = await TeamMemberModel.find({ isActive: true }).sort({ order: 1 });
      return docs.map(doc => ({
        id: parseInt(doc._id.toString()),
        name: doc.name,
        position: doc.position,
        bio: doc.bio,
        image: doc.image,
        skills: doc.skills,
        social: doc.social,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt
      }));
    } catch (error) {
      throw new Error(`Failed to get team members: ${error}`);
    }
  }

  async createTeamMember(member: InsertTeamMember): Promise<TeamMember> {
    await this.ensureConnection();
    try {
      const doc = await TeamMemberModel.create(member);
      return {
        id: parseInt(doc._id.toString()),
        name: doc.name,
        position: doc.position,
        bio: doc.bio,
        image: doc.image,
        skills: doc.skills,
        social: doc.social,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt
      };
    } catch (error) {
      throw new Error(`Failed to create team member: ${error}`);
    }
  }

  async updateTeamMember(id: number, member: Partial<InsertTeamMember>): Promise<TeamMember> {
    await this.ensureConnection();
    try {
      const doc = await TeamMemberModel.findByIdAndUpdate(id, member, { new: true });
      if (!doc) throw new Error('Team member not found');
      
      return {
        id: parseInt(doc._id.toString()),
        name: doc.name,
        position: doc.position,
        bio: doc.bio,
        image: doc.image,
        skills: doc.skills,
        social: doc.social,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt
      };
    } catch (error) {
      throw new Error(`Failed to update team member: ${error}`);
    }
  }

  async deleteTeamMember(id: number): Promise<boolean> {
    await this.ensureConnection();
    try {
      const result = await TeamMemberModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting team member:', error);
      return false;
    }
  }

  // Portfolio project methods
  async getPortfolioProjects(): Promise<PortfolioProject[]> {
    await this.ensureConnection();
    try {
      const docs = await PortfolioProjectModel.find({ isActive: true }).sort({ order: 1 });
      return docs.map(doc => ({
        id: parseInt(doc._id.toString()),
        title: doc.title,
        description: doc.description,
        image: doc.image,
        technologies: doc.technologies,
        liveUrl: doc.liveUrl,
        githubUrl: doc.githubUrl,
        category: doc.category,
        isFeatured: doc.isFeatured,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt
      }));
    } catch (error) {
      throw new Error(`Failed to get portfolio projects: ${error}`);
    }
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    await this.ensureConnection();
    try {
      const doc = await PortfolioProjectModel.create(project);
      return {
        id: parseInt(doc._id.toString()),
        title: doc.title,
        description: doc.description,
        image: doc.image,
        technologies: doc.technologies,
        liveUrl: doc.liveUrl,
        githubUrl: doc.githubUrl,
        category: doc.category,
        isFeatured: doc.isFeatured,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt
      };
    } catch (error) {
      throw new Error(`Failed to create portfolio project: ${error}`);
    }
  }

  async updatePortfolioProject(id: number, project: Partial<InsertPortfolioProject>): Promise<PortfolioProject> {
    await this.ensureConnection();
    try {
      const doc = await PortfolioProjectModel.findByIdAndUpdate(id, project, { new: true });
      if (!doc) throw new Error('Portfolio project not found');
      
      return {
        id: parseInt(doc._id.toString()),
        title: doc.title,
        description: doc.description,
        image: doc.image,
        technologies: doc.technologies,
        liveUrl: doc.liveUrl,
        githubUrl: doc.githubUrl,
        category: doc.category,
        isFeatured: doc.isFeatured,
        isActive: doc.isActive,
        order: doc.order,
        createdAt: doc.createdAt
      };
    } catch (error) {
      throw new Error(`Failed to update portfolio project: ${error}`);
    }
  }

  async deletePortfolioProject(id: number): Promise<boolean> {
    await this.ensureConnection();
    try {
      const result = await PortfolioProjectModel.findByIdAndDelete(id);
      return !!result;
    } catch (error) {
      console.error('Error deleting portfolio project:', error);
      return false;
    }
  }
}

// Storage Factory
function createStorage(): IStorage {
  const mongoUri = process.env.MONGODB_URI;
  
  if (mongoUri && mongoUri !== 'mongodb://localhost:27017/znforge') {
    console.log('Attempting to initialize MongoDB storage...');
    try {
      return new MongoStorage();
    } catch (error) {
      console.warn('Failed to initialize MongoDB storage, falling back to memory:', error);
      return new MemStorage();
    }
  } else {
    console.log('Using memory storage (no MongoDB URI provided)');
    return new MemStorage();
  }
}

export const storage = createStorage();