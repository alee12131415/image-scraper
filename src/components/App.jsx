import React, {Component} from 'react'
import {connect} from 'react-redux'

import Navbar from './Navbar'
import Section from './Section'
import ViewController from './ViewController'
import StartScrapeModal from './StartScrapeModal'

import {getConditionalScrapes} from '../js/apiHandler'
import {updateScrapes} from '../redux/actions'

class App extends Component {
    constructor() {
        super()
    }

    // Trigger first pull
    componentDidMount = async () => {
        await getConditionalScrapes('all')
            .then((res) => {
                this.props.updateScrapes(res)
            })
            .catch((err) => {
                console.log('ERROR failed initial api call: ' + err)
            })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='main'>
                    <ViewController />
                    <Section />
                    <StartScrapeModal />
                </div>
            </div>
        )
    }
}

const mapD2P = (dispatch) => {
    return {
        updateScrapes: (scrapes) => {
            dispatch(updateScrapes(scrapes))
        }
    }
}

export default connect(null, mapD2P)(App)