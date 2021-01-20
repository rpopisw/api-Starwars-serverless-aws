'use strict';

const ip = require('ip');
const env = process.env.NODE_ENV || 'development'

module.exports = (sequelize, DataTypes) => {
  const Starship = sequelize.define('Starship', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    MGLT: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cargo_capacity: {
      type: DataTypes.STRING,
      allowNull: false
    },
    consumables: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cost_in_credits: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.STRING,
      allowNull: false
    },
    crew: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edited: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hyperdrive_rating: {
      type: DataTypes.STRING,
      allowNull: false
    },
    length: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manufacturer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    max_atmosphering__speed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    passengers: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startship_class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'starship',
    freezeTableName: true,
    timestamps: false
  });

  Starship.associate = function (models) {
    Starship.belongsToMany(models.Film, {
      through: {
        model: models.FilmRelation,
        unique: false,
        scope: {
          relation: 'starship'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })

    Starship.belongsToMany(models.People, {
      through: {
        model: models.PeopleRelation,
        unique: false,
        scope: {
          relation: 'starship'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })
  }

  Starship.addHook('afterCreate', async (starship, options) => {
    await Starship.update({ url: `http://${ip.address()}:3000/${env}/api/starship/${starship.id}` }, {
      where: {
        id: starship.id
      },
      transaction: options.transaction
    });
  })

  return Starship;
};