'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('film', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      created: {
        type: DataTypes.STRING,
        allowNull: false
      },
      director: {
        type: DataTypes.STRING,
        allowNull: false
      },
      edited: {
        type: DataTypes.STRING,
        allowNull: true
      },
      episode_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      opening_crawl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      producer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      release_date: {
        type: DataTypes.STRING,
        allowNull: false
      },
      title: {
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
    return queryInterface.dropTable('film');
  }
}