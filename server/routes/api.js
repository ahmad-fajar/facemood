const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController')

//get expression menerima req.query.url = lemparan dari get result
router.get('/expression', apiController.getExpression)
router.get('/quotes/:mood', apiController.getQuotes)
router.get('/images/:collectionId', apiController.getImage)

//get result menerima req.query.url = url dari gambar yang telah di upload
router.get('/get-result', apiController.getResult)
router.get('/get-feed', apiController.getFeed)

module.exports = router;
