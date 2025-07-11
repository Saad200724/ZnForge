// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/config/database.ts
import { createClient } from "@supabase/supabase-js";
import mongoose from "mongoose";
function createSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials not found. Supabase features will be disabled.");
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}
async function connectMongoDB() {
  const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;
  if (!mongoUri) {
    console.warn("MongoDB URI not found. MongoDB features will be disabled.");
    return null;
  }
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return null;
  }
}
function getActiveDatabaseType() {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    return "supabase" /* SUPABASE */;
  }
  if (process.env.MONGODB_URI || process.env.DATABASE_URL) {
    return "mongodb" /* MONGODB */;
  }
  return "memory" /* MEMORY */;
}

// server/models/mongoose.ts
import mongoose2, { Schema } from "mongoose";
var UserSchema = new Schema({
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
var ContactSubmissionSchema = new Schema({
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
var UserModel = mongoose2.model("User", UserSchema);
var ContactSubmissionModel = mongoose2.model("ContactSubmission", ContactSubmissionSchema);
function userDocumentToUser(doc) {
  return {
    id: parseInt(doc._id.toString().slice(-8), 16),
    // Convert ObjectId to numeric ID
    username: doc.username,
    password: doc.password
  };
}
function contactSubmissionDocumentToContactSubmission(doc) {
  return {
    id: parseInt(doc._id.toString().slice(-8), 16),
    // Convert ObjectId to numeric ID
    name: doc.name,
    email: doc.email,
    service: doc.service,
    message: doc.message,
    createdAt: doc.createdAt
  };
}

// server/storage.ts
var MemStorage = class {
  users;
  contactSubmissions;
  currentUserId;
  currentContactId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.contactSubmissions = /* @__PURE__ */ new Map();
    this.currentUserId = 1;
    this.currentContactId = 1;
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  async createContactSubmission(insertSubmission) {
    const id = this.currentContactId++;
    const submission = {
      ...insertSubmission,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }
  async getContactSubmissions() {
    return Array.from(this.contactSubmissions.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
};
var SupabaseStorage = class {
  supabase;
  constructor() {
    this.supabase = createSupabaseClient();
    if (!this.supabase) {
      throw new Error("Supabase client could not be initialized");
    }
  }
  async getUser(id) {
    const { data, error } = await this.supabase.from("users").select("*").eq("id", id).single();
    if (error || !data) return void 0;
    return data;
  }
  async getUserByUsername(username) {
    const { data, error } = await this.supabase.from("users").select("*").eq("username", username).single();
    if (error || !data) return void 0;
    return data;
  }
  async createUser(insertUser) {
    const { data, error } = await this.supabase.from("users").insert(insertUser).select().single();
    if (error) throw new Error(`Failed to create user: ${error.message}`);
    return data;
  }
  async createContactSubmission(insertSubmission) {
    const { data, error } = await this.supabase.from("contact_submissions").insert(insertSubmission).select().single();
    if (error) throw new Error(`Failed to create contact submission: ${error.message}`);
    return data;
  }
  async getContactSubmissions() {
    const { data, error } = await this.supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    if (error) throw new Error(`Failed to get contact submissions: ${error.message}`);
    return data || [];
  }
};
var MongoStorage = class {
  isConnected = false;
  constructor() {
    this.initConnection();
  }
  async initConnection() {
    const connection = await connectMongoDB();
    this.isConnected = !!connection;
    if (!this.isConnected) {
      throw new Error("MongoDB connection could not be established");
    }
  }
  async ensureConnection() {
    if (!this.isConnected) {
      await this.initConnection();
    }
  }
  async getUser(id) {
    await this.ensureConnection();
    try {
      const doc = await UserModel.findOne({
        $or: [
          { _id: id },
          { _id: id.toString() }
        ]
      });
      return doc ? userDocumentToUser(doc) : void 0;
    } catch (error) {
      console.error("Error getting user:", error);
      return void 0;
    }
  }
  async getUserByUsername(username) {
    await this.ensureConnection();
    try {
      const doc = await UserModel.findOne({ username });
      return doc ? userDocumentToUser(doc) : void 0;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return void 0;
    }
  }
  async createUser(insertUser) {
    await this.ensureConnection();
    try {
      const doc = await UserModel.create(insertUser);
      return userDocumentToUser(doc);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }
  async createContactSubmission(insertSubmission) {
    await this.ensureConnection();
    try {
      const doc = await ContactSubmissionModel.create(insertSubmission);
      return contactSubmissionDocumentToContactSubmission(doc);
    } catch (error) {
      throw new Error(`Failed to create contact submission: ${error}`);
    }
  }
  async getContactSubmissions() {
    await this.ensureConnection();
    try {
      const docs = await ContactSubmissionModel.find().sort({ createdAt: -1 });
      return docs.map(contactSubmissionDocumentToContactSubmission);
    } catch (error) {
      throw new Error(`Failed to get contact submissions: ${error}`);
    }
  }
};
function createStorage() {
  const dbType = getActiveDatabaseType();
  console.log(`Initializing storage with database type: ${dbType}`);
  switch (dbType) {
    case "supabase" /* SUPABASE */:
      try {
        return new SupabaseStorage();
      } catch (error) {
        console.warn("Failed to initialize Supabase storage, falling back to memory:", error);
        return new MemStorage();
      }
    case "mongodb" /* MONGODB */:
      try {
        return new MongoStorage();
      } catch (error) {
        console.warn("Failed to initialize MongoDB storage, falling back to memory:", error);
        return new MemStorage();
      }
    default:
      return new MemStorage();
  }
}
var storage = createStorage();

// shared/schema.ts
import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  service: true,
  message: true
});

// server/routes.ts
import { z } from "zod";
async function registerRoutes(app2) {
  app2.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      console.log("New contact submission:", submission);
      res.json({
        success: true,
        message: "Thank you for your message! We'll get back to you soon.",
        id: submission.id
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Invalid form data",
          errors: error.errors
        });
      } else {
        console.error("Contact form error:", error);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your message"
        });
      }
    }
  });
  app2.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching submissions"
      });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/scripts/init-database.ts
var SUPABASE_TABLES_SQL = `
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
    throw new Error("Supabase client not available");
  }
  console.log("Initializing Supabase tables...");
  console.log("Please run the following SQL in your Supabase SQL editor:");
  console.log(SUPABASE_TABLES_SQL);
  return true;
}
async function initMongoDB() {
  const connection = await connectMongoDB();
  if (!connection) {
    throw new Error("MongoDB connection not available");
  }
  console.log("Initializing MongoDB collections...");
  try {
    await UserModel.createIndexes();
    await ContactSubmissionModel.createIndexes();
    console.log("MongoDB indexes created successfully");
    return true;
  } catch (error) {
    console.error("Error creating MongoDB indexes:", error);
    throw error;
  }
}
async function initializeDatabase() {
  const dbType = getActiveDatabaseType();
  console.log(`Initializing database for type: ${dbType}`);
  try {
    switch (dbType) {
      case "supabase" /* SUPABASE */:
        await initSupabase();
        break;
      case "mongodb" /* MONGODB */:
        await initMongoDB();
        break;
      case "memory" /* MEMORY */:
        console.log("Using in-memory storage - no initialization required");
        break;
      default:
        console.log("Unknown database type, using in-memory storage");
    }
    console.log("Database initialization completed");
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeDatabase().then(() => {
    console.log("Database initialization completed successfully");
    process.exit(0);
  }).catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  try {
    await initializeDatabase();
  } catch (error) {
    log(`Database initialization warning: ${error}`, "database");
    log("Continuing with fallback storage...", "database");
  }
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
