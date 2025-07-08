# Karyo Backend

## Description

Karyo is a backend API built with [NestJS](https://nestjs.com/) and [Prisma](https://www.prisma.io/) for managing users and job applications. It provides JWT authentication, user management, and CRUD operations for jobs.

## Installation

```bash
pnpm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/your_db
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
FRONTEND_ORIGIN=http://localhost:3000
```

## Prisma Migrations & Client Generation

```bash
pnpm run build
```

## Running the app

```bash
# development
pnpm run start

# watch mode
pnpm run start:dev

# production mode
pnpm run start:prod
```

## Testing

```bash
# unit tests
pnpm run test


# test coverage
pnpm run test:cov
```

## Main Endpoints

- `POST /auth/register` — Register a new user
- `POST /auth/login` — Login and get tokens
- `POST /auth/refresh` — Refresh JWT tokens
- `GET /jobs/:id` — List jobs for the authenticated user
- `POST /jobs` — Create a new job
- `PATCH /jobs/:id` — Update a job
- `DELETE /jobs/:id` — Delete a job

## Project Structure

```
src/
  auth/         # Authentication and user module
  jobs/         # Job management module
  prisma/       # Database access service
  app.module.ts # Root module
  main.ts       # App bootstrap
prisma/
  schema.prisma # Database schema
  migrations/   # SQL migrations
```

## Technologies

- NestJS
- Prisma ORM
- PostgreSQL
- JWT
- Passport
