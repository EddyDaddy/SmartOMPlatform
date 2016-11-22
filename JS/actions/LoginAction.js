/**
 * Created by demon on 2016/9/20.
 */
import * as types from '../actions/actionTypes'
import {LOGIN_URL} from '../Utils/Request';
import Toast from 'react-native-root-toast';
import {toQueryString} from '../Utils/CommonUtil';

export let loginAction = (userPhone, passWord, token, type, callBack) => {
    return dispatch => {
        dispatch(performLogin());
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: toQueryString({
                'repairUserPhone': userPhone,
                'repairUserPassword': passWord,
                'token': token,
                'deviceType': type,
            })
        };


        fetch(LOGIN_URL, fetchOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Toast.show('请求失败')
                }
            })
            .then((responseData) => {
                console.log('登录时的responseData' + responseData.data);
                callBack(responseData);
                dispatch(receiveLoginResult(responseData));
                if (responseData.code === '0') {
                    Toast.show('登录成功');
                } else {
                    Toast.show(responseData.msg);
                }
            }).catch((error) => {
            Toast.show('网络发生错误,请重试!');
            dispatch(receiveLoginResult(''));
            console.log('ddddd' + error);
        });
    }
}

let performLogin = () => {
    return {
        type: types.FETCH_LOGIN,
    }
}

let receiveLoginResult = (result) => {
    return {
        type: types.RECEIVE_LOGIN,
        data: result
    }
}

export default loginAction;




