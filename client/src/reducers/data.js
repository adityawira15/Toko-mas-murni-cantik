import * as types from '../contents/types'

let initialState = {
    data: [],
    response: []
}

export default function data(state = initialState, action) {
    switch (action.type) {
        case 'text':
            console.log('masuk')
            return state
        case types.LOAD_DATA:
            return state
        case types.LOAD_DATA_MC_SUCCESS:
            return action.val
        case types.LOAD_DATA_MC_FAILURE:
            return state
        default:
            return state
    }
}