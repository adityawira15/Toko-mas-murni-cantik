import { applyMiddleware, createStore } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk';

export default function configureStore(initialState){
    let enhancer = applyMiddleware(thunk)
    let store = createStore(rootReducer, initialState, enhancer)
    return store
}