'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('specie', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      average_height: {
        type: DataTypes.STRING,
        allowNull: false
      },
      average_lifespan: {
        type: DataTypes.STRING,
        allowNull: false
      },
      classification: {
        type: DataTypes.STRING,
        allowNull: false
      },
      created: {
        type: DataTypes.STRING,
        allowNull: false
      },
      designation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      edited: {
        type: DataTypes.STRING,
        allowNull: true
      },
      eye_color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hair_color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      homeworld: {
        type: DataTypes.STRING,
        allowNull: false
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      skin_colors: {
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
    return queryInterface.dropTable('specie');
  }
}