/**
 * Handles any errors that happens to middleware
 * 
 * @param {*} err 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
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