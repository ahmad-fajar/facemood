'use strict'
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UsersSchema = mongoose.Schema({
  'fbid'     : {
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
  'fbtoken'  : {
    type     : String,
    required : true
  },
  'quoteslist' : [{
    type     : Schema.Types.ObjectId,
    ref      : 'quotes'
  }]
})

const Users = mongoose.model('users', UsersSchema);
module.exports = Users;
