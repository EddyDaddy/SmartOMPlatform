/**
 *
 * Created by demon on 2016/9/20.
 */


import { createStore, applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import index from '../reducers/index';

let store = createStore(index,{},compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))
export default store;