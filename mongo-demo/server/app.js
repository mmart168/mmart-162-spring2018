//import libraries:
const express = require('express')
const errorhandler = require('errorhandler')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongodb = require('mongodb')
const cors = require('cors')
const routes = require('./routes')
const mongoose = require('mongoose')
var mongoDB = 'insert_your_database_url_here';

// start the express app:
const app = express()

// create the database connection
const DATABASE_NAME = 'my_blog_database'
const MONGODB_URI = 'mongodb://localhost:27017/' + DATABASE_NAME
mongoose.connect(MONGODB_URI)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error'))

// include the middleware:
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())
app.use(cors())

// create the routes:
app.get('/', routes.sayHello)
app.get('/posts', routes.posts.getPosts)
app.get('/posts/:postId', routes.posts.getPost)
app.post('/posts', routes.posts.addPost)
app.delete('/posts/:postId', routes.posts.deletePost)

app.post('/urls', routes.generateShortenedURL)

app.listen(3000)
