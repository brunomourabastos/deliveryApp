const express = require('express');
const { userRoutes } = require('../modules/user/routes');
const { productRoutes } = require('../modules/product/routes');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/products', productRoutes);

module.exports = {
    routes,
};
