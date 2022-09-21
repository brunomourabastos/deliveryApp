const express = require('express');
const { userRoutes } = require('../modules/user/routes');

const routes = express.Router();

routes.use('/users', userRoutes);

module.exports = {
    routes,
};
