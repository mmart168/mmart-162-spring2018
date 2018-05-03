module.exports = {
    posts: require('./posts.js'),
    sayHello: (request, response) => {
        return response.status(200).send({
            'message': 'Hello There!'
        })
    },
    generateShortenedURL: (request, response) => {
        return response.status(201).send({
            'message': 'We received your request',
            'data': request.body
        })
    },
}
