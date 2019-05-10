
const shortid = require('shortid')
const puppeteer = require('puppeteer')
const cheerio = require('cheerio')
const jimp = require('jimp')

const {createScrape, readScrape, readScrapesByStatus, readAllScrapes, updateScrape, deleteScrape: dbDeleteScrape} = require('../database')

const siteRegex = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
const protocolRegex =/^https?:\/\//

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
        const htmlData = await puppeteer.launch({args: ['--no-sandbox']}) // no-sandbox for puppeteer heroku buildpack fix
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
            let source = item.attribs.src
            // fix for same origin sources
            if (/^\//.test(source)) {
                source = url + source
            }

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
        
        // Put first image into entry
        if (parsedImages.length > 0) {
            updateScrape(id, 'In Progress', parsedImages.source)
        }

        // Get largest image {area, scource}
        const answer = parsedImages.reduce((prev, curr) => {
            // When a next largest image is found, update the database entry
            if (curr.area > prev.area) {
                updateScrape(id, 'In Progress', curr.source)
                return curr
            } else {
                return prev
            }
        })

        updateScrape(id, 'Complete', answer.source)
    } catch (err) {
        updateScrape(id, 'Failed', err.message) // Should commit error message?
    }
}

/**
 * Returns information on multiple scrapes
 * 
 * Input from query of ids seperated by commas
 */
const getMultipleScrapes = async (req, res) => {
    // Validate input
    if (!req.query.hasOwnProperty('ids')) {
        res.json({error: 'Invalid input'})
        return
    }
    
    const ids = req.query.ids.split(',')

    let result = ids.map((id) => {
        return readScrape(id)
    })

    result = await Promise.all(result)
        .then((res) => {
            return res
        })
        .catch((err) => {
            throw Error(err)
        })

    res.json({result})
}

/**
 * Return information on a single scrape
 * 
 * Input from wildcard endpoint
 */
const getSingleScrape = async (req, res) => {
    const {id} = req.params

    const result = await readScrape(id)

    res.json({result})
}

const getConditionalScrape = ((condition) => {
    return async (req, res) => {
        const result = await readScrapesByStatus(condition)
        res.json({result})
    }
})

const getAllScrapes = async (req, res) => {
    const result = await readAllScrapes()
    res.json({result})
}

/**
 * Triggers a job to scrape
 * 
 * If parameter urls is present, it will trigger scrapes from the array
 * Else it will do a single scrape from url parameter (string)
 * 
 * Will either return an array of ids (urls) or a id string (url)
 */
const postScrape = async (req, res) => {
    // get requested url(s)
    const {url} = req.body

    // If given an array, create multiple jobs, else create a single job
    let result
    if (Array.isArray(url)) {
        result = url.map((u) => {
            return setupScrape(u)
        })
    } else {
        result = setupScrape(url)
    }

    res.json({result})
}

/**
 * Starts single scrape job and returns the id
 * 
 * @param {String} url url to scrape
 * @returns {String} id
 */
const setupScrape = (url) => {
    // Validate url
    if (!siteRegex.test(url)) {
        return {error: 'Invalid url'}
    }

    // Assume http if no protocol is provided
    if (!protocolRegex.test(url)) {
        url = 'http://' + url
    }

    // Create job id
    const id = shortid.generate()

    // Start job
    scrapeImages(id, url)

    return {id}
}

const deleteScrape = async (req, res) => {
    const {id} = req.params

    const result = await dbDeleteScrape(id)

    res.json({result})
}

module.exports = {
    getConditionalScrape,
    getSingleScrape,
    getMultipleScrapes,
    getAllScrapes,
    postScrape,
    deleteScrape
}