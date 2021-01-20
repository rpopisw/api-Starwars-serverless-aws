import {
  FilmRepository
} from 'swapi-repositories'

class UnitOfWork {
  constructor(dbContext) {
    this.dbContext = dbContext

    this.FilmRepository = new FilmRepository(dbContext)
  }

}

export default UnitOfWork 