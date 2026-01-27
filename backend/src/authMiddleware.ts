import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { syncUser } from './db';

// Base Clerk middleware - adds auth info to request
export const clerkAuth = clerkMiddleware();

// Middleware to require authentication
export const requireAuthentication = requireAuth();

// Middleware to sync user to database after authentication
export async function syncUserMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const auth = getAuth(req);
        if (auth.userId) {
            // Get user info from Clerk session claims if available
            const email = auth.sessionClaims?.email as string | undefined;
            const name = auth.sessionClaims?.name as string | undefined;

            await syncUser(auth.userId, email || null, name || null);
        }
        next();
    } catch (error) {
        console.error('Error syncing user:', error);
        // Don't block the request if sync fails
        next();
    }
}

// Combined middleware for protected routes
export const protectedRoute = [requireAuthentication, syncUserMiddleware];
