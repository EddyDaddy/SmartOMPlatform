/**
 * Created by demon on 2016/9/20.
 */
import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import getWOReducer from './GetWOReducer';

export default index = combineReducers({
    loginReducer,
    getWOReducer,
})
