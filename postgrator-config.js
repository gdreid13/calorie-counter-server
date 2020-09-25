require('dotenv').config();

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "password": '',
    "connectionString": (process.env.NODE_ENV === 'test')
      ? process.env.TEST_DATABASE_URL
      : process.env.DATABASE_URL || 'postgres://lvrlcwxwmvnifd:52091952405b4355767c76f6e06cc3edb2fd3318e0c7eec336f1070650c1c8c9@ec2-107-22-33-173.compute-1.amazonaws.com:5432/dbh783irngqn00',
    "ssl": !!process.env.SSL,
  }