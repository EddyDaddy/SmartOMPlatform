// obtained from react native tutorials

import React from 'react'
import {PixelRatio, Platform} from 'react-native';
import Dimensions from 'Dimensions';
import Toast from 'react-native-root-toast';
import {toQueryString} from './CommonUtil';
import Login from '../Pages/Login';

const Util = {
    status_bar_height: Platform.OS === 'iOS' ? 20 : 25,
    ratio: PixelRatio.get(),
    pixel: 1 / PixelRatio.get(),
    size: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },

    //zjw add.
    pxToWidth(num) {
        let screenWidthReference = this.size.width > this.size.height ? 1920 : 1080;
        return (this.size.width * num) / screenWidthReference;
    },
    pxToHeight(num) {
        let screenHeightReference = this.size.width > this.size.height ? 1080 : 1920;
        return (this.size.height * num) / screenHeightReference;
    },
    pxToTextSize(num) {
        let screenHeightReference = this.size.width > this.size.height ? 1080 : 1920;
        return (this.size.height * num) / screenHeightReference;
    },

    //工单的一些状态
    returnPriType(type){
        switch (type) {
            case '4':
                return '非常紧急';
            case '3':
                return '紧急';
            case '2':
                return '一般';
            case '1':
                return '低';
            default:
                return '未知状态';
        }
    },

    returnStatus(status){
        switch (status) {
            case '0':
                return '待处理';
            case '99':
                return '已完成';
            default:
                return '未知';
        }
    },

    post(url, data, navigator, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: toQueryString(data)
        };

        fetch(url, fetchOptions)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    Toast.show('请求失败')
                }
            })
            .then((responseData) => {
                console.log('请求参数：' + toQueryString(data));
                console.log('请求结果：' + JSON.stringify(responseData));
                if (responseData !== undefined) {
                    if (responseData.code === '-109' || responseData.code === '-110') {
                        navigator.resetTo({
                            name: 'Login',
                            component: Login
                        })
                    } else {
                        console.log(JSON.stringify(responseData.data));
                        callback(responseData);
                    }

                }
            }).catch(
            (error) => {
                callback('');
                console.log('错误信息：' + error);
            }
        );
    },
    key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;
