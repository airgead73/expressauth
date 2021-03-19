const { Router } = require('express');
const { homeRouter } = require('./routes.home');


const clientRouter = Router();

clientRouter.use('/', homeRouter);

module.exports = {
  clientRouter
}