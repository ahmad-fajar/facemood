'use strict'
require('dotenv').config()
const axios = require('axios')
const ajax = require('ajax-request')
const cheerio = require('cheerio')

module.exports = {
  getExpression: (req, res) => {
    // axios({
    //   method: 'post',
    //   url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBS_KEY
    //   },
    //   data: `{url: ${req.body.url}}`
    // })
    // .then(result => res.send(result.data))
    // .catch(err => {
    //   if (err instanceof Error) {
    //     res.send(err)
    //   } else {
    //     console.log('it worked!');
    //   }
    // })
    ajax.post({
      url: 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize',
      data: `{url: ${req.body.url}}`,
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBS_KEY
      }
    }, (err, result, body) => {
      if (err) res.send(err)
      else res.send(body)
    });
  },

  getQuotes: (req, res) => {
    axios.get(`https://www.brainyquote.com/search_results.html?q=${req.params.mood}`)
    .then(result => {
      let $ = cheerio.load(result.data)
      let quotes = $('.b-qt')
      let tmp = []
      // console.log(quotes);
      // console.log(quotes[0].next.next);
      for(let i = 0; i < quotes.length; i++) {
        tmp.push({
          quotes: quotes[i].children[0].data,
          author: quotes[i].next.next.children[0].data
        })
        // console.log('a', quotes[i].children[0].next)
      }
      console.log(tmp);

      // let text = quotes.map(quote => {
      //   // console.log(quote);
      //   return quote.children('.b-qt').html()
      // })
      // console.log(quotes);
      res.send(text)
    })
    .catch(err => {
      res.send(err)
    })
  }
}
