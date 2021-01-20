import { BaseController, Middleware } from 'swapi-helpers'
import { Swapi } from 'swapi-utils'

const { CorsMiddleware } = Middleware

const getPeople = () => {
  return new Promise(
    (resolve, reject) => {
      Swapi.getPeople(data => resolve(data))
    }
  )
}

class PeopleController extends BaseController {
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
    const { PeopleRepository } = this.unitOfWork
    const filters = this.request.query()
    const peoples = await PeopleRepository.get(filters)
    const peoplesApi = await getPeople()

    return {
      ...peoplesApi,
      results: peoplesApi.results.concat(peoples)
    }
  }

  async getById(id) {
    const { PeopleRepository } = this.unitOfWork
    const people = await PeopleRepository.getById(id)

    return people
  }

  async create() {
    const { PeopleRepository } = this.unitOfWork
    const people = this.request.post()

    const created = Date(Date.now()).toString()
    const peopleSaved = await PeopleRepository.create({ ...people, created })

    return peopleSaved
  }

  async update(id) {
    const { PeopleRepository } = this.unitOfWork
    const people = this.request.post()

    const rowUpdate = await PeopleRepository.update(id, people)

    if (rowUpdate) {
      const peopleUpdated = await PeopleRepository.getById(id)

      return peopleUpdated
    }

    return {}
  }

  async remove(id) {
    const { PeopleRepository } = this.unitOfWork

    const people = await PeopleRepository.remove(id)

    return people
  }
}

export default PeopleController