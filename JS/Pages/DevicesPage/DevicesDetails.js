/**
 * Created by Anyone on 2016/9/21.
 */
import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    View,
    Image,
    Text,
    Alert,
    InteractionManager
}from 'react-native';
import Util from '../../Utils/Utils.js'
import * as urls from '../../Utils/Request.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';
import BaiduMapPage from '../MainPage/BaiduMapPage.js';
import storge from '../../Utils/Storage';

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
    valueTextContainer: {},
    valueText: {
        flex: 1,
        fontSize: valueTextSize,
        textAlign: 'left',
        marginLeft: 30 * Util.pixel,
        color: valueTextColor,
    },
    btnItemStyleButtom: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: Util.pxToHeight(70),
        backgroundColor: '#ebebeb',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    btnStyle: {
        width: Util.pxToWidth(390),
        height: Util.pxToHeight(120),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd57d',
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
        this.state = {
            data: this.props.data
        };
    }

    _showLocationInMap() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'BaiduMapPage',
                component: BaiduMapPage,
                params:{
                    addr:this.state.address,
                    // longitudeBd:data.longitudeBd,
                    // latitudeBd:data.latitudeBd
                    longitudeBd: '104.73',
                    latitudeBd: '31.48',
                }
            });
        });
    }

    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    getSnapShot()
    {
        storge.get('loginInfo').then((result) => {
            console.log(result);
            if (result) {
                var body = {
                    'repairUserPhone': result[0],
                    'userToken': result[1],
                    'id': this.state.data.id,
                };
                Util.post(urls.GET_SNAPSHOT, body, navigator, (response) => {
                    if (response !== undefined) {
                        if (response.code === '0') {
                            console.log('获取快照成功-------')
                            Alert.alert('提示', '获取快照成功，请到我的快照中查看?',
                                [
                                    {
                                        text: '确定', onPress: () => {
                                    }
                                    }
                                ]);
                        } else {
                            Toast.show('获取失败');
                        }
                    } else {
                        Toast.show('获取失败');
                    }
                });
            } else {
                Toast.show('未登录');
                navigator.resetTo({
                    name: 'Login',
                    component: Login
                })
            }
        });
    }

    render() {
        return (
            <View style={DeviceDetailStyles.container}>
                <Toolbar title={'设备详情'} left={true} navigator={this._navigator}>
                </Toolbar>
                <ScrollView style={DeviceDetailStyles.scrollView}>
                    <View style={DeviceDetailStyles.scrollRootView}>
                        <DeviceDetailItem leftData='辖区'
                                          rightData={this.state.data.street}/>
                        <DeviceDetailItem leftData='籍号'
                                          rightData={this.state.data.boxId}/>
                        <DeviceDetailItem leftData='名称'
                                          rightData={this.state.data.name}/>
                        <DeviceDetailItem leftData='网络'
                                          rightData={this.state.data.network}/>
                        <DeviceDetailItem leftData='IP地址'
                                          rightData={this.state.data.ip}/>
                        <DeviceDetailItem leftData='掩码'
                                          rightData={this.state.data.mask}/>
                        <DeviceDetailItem leftData='网关'
                                          rightData={this.state.data.gateway}/>
                        <DeviceDetailItem leftData='立杆'
                                          rightData={this.state.data.pole}/>
                        <DeviceDetailItem leftData='位置'
                                          rightData={this.state.data.name}/>
                        <DeviceDetailItem leftData='设备'
                                          rightData={this.state.data.deviceName}/>
                        <View style={[DeviceDetailStyles.itemStyle, {height: null}]}>
                            <View style={[DeviceDetailStyles.keyTextContainer, {height: null}]}>
                                <View style={{flex: 1, justifyContent: 'center', paddingVertical: 9}}>
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
                                <TouchableOpacity
                                    onPress={this._showLocationInMap.bind(this)}>
                                    <Image
                                        source={this.state.data.photoUrl !== '' ? {uri: this.state.data.photoUrl} : require('../img/map.png')}
                                        style={{margin: 30 * Util.pixel}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={DeviceDetailStyles.btnItemStyleButtom}>
                            <TouchableOpacity activeOpacity={0.5} style={{elevation: 3, borderRadius: 6, margin: 5}}
                                              onPress={this.getSnapShot()}>
                                <View style={DeviceDetailStyles.btnStyle}>
                                    <Text style={{color: 'red'}}>
                                        获取快照
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
