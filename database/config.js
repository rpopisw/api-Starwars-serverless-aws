const yenv = require('yenv')
const env = process.env.NODE_ENV || 'development'
const stage = yenv('.env.yml', { env })

module.exports = {
  development: {
    username: stage.DB_USERNAME,
    password: stage.DB_PASSWORD,
    database: stage.DB_DATABASE,
    host: stage.DB_HOST,
    dialect: stage.DB_DIALECT
  },
  test: {
    username: stage.DB_USERNAME,
    password: stage.DB_PASSWORD,
    database: stage.DB_DATABASE,
    host: stage.DB_HOST,
    dialect: stage.DB_DIALECT
  },
  production: {
    username: stage.DB_USERNAME,
    password: stage.DB_PASSWORD,
    database: stage.DB_DATABASE,
    host: stage.DB_HOST,
    dialect: stage.DB_DIALECT
  }
}