const db = require('../models')
const strftime = require('strftime')
const Reply = db.Reply
const User = db.User
const Tweet = db.Tweet
const Like = db.Like
const helpers = require('../_helpers')

let replyController = {
  postReply: (req, res) => {
    if (!req.body.comment) {
      req.flash('error_messages', 'comment didn\'t exist')
      return res.redirect('back')
    } else {
      return Reply.create({
        comment: req.body.comment,
        TweetId: req.params.tweetId,
        UserId: helpers.getUser(req).id
      })
        .then((reply) => {
          res.redirect(`/tweets/${req.params.tweetId}/replies`)
        })
    }
  },

  getReply: (req, res) => {
    return Tweet.findByPk(req.params.tweetId, {
      include: [
        {
          model: User, include: [
            Like,
            { model: User, as: 'Followers' },
            { model: User, as: 'Followings' }
          ]
        },
        { model: Reply, include: [User] },
        Like
      ]
    }).then(tweet => {
      Tweet.findAndCountAll({
        where: { UserId: tweet.dataValues.User.id }
      }).then(tweets => {
        let replies = tweet.Replies.map(reply => ({
          ...reply.dataValues,
          createdAt: strftime('%Y-%m-%d, %H:%M', reply.dataValues.createdAt)
        }))
        let isFollowed = ''

        if (Number(tweet.dataValues.User.id) === Number(helpers.getUser(req).id)) {
          isFollowed = 'self'
        } else {
          if (helpers.getUser(req).Followings.map(d => d.id).includes(tweet.dataValues.User.id)) {
            isFollowed = 'unfollow'
          } else {
            isFollowed = 'follow'
          }
        }
        //console.log(helpers.getUser(req).Likes.length)
        let isLiked = helpers.getUser(req).Likes.length > 0 ? helpers.getUser(req).Likes.map(d => d.TweetId).includes(tweet.id) : null
        return res.render('reply', {
          tweet: tweet,
          description: tweet.description.substring(0, 140),
          createdAt: strftime('%Y-%m-%d, %H:%M', tweet.dataValues.createdAt),
          replies: replies,
          replyTweets: replies.length,
          likedTweets: tweet.dataValues.User.Likes.length,
          followings: tweet.dataValues.User.Followings.length,
          followers: tweet.dataValues.User.Followers.length,
          tweetNums: tweets.count,
          likeNums: tweet.Likes.length,
          isFollowed: isFollowed,
          isLiked: isLiked
        })
      })
    })
  }
}
module.exports = replyController