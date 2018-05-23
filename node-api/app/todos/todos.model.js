'use strict';

/**
 * This file is responsible for all of the business logic related to a Todo entity.
 *
 * @param database is a database representation
 * @param createError the createError function to create a new error
 */

module.exports = function(database, createError, logger) {

    /**
     * Get all the ToDo records from the database
     */
    const getTodos = () => {
        return database.findAll();
    };

    /**
     * Create a ToDo record in the database
     *
     * @param title the name of the ToDo item
     */
    const createTodo = (title) => {
        return database.insert({ "title": title });
    };

    /**
     * Update a ToDo record in the database
     *
     * @param key the key for the ToDo entity to update
     * @param updatedTodo The updated record to put in the database
     */
    const updateTodo = (key, updatedTodo) => {
        return database.update(key, updatedTodo)
    };

    return {
        createTodo: createTodo,
        getTodos: getTodos,
        updateTodo: updateTodo
    };
};
