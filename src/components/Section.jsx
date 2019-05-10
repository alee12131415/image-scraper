import React, {Component} from 'react'

import List from './List'

const sections = ['section 1', 'section 2']
const rows = [
    ['hello', 0],
    ['world', 1]
]

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
                <h1>{this.props.title}</h1>
                <List sections={sections} rows={rows} className='warning' />
            </div>
        )
    }
}

export default Section