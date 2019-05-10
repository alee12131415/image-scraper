const router = require('express').Router()
const jsonParser = require('body-parser').json()

const {getConditionalScrape, getSingleScrape, getMultipleScrapes, getAllScrapes, postScrape} = require('../middleware/scrape.middleware')

router.get('/all', getAllScrapes)
router.get('/complete', getConditionalScrape('Complete'))
router.get('/in_progress', getConditionalScrape('In Progress'))
router.get('/failed', getConditionalScrape('Failed'))
router.get('/:id', getSingleScrape)
router.get('/', getMultipleScrapes)

router.post('/', jsonParser, postScrape)

router.delete('/:id')

module.exports = router