const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController')

//get expression menerima req.query.url = lemparan dari get result
router.post('/expression', apiController.getExpression)
router.get('/quotes/:mood', apiController.getQuotes)
router.get('/images/:collectionId', apiController.getImage)

//get result menerima req.query.url = url dari gambar yang telah di upload
router.post('/get-result', apiController.getResult)

router.post('/upload-image', apiController.upload)

module.exports = router;
