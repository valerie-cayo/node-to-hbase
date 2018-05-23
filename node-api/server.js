'use strict';
/**
 * This is the entrypoint to the API.
 */

const config = require('./config/config.js');
const databaseConnection = require('./utils/database-connection.js');
const phoenixConnector = require('./utils/phoenix-conn.js');
const express = require('express');
const logger = require('./config/logger.config.js');
const os = require('os');

const errorHandler = require('./utils/error-handler.js')(logger);

// App
const app = express();

// Wrap express().listen into a promise
const listen = (expressApp, port) => {
  return new Promise((resolve, reject) => {
      expressApp.listen(port, () => {
          logger.info(`api-server: listening on ${os.hostname()}:${port}`);
          resolve();
      });
  });
};

/**
 * Initialize the express application along with anything else that needs initialization before starting the webserver.
 * This is the startup of API server itself.
 *
 * We instantiate a database connection, and turn on the server.
 * Following that
 */
Promise.all([
  listen(app, config.port),

  /**
   * Replace the following with your MySQL/MongoDB/Redis/Whatever-db connection
   */
  // databaseConnection()
])
/**
* All initialized entities, such as the express app, and the  are passed through, such as the database
*/
.then((initializedEntities) => {
  /**
   * Import the API endpoints. Each component is an instance of an ExpressJS router.
   * Here the application (general utility) component, and the ToDos component are loaded.
   */
  const todosComponent = require('./app/todos')(initializedEntities[1], errorHandler.createError);

  /**
   * Bind all of the API endpoints to the express application.
   * Bind the application component with no mountpoint, so the application component executes for each HTTP request.
   * Bind the todos component with the /todos, so the todos component executes for each HTTP request that goes to /todos.
   */

  app.use('/todos', todosComponent);

  /**
   * If the middleware above this hasn't sent back a response, then there was no matching endpoint. We send back an HTTP 404.
   */
  app.use((req, res, next) => {
      next(new errorHandler.createError());
  });

  /**
   * This is the error handling middleware, all errors that are passed to middleware are processed here.
   */
  app.use(errorHandler.logErrors);
  app.use(errorHandler.knownErrorHandler);
  app.use(errorHandler.unknownErrorHandler);

})
.catch((reason) => {
  // Log the error to the console and exits the program
  logger.error(`api-server: ${reason.stack}`);
  process.exit(1);
});
