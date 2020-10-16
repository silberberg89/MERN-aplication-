const express = require ("express");
const app = express();

const {config} = require('./config/index');
const moviesApi = require('./routes/movies.js');

const {logErrors, errorHandler, wrapErrors } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFoundHandler');
app.set('port', config.port);

// Permite entender peticiones en formato Json. Body parser
app.use(express.json());

moviesApi(app);

// Catch 404
app.use(notFoundHandler);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function(){
  console.log(`Listening http://localhost:${config.port}`);
});