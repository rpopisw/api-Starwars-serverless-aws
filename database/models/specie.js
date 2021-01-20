'use strict';

const ip = require('ip');
const env = process.env.NODE_ENV || 'development'

module.exports = (sequelize, DataTypes) => {
  const Specie = sequelize.define('Specie', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
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
  }, {
    tableName: 'specie',
    freezeTableName: true,
    timestamps: false
  });

  Specie.associate = function (models) {
    Specie.belongsToMany(models.Film, {
      through: {
        model: models.FilmRelation,
        unique: false,
        scope: {
          relation: 'specie'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })

    Specie.belongsToMany(models.People, {
      through: {
        model: models.PeopleRelation,
        unique: false,
        scope: {
          relation: 'specie'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })
  }

  Specie.addHook('afterCreate', async (specie, options) => {
    await Specie.update({ url: `http://${ip.address()}:3000/${env}/api/specie/${specie.id}` }, {
      where: {
        id: specie.id
      },
      transaction: options.transaction
    });
  })

  return Specie;
};