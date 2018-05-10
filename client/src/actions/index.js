import * as types from '../contents/types'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/'

export function test(){
    return {type: 'text'}
}

function loadData(){
    return {type: types.LOAD_DATA}
}

export function loadDataMc(model, offset){
    console.log(model, offset)
    return dispatch => {
        dispatch(loadData())
        return request
        .get(SERVER_URL+'api/mc?model='+model+'&offset='+offset)
        .set('Accept' , 'application/json')
        .end((err, val) => {
            if(err){
                dispatch(loadDataMcFailure())
            }else{
                dispatch(loadDataMcSuccess(JSON.parse(val.text)))
            }
        })
    }
}

function loadDataMcSuccess(val){
    return {type: types.LOAD_DATA_MC_SUCCESS, val}
}

function loadDataMcFailure(){
    return {type: types.LOAD_DATA_MC_FAILURE}
}