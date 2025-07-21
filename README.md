# ZnForge - Full Stack Web Development Application

## Overview

ZnForge is a modern full-stack web application built with React, Express, and PostgreSQL. It's a business website for a web development agency that offers full-stack development, VPS hosting services, and SEO optimization. The application features a responsive design with animated UI components, a contact form system, a professional portfolio showcase, and an enhanced responsive live chat system.

## Recent Changes (January 2025)
✓ Migrated project from Replit Agent to Replit environment successfully
✓ Enhanced LiveChat component with full responsive design and mobile-first approach
✓ Added professional minimize/maximize functionality for desktop users
✓ Implemented dynamic mobile vs desktop layouts with proper touch interactions
✓ Added smooth scrolling, custom scrollbars, and improved message animations
✓ Enhanced professional appearance with glass effects and modern UI patterns
✓ RESTORED original single-page application interface after user feedback
✓ Maintained all section components (Hero, Services, About, Team, Portfolio, Contact) on single page
✓ Preserved smooth scrolling navigation and 3D floating elements
✓ Kept admin panel functionality accessible via footer link

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and bundling
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Animations**: Framer Motion for smooth animations and transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js for REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect + Mongoose for MongoDB
- **Database Providers**: Multi-database support (Supabase, MongoDB, Memory)
- **Validation**: Zod schemas for data validation
- **Session Management**: Intelligent storage abstraction with automatic fallback

### Key Components

#### Frontend Components
- **Navigation**: Fixed navigation with smooth scrolling
- **Hero Section**: Animated landing area with floating 3D elements
- **Services**: Showcasing web development, VPS, and SEO services
- **About**: Company values and mission with animations
- **Team**: Team member profiles with hover effects
- **Portfolio**: Project showcase with technology tags
- **Contact**: Contact form with service selection
- **Footer**: Company links and social media

#### Backend Components
- **Contact API**: Handles form submissions with validation
- **Storage Layer**: Abstracted storage interface with memory implementation
- **Route Registration**: Centralized API route management
- **Error Handling**: Global error middleware
- **Request Logging**: Custom middleware for API request logging

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - Form data validated using Zod schemas
   - API request sent to `/api/contact` endpoint
   - Backend validates data and stores submission
   - Success/error response sent back to frontend
   - Toast notification shown to user

2. **Page Navigation**:
   - Single-page application with smooth scrolling navigation
   - Wouter handles client-side routing
   - Components lazy-loaded and animated on scroll

3. **Data Fetching**:
   - TanStack Query manages server state
   - Custom API request utility handles HTTP communication
   - Error boundaries catch and display errors gracefully

## External Dependencies

### Core Technologies
- **React**: Frontend framework with hooks and context
- **Express**: Backend web framework
- **PostgreSQL**: Primary database via Neon serverless
- **Drizzle**: Type-safe ORM for database operations

### UI and Styling
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Unstyled, accessible UI components
- **Framer Motion**: Animation library for React
- **Lucide React**: Icon library

### Development Tools
- **TypeScript**: Type safety across the application
- **Vite**: Fast development build tool
- **ESBuild**: Production bundling
- **TSX**: TypeScript execution for development

### Database Architecture
- **Multi-Database Support**: Automatic database detection and fallback
- **Supabase Integration**: PostgreSQL-based cloud database with real-time features
- **MongoDB Integration**: NoSQL document database with Mongoose ODM
- **Memory Storage**: In-memory fallback for development and testing
- **Database Schema**: Users and contact submissions with consistent API across all providers
- **Auto-Initialization**: Automatic table/collection creation and indexing

## Deployment Strategy

### Development Environment
- **Frontend**: Vite dev server with HMR
- **Backend**: TSX for TypeScript execution
- **Database**: Neon database connection via environment variables

### Production Build
- **Frontend**: Vite build to static assets
- **Backend**: ESBuild bundle for Node.js
- **Database**: Drizzle migrations for schema updates

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Build Process**: Separate client and server build steps
- **Static Assets**: Frontend built to `dist/public` directory

### Key Features
- **Responsive Design**: Mobile-first responsive layout
- **Performance Optimized**: Code splitting and lazy loading
- **Type Safety**: End-to-end TypeScript coverage
- **Accessibility**: ARIA-compliant components via Radix UI
- **SEO Ready**: Meta tags and semantic HTML structure
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error boundaries and middleware

The application follows modern full-stack development practices with clear separation of concerns, type safety, and responsive design principles. The modular architecture allows for easy feature additions and maintenance.
