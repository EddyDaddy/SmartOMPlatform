/**
 * Created by demon on 2016/9/20.
 */
import * as types from '../actions/actionTypes'
import FetchHttpClient, {form, header} from 'fetch-http-client';
import {LOGIN_URL} from '../Utils/Request';
import Toast from 'react-native-root-toast';
const client = new FetchHttpClient(LOGIN_URL);

let loginAction = (userPhone, passWord, callBack) => {
    return dispatch => {
        dispatch(performLogin());
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/json'
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: toQueryString({
                'repairUserPhone': userPhone,
                'repairUserPassword': passWord,
            })
        };

        function toQueryString(obj) {
            return obj ? Object.keys(obj).sort().map(function (key) {
                var val = obj[key];
                if (Array.isArray(val)) {
                    return val.sort().map(function (val2) {
                        return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
                    }).join('&');
                }

                return encodeURIComponent(key) + '=' + encodeURIComponent(val);
            }).join('&') : '';
        }

        fetch(LOGIN_URL, fetchOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Toast.show('请求失败')
                }
            })
            .then((responseData) => {
                console.log(responseData);
                callBack(responseData);
                dispatch(receiveLoginResult(responseData));
                if (responseData.code === '0') {
                    Toast.show('登录成功');
                } else {
                    Toast.show(responseData.msg);
                }
            }).catch((error) => {
            Toast.show('网络发生错误,请重试!');
            console.log('ddddd'+error);
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
