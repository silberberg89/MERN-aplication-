const { config } = require('../../config');
const boom = require('@hapi/boom')

// Determino si agrego el stack o no
function withErrorStack(error, stack) {
  // si estamos en entorno desarrollo
  if (config.dev) {
    return { ...error, stack};
  }
  return error;
}

// Manejamos los errores del middleware
function logErrors(err, rq, res, next) {
  console.log(err);
  next(err);
}

// Validar que el error sea tipo Boom
function wrapErrors(err, req, res, next) {
  if (!err.IsBoom) {
    next(boom.badImplementation(err));
  }
  next(err)
}

function errorHandler(err, req, res, next) { //eslint-disable-line

  const {
    output: {
      satusCode,
      payload
    }
  } = error;
  //Determinar el estado del error
  res.status(satusCode);

  // Devolvemos el error en estado json 
  res.json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
}