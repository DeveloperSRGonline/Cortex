const { ClerkExpressRequireAuth } = require('@clerk/clerk-sdk-node');

// For development without Clerk keys, we might want a mock middleware
// But PRD says Clerk is mandatory.
const authMiddleware = ClerkExpressRequireAuth();

module.exports = authMiddleware;
