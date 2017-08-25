'use strict'
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const QuotesSchema = mongoose.Schema({
  url    : String,
  quotes : String,
  author : String,
  mood   : String
})

const Quotes = mongoose.model('quotes', QuotesSchema);
module.exports = Quotes;
