const actions = {
    VIEW_ALL: 'VIEW_ALL',
    VIEW_COMPLETE: 'VIEW_COMPLETE',
    VIEW_IN_PROGRESS: 'VIEW_IN_PROGRESS',
    VIEW_FAILED: 'VIEW_FAILED',
    UPDATE_SCRAPES: 'UPDATE_SCRAPES'
}

/**
 * Updated view state
 * @param {String} view 'all' 'complete' 'in progress' 'failed'
 */
export const updateView = (view) => {
    let type
    switch (view) {
        case 'all': // Not needed?
            type = actions.VIEW_ALL
            break
        case 'complete':
            type = actions.VIEW_COMPLETE
            break
        case 'in progress':
            type = actions.VIEW_IN_PROGRESS
            break
        case 'failed':
            type = actions.VIEW_FAILED
            break
        default: // Should it default to all?
            type = type.VIEW_ALL
            break
    }

    return {type}
}

export const updateScrapes = (scrapes) => {
    return {
        type: actions.UPDATE_SCRAPES,
        payload: scrapes
    }
}

export default actions
