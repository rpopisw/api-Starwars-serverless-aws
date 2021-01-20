'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { FRAMEWORK } = require('../constants')

var _instance = null
const modelsPath = path.resolve(__dirname, './models')

class ConnectionManager {
  constructor(config = {}) {
    this.framework = config.framework || FRAMEWORK.SEQUELIZE
    this.database = config.database
    this.username = config.username
    this.password = config.password
    this.host = config.host
    this.port = config.port
    this.dialect = config.dialect
    this.sequelize = {}
    this.directory = config.directory || modelsPath
    this.use_env_variable = config.use_env_variable

    this.connection = null

    if (!_instance) {
      _instance = this
    }
    return _instance
  }

  getConnection() {
    switch (this.framework) {
      case FRAMEWORK.SEQUELIZE:
        this.connection = this.connection || this.getSequelize()
        break
      default:
        this.connection = this.connection || this.getSequelize()
        break
    }

    return this.connection
  }

  getSequelize() {
    const db = {};

    const { database, username, password, directory, host, port, dialect, use_env_variable } = this
    const config = { database, username, password, host, port, dialect }

    try {
      if (use_env_variable) {
        this.sequelize = new Sequelize(process.env[use_env_variable], config);
      } else {
        this.sequelize = new Sequelize(database, username, password, config);
      }

      fs
        .readdirSync(directory)
        .filter(file => {
          return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        })
        .forEach(file => {
          const model = this.sequelize['import'](path.join(directory, file));
          db[model.name] = model;
        });

      Object.keys(db).forEach(modelName => {
        if (db[modelName].associate) {
          db[modelName].associate(db);
        }
      });

      db.sequelize = this.sequelize;
      db.Sequelize = Sequelize;
    } catch (err) {
      db.stacktrace = err
      db.message = 'ConnectionManagerError in getSequelizeConnection'

      console.error(err)
    }

    return db
  }
}

module.exports = ConnectionManager
