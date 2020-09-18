module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL:process.env.DATABASE_URL,
  JWT_SECRET:"secret",
  JWT_EXPIRY:'24h'
}