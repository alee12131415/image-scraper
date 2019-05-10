import React from 'react'
import {connect} from 'react-redux'

import {updateView} from '../redux/actions'

const ViewController = ({updateView}) => {
    
    const onClickUpdateView = (view) => {
        updateView(view)
    }
    
    return (
        <center className='viewController'>
            <h3 className='button primary' onClick={() => onClickUpdateView('all')}>ALL</h3>
            <h3 className='button success' onClick={() => onClickUpdateView('complete')}>COMPLETE</h3>
            <h3 className='button warning' onClick={() => onClickUpdateView('in progress')}>IN PROGRES</h3>
            <h3 className='button error' onClick={() => onClickUpdateView('failed')}>FAILED</h3>
        </center>
    )
}

const mapD2P = (dispatch) => {
    return {
        updateView: (view) => {
            dispatch(updateView(view))
        }
    }
}

export default connect(null, mapD2P)(ViewController)