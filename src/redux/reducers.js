import {combineReducers} from 'redux'
import a from './actions'

const view = (state = 'all', action) => {
    switch(action.type) {
        case a.VIEW_ALL:
            return 'all'
        case a.VIEW_COMPLETE:
            return 'complete'
        case a.VIEW_IN_PROGRESS:
            return 'in progress'
        case a.VIEW_FAILED:
            return 'failed'
        default:
            return state
    }
}

const scrapes = (state = [], action) => {
    switch(action.type) {
        case a.UPDATE_SCRAPES:
            return action.payload
        default:
            return state
    }
}

export default combineReducers ({
    view,
    scrapes
})
