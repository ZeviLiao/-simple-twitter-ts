const strftime = require('strftime')
const helpers = require('../_helpers')
const db = require('../models')
const User = db.User
const Tweet = db.Tweet
const Reply = db.Reply
const Like = db.Like
const Followship = db.Followship

const tweetController = {
  getTweets: (req, res) => {
    return Tweet.findAll({ include: [User, Reply, Like], order: [['updatedAt', 'DESC']] }).then(tweets => {
      tweets = tweets.map(tweet => ({
        ...tweet.dataValues,
        description: tweet.dataValues.description.substring(0, 140),
        createdAt: strftime('%Y-%m-%d, %H:%M', tweet.dataValues.createdAt),
        replyNums: tweet.dataValues.Replies.length,
        likeNums: tweet.dataValues.Likes.length,
        //userId: tweet.UserId
        isLiked: tweet.dataValues.Likes.map(d => d.UserId).includes(helpers.getUser(req).id)
      }))
      //console.log(tweets)
      User.findAll({
        include: [
          { model: User, as: 'Followers' }
        ]
      }).then(users => {
        users = users.map(user => ({
          ...user.dataValues,
          introduction: user.dataValues.introduction != null ? user.dataValues.introduction.substring(0, 140) : null,
          FollowCount: user.Followers.length,
          isFollowed: helpers.getUser(req).Followings.map(d => d.id).includes(user.id)
        }))
        users = users.sort((a, b) => b.FollowerCount - a.FollowerCount).slice(0, 10)
        return res.render('tweets', { users: users, tweets: tweets })
      })
    })
  },

  postTweet: (req, res) => {
    let content = req.body.description.trim()
    if (content.length === 0 || content.length > 120) {
      req.flash('error_messages', "Description cannot be blank or more than 120 words")
      return res.redirect('back')
    }
    return Tweet.create({
      UserId: helpers.getUser(req).id,
      description: req.body.description
    })
      .then((tweet) => {
        req.flash('success_messages', 'Tweet was successfully created')
        return res.redirect('back')
      })
  },

  getLike: (req, res) => {
    return Like.create({
      UserId: helpers.getUser(req).id,
      TweetId: req.params.id
    })
      .then(like => {
        //console.log(like)
        return res.redirect('back')
      })
  },

  deleteLike: (req, res) => {
    return Like.findOne({
      where: {
        UserId: helpers.getUser(req).id,
        TweetId: req.params.id
      }
    }).then(like => {
      //console.log(like)
      like.destroy();
      //console.log(like)
      return res.redirect('back')

    })
  },

}

module.exports = tweetController