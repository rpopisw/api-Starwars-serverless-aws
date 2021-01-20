'use strict';

const ip = require('ip');
const env = process.env.NODE_ENV || 'development'

module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
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
    vehicle_class: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'vehicle',
    freezeTableName: true,
    timestamps: false
  });

  Vehicle.associate = function (models) {
    Vehicle.belongsToMany(models.Film, {
      through: {
        model: models.FilmRelation,
        unique: false,
        scope: {
          relation: 'vehicle'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })

    Vehicle.belongsToMany(models.People, {
      through: {
        model: models.PeopleRelation,
        unique: false,
        scope: {
          relation: 'vehicle'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })
  }


  Vehicle.addHook('afterCreate', async (vehicle, options) => {
    await Vehicle.update({ url: `http://${ip.address()}:3000/${env}/api/vehicle/${vehicle.id}` }, {
      where: {
        id: vehicle.id
      },
      transaction: options.transaction
    });
  })

  return Vehicle;
};