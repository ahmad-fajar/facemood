'use strict'
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

const FB = require('fb');
const fb = new FB.Facebook({version: '2.8'});

// const findUser = response => {
//    User.findOne({
//       fbid : response.id
//     })
//     .then(found => {
//       console.log('dound ', found)
//       // if (!found) {
//       //   console.log('ga ada usernya')
//       //   let userData = {
//       //     fbid      : response.id,
//       //     username  : response.name,
//       //     email     : response.email,
//       //     fbtoken   : fbtoken
//       //   }
//       //   User.create(userData)
//       //   .then(created => {
//       //     // jwt.sign(payload, secret)
//       //     let jwttoken = jwt.sign(userData, 'Facemood')
//       //     let data = {username:response.name,jwttoken:jwttoken}
//       //     res.send(data)
//       //   })
//       // } else {
//       //   console.log('ada usernya')
//       //   let jwttoken = jwt.sign(userData, 'Facemood')
//       //   let data = {username:response.name,jwttoken:jwttoken}
//       //   res.send(data)
//       // }
//     })
//     .catch(err => console.log(err))
// }

// const test = () => console.log('test')
// exports.login = (req, res) => {
//   // User.find({ 
//   //   fbid: '10155427353964651'
//   // })
//   // .then(userData => res.send(userData))
//   // .catch(err => res.send(err))
//   console.log('controller login');
//   let fbtoken = req.headers.fbtoken
//   // console.log('facebook token', fbtoken)
//   FB.setAccessToken(fbtoken)
//   FB.api('/me', {
//     fields: ['id', 'name', 'email']
//   }, function (response) {
//     console.log(response);
//     console.log(User);
//     User.create({
//       fbid: '10155427353964651',
//       username: 'Ahmad Fajar Fauzi',
//       email: 'neo_aziel@yahoo.com',
//       fbtoken:'EAAGqMAcNKMUBAPyCZACU65ZAcafB62RMgR3SRHD6fKl1cMGs5Djnv8D5koKdlEZC2Q49iymvoTfRT18tIb9nZAeGllajr7whZBb0RcM0bVgLtYsaZBe6ODVhtumZAf66yXpPv9kC8K2PTjbWfockZCcvQN69mzYwyp7CYe2bahhxOGotNjpUh9cI2ArOKL583Ka4YF5I9QZAwwQZDZD' 
//     })
//     .then(created => {
//       console.log('aaa');
//       res.send(created)
//     })
//     // User.find({
//     //   fbid: response.id
//     // })
//     // .then(dataUser => {
//     //   console.log('ini data user ', dataUser)
//     //   res.send(dataUser)
//     // })
//     // .catch(err => {
//     //   console.log('ternyata error', err)
//     //   res.send(err)
//     // })
//   })
// }

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
