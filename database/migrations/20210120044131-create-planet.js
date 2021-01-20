'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('planet', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      climate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created: {
        type: DataTypes.STRING,
        allowNull: false
      },
      diameter: {
        type: DataTypes.STRING,
        allowNull: false
      },
      edited: {
        type: DataTypes.STRING,
        allowNull: true
      },
      gravity: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      orbital_period: {
        type: DataTypes.STRING,
        allowNull: false
      },
      population: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rotation_period: {
        type: DataTypes.STRING,
        allowNull: false
      },
      surface_water: {
        type: DataTypes.STRING,
        allowNull: false
      },
      terrain: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('planet');
  }
}