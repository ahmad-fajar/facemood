'use strict'
require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')
const path = require('path')
const multer  =   require('multer');
// const host = 'https://face-mood.herokuapp.com'
const host = 'http://localhost:3000'

module.exports = {
  getExpression: (req, res) => {
    // axios({
    //   method: 'post',
    //   url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBS_KEY
    //   },
    //   data: `{url: '${req.query.url}'}`,
    //   responseType:'json'
    // })
    // .then(result => {
      let scores = req.body.scores
      let keys = Object.keys(scores)

      let mood = keys.reduce((a, b) => {return scores[a] > scores[b] ? a : b})
      let collectionId

      switch (mood) {
        case 'anger': collectionId = 926781; break;
        case 'contempt': collectionId = 526331; break;
        case 'disgust': collectionId = 844439; break;
        case 'fear': collectionId = 263320; break;
        case 'happiness': collectionId = 297157; break;
        case 'neutral': collectionId = 140375; break;
        case 'sadness': collectionId = 662074; break;
        case 'surprise': collectionId = 932821; break;
      }

      res.send({
        mood: mood,
        collectionId: collectionId
      })
    // })
    // .catch(err => {
    //   res.send(err)
    // })
  },

  getQuotes: (req, res) => {
    axios.get(`https://www.brainyquote.com/search_results.html?q=${req.params.mood}`)
    .then(result => {
      let $ = cheerio.load(result.data)
      let quotes = $('.b-qt')
      let tmp = []

      for(let i = 0; i < quotes.length; i++) {
        tmp.push({
          quotes: quotes[i].children[0].data,
          author: quotes[i].next.next.children[0].data
        })
      }

      let randIndex = Math.floor(Math.random()*tmp.length)
      res.send(tmp[randIndex])
    })
    .catch(err => {
      res.send(err)
    })
  },

  getImage: (req, res) => {
    let collectionId = req.params.collectionId
    // axios.get('http://localhost:3000/fake-unsplash')
    axios.get(`https://api.unsplash.com/collections/${collectionId}/photos/?client_id=${process.env.UNSPLASH_API_KEY}&per_page=15`)
    .then(result => {
      let images = result.data
      let randIndex = Math.floor(Math.random()*images.length)
      let image = images[randIndex]
      res.send({
        url: image.urls.regular
      })
    })
    .catch(err => {
      res.send(err)
    })
  },

  getResult: (req, res) => {
    // console.log('req', req.query.url);
    // const host = 'https://face-mood.herokuapp.com'
    // const host = 'http://localhost:3000'
    // console.log(req.body);
    axios.post(`${host}/api/expression`, req.body)
    .then(({data}) => {
      return Promise.all([
        axios.get(`${host}/api/images/${data.collectionId}`),
        axios.get(`${host}/api/quotes/${data.mood}`),
        new Promise((resolve, reject) => {
          resolve(data.mood)
        })
      ])
    })
    .then(result => {
      res.send({
        url: result[0].data.url,
        quotes: result[1].data.quotes,
        author: result[1].data.author,
        mood: result[2]
      })
    })
    .catch(err => {
      res.send(err)
    })
  },

  upload: (req, res) => {
    // console.log('test');
    var uploadPath = path.join(__dirname, '../images/')
    var storage =   multer.diskStorage({
      destination: function (req, file, callback) {
        callback(null, uploadPath);
      },
      filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
      }
    });
    var upload = multer({ storage : storage}).single('userPhoto');
    upload(req,res,function(err) {
      // console.log('test');
      if(err) {
        // return res.send(err);
        console.log(err);
      }

      console.log(req.file.path);
      axios.get(`${host}/api/get-result?url=${req.file.path}`)
      .then(({data}) => {
        res.send(data)
      })
      .catch(err => {
        res.send(err)
      })
    });
  }
}
