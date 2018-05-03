const mongoose = require('mongoose')
const models = require('../models')

const Blog = mongoose.model('Blog', models.Blog)
module.exports = {
    getPosts(req, res) {
        const query = Blog.find().sort('-date_created')
        query.exec((err, blogs) => {
            if (err) {
                return handleError(err)
            }
            res.status(200).send(blogs)
        })
    },
    getPost(req, res) {
        const postID = req.params.postId
        Blog.findById(postID, (err, post) => {
            if (err) {
                return handleError(err)
            }
            res.status(200).send(post)
        })
    },
    addPost(req, res) {
        data = req.body
        data.date_created = new Date()
        const blog = new Blog(data)
        blog.save(function (err, model) {
            if (err) {
                return console.error(err)
            }
            console.log(model, 'saved!!!')
            res.status(201).send({postId: model._id})
        })
    },
    deletePost(req, res) {
        const postID = req.params.postId
        Blog.findByIdAndRemove(postID, (err, blog) => {
            if (err) {
                return console.error(err)
            }
            res.status(204).send()
        })
    }
}
