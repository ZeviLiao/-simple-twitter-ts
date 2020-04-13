const db = require('../models')
//const helpers = require('../../_helpers')
const { Tweet, User, Reply } = db



const adminTweetService = {
  getTweets: async (req, res, cb) => {
    try {
      let [tweets] = await Promise.all([
        Tweet.findAll({
          order: [['id', 'DESC']],
          include: [User, { model: Reply, order: [['id', 'ASC']], include: [User] }]
        })
      ])
      // tweets 資料重整
      tweets = tweets.map(tweet => ({
        ...tweet.dataValues,
        description: tweet.dataValues.description.length > 50 ?
          tweet.dataValues.description.slice(0, 50) + '...' : tweet.dataValues.description
      }))

      cb({ tweets: tweets })
    } catch (err) {
      console.log(err)
      cb(err.toString())
    }

  }
}

module.exports = adminTweetService