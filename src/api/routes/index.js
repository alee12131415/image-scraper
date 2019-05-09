const router = require('express').Router()

router.use('/scrape', require('./scrape.route'))

router.use(require('../middleware/util.middleware').catchError)

module.exports = router