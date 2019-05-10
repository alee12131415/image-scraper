import React, {Component} from 'react'

import store from '../redux/store'

import {deleteScrape, updateScrapesList} from '../js/apiHandler'

/**
 * props:
 *  - scrapeInfo [id, url, status, time]
 */
class ScrapeRow extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
    }

    handleOnClick = () => {
        this.setState({isOpen: !this.state.isOpen})
    }

    handleDelete = (id) => {
        deleteScrape(id)
            .then(() => {
                updateScrapesList()
            })
        this.setState({isOpen: false})
    }

    render() {
        if (this.state.isOpen) {
            // Get job information from state and show it
            // FIXME: <div> cannot appear as a child of <tbody>
            // FIXME: download button does not work as browsers remove cross origin downloading
            const scrapeId = this.props.scrapeInfo[0]
            const {id, url, status, time_start, result} = store.getState().scrapes.filter((item) => {
                return item.id === scrapeId
            })[0]
            const timeDateObject = new Date(parseInt(time_start))
            return (
                <div>
                    <div>
                        <h3 className='scrapeDetail scrapeDetailHeader'>ID: </h3>
                        <p className='scrapeDetail'>{id}</p>
                    </div>
                    <div>
                        <h3 className='scrapeDetail scrapeDetailHeader'>URL: </h3>
                        <p className='scrapeDetail'>{url}</p>
                    </div>
                    <div>
                        <h3 className='scrapeDetail scrapeDetailHeader'>status: </h3>
                        <p className='scrapeDetail'>{status}</p>
                    </div>
                    <div>
                        <h3 className='scrapeDetail scrapeDetailHeader'>Time Start: </h3>
                        <p className='scrapeDetail'>{timeDateObject.toUTCString()}</p>
                    </div>
                    <div>
                        <h3 className='scrapeDetail scrapeDetailHeader'>Largest Image: </h3>
                        {(() => {
                            if (status === 'Failed' || result === '') {
                                return <p className='scrapeDetail'>No Image Available</p>
                            } else {
                                return <img className='scrapeDetail' src={result} />
                            }
                        })()}
                    </div>
                    <div>
                        <button className='scrapeDetail error' onClick={() => {this.handleDelete(id)}}>DELETE SCRAPE</button>
                        {(() => {
                            if (status !== 'Failed' && url !== '') {
                                return <a className='scrapeDetail button success' href={result} download>DOWNLOAD IMAGE</a>
                            }
                        })()}
                        <button className='scrapeDetail primary' onClick={this.handleOnClick}>CLOSE</button>
                    </div>
                </div>
            )
        } else {
            const [id, url, status, time] = this.props.scrapeInfo
            return (
                <tr onClick={this.handleOnClick}>
                    <td>{id}</td>
                    <td>{url}</td>
                    <td>{status}</td>
                    <td>{time}</td>
                </tr>
            )
        }
    }
}

export default ScrapeRow