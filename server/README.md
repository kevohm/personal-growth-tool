### Notes & Security Considerations

Email: The sample uses nodemailer. In production, use a reliable provider (SendGrid, SES, Mailgun) and verify deliverability.

HTTPS & Secure cookies: Ensure secure: true on cookies in production and serve over HTTPS.

Refresh token storage: This example stores refresh tokens in DB and sends them as httpOnly cookies. You can instead return them in response and store client-side (less secure).

Token revocation & rotation: This code performs simple revocation and rotation for refresh tokens; expand logic (replacedBy etc.) for stricter security.

Rate limiting: Add rate-limiting to /forgot to prevent abuse.

Account enumeration: requestPasswordReset intentionally does not reveal whether email exists.

Prisma + Mongo: Prisma with MongoDB does not use migrations in the same way as relational DBs; models are used at runtime. Be sure to call prisma generate whenever you change the schema.

If you want, I can:

Add email templates and links for a frontend reset page.

Add account verification (email confirm).

Implement a refresh token rotation with replacedBy chain and detection of token reuse.

Provide a Postman collection or curl examples for each endpoint.