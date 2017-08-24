const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController')

//get expression menerima req.body.url = url dari gambar yang telah di upload
router.post('/get-expression', apiController.getExpression)
router.get('/quotes/:mood', apiController.getQuotes)

module.exports = router;
