const { Router } = require('express');
const { salesController } = require('./controller');
const { tokenAuth } = require('../../middlewares/tokenAuth');

const salesRoutes = Router();

salesRoutes
  .get('/',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.readBySellerId(req, res))

  .get('/:id',
    (req, res, next) => tokenAuth.handle(req, res, next), 
    (req, res) => salesController.readOne(req, res))

  .post('/',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.create(req, res))

  .put('/:id',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.updateOne(req, res))

  .delete('/:id',
    (req, res, next) => tokenAuth.handle(req, res, next),
    (req, res) => salesController.delete(req, res));

module.exports = { salesRoutes };
