'use strict'
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const FB = require('fb');
const fb = new FB.Facebook({version: '2.8'});

exports.login = (req, res) => {
  let fbtoken = req.headers.fbtoken
  console.log(fbtoken)
  FB.setAccessToken(fbtoken)
  FB.api('/me', {
    fields: ['id', 'name', 'email']
  }, function (response) {
    // console.log('login response', response.name)
    let userData = {
      username  : response.name,
      email     : response.email,
      fbtoken   : fbtoken
    }
    User.create(userData)
    .then(created => {
      console.log(created)
      console.log(userData);
      // jwt.sign(payload, secret)
      let jwttoken = jwt.sign(userData, 'Facemood')
      // console.log('jwt',token)
      let data = {username:response.name,jwttoken:jwttoken}
      res.send(data)
    })
    .catch(e => console.log(e))
  })
}

