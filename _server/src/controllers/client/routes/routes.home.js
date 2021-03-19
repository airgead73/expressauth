const { Router } = require('express');
const homeRouter = Router();

// actions
const {
  v_home,
  v_profile
} = require('./../actions/actions.home');

// middleware
const { requiresAuth } = require('express-openid-connect');

// router

homeRouter
  .route('/')
  .get(v_home);

homeRouter
  .route('/profile')
  .get(requiresAuth(), v_profile);

module.exports = {
  homeRouter
}
