/**
 * In dev, create a connection with config.js
 * exports.database = {
 *  connectionString: CONNECTION_STRING,
 *  ssl: true
 * }
 */
const Client = require('pg').Client

const dbClient = new Client(
    process.env.NODE_ENV === 'production'
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: true
        }
        : require('../../../config').database
)

// declare constants
const TABLE_SCRAPES = 'SCRAPES'

const SCRAPE_ID = 'id' // unique job identifier
const SCRAPE_URL = 'url' // job url
const SCRAPE_STATUS = 'status' // In Progress, Complete, Failed
const SCRAPE_TIME = 'time_start' // time start in ms
const SCRAPE_RESULT = 'result' // url to largest image, empty string if nothing

/**
 * Connect to database
 */
exports.connect = async () => {
    await dbClient.connect()
        .then(() => {
            console.log('Connected to database')
        })
        .catch(err => {
            console.log('Failed to connect to database\n' + err)
        })
}

/**
 * Create scrapes table if it does not exist
 */
exports.scrapesTable = async () => {
    await dbClient.query(`create table if not exists ${TABLE_SCRAPES} (${SCRAPE_ID} text not null, ${SCRAPE_URL} text not null, ${SCRAPE_STATUS} text not null, ${SCRAPE_TIME} int8 not null, ${SCRAPE_RESULT} text not null DEFAULT '', primary key (${SCRAPE_ID}))`)
}

// Scrapes CRUD

/**
 * Creates a row for the job
 * 
 * @param {String} id
 * @param {String} url
 * @param {Number} time
 */
exports.createScrape = async (id, url, time) => {
    try {
        await dbClient.query(`insert into ${TABLE_SCRAPES} (${SCRAPE_ID}, ${SCRAPE_URL}, ${SCRAPE_STATUS}, ${SCRAPE_TIME}, ${SCRAPE_RESULT}) values ($1, $2, $3, $4, $5)`, [id, url, 'In Progress', time, ''])
        return {id, status: true}
    } catch (err) {
        return {id, status: false}
    }
}

/**
 * Return information on a single scrape
 * 
 * @param {String} id
 */
exports.readScrape = async (id) => {
    try {
        const {rows} = await dbClient.query(`select ${SCRAPE_ID}, ${SCRAPE_URL}, ${SCRAPE_STATUS}, ${SCRAPE_TIME}, ${SCRAPE_RESULT} from ${TABLE_SCRAPES} where ${SCRAPE_ID}=$1`, [id])
        return rows[0]
    } catch (err) {
        return null
    }
}

exports.readScrapesByStatus = async (status) => {
    try {
        const {rows} = await dbClient.query(`select ${SCRAPE_ID}, ${SCRAPE_URL}, ${SCRAPE_STATUS}, ${SCRAPE_TIME}, ${SCRAPE_RESULT} from ${TABLE_SCRAPES} where ${SCRAPE_STATUS}=$1`, [status])
        return rows
    } catch (err) {
        return null
    }
}

exports.readAllScrapes = async () => {
    try {
        const {rows} = await dbClient.query(`select ${SCRAPE_ID}, ${SCRAPE_URL}, ${SCRAPE_STATUS}, ${SCRAPE_TIME}, ${SCRAPE_RESULT} from ${TABLE_SCRAPES}`)
        return rows
    } catch (err) {
        return null
    }
}

/**
 * Updates job 
 * 
 * @param {String} id
 * @param {String} status
 * @param {String} result
 */
exports.updateScrape = async (id, status, result = '') => {
    try {
        await dbClient.query(`update ${TABLE_SCRAPES} set ${SCRAPE_STATUS}=$1, ${SCRAPE_RESULT}=$2 where ${SCRAPE_ID}=$3`, [status, result, id])
        return {id, status: true}
    } catch (err) {
        return {id, status: false}
    }
}

/**
 * Deletes job row
 * 
 * @param {String} id
 */
exports.deleteScrape = async (id) => {
    try {
        await dbClient.query(`delete from ${TABLE_SCRAPES} where ${SCRAPE_ID}=$1`, [id])
        return {id, status: true}
    } catch (err) {
        return {id, status: false}
    }
}