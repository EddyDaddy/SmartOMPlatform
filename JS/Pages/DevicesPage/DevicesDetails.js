/**
 * Created by Anyone on 2016/9/21.
 */
import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
    Image,
    Text,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';

var screenWidth = Util.size.width;
var screenHeight = Util.size.height;


var dividerColor = '#d8d8d8';
var keyTextColor = '#666666';
var valueTextColor = '#000';

var valueTextSize = Util.pxToTextSize(35);
var keyTextWidth = Util.pxToWidth(260);
var itemHeight = Util.pxToHeight(115);
var dividerWidth = 2 * Util.pixel;
var keyTextSize = Util.pxToTextSize(35);

var TouchableElement = TouchableHighlight;

const DeviceDetailStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        width: screenWidth,
    },
    scrollRootView: {
        width: screenWidth,
        justifyContent: 'flex-start',
    },
    itemStyle: {
        width: screenWidth,
        height: itemHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: dividerWidth,
        borderBottomColor: dividerColor,
        backgroundColor: '#fff',
    },
    keyTextContainer: {
        width: keyTextWidth,
        height: itemHeight,
        //alignItems:'center',
        justifyContent: 'center',
        borderRightWidth: dividerWidth,
        borderRightColor: dividerColor,
    },
    keyText: {
        fontSize: keyTextSize,
        textAlign: 'right',
        //alignSelf:'flex-end',
        marginRight: 30 * Util.pixel,
        color: keyTextColor,
    },
    valueTextContainer: {
    },
    valueText: {
        flex: 1,
        fontSize: valueTextSize,
        textAlign: 'left',
        marginLeft: 30 * Util.pixel,
        color: valueTextColor,
    },
    btnItemStyle: {
        width: screenWidth,
        flexDirection: 'row',
        marginTop: 70 * Util.pixel,
        backgroundColor: '#ebebeb',
        justifyContent: 'center',
    },
    btnStyle: {
        width: 451 * Util.pixel,
        height: 120 * Util.pixel,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd57d',
        //elevation:20,
    }
});

class DeviceDetailItem extends React.Component {
    static defaultProps = {
        leftData: 'left',
        rightData: 'right'
    };
    static propTypes = {
        leftData: React.PropTypes.string.isRequired,
        rightData: React.PropTypes.string.isRequired,
    };

    render() {
        return (
            <View style={DeviceDetailStyles.itemStyle}>
                <View style={DeviceDetailStyles.keyTextContainer}>
                    <Text style={DeviceDetailStyles.keyText}>
                        {this.props.leftData}
                    </Text>
                </View>
                <Text style={DeviceDetailStyles.valueText}>
                    {this.props.rightData}
                </Text>
            </View>
        );
    }
}

export default class DevicesDetails extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        //成员变量需在构造函数中生命
        this._navigator = this.props.navigator;

        // 初始状态
        this.state = {};
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
            <View style={DeviceDetailStyles.container}>
                <Toolbar title={'工单详情'}>
                </Toolbar>
                <ScrollView style={DeviceDetailStyles.scrollView}>
                    <View style={DeviceDetailStyles.scrollRootView}>
                        <DeviceDetailItem leftData='企业名称'
                                          rightData='机场派出所'/>
                        <DeviceDetailItem leftData='辖区'
                                          rightData='普明派出所'/>
                        <DeviceDetailItem leftData='籍号'
                                          rightData='013311'/>
                        <DeviceDetailItem leftData='名称'
                                          rightData='四川成都市按实际对话'/>
                        <DeviceDetailItem leftData='网络'
                                          rightData='联通'/>
                        <DeviceDetailItem leftData='IP地址'
                                          rightData='10.132.20.1'/>
                        <DeviceDetailItem leftData='掩码'
                                          rightData='255.255.255.0'/>
                        <DeviceDetailItem leftData='网关'
                                          rightData='10.132.20.11'/>
                        <DeviceDetailItem leftData='立杆'
                                          rightData='立杆6米，臂长3米'/>
                        <DeviceDetailItem leftData='位置'
                                          rightData='机场'/>
                        <DeviceDetailItem leftData='设备'
                                          rightData='26/1（高清球机）'/>
                        <View style={[DeviceDetailStyles.itemStyle, {height: null}]}>
                            <View style={[DeviceDetailStyles.keyTextContainer, {height: null}]}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <Text style={[DeviceDetailStyles.keyText]}>
                                        地址
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../img/tab_user.png') }
                                       style={{margin: 30 * Util.pixel}}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}