require('dotenv').config({ path: __dirname + '/../../.env' });

export default {
  environment: process.env.NODE_ENV ?? 'test',
  databaseUrl: process.env.DATABASE_URL,
  express: {
    port: process.env.HTTP_PORT ?? 3000,
    cors: { 
      origin: '*' 
    },
    rateLimiter: {
      windowMs: 1 * 60 * 1000, // 1 minute
      limit: 200, // limit each IP to X requests per windowMs
      handler: (req: any, res: any) => {
        return res.status(429).json({ success: false, msg: 'Too many requests sent, please try again later.' });
      }
    },
    payloadLimit: "100kb"
  },
  redis: {
    dataExpiresIn: 60 * 60, // seconds // 1 hour
    redisUrl: process.env.REDIS_URL ?? 'redis://redis:6379',
  },
  auth: {
    pepper: "3619d3a3-cd6f-4d9c-b6bc-c7310dd934d5", // used in all password hashing operations
    credentials: { // hard coded credentials
      admin: {
        salt: "cce5cc7a-e5c2-429c-b56d-e9df514d4641", // used in password hashing for a single user/password
        pwdHash: "960f0ed6b86615b5e3b58e22e08e0f1b1aff6d21be00953b9257a7020808d339da75dadc4dd518a604925a083c34db28ea6438e25f6fa205a1f21da1fdd9362a",
      },
    }
  }
};