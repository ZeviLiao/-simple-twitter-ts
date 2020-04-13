const express = require('express')
const router = express.Router()

const adminTweetController = require('../controllers/api/admin/adminTweetController')

router.get('/admin/tweets', adminTweetController.getTweets)


module.exports = router