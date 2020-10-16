const express = require('express');
const MoviesService = require('../services/movies');
const validationHandler = require('../utils/middleware/validationHandler')
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema  
} = require('../utils/schemas/movies')

function moviesApi (app){
  const router = express.Router();
  app.use("/api/movies", router);

  // Instanciar el servicio
  const moviesService = new MoviesService();

  // Obtener listado de peliculas
  router.get("/", async function(req, res, next){
    const { tags } = req.query;
    try{
      const movies = await moviesService.getMovies({ tags });

      res.status(200).json({
        data: movies,
        message: 'movies listed'
      })


    }catch(err){
      next(err);
    }

  });

  // Obtener pelicula
  router.get("/:movieId", validationHandler({movieId: movieIdSchema}, 'params'), async function(req, res, next){
    const { movieId } = req.params;
    try{
      const movies = await moviesService.getMovie({movieId})

      res.status(200).json({
        data: movies,
        message: 'movies retrieved'
      })


    }catch(err){
      next(err);
    }

  });
  // Creación de la pelicula
  router.post("/", validationHandler(createMovieSchema), async function(req, res, next){
    const { body: movie } = req;
    try{
      const createMovieId = await moviesService.createMovie({movie});

      res.status(201).json({
        data: createMovieId,
        message: 'movie created'
      })


    }catch(err){
      next(err);
    }

  });
    // Actualizar pelicula
    router.put("/:movieId", validationHandler({movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema), async function(req, res, next){
      const { movieId } = req.params;
      const { body: movie } = req;

      try{
        const updatedMovieId = await moviesService.updateMovie({movieId, movie});
  
        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated'
        })
  
  
      }catch(err){
        next(err);
      }
  
    });
    // Eliminar pelicula
    router.delete("/:movieId",  validationHandler({movieId: movieIdSchema}, 'params'), async function(req, res, next){
      const { movieId } = req.params;
      try{
        const deletedMovieId = await moviesService.deleteMovie({ movieId });
  
        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted'
        })
  
  
      }catch(err){
        next(err);
      }
  
    });
};

module.exports = moviesApi;