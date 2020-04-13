const adminTweetService = require('../../../services/tweetAdminService')



const adminTweetController = {
  getTweets: (req, res) => {
    adminTweetService.getTweets(req, res, data => {
      return res.json(data)
    })
  },

  // getTweets: async (req, res) => {
  //   try {
  //     const [tweets] = await Promise.all([
  //       Tweet.findAll({
  //         order: [['id', 'DESC']],
  //         include: [User, { model: Reply, order: [['id', 'ASC']], include: [User] }]
  //       })
  //     ])

  //     tweets.forEach(tweet => {
  //       tweet.date = moment(tweet.createdAt).format('lll')
  //       tweet.time = moment(tweet.createdAt).fromNow(false)
  //       if (tweet.description.length > 50) {
  //         tweet.shortenDescript = tweet.description.slice(0, 50) + ' ...'
  //       } else {
  //         tweet.shortenDescript = tweet.description
  //       }
  //       tweet.Replies.forEach(reply => {
  //         reply.date = moment(reply.createdAt).format('lll')
  //         reply.time = moment(reply.createdAt).fromNow(false)
  //       })
  //     })

  //     res.render('admin/tweets', { tweets, adminNavbar: true })

  //   } catch (err) {
  //     console.error(err)
  //     res.status(500).json(err.toString())
  //   }
  // },
}

module.exports = adminTweetController