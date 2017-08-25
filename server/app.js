'use strict'

// const
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose')

// express
const app = express();

// connect mongo
// const url = 'mongodb://hacktiv8:hacktiv8Super@cluster0-shard-00-00-remkh.mongodb.net:27017,cluster0-shard-00-01-remkh.mongodb.net:27017,cluster0-shard-00-02-remkh.mongodb.net:27017/facemood?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'   // atlas
const url = 'mongodb://localhost:27017/facemood'   // local
mongoose.connect(url, () => console.log(' --- Connected  to database ---'))


// cors
app.use(cors())

// body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type : 'application/*+json'}));
app.use(bodyParser.json({ type : 'application/x-www-form-urlencoded'}));

// routes
const facebook = require('./routes/facebook')
const api = require('./routes/api')

app.get('/', (req, res) => res.send('Index Page'));
app.use('/facebook', facebook)
app.use('/api', api)


app.listen(3000, () => console.log('Listening...'))
