import React, {Component} from 'react'
import {connect} from 'react-redux'

import {updateView, updateScrapes} from '../redux/actions'
import {postScrapes, getConditionalScrapes} from '../js/apiHandler'

class StartScrapeModal extends Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
        this.placeholder = 'https://www.google.com\nhttps://www.reddit.com'
    }

    handleInput = (event) => {
        this.setState({value: event.target.value})
    }

    handleSubmit = () => {
        const urls = this.state.value.split('\n')
        postScrapes(urls)
            .then(() => {
                getConditionalScrapes('in_progress')
                    .then((res) => {
                        this.props.updateScrapes(res)
                    })
                    .catch(() => {
                        console.log('ERROR: failed to get scrape job(s)')
                    })
            })
            .catch(() => {
                console.log('ERROR: failed to post scrape job(s)')
            })
        
        this.props.switchToInProgress()
    }

    render() {
        return (
            <div className='modal'>
                <input id='startScrapeModal' type='checkbox' />
                <label htmlFor='startScrapeModal' className='overlay'/>
                <div className='half'>
                    <div className='stack'>
                        <h3>Start Scraping Websites!</h3>
                        <p>Enter a website you would like to scrape</p>
                        <p>Put each url on a new line</p>
                    </div>
                    <textarea className='stack' rows='5' onChange={this.handleInput} placeholder={this.placeholder} />
                    <label htmlFor='startScrapeModal' className='stack button' onClick={this.handleSubmit}>Submit</label>
                </div>
            </div>
        )
    }
}

const mapD2P = (dispatch) => {
    return {
        switchToInProgress: () => {
            dispatch(updateView('in progress'))
        },
        updateScrapes: (scrapes) => {
            dispatch(updateScrapes(scrapes))
        }
    }
}

export default connect(null, mapD2P)(StartScrapeModal)