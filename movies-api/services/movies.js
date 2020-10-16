const MongoLib = require('../lib/mongo');

class moviesService{

  constructor(){
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  // obtener peliculas
  //@tags            Nos sirve para filtrar peliculas por tags
  async getMovies({ tags }){

    // Si existen los tags, los guardamos en la query
    const query = tags && { tags: {$in: tags }}

    const movies = await this.mongoDB.getAll(this.collection, query);
    return movies || [];
  }

  // obtener pelicula
  //@movieId            ID de la pelicula que queremos traer
  async getMovie({ movieId }){
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }

  // crear pelicula
  //@movie            Pelicula que queremos crear
  async createMovie({ movie }){
    const createMovieId = await this.mongoDB.create(this.collection, movie);
    return createMovieId || {};
  }

  // crear pelicula
  //@movieId          Id de la pelicula
  //@movie            Nuevos datos de la pelicula
  async updateMovie({ movieId, movie } = {}){
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie);
    return updatedMovieId || {};
  }

  // borrar pelicula
  //@movieId          Id de la pelicula que queremos eliminar
  async deleteMovie({movieId}){
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId || {};
  }
}

module.exports = moviesService;