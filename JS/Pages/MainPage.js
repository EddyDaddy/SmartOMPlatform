/**
 * Created by demon on 2016/9/14.
 * 首页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Navigator,
}from 'react-native';
import Util from '../Utils/Utils.js'
import {styles} from '../Utils/Styles.js';
import Toolbar from '../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
export default class MainPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        return (
            <View >
                <Toolbar title={'首页'}>

                </Toolbar>
                <View style={{flex: 1, backgroundColor: '#ebebeb'}}>

                </View>
            </View>
        );
    }
}
