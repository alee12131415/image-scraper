import React, {Component} from 'react'
import {connect} from 'react-redux'

import ScrapeList from './ScrapeList'

/**
 * props
 * - title
 */
class Section extends Component {
    constructor() {
        super()
    }



    render() {
        return (
            <div>
                <h1>{this.props.view.toUpperCase()}</h1>
                <ScrapeList />
            </div>
        )
    }
}

const mapS2P = (state) => {
    return {
        view: state.view
    }
}

export default connect(mapS2P)(Section)