'use strict';

const ip = require('ip');
const env = process.env.NODE_ENV || 'development'

module.exports = (sequelize, DataTypes) => {
  const Planet = sequelize.define('Planet', {
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
  }, {
    tableName: 'planet',
    freezeTableName: true,
    timestamps: false
  });

  Planet.associate = function (models) {
    Planet.belongsToMany(models.Film, {
      through: {
        model: models.FilmRelation,
        unique: false,
        scope: {
          relation: 'planet'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })
  }

  Planet.addHook('afterCreate', async (planet, options) => {
    await Planet.update({ url: `http://${ip.address()}:3000/${env}/api/planet/${planet.id}` }, {
      where: {
        id: planet.id
      },
      transaction: options.transaction
    });
  })

  return Planet;
};