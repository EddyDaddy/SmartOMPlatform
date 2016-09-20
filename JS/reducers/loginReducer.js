/**
 * Created by demon on 2016/9/20.
 */
import * as types from '../actions/actionTypes.js';

const initialState = {
    loading: false,
    data: ''
}

let loginReducer = (state = initialState, action) => {
    switch (action.type){
        //开始
        case types.FETCH_LOGIN:
            return Object.assign({}, state, {
                loading: action.loading,
            });
        case types.RECEIVE_LOGIN:
            return Object.assign({}, state, {
               loading: action.loading,
               data: action.data
            });
        default:
            return state;
    }

}

export default loginReducer;
