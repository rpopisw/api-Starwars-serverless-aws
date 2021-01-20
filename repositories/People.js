import IRepository from './IRepository'

class PeopleRepository extends IRepository {
  constructor(dbContext) {
    super()

    this.dbContext = dbContext

    return this
  }

  async create(people) {
    try {
      const { People } = this.dbContext
      const peopleSaved = await People.create(people)

      return peopleSaved
    } catch (e) {
      console.log(e)
    }
  }

  async update(id, people) {
    try {
      const { People } = this.dbContext
      const peopleSaved = await People.update(people, { where: { id } })

      return peopleSaved
    } catch (e) {
      console.log(e)
    }
  }

  async get(filters) {
    try {
      const { People } = this.dbContext
      const people = await People.findAll(filters)

      return people
    } catch (e) {
      console.log(e)
    }
  }

  async getById(id) {
    try {
      const { People } = this.dbContext
      const people = await People.findOne({ where: { id } })

      return people
    } catch (e) {
      console.log(e)
    }
  }

  async remove(id) {
    const { People } = this.dbContext
    const people = await People.findOne({ where: { id } })

    await People.destroy({ where: { id } })

    return people
  }
}

export default PeopleRepository


