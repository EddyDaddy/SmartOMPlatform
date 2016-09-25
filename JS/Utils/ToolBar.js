/**
 * Created by demon on 2016/9/14.
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Navigator,
    Image,
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
        // this._navigator = this.props.navigator;
        // 初始状态
        this.rightCallBack = this.props.rightCallBack;
        this.state = {};
    }

    render() {
        var title = this.props.title;
        var left = this.props.left;
        var right = this.props.right;
        const {navigator} = this.props;
        if (this.props.left) {
            var leftView = (
            <TouchableOpacity onPress={() => naviGoBack(navigator)}>
                <Image style={{marginLeft: screenWidth/18, height: screenWidth/18, width: screenWidth/27}}
                       source={require('../Pages/img/back.png')}/>
            </TouchableOpacity>
        )
        }
        if(Object.prototype.toString.call(this.props.right) === "[object String]"){
            var rightView = (
                <TouchableOpacity
                    onPress={
                        this.rightCallBack
                    }>
                    <Text style={{color: 'white', marginRight: screenWidth/50}}>
                        {this.props.right}
                    </Text>
                </TouchableOpacity>
            )
        }else if (this.props.right) {
            var rightView = (
                <Text style={{color: 'white', marginRight: screenWidth/50}}>
                    保存
                </Text>
            )
        }
        return (
          <View style={{flexDirection: 'column'}}>
            <View style={{height:Util.status_bar_height,backgroundColor: '#3fd0a7'}}></View>
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
          </View>
        );
    }
}
