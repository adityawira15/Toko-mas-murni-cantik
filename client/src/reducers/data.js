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
        case types.GET_DATA_DETAIL:
            return state
        case types.GET_DATA_MC_DETAIL_SUCCESS:
            return action.data
        case types.GET_DATA_MC_DETAIL_FAILURE:
            return state
        case types.LOGIN:
            return state
        case types.LOGIN_MC_SUCCESS:
            return state
        case types.LOGIN_MC_FAILURE:
            return state
        default:
            return state
    }
}