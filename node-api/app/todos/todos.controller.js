'use strict';

/**
 * This file is responsible for structing the returning payload and calling
 * the respective model
 *
 * @param model is the model of the api
 */
const hive = require('node-hive').hive;

module.exports = function(model, createError, logger) {

    /**
     * Async method that returns a promise with the result or rejects with a message.
     */
    const getTodos = () => {
        hive.fetch("SELECT * FROM todos", function(err, data) {
            return data
          });
        // return model.getTodos();
    };

    const createTodo = (title) => {
        return model.createTodo(title);
    }

    const updateTodo = (id, changes) => {
        return model.updateTodo(id, changes);
    }

    return {
        createTodo: createTodo,
        getTodos: getTodos,
        updateTodo: updateTodo
    };
};
