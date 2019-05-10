import React, {Component} from 'react'

import ScrapeRow from './ScrapeRow'

/**
 * No longer agnostic, specific rows are now tied to ScrapeRow component
 * 
 * props:
 *  - sections
 *  - rows
 *  - headerClass
 */
class List extends Component {
    constructor() {
        super()
    }

    generateSections = () => {
        return (
            <thead>
                <tr>
                    {this.props.sections.map((item) => {
                        return <th key={item}>{item}</th>
                    })}
                </tr>
            </thead>
        )
    }

    generateRows = () => {
        return (
            <tbody>
                {this.props.rows.map((item) => {
                    return (
                        <ScrapeRow key={item[0]} scrapeInfo={item} />
                    )
                })}
            </tbody>
        )
    }

    render() {

        const table = (
            <table className={this.props.headerClass}>
                {this.generateSections()}
                {this.generateRows()}
            </table>
        )
        return table
    }
}

export default List