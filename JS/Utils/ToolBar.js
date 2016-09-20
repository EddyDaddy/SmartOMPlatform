/**
 * Created by demon on 2016/9/14.
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Navigator,
    TouchableOpacity
}from 'react-native';
import Util from '../Utils/Utils.js';
import {naviGoBack} from '../Utils/CommonUtil.js';
import {styles} from '../Utils/Styles.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var _navigator;
export default class ToolBar extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        // 初始状态
        this.state = {};
    }

    render() {
        var title = this.props.title;
        var left = this.props.left;
        var right = this.props.right;

        if (this.props.left) {
            var leftView = (
                <TouchableOpacity onPress={this._navigator.pop()}>
                    <Text style={{color: 'white', marginLeft: screenWidth/60}}>
                        返回
                    </Text>
                </TouchableOpacity>
            )
        }
        if (this.props.right) {
            var rightView = (
                <Text style={{color: 'white', marginRight: screenWidth/60}}>
                    保存
                </Text>
            )
        }
        return (
            <View style={{flexDirection: 'row', backgroundColor: '#3fd0a7'}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                    {leftView}
                </View>
                <View
                    style={{width: screenWidth*0.6, height: screenWidth/7.6, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'white', fontSize: screenWidth/20}}>
                        {title}
                    </Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                    {rightView}
                </View>
            </View>
        );
    }
}