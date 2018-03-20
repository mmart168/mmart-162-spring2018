const https = require('https')
const url = 'https://github.com'
https.get(url, (response) => {
    let webpageText = ''
    response.on('data', (chunk) => {
        webpageText += chunk.toString('utf8')
    })
    response.on('end', () => {
        // convert the entire webpage to lowercase:
        webpageText = webpageText.toLowerCase()

        // 1. split the web page on the closing h1 tag
        const arrayOfHTMLSnippets = webpageText.split('</h1>')

        // 2. for each snippet, get the words contained within the
        // h1 tag using the map function:
        const arrayOfH1Text = arrayOfHTMLSnippets.map( elem => {
            const afterTagSnippets = elem.split('>')
            const lastOne = afterTagSnippets[afterTagSnippets.length - 1]
            //get all of the words by splitting on the spaces of the sentence:
            return lastOne.split(' ')
        })

        // 3. for each array of words, merge them all together using the reduce
        // function:
        const arrayOfWords = arrayOfH1Text.reduce((a, b) => {
            return a.concat(b)
        })

        // 4. filter out the noise using the filter function:
        const words = arrayOfWords.filter(word => {
            return word !== '\n\n'
        })
        console.log(words)

    })
}).on('error', (error) => {
    console.error(`Got error: ${error.message}`)
})
