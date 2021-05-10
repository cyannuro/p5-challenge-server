require(`dotenv`).config()

const poolConfig = {
  max: 20,
  min: 0,
  idle: 10000,
  acquire: 90000,
}

module.exports = {
  development: {
    username: process.env.DBUSER || `root`,
    password: process.env.DBPASS || `root`,
    database: process.env.DB || `airport`,
    host: process.env.DBHOST || `127.0.0.1`,
    dialect: `postgres`,
    pool: poolConfig,
    timezone: process.env.TIMEZONE || `America/Santiago`,
    logging: false,
  },
  staging: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: `postgres`,
    pool: poolConfig,
    timezone: process.env.TIMEZONE || `America/Santiago`,
    logging: false,
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
    host: process.env.DBHOST,
    dialect: `postgres`,
    pool: poolConfig,
    timezone: process.env.TIMEZONE || `America/Santiago`,
    logging: false,
  },
}
