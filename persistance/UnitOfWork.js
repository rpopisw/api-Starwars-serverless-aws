import {
  FilmRepository,
  PeopleRepository
} from 'swapi-repositories'

class UnitOfWork {
  constructor(dbContext) {
    this.dbContext = dbContext

    this.FilmRepository = new FilmRepository(dbContext)
    this.PeopleRepository = new PeopleRepository(dbContext)
  }

}

export default UnitOfWork 