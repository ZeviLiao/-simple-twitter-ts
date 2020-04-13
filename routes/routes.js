const express = require('express')
const router = express.Router()

// 引入passport參數
const passport = require('../config/passport')

const tweetController = require('../controllers/tweetController.js')
const userController = require('../controllers/userController.js')
const replyController = require('../controllers/replyController.js')
const adminController = require('../controllers/admin/adminController.js')
const multer = require('multer')
const upload = multer({ dest: 'temp/' })

const helpers = require('../_helpers')


const authenticated = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    return next()
  }
  res.redirect('/signin')
}
const authenticatedAdmin = (req, res, next) => {
  if (helpers.ensureAuthenticated(req)) {
    if (req.user.role === 'Admin') { return next() }
    return res.redirect('/')
  }
  res.redirect('/signin')
}

// Home routes
router.get('/', (req, res) => { res.redirect('/tweets') })

// Sign up.in.out routes 
router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin', failureFlash: true }), userController.signIn)
router.get('/logout', userController.logout)

// tweet routes
router.get('/tweets', authenticated, tweetController.getTweets)
router.post('/tweets', authenticated, tweetController.postTweet)

// users routes
router.get('/users/:id/tweets', authenticated, userController.getUser)
router.get('/users/:id/edit', authenticated, userController.editUser)
//router.get('/users/:id', authenticated, userController.getUser)
router.post('/users/:id/edit', authenticated, upload.single('image'), userController.putUser)


// reply routes
router.get('/tweets/:tweetId/replies', authenticated, replyController.getReply)
router.post('/tweets/:tweetId/replies', authenticated, replyController.postReply)

// followship routes
router.post('/followships', authenticated, userController.postFollowing)
router.delete('/followships/:followingId', authenticated, userController.deleteFollowing)
router.get('/users/:id/followings', authenticated, userController.getFollowings)
router.get('/users/:id/followers', authenticated, userController.getFollowers)

// like routes
router.post('/tweets/:id/like', authenticated, tweetController.getLike)
router.delete('/tweets/:id/unlike', authenticated, tweetController.deleteLike)
router.get('/users/:id/likes', authenticated, userController.getLikes)

// admin routes
router.get('/admin/tweets', authenticatedAdmin, adminController.getTweets)
router.delete('/admin/tweets/:id', authenticatedAdmin, adminController.deleteTweets)
router.get('/admin/users', authenticatedAdmin, adminController.getUsers)
router.delete('/admin/users/:id', authenticatedAdmin, adminController.deleteUsers)


module.exports = router