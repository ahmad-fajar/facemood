'use strict'
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UsersSchema = mongoose.Schema({
  'username' : {
    type     : String,
    required : true
  },
  'email'    : {
    type     : String,
    required : true
  },
  'fbtoken' : {
    type     : String,
    required : true
  }
})

const Users = mongoose.model('users', UsersSchema);
module.exports = Users;
