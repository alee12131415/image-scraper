import {applyMiddleware} from 'redux'

const saveStateToSessionStorage = store => next => action => {
    next(action)
    sessionStorage.setItem('state', JSON.stringify(store.getState()))
}

export default applyMiddleware(saveStateToSessionStorage)
