import React, {Component} from 'react'
import {connect} from 'react-redux'

import List from './List'

const sections = ['id', 'url', 'status', 'time']

/**
 * props:
 *  - getScrapes
 */
class ScrapeList extends Component {
    constructor() {
        super()
        this.state = {
            isLoaded: false
        }
    }

    getHeaderClass = (view) => {
        switch(view) {
            case 'complete':
                return 'success'
            case 'in progress':
                return 'warning'
            case 'failed':
                return 'error'
            default:
                return 'primary'
        }
    }

    render() {
        // if (this.props.scrapes.length < 1) {
        //     return <h1>Nothing to list</h1>
        // }

        const headerClass = this.getHeaderClass(this.props.view)

        const rows = this.props.scrapes.map(({id, url, status, time_start}) => {
            const d = new Date(parseInt(time_start))
            return [id, url, status, d.toUTCString()]
        })
        
        return (
            <List sections={sections} rows={rows} headerClass={headerClass} />
        )
    }
}

const mapS2P = (state) => {
    return {
        view: state.view,
        scrapes: state.scrapes
    }
}

export default connect(mapS2P)(ScrapeList)