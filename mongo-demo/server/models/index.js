const mongoose = require('mongoose')

//Define a schema
const BlogSchema = new mongoose.Schema({
    date_created: Date,
    title: String,
    text: String,
    url: String,
    imageURL: String
})

module.exports = mongoose.model('Blog', BlogSchema);
