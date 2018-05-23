'use strict';

/**
 * This file is responsible for creating all the route and calling upon the
 * respective controller
 *
 * @param route is the express router
 * @param controller the controller for the API
 */

module.exports = function(route, controller) {

    /**
     * Get all of the To Do objects
     */
    // route.get('/', (req, res, next) => {
    //     controller.getTodos()
    //         .then((todos) => res.status(200).send(todos))
    //         .catch(next);
    // });

    /**
     * Create a To Do object
     */
    route.post('/', (req, res, next) => {
        controller.createTodo(req.body.title)
            .then((todo) => res.status(201).send(todo))
            .catch(next);
    });

    /**
     * Update a To Do object. This does PUT updates, not PATCH updates, so the
     * whole entity is re-written, not select fields.
     */
    route.put('/:id', (req, res, next) => {
        controller.updateTodo(req.params.id, req.body)
            .then((updatedRecord) => res.status(200).send(updatedRecord))
            .catch(next);
    });

    app.get('/', (req, res) => {
        res.send('Hello world\n');
    });

    return route;
};
