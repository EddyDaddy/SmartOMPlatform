/**
 * Created by demon on 2016/9/21.
 */

import * as types from '../actions/actionTypes.js';

const initialState = {
    WorkOrderList: '',
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
}

let getWOReducer = (state = initialState, action) => {
    switch (action.type) {
        //开始
        case types.FETCH_WORKORDER:
            console.log('isLoading--->' + action.isLoading);
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: true,
                isLoading: action.isLoading,
            });
        case types.RECEIVE_WORKORDER:
            return Object.assign({}, state, {
                    // WorkOrderList: state.isLoadMore ? state.WorkOrderList.concat(action.workOrderList) : action.workOrderList,
                    WorkOrderList: action.workOrderList,
                    isRefreshing: false,
                    isLoading: false,
                }
            )
                ;
        default:
            return state;
    }

}

export default getWOReducer;
