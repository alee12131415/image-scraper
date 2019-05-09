const express = require('express')
const compression = require('compression')
const path = require('path')

// Setup database
const setupDatabase = async () => {
    const db = require('./src/api/database')
    await db.connect()
    await db.scrapesTable()
}

// Setup express
let app = express()

app.set('port', app.get('env') === 'production' ? process.env.PORT ? process.env.PORT : 3000 : 8000)
app.use(compression())

app.use('/public', express.static('dist'))
app.use('/api', require('./src/api/routes'))
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

// Start app
Promise.all([setupDatabase()])
    .then(() => {
        app.listen(app.get('port'), () => console.log(`application running on port ${app.get('port')}`))
    })
    .catch((err) => {
        console.log('Failed to launch app\n' + err)
        process.exit()
    })


