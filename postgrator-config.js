require('dotenv').config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
      ? process.env.TEST_DATABASE_URL
<<<<<<< HEAD
      : process.env.DATABASE_URL,
    "ssl": !!process.env.SSL,
=======
      :'postgres://wrpxnebfyculaj:f5229e3f2f950c2bf786b9e3786b9d062e543a929c102d94de5056d4023093e8@ec2-107-22-33-173.compute-1.amazonaws.com:5432/dcu742murmuh29',
    "ssl": true,
>>>>>>> a8498114ea92217d379db4de49a6e14ba330379c
  }