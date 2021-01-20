import { PeopleController } from 'swapi-controllers'
import { unitOfWork } from '../persistence'

const peopleController = new PeopleController(unitOfWork)

module.exports.handler = peopleController.init.bind(peopleController)
