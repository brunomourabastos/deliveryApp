const express = require('express');
const { usersController } = require('./controller');

const userRoutes = express.Router();

userRoutes
  .get('/', (req, res) => usersController.getAllCommonUsers(req, res))

  .delete(
    '/:userId',
    (req, res, next) => tokenAuthentication.handle(req, res, next),
    (req, res) => usersController.deleteUser(req, res),
  )

  .post(
    '/login',
    (req, res, next) => loginValidation.validate(req, res, next),
    (req, res) => usersController.loginUser(req, res),
  )

  .post(
    '/register/admin',
    (req, res, next) => tokenAuthentication.handle(req, res, next),
    (req, res, next) => adminRegisterValidation.validate(req, res, next),
    (req, res) => usersController.registerAdminUser(req, res),
)

  .post(
    '/register',
    (req, res, next) => commonRegisterValidation.validate(req, res, next),
    (req, res) => usersController.registerCommonUser(req, res),
  );

  module.exports = {
    userRoutes,
  };