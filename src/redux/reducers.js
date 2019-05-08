import {combineReducers} from 'redux'
import {UPDATE_TITLE as updateTitle, UPDATE_SUBTITLE as updateSub} from './actions'

const title = (state = 'title', action) => {
    switch (action.type) {
        case updateTitle:
            return action.payload
        default:
            return state
    }
}

const subtitle = (state = 'subtitle', action) => {
    switch (action.type) {
        case updateSub:
            return action.payload
        default:
            return state
    }
}

export default combineReducers ({
    title,
    subtitle
})
