const router = require('express').Router()
const jsonParser = require('body-parser').json()

const {getScrape, postScrape} = require('../middleware/scrape.middleware')

router.get('/', jsonParser, getScrape)
router.post('/', jsonParser, postScrape)

module.exports = router