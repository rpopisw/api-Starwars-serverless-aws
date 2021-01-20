import { map, concat, get } from 'lodash'
import { BaseController, Middleware } from 'swapi-helpers'
import { Swapi } from 'swapi-utils'
import { FilmDTO } from '../dtos'
import { FilmMapping } from '../mappers'

const { CorsMiddleware } = Middleware

const getFilms = () => {
  return new Promise(
    (resolve, reject) => {
      Swapi.getFilms(data => resolve(data))
    }
  )
}

class FilmsController extends BaseController {
  constructor(unitOfWork) {
    super()
    this.unitOfWork = unitOfWork

    return this
  }

  init(event, context, callback) {
    this.middleware(CorsMiddleware)

    return super.init(event, context, callback)
  }

  async handle(event, context, callback) {
    const { id } = this.request.path()
    const method = this.request.method()
    var operation = null

    switch (method) {
      case 'GET':
        if (id)
          operation = await this.getById(id)
        else
          operation = await this.get()

        break
      case 'POST':
        operation = await this.create()
        break
      case 'PATCH':
        operation = await this.update(id)
        break
      case 'DELETE':
        operation = await this.remove(id)
        break
      default:
        res.status(500).send({ error: 'Method not supported!' })
        break
    }

    return operation
  }

  async get() {
    const { FilmRepository } = this.unitOfWork
    const { lang, ...filters } = this.request.query()
    const films = await FilmRepository.get(filters) || []

    const filmsApi = await getFilms()

    var results = concat(
      get(filmsApi, 'results', []),
      films
    )

    if (lang) {
      results = map(results, e => {
        const filmDTO = new FilmDTO(e)
        const filmMapping = new FilmMapping(filmDTO)

        if (lang === 'es' || lang === 'ES')
          return filmMapping.toSpanish()
        else
          return filmDTO

      })
    }

    return {
      ...filmsApi,
      results,
      count: filmsApi.count + results.length
    }
  }

  async getById(id) {
    const { FilmRepository } = this.unitOfWork
    const film = await FilmRepository.getById(id)

    return film
  }

  async create() {
    const { FilmRepository } = this.unitOfWork
    const film = this.request.post()

    const created = Date(Date.now()).toString()
    const filmSaved = await FilmRepository.create({ ...film, created })

    const childs = ['people', 'planet', 'specie', 'starship', 'vehicle']
    const checkAndCreateChilds = (entity = null) => {
      if (film[entity]) {
        if (Array.isArray(film[entity])) {
          return film[entity].map(e => FilmRepository.createFilmRelation({
            film_id: filmSaved.id,
            relation_id: e,
            relation: entity,
            created
          }))
        } else {
          return FilmRepository.createFilmRelation({
            film_id: filmSaved.id,
            relation_id: film[entity],
            relation: entity,
            created
          })
        }
      }
    }

    await Promise.all(childs.map(e => checkAndCreateChilds(e)))

    return filmSaved
  }

  async update(id) {
    const { FilmRepository } = this.unitOfWork
    const film = this.request.post()

    const rowUpdate = await FilmRepository.update(id, film)

    if (rowUpdate) {
      const filmUpdated = await FilmRepository.getById(id)

      return filmUpdated
    }

    return {}
  }

  async remove(id) {
    const { FilmRepository } = this.unitOfWork

    const film = await FilmRepository.remove(id)

    return film
  }
}

export default FilmsController