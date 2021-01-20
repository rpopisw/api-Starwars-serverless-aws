'use strict';

module.exports = (sequelize, DataTypes) => {
  const PeopleRelation = sequelize.define('PeopleRelation', {
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
  }, {
    tableName: 'people_relation',
    freezeTableName: true,
    timestamps: false
  });

  return PeopleRelation
}