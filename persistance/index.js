import UnitOfWork from './UnitOfWork'
import DBContext from './DBContext'

const unitOfWork = new UnitOfWork(DBContext)

export {
  unitOfWork
}