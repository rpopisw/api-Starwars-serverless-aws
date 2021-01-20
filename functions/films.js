import { FilmsController } from 'swapi-controllers'
import { unitOfWork } from '../persistence'

const filmsController = new FilmsController(unitOfWork)

module.exports.handler = filmsController.init.bind(filmsController)
