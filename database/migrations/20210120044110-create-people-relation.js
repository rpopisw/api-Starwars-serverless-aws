'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('people_relation', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      people_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      relation: {
        type: DataTypes.STRING,
        allowNull: false
      },
      relation_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      created: {
        type: DataTypes.STRING,
        allowNull: false
      },
      edited: {
        type: DataTypes.STRING,
        allowNull: true
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('people_relation');
  }
}