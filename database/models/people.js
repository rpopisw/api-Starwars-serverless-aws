'use strict';

const ip = require('ip');
const env = process.env.NODE_ENV || 'development'

module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('People', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    birth_year: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eye_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hair_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false
    },
    homeworld: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skin_color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.STRING,
      allowNull: false
    },
    edited: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'people',
    freezeTableName: true,
    timestamps: false
  });

  People.associate = function (models) {
    People.belongsToMany(models.Specie, {
      through: {
        model: models.PeopleRelation,
        unique: false
      },
      foreignKey: 'people_id',
      constraints: false
    })

    People.belongsToMany(models.Starship, {
      through: {
        model: models.PeopleRelation,
        unique: false
      },
      foreignKey: 'people_id',
      constraints: false
    })

    People.belongsToMany(models.Vehicle, {
      through: {
        model: models.PeopleRelation,
        unique: false
      },
      foreignKey: 'people_id',
      constraints: false
    })

    People.belongsToMany(models.Film, {
      through: {
        model: models.FilmRelation,
        unique: false,
        scope: {
          relation: 'people'
        }
      },
      foreignKey: 'relation_id',
      constraints: false
    })
  }

  People.addHook('afterCreate', async (people, options) => {
    await People.update({ url: `http://${ip.address()}:3000/${env}/api/people/${people.id}` }, {
      where: {
        id: people.id
      },
      transaction: options.transaction
    });

  })

  return People;
};