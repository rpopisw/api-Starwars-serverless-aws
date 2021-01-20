class FilmDto {
    constructor(entity) {
      this.id = entity.id
      this.created = entity.created
      this.director = entity.director
      this.edited = entity.edited
      this.episode_id = entity.episode_id
      this.opening_crawl = entity.opening_crawl
      this.producer = entity.producer
      this.release_date = entity.release_date
      this.title = entity.title
      this.url = entity.url
      this.characters = entity.characters
      this.planets = entity.planets
      this.starships = entity.starships
      this.vehicles = entity.vehicles
      this.species = entity.species
    }
  }
  
  export default FilmDto