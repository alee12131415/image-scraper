import React from 'react'
import {connect} from 'react-redux'

import {updateView, updateScrapes} from '../redux/actions'

import {getConditionalScrapes} from '../js/apiHandler'

const ViewController = ({updateView, updateScrapes}) => {
    
    const onClickUpdateView = async (view, endpoint) => {
        getConditionalScrapes(endpoint)
            .then((res) => {
                if (res !== false) {
                    updateScrapes(res)
                } else {
                    throw Error('Something went wrong with the api call')
                }
            })
            .catch((err) => {
                console.log('ERROR: ' + err)
            })
        updateView(view)
    }
    
    return (
        <center className='viewController'>
            <h3 className='button primary' onClick={() => onClickUpdateView('all', 'all')}>ALL</h3>
            <h3 className='button success' onClick={() => onClickUpdateView('complete', 'complete')}>COMPLETE</h3>
            <h3 className='button warning' onClick={() => onClickUpdateView('in progress', 'in_progress')}>IN PROGRESS</h3>
            <h3 className='button error' onClick={() => onClickUpdateView('failed', 'failed')}>FAILED</h3>
        </center>
    )
}

const mapD2P = (dispatch) => {
    return {
        updateView: (view) => {
            dispatch(updateView(view))
        },
        updateScrapes: (scrapes) => {
            dispatch(updateScrapes(scrapes))
        }
    }
}

export default connect(null, mapD2P)(ViewController)