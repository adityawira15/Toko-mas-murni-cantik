import * as types from '../contents/types'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/'

export function test(){
    return {type: 'text'}
}

function loadData(){
    return {type: types.LOAD_DATA}
}

export function loadDataMc(){
    return dispatch => {
        dispatch(loadData())
        return request
        .get(SERVER_URL+'api/mc')
        .end((err, response) => {
            if(err){
                dispatch(loadDataMcFailure())
            }else{
                dispatch(loadDataMcSuccess(JSON.parse(response.text)))
            }
        })
    }
}

function loadDataMcSuccess(response){
    return {type: types.LOAD_DATA_MC_SUCCESS, response}
}

function loadDataMcFailure(){
    return {type: types.LOAD_DATA_MC_FAILURE}
}