import IRepository from './IRepository'
import { map } from 'lodash'

class FilmRepository extends IRepository {
  constructor(dbContext) {
    super()

    this.dbContext = dbContext

    return this
  }

  async create(film) {
    try {
      const { Film } = this.dbContext
      const filmSaved = await Film.create(film)

      return filmSaved
    } catch (e) {
      console.log(e)
    }
  }

  async createFilmRelation(filmRelation) {
    try {
      const { FilmRelation } = this.dbContext
      const filmRelationSaved = await FilmRelation.create(filmRelation)

      return filmRelationSaved
    } catch (e) {
      console.log(e)
    }
  }

  async update(id, film) {
    try {
      const { Film } = this.dbContext
      const filmSaved = await Film.update(film, { where: { id } })

      return filmSaved
    } catch (e) {
      console.log(e)
    }
  }

  async get(filters) {
    try {
      const { Film } = this.dbContext
      const films = await Film.findAll({ where: filters })

      const peoples = await Promise.all(films.map(async e => e.getPeople()))
      const planets = await Promise.all(films.map(e => e.getPlanets()))
      const species = await Promise.all(films.map(e => e.getSpecies()))
      const starships = await Promise.all(films.map(e => e.getStarships()))
      const vehicles = await Promise.all(films.map(e => e.getVehicles()))

      const getUrl = arr => map(arr, e => e.url)

      const filmsWithPeople = map(films, (a, index) => {
        const [
          peoplesUrl,
          planetsUrl,
          speciesUrl,
          starshipsUrl,
          vehiclesUrl
        ] = [
            getUrl(peoples[index]),
            getUrl(planets[index]),
            getUrl(species[index]),
            getUrl(starships[index]),
            getUrl(vehicles[index])
          ]

        return {
          ...a.dataValues,
          characters: peoplesUrl,
          species: speciesUrl,
          planets: planetsUrl,
          startship: starshipsUrl,
          vehicles: vehiclesUrl
        }
      })

      return filmsWithPeople
    } catch (e) {
      console.log(e)
    }
  }

  async getById(id) {
    try {
      const { Film } = this.dbContext
      const film = await Film.findOne({ where: { id } })

      return film
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id) {
    const { Film } = this.dbContext
    const film = await Film.findOne({ where: { id } })

    await Film.destroy({ where: { id } })

    return film
  }
}

export default FilmRepository