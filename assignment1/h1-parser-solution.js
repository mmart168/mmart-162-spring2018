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

        let wordList = []

        // split the web page on the closing h1 tag
        const arrayOfHTMLSnippets = webpageText.split('</h1>')

        // loop through each element of the arrayOfHTMLSnippets
        arrayOfHTMLSnippets.forEach(elem => {
            // split on the closing tag:
            const stuffThatComesAfterEachClosingTag = elem.split('>')
            console.log(stuffThatComesAfterEachClosingTag)

            // get the last chunk of text in the array:
            const innerHTMLLast = stuffThatComesAfterEachClosingTag[stuffThatComesAfterEachClosingTag.length - 1]

            //split the sentence into words:
            const words = innerHTMLLast.split(' ')

            // set the wordList to hold the contents of the old wordList merged
            // with the new words we just found
            wordList = wordList.concat(words)
        })
        //remove the junk:
        wordList.pop()
        // The words are:
        console.log(wordList)

    })
}).on('error', (error) => {
    console.error(`Got error: ${error.message}`)
})
