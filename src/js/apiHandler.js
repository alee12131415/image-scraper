import axios from 'axios'

/**
 * @param {String} endpoint GET /api/scrape/THIS_HERE
 * @returns {Promise<Object[]|boolean>} false if failed
 */
export const getConditionalScrapes = (endpoint) => {
    return axios({
        method: 'get',
        url: '/api/scrape/' + endpoint,
    })
        .then((res) => {
            return res.data.result
        })
        .catch(() => {
            return false
        })
}

export const getSingleScrape = (id) => {
    return axios({
        method: 'get',
        url: '/api/scrape/' + id
    })
        .then((res) => {
            return res.data.result
        })
        .catch(() => {
            return false
        })
}

export const postScrapes = (scrapes) => {
    return axios({
        method: 'post',
        url: '/api/scrape',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            url: scrapes
        }
    })
        .then((res) => {
            console.log(res.data.result)
            return res.data.result
        })
        .catch(() => {
            return false
        })
}