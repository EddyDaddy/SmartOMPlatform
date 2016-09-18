//creat by zhoujw at 2016/9/17 10:20
import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    ToastAndroid,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Text,
    Navigator,
}from 'react-native';
import Util from '../Utils/Utils.js'
//import {styles} from '../Utils/Styles.js';
import Toolbar from '../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

var dividerWidth = 2*Util.pixel;
var dividerColor = '#d8d8d8';
var keyTextColor = '#666666';
var valueTextColor = '#000';
var keyTextSize = 35*Util.pixel;
var valueTextSize = 35*Util.pixel;
var keyTextWidth = 260*Util.pixel;
var itemHeight = 115*Util.pixel;

var TouchableElement = TouchableHighlight;

import {naviGoBack} from '../Utils/CommonUtil.js';

const LocalStyles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollView:{
        width:screenWidth,
    },
    scrollRootView:{
        width:screenWidth,
        justifyContent: 'flex-start',
    },
    itemStyle:{
        width:screenWidth,
        height:itemHeight,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:dividerWidth,
        borderBottomColor:dividerColor,
        backgroundColor:'#fff',
    },
    keyTextContainer:{
        width:keyTextWidth,
        height:itemHeight,
        //alignItems:'center',
        justifyContent:'center',
        borderRightWidth:dividerWidth,
        borderRightColor:dividerColor,
    },
    keyText:{
        fontSize:keyTextSize,
        textAlign:'right',
        //alignSelf:'flex-end',
        marginRight:30*Util.pixel,
        color:keyTextColor,
    },
    valueTextContainer:{

    },
    valueText:{
        flex:1,
        fontSize:valueTextSize,
        textAlign:'left',
        marginLeft:30*Util.pixel,
        color:valueTextColor,
    },
    btnItemStyle:{
        width:screenWidth,
        flexDirection:'row',
        marginTop:70*Util.pixel,
        backgroundColor:'#ebebeb',
        justifyContent:'center',
    },
    btnStyle:{
        width: 451*Util.pixel, 
        height: 120*Util.pixel, 
        borderRadius: 6, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#ffd57d',
        //elevation:20,
    }
});

class WorkOrderDetail extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        //成员变量需在构造函数中生命
        this._navigator = this.props.navigator;

        // 初始状态
        this.state = {
            entName:'aaa',
            id:'GDHUH20160976889',
            ipInfo:'192.168.1.1  192.168.1.0  255.255.255.255',
            priority:'非常紧急',
            deviceInfo:'J98H-25/1(高清球)',
            address:'成华区建设路',
            addressLongitude:'176',
            addressLatitude:'189',
            statu:'待处理',
            description:'摄像头被遮挡'
        };

        //绑定回调函数和成员方法
        this.processBySelf = this.processBySelf.bind(this);
        this.dispathToOther = this.dispathToOther.bind(this);
    }

    processBySelf(){
        ToastAndroid.show('开始处理', 0.05);
        //this._navigator.push({id: 'Main'});
    }

    dispathToOther(){
        ToastAndroid.show('转派', 0.05);
        //this._navigator.push({id: 'Main'});
    }

    componentDidMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <View style={LocalStyles.container}>
                <Toolbar title={'工单详情'}>
                </Toolbar>
                <ScrollView style={LocalStyles.scrollView}>
                    <View style={LocalStyles.scrollRootView}>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    企业名称
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.entName}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    工单编号
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.id}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    IP地址
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.ipInfo}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    优先级
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.priority}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    设备
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.deviceInfo}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    地址
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.address}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    工单状态
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.statu}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    工单描述
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.description}
                            </Text>
                        </View>
                        <View style={LocalStyles.btnItemStyle}>
                            <TouchableElement style={{marginRight:20*Util.pixel}} onPress={this.processBySelf}>
                                <View style={LocalStyles.btnStyle}>
                                    <Text style={{color: 'red'}}>
                                        开始处理
                                    </Text>
                                </View>
                            </TouchableElement>
                            <TouchableElement style={{marginLeft:20*Util.pixel}} onPress={this.dispathToOther}>
                                <View style={LocalStyles.btnStyle}>
                                    <Text style={{color: 'red'}}>
                                        转派
                                    </Text>
                                </View>
                            </TouchableElement>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default WorkOrderDetail;