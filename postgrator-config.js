require('dotenv').config();
const { DATABASE_URL } = require('./src/config')

module.exports = {
    "migrationDirectory": "migrations",
    "driver": "pg",
    "connectionString": (process.env.NODE_ENV === 'test')
      ? process.env.TEST_DATABASE_URL
      : DATABASE_URL || 'postgres://swomugrxxyqcod:da5916e35249ef474f0d018c6673afe879d5626f2882c9469371ea9f531c3552@ec2-54-166-251-173.compute-1.amazonaws.com:5432/d8k46vtdc9v7',
    "ssl": !!process.env.SSL,
  }
