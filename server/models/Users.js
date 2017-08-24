'use strict'
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UsersSchema = mongoose.Schema({
  'name'     : {
    type     : String,
    required : true
  },
  'username' : {
    type     : String,
    required : true
  },
  'email'    : {
    type     : String,
    required : true
  },
  'fb_token' : {
    type     : String,
    required : true
  }
})

const Users = mongoose.model('users', UsersSchema);
module.exports = Users;
