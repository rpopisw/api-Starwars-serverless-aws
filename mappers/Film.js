class FilmMapping {
    constructor(filmDTO) {
      this.filmDTO = filmDTO
    }
  
    toSpanish() {
      const { filmDTO } = this
  
      return {
        id: filmDTO.id,
        creado: filmDTO.created,
        director: filmDTO.director,
        editado: filmDTO.edited,
        episodio_id: filmDTO.episode_id,
        rastreo_apertura: filmDTO.opening_crawl,
        productor: filmDTO.producer,
        fecha_lanzamiento: filmDTO.release_date,
        titulo: filmDTO.title,
        url: filmDTO.url,
        actores: filmDTO.characters,
        planetas: filmDTO.planets,
        naves_espaciales: filmDTO.starships,
        vehiculos: filmDTO.vehicles,
        especies: filmDTO.species
      }
    }
  }
  
  export default FilmMapping