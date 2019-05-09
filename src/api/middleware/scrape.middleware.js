
const shortid = require('shortid')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const jimp = require('jimp')

const {createScrape, readScrape, updateScrape} = require('../database')

const siteRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/

/**
 * Scrape job
 * TODO: seperate into own file so we can run as child process
 * @param {String} id
 * @param {String} url
 */
const scrapeImages = async (id, url) => {
    // Create database entry
    await createScrape(id, url, Date.now())

    try {
        // Get html data using a headless browser
        // This way we can get rendered pages over raw html
        const htmlData = await puppeteer.launch()
            .then((browser) => {
                return browser.newPage()
            })
            .then((page) => {
                return page.goto(url, {waitUntil: 'load', timeout: 60000}) // set timeout at 1 min
                    .then(() => {
                        return page.content()
                    })
                    .catch((err) => {
                        throw Error(err)
                    })
            })
            .then((html) => {
                return html
            })
            .catch((err) => {
                throw Error(err)
            })
        
        // Load in html for parsing
        const pageData = cheerio.load(htmlData)

        // Get all image tag elements and map promised to get information about thier scources
        const imagesData = pageData('img').get().map((item) => {
            const source = item.attribs.src
            return jimp.read(source)
                .then((result) => {
                    const area = result.bitmap.width * result.bitmap.height
                    return {area, source}
                })
                .catch(() => {
                    return {area: 0, source}
                })
        })

        // Wait for processing to finish
        const parsedImages = await Promise.all(imagesData)
            .then((result) => {
                return result
            })
            .catch((err) => {
                throw Error(err)
            })
        
        // Get largest image {area, scource}
        const answer = parsedImages.reduce((prev, curr) => {
            return (prev.area > curr.area) ? prev : curr
        })

        updateScrape(id, 'Complete', answer.source)
    } catch (err) {
        updateScrape(id, 'Failed', err.message) // Should commit error message?
    }
}

/**
 * Returns information on a job
 */
const getScrape = async(req, res) => {
    const {id} = req.body

    const result = await readScrape(id)

    res.json({result})
}

/**
 * Triggers a job to scrape
 * 
 * Returns id of scrape job
 */
const postScrape = async (req, res, next) => {
    try {
        // get requested url(s)
        const {url} = req.body

        if (!siteRegex.test(url)) {
            res.status(400).json({error: 'Invalid url'})
        }

        const id = shortid.generate()

        // Start scrape as async
        scrapeImages(id, url)

        res.json({id})
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    getScrape,
    postScrape
}