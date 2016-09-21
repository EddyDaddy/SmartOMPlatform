/**
 * Created by demon on 2016/9/21.
 */

import * as types from '../actions/actionTypes.js';

const initialState = {
    WorkOrderList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
}

let getWOReducer = (state = initialState, action) => {
    switch (action.type){
        //开始
        case types.FETCH_LOGIN:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            });
        case types.RECEIVE_LOGIN:
            return Object.assign({}, state, {
                WorkOrderList: state.isLoadMore ? state.WorkOrderList.concat(action.workOrderList) : action.workOrderList,

                isRefreshing: false,
                isLoading: false,
            });
        default:
            return state;
    }

}

export default getWOReducer;
