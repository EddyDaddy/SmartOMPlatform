// obtained from react native tutorials

import React from 'react'
import {PixelRatio} from 'react-native';
import Dimensions from 'Dimensions';
import Toast from 'react-native-root-toast';
import { toQueryString } from './CommonUtil';

const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },

  //zjw add.
  pxToWidth(num) {
    let screenWidthReference = this.size.width>this.size.height?1920:1080;
    return (this.size.width*num)/screenWidthReference;
  },
  pxToHeight(num) {
    let screenHeightReference = this.size.width>this.size.height?1080:1920;
    return (this.size.height*num)/screenHeightReference;
  },
  pxToTextSize(num) {
    let screenHeightReference = this.size.width>this.size.height?1080:1920;
    return (this.size.height*num)/screenHeightReference;
  },

  post(url, data, callback) {
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
      if(response.ok) {
        return response.json()
      }else{
        Toast.show('请求失败')
      }
    })
    .then((responseData) => {
      console.log('请求参数：'+toQueryString(data));
      console.log('请求结果：'+JSON.stringify(responseData));
      callback(responseData);
    }).catch(
        (error) => {
            callback('');
            console.log('错误信息：'+error);
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
