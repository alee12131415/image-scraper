import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'

import './style.css'

import store from './redux/store'

import App from './components/App'

const Main = () => {
    return (
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    )
}

render(<Main />, document.getElementById('root'))
