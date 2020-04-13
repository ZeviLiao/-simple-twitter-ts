const db = require('../../models')
const helpers = require('../../_helpers')
const Tweet = db.Tweet
const User = db.User
const Reply = db.Reply
const Like = db.Like


const adminController = {
  getTweets: (req, res) => {
    return Tweet.findAll({ include: [User, Reply] }).then(tweets => {
      tweets = tweets.map(tweet => ({
        ...tweet.dataValues,
        username: tweet.dataValues.User.name,
        description: tweet.dataValues.description.substring(0, 50),
        comment: tweet.Replies.length >= 1 ? tweet.Replies[0].dataValues.comment.substring(0, 50) : null

      }))
      return res.render('admin/tweets', { tweets: tweets })
    })
  },

  getUsers: (req, res) => {
    return User.findAll({
      include: [
        Tweet,
        Like,
        { model: User, as: "Followers" },
        { model: User, as: 'Followings' }
      ]
    }).then(users => {
      users = users.sort((a, b) => b.Tweets.length - a.Tweets.length)
      res.render('admin/users', { users: users })
    })
  },

  deleteTweets: (req, res) => {
    return Tweet.findByPk(req.params.id).then(tweet => {
      tweet.destroy();
      return res.redirect('/admin/tweets')
    })
  },

  deleteUsers: (req, res) => {
    if (Number(req.params.id) === Number(helpers.getUser(req).id)) {
      console.log('no', Number(req.params.id))
      req.flash('error_messages', `You are cannot delete yourself`)
      return res.redirect('back')
    }
    return User.findByPk(req.params.id).then(user => {
      user.destroy();
      req.flash('success_messages', `You deleted ${user.name}`)
      return res.redirect('/admin/users')
    })
  }
}

module.exports = adminController