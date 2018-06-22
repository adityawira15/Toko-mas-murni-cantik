import * as types from '../contents/types'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3000/'

function loadData() {
    return { type: types.LOAD_DATA }
}

export function loadDataMc(model, offset) {
    console.log(model, offset)
    return dispatch => {
        dispatch(loadData())
        return request
            .get(SERVER_URL + 'api/mc?model=' + model + '&offset=' + offset)
            .set('Accept', 'application/json')
            .end((err, val) => {
                if (err) {
                    dispatch(loadDataMcFailure())
                } else {
                    dispatch(loadDataMcSuccess(JSON.parse(val.text)))
                }
            })
    }
}

function loadDataMcSuccess(val) {
    return { type: types.LOAD_DATA_MC_SUCCESS, val }
}

function loadDataMcFailure() {
    return { type: types.LOAD_DATA_MC_FAILURE }
}

function getDataDetail() {
    return { type: types.GET_DATA_DETAIL }
}

export function getDataMcDetail(id) {
    return dispatch => {
        dispatch(getDataDetail())
        return request
            .get(SERVER_URL + 'api/mc/' + id)
            .set('Accept', 'application/json')
            .end((err, val) => {
                if (err) {
                    dispatch(getDataMcDetailFailure())
                } else {
                    dispatch(getDataMcDetailSuccess(JSON.parse(val.text)))
                }
            })
    }
}

function getDataMcDetailSuccess(data) {
    return { type: types.GET_DATA_MC_DETAIL_SUCCESS, data }
}

function getDataMcDetailFailure() {
    return { type: types.GET_DATA_MC_DETAIL_FAILURE }
}

function login() {
    return { type: types.LOGIN }
}

export function loginMc(email, password) {
    return dispatch => {
        dispatch(login())
        return request
            .post(SERVER_URL + 'login')
            .send({
                email: email,
                password: password
            })
            .set('Accept', 'application/json')
            .end((err, val) => {
                if (err) {
                    dispatch(loginMcFailure())
                } else {
                    dispatch(loginMcSuccess(JSON.stringify(val.text)))
                }
            })
    }
}

function loginMcSuccess(data) {
    return { type: types.LOGIN_MC_SUCCESS, data }
}

function loginMcFailure() {
    return { type: types.LOGIN_MC_FAILURE }
}

export function addDataMc(title, model, description, price, brand, detail) {
    return dispatch => {
        let id = ''
        request
            .get(SERVER_URL + 'api/mc/length?model=' + model)
            .set('Accept', 'application/json')
            .end((err, val) => {
                let data = JSON.parse(val.text)
                if (err) {
                    console.log(err)
                } else {
                    switch (model) {
                        case 'Cincin':
                            if (data.data.length < 10) {
                                id = `MC000${data.data.length+1}C`
                            } else if (data.data.length < 100) {
                                id = `MC00${data.data.length+1}C`
                            } else if (data.data.length < 1000) {
                                id = `MC0${data.data.lengt+1}C`
                            } else if (data.data.length < 10000) {
                                id = `MC${data.data.length+1}C`
                            }
                            break;
                        case 'Kalung':
                            if (data.data.length < 10) {
                                id = `MC000${data.data.length+1}K`
                            } else if (data.data.length < 100) {
                                id = `MC00${data.data.length+1}K`
                            } else if (data.data.length < 1000) {
                                id = `MC0${data.data.length+1}K`
                            } else if (data.data.length < 10000) {
                                id = `MC${data.data.length+1}K`
                            }
                            break;
                        case 'Liontin':
                            if (data.data.length < 10) {
                                id = `MC000${data.data.length+1}L`
                            } else if (data.data.length < 100) {
                                id = `MC00${data.data.length+1}L`
                            } else if (data.data.length < 1000) {
                                id = `MC0${data.data.length+1}L`
                            } else if (data.data.length < 10000) {
                                id = `MC${data.data.length+1}L`
                            }
                            break;
                        case 'Anting':
                            if (data.data.length < 10) {
                                id = `MC000${data.data.length+1}A`
                            } else if (data.data.length < 100) {
                                id = `MC00${data.data.length+1}A`
                            } else if (data.data.length < 1000) {
                                id = `MC0${data.data.length+1}A`
                            } else if (data.data.length < 10000) {
                                id = `MC${data.data.length+1}A`
                            }
                            break;
                        case 'Gelang':
                            if (data.data.length < 10) {
                                id = `MC000${data.data.length+1}G`
                            } else if (data.data.length < 100) {
                                id = `MC00${data.data.length+1}G`
                            } else if (data.data.length < 1000) {
                                id = `MC0${data.data.length+1}G`
                            } else if (data.data.length < 10000) {
                                id = `MC${data.data.length+1}G`
                            }
                            break;
                        default:
                            console.log('model default')
                            break;

                    }
                    return request
                    .post(SERVER_URL+'adddata')
                    .send({
                        id: id,
                        title: title,
                        model: model,
                        description: description,
                        price: price,
                        brand: brand,
                        detail: detail
                    })
                    .set('Accept', 'application/json')
                    .end((err, val) => {
                        if(err){
                            dispatch(addDataMcFailure())
                        }else{
                            let response = JSON.parse(val.text)
                            dispatch(addDataMcSuccess(response.data))
                        }
                    })
                }
            })
    }
}

function addDataMcSuccess(data){
    return {type: types.ADD_DATA_MC_SUCCESS, data}
}

function addDataMcFailure(){
    return {type: types.ADD_DATA_MC_FAILURE}
}