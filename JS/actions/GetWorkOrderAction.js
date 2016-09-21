/**
 * Created by demon on 2016/9/21.
 */

import * as types from '../actions/actionTypes'
import * as urls from '../Utils/Request';
import Toast from 'react-native-root-toast';
import {toQueryString} from '../Utils/CommonUtil';

let getWOAction = (repairUserPhone, userToken, status, isLoadMore, isRefreshing, isLoading) => {
    return dispatch => {
        dispatch(performWorkOrder(isLoadMore, isRefreshing, isLoading));
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            },
            body: toQueryString({
                'repairUserPhone': repairUserPhone,
                // 'userToken': userToken,
                'status': status,
            })
        };
        fetch(urls.WORKORDER_URL, fetchOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Toast.show('请求失败')
                }
            })
            .then((responseData) => {
                console.log('responseData内容是' + responseData.json());
                dispatch(receiveWorkOrderResult(responseData.data));
                if (responseData.code === '0') {
                    Toast.show('获取成功');
                } else {
                    Toast.show(responseData.msg);
                }
            }).catch((error) => {
            Toast.show('网络发生错误,请重试!');
            dispatch(receiveWorkOrderResult([]));
            console.log('ddddd获取工单接口错误' + error);
        });
    }
};

let performWorkOrder = (isLoadMore, isRefreshing, isLoading) => {
    return {
        type: types.FETCH_WORKORDER,
        isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
};

let receiveWorkOrderResult = (result) => {
    return {
        type: types.RECEIVE_WORKORDER,
        workOrderList: result
    }
};

export default getWOAction;
