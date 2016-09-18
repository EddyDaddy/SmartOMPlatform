/**
 * Created by demon on 2016/9/14.
 * 设备页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    ToastAndroid,
    View,
    Text,
    Navigator,
}from 'react-native';
import Util from '../Utils/Utils.js'
import {styles} from '../Utils/Styles.js';
import Toolbar from '../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
export default class DevicesPage extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        return (
            <Toolbar title={'设备'}>

            </Toolbar>
        );
    }
}