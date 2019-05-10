import axios from 'axios'

import store from '../redux/store'

import {updateScrapes} from '../redux/actions'

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
            return res.data.result
        })
        .catch(() => {
            return false
        })
}

export const deleteScrape = (id) => {
    return axios({
        method: 'delete',
        url: '/api/scrape/' + id,
    })
        .then((res) => {
            return res.data.result
        })
        .catch(() => {
            return false
        })
}

export const updateScrapesList = () => {
    let view = store.getState().view

    if (view === 'in progress') {
        view = 'in_progress'
    }

    getConditionalScrapes(view)
        .then((res) => {
            if (res !== false) {
                store.dispatch(updateScrapes(res))
            }
        })
}