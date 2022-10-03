const { Router } = require('express');
const { salesController } = require('./controller');
const { tokenAuth } = require('../../middlewares/tokenAuth');

const salesRoutes = Router();

salesRoutes
  .get('/',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.readAllById(req, res))

  .get('/:id',
    (req, res, next) => tokenAuth.handle(req, res, next), 
    (req, res) => salesController.readOne(req, res))

  .post('/',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.create(req, res))

  .put('/:id',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res, next) => salesController.updateOne(req, res, next))

  .delete('/:id',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.delete(req, res));

module.exports = { salesRoutes };
