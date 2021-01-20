import ConnectionManager from 'swapi-database'

const env = process.env.NODE_ENV || 'development';
const config = require('../database/config.js')[env];

const cnManager = new ConnectionManager(config)
const db = cnManager.getConnection()

export default db