# Fix PrismaClient Initialization Error

## Problem

PrismaClient is failing to initialize because it's not receiving the database URL. The error indicates:
```
PrismaClient needs to be constructed with a non-empty, valid PrismaClientOptions
```

## Root Cause

In Prisma v7 with `prisma.config.ts`, the PrismaClient needs explicit datasource configuration when instantiated. The environment variables may not be loaded when PrismaService extends PrismaClient.

## Solution

Update PrismaService to explicitly pass the DATABASE_URL to PrismaClient constructor.

## Tasks

### 1. Update PrismaService Constructor

Modify `apps/backend/src/prisma/prisma.service.ts`:

- Add constructor that calls `super()` with datasource configuration
- Pass `DATABASE_URL` from environment variables explicitly
- This ensures PrismaClient gets the database URL at instantiation

### 2. Verify Environment Variables

Ensure `.env` file exists and contains:
- `DATABASE_URL="file:./dev.db"`
- `JWT_SECRET="super-secret-key-change-later"`
- `JWT_EXPIRES_IN="7d"`

### 3. Test Server Startup

- Run `npm run start:dev`
- Verify no PrismaClient initialization errors
- Confirm server starts successfully

### 4. Verify Database Connection

- Check that PrismaService can connect to database
- Verify migrations are applied
- Test that database operations work

### 5. Commit Changes

- Stage and commit the fix
- Push to repository

## Files to Modify

- `apps/backend/src/prisma/prisma.service.ts` (add constructor with datasource config)

## Expected Outcome

- Server starts without PrismaClient errors
- Database connection works
- All Prisma operations function correctly
