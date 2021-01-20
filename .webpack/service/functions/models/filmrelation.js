'use strict';

module.exports = (sequelize, DataTypes) => {
  const FilmRelation = sequelize.define('FilmRelation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    film_id: {
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
    tableName: 'film_relation',
    freezeTableName: true,
    timestamps: false
  });

  return FilmRelation
}