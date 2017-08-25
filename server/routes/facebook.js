'use strict'

const router = require('express').Router();
const ctrl = require('../controllers/facebookCtrl');
const FB = require('fb');

const fb = new FB.Facebook({version: '2.8'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next();
}

router.get('/login', setAccessToken, ctrl.login)

module.exports = router;
