/**
 * Handles any errors that happens to middleware
 */
const catchError = (err, req, res, next) => {
    if (err) {
        console.log(err)
        res.status(500).send('Internal Server Error')
    } else {
        next()
    }
}

module.exports = {
    catchError
}