import React, {Component} from 'react'

/**
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
                        <tr key={item[0]}>
                            {item.map((i) => {
                                return <td key={item[0] + i}>{i}</td>
                            })}
                        </tr>
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