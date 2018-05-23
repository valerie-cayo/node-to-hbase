'use strict';

const bodyParser = require('body-parser');
const express = require('express');

/**
 * Import all of the todo components and return an intialized todo component,
 * which is an instance of the expressjs router
 *
 * @param route is the express router
 * @param createError the createError function to create a new error
 */
module.exports = (createError) => {

    const Model = require('./todos.model.js');
    const Controller = require('./todos.controller.js');
    const Router = require('./todos.router.js');

    /* Parse HTTP request bodies as JSON */
    const route = express.Router();
    route.use(bodyParser.json());

    /* Instantiate the services */
    const model = new Model(createError);

    /* Instantiate the controllers */
    const controller = new Controller(model, createError);

    /* Instantiate the routers */
    const router = new Router(route, controller);

    return router;
}
