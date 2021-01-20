'use strict';

const ip = require('ip');
const env = process.env.NODE_ENV || 'development'

module.exports = (sequelize, DataTypes) => {
  const Film = sequelize.define('Film', {
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
  }, {
    tableName: 'film',
    freezeTableName: true,
    timestamps: false
  });

  Film.associate = function (models) {
    Film.belongsToMany(models.People, {
      through: {
        model: models.FilmRelation,
        unique: false
      },
      foreignKey: 'film_id',
      constraints: false
    })

    Film.belongsToMany(models.Planet, {
      through: {
        model: models.FilmRelation,
        unique: false
      },
      foreignKey: 'film_id',
      constraints: false
    })

    Film.belongsToMany(models.Specie, {
      through: {
        model: models.FilmRelation,
        unique: false
      },
      foreignKey: 'film_id',
      constraints: false
    })

    Film.belongsToMany(models.Starship, {
      through: {
        model: models.FilmRelation,
        unique: false
      },
      foreignKey: 'film_id',
      constraints: false
    })

    Film.belongsToMany(models.Vehicle, {
      through: {
        model: models.FilmRelation,
        unique: false,
      },
      foreignKey: 'film_id',
      constraints: false
    })
  }

  Film.addHook('afterCreate', async (film, options) => {
    await Film.update({ url: `http://${ip.address()}:3000/${env}/api/people/${film.id}` }, {
      where: {
        id: film.id
      },
      transaction: options.transaction
    });

  })

  return Film;
};