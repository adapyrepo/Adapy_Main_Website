# Adapy - Adaptive Mobility Platform

## Overview

Adapy is a product showcase and lead generation website for an adaptive mobility technology company. The platform presents smart wheelchair automation products, collects contact requests, and manages newsletter subscriptions. Built as a full-stack TypeScript application with a React frontend and Express backend, it follows a monorepo structure with shared types and validation schemas.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state and caching
- **Styling**: Tailwind CSS with CSS variables for theming, using an Apple-inspired monochrome design
- **Component Library**: shadcn/ui components built on Radix UI primitives
- **Animations**: Framer Motion for entrance animations; CSS @keyframes for infinite scroll animations (logos, testimonials, video testimonials) for GPU compositor performance
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Framework**: Express.js running on Node with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe queries
- **API Design**: REST endpoints defined in `shared/routes.ts` with Zod schemas for request/response validation
- **Storage Pattern**: Repository pattern via `DatabaseStorage` class in `server/storage.ts`

### Shared Code Structure
The `shared/` directory contains code used by both frontend and backend:
- `schema.ts`: Drizzle table definitions and Zod insert schemas
- `routes.ts`: API endpoint definitions with path, method, and response schemas

### Build System
- **Development**: Vite dev server with HMR, proxied through Express
- **Production**: Custom build script using esbuild for server bundling and Vite for client
- **Output**: Server bundles to `dist/index.cjs`, client to `dist/public/`

### Database Schema
Three main tables:
1. **products**: Product catalog with name, description, features (JSONB array), and featured flag
2. **contact_requests**: Lead capture with name, email, company, message, and request type
3. **subscribers**: Newsletter email subscriptions with unique constraint

### Key Design Decisions
- **Type Safety**: End-to-end TypeScript with shared Zod schemas ensures API contracts are enforced at compile time
- **Path Aliases**: `@/` maps to `client/src/`, `@shared/` maps to `shared/` for clean imports
- **CSS Variables**: Theme colors defined as HSL values in CSS variables for easy dark mode support
- **Component Architecture**: Presentational components in `components/ui/`, page components in `pages/`

## External Dependencies

### Database
- **PostgreSQL**: Primary database, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Schema management and type-safe queries
- **drizzle-kit**: CLI for database migrations (`npm run db:push`)

### Third-Party Services
- None currently integrated, but the build system includes bundling support for:
  - Stripe (payments)
  - OpenAI / Google Generative AI
  - Nodemailer (email)
  - Passport (authentication)

### Key npm Packages
- **@tanstack/react-query**: Server state management
- **framer-motion**: Animation library for premium UI interactions
- **wouter**: Lightweight React router
- **zod**: Schema validation shared between frontend and backend
- **drizzle-orm** + **drizzle-zod**: ORM with automatic Zod schema generation
- **shadcn/ui components**: Full suite of Radix-based accessible components