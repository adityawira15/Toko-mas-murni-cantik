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

function getDataDetail(){
    return {type: types.GET_DATA_DETAIL}
}

export function getDataMcDetail(id){
    return dispatch => {
        dispatch(getDataDetail())
        return request
            .get(SERVER_URL+'api/mc/'+id)
            .set('Accept', 'application/json')
            .end((err, val) => {
                if(err){
                    dispatch(getDataMcDetailFailure())
                }else{
                    dispatch(getDataMcDetailSuccess(JSON.parse(val.text)))
                }
            })
    }
}

function getDataMcDetailSuccess(data){
    return {type: types.GET_DATA_MC_DETAIL_SUCCESS, data}
}

function getDataMcDetailFailure(){
    return {type: types.GET_DATA_MC_DETAIL_FAILURE}
}

function login(){
    return {type: types.LOGIN}
}

export function loginMc(email, password){
    return dispatch => {
        dispatch(login())
        return request
            .post(SERVER_URL+'login')
            .send({
                email: email,
                password: password
            })
            .set('Accept', 'application/json')
            .end((err, val) => {
                if(err){
                    dispatch(loginMcFailure())
                }else{
                    dispatch(loginMcSuccess(JSON.stringify(val.text)))
                }
            })
    }
}

function loginMcSuccess(data){
    return {type: types.LOGIN_MC_SUCCESS, data}
}

function loginMcFailure(){
    return {type: types.LOGIN_MC_FAILURE}
}