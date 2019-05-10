import React, {Component} from 'react'
import {connect} from 'react-redux'

// NO LONGER USED

class Viewport extends Component {
    getView = (view) => {
        switch(view) {
            case 'all':
                return <h1>ALL</h1>
            case 'complete':
                return <h1>COMPLETE</h1>
            case 'in progress':
                return <h1>IN PROGRESS</h1>
            case 'failed':
                return <h1>FAILED</h1>
            default:
                return <h1>DEFAULT</h1>
        }
    }

    render() {
        const view = this.props.view

        const viewComponent = this.getView(view)

        return viewComponent
    }
}

const mapS2P = (state) => {
    return {
        view: state.view
    }
}

export default connect(mapS2P)(Viewport)