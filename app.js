const express = require('express')
const handlebars = require('express-handlebars')
const helpers = require('./_helpers')
const db = require('./models')
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('./config/passport')
const methodOverride = require('method-override')
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const app = express()
const port = process.env.PORT || 3000

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  helpers: require('./config/handlebar-helpers.js')
}))
app.set('view engine', 'handlebars')
//app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = helpers.getUser(req)
  next()
})
app.use('/upload', express.static(__dirname + '/upload'))
// use helpers.getUser(req) to replace req.user
// use helpers.ensureAuthenticated(req) to replace req.isAuthenticated()

require('./routes')(app)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app

