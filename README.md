What is possible so far: 
Authentication: {
1. User Registration:
   New users can create an account.
   Input is validated with Joi.
   Passwords are hashed before saving.
   Duplicate email check is enforced.
2. User can log in:
   User provides email + password.
   Credentials are validated.
   On success:
   Access token (short‑lived)
   Refresh token (long‑lived) 
   Refresh token is stored in the database for session tracking.
3. Access Token Authorization
   Protected routes require a valid access token.
   Middleware verifies:
   Token signature
   Token expiration
   User existence
   User active status (isActive)
   Decoded payload is stored in res.locals.tokenPayload.
4. User Profile (/me)
   Authenticated users can fetch their own profile.
   Uses res.locals.tokenPayload.userId.
   Returns a safe DTO (no password, no internal fields).
5. Refresh Token Rotation
   User can request new tokens using /refresh.
   Flow:
   Validate refresh token format.
   Verify JWT signature.
   Check refresh token exists in DB.
   Delete old refresh token (rotation).
   Generate new access + refresh tokens.
   Save new refresh token in DB.
   Return tokens to client.
   Prevents replay attacks and ensures one active session per token.
6. Token Storage
   Refresh tokens are stored per user.
   Old tokens are removed during rotation.
   Access tokens are not stored (stateless).
7. Error Handling
   Unified ApiError class.
   Consistent HTTP status codes.
   Middleware catches and formats errors.
}











