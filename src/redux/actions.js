const types = {
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_SUBTITLE: 'UPDATE_SUBTITLE'
}

export const updateTitle = (title) => {
    return {
        type: types.UPDATE_TITLE,
        payload: title
    }
}

export default types
