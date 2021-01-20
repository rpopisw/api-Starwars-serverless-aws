class IRepository {
  constructor() {
    if (this.create === undefined) throw new Error('Must override .create() method.')
    if (this.update === undefined) throw new Error('Must override .update() method')
    if (this.get === undefined) throw new Error('Must override .get() metod')
    if (this.getById === undefined) throw new Error('Must override .getById() method')
    if (this.remove === undefined) throw new Error('Must override .remove() method')
  }
}

export default IRepository