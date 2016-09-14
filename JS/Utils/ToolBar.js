/**
 * Created by demon on 2016/9/14.
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
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
export default class MainPage extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        var title = this.props.title;
        return (
            <View style={{width: screenWidth, height: screenWidth/7.6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#3fd0a7'}}>
                <Text style={{color: 'white', fontSize: screenWidth/30}}>
                    {title}
                </Text>
            </View>
        );
    }
}