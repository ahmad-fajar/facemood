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
    // console.log('login response', response)

    User.findOne({
      fbid : response.id
    })
    .then(found => {
      // console.log(found)
      if (!found) {
        console.log('ga ada usernya')
        let userData = {
          fbid      : response.id,
          username  : response.name,
          email     : response.email,
          fbtoken   : fbtoken
        }
        User.create(userData)
        .then(created => {
          // jwt.sign(payload, secret)
          let jwttoken = jwt.sign(userData, 'Facemood')
          let data = {username:response.name,jwttoken:jwttoken}
          res.send(data)
        })
      } else {
        console.log('ada usernya')
        let jwttoken = jwt.sign(userData, 'Facemood')
        let data = {username:response.name,jwttoken:jwttoken}
        res.send(data)
      }
    })

  })
}

