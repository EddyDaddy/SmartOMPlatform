//creat by zhoujw at 2016/9/17 10:20
//工单详情
import React, {Component} from 'react';
import {
    Platform,
    Alert,
    BackAndroid,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    InteractionManager,
    View,
    Image,
    Text,
    Navigator,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';
import ProcessWorkOrder from './ProcessWorkOrder.js';
import BaiduMapPage from './BaiduMapPage.js';
import storge from '../../Utils/Storage';
import * as urls from '../../Utils/Request';
import DevicesDtails from '../DevicesPage/DevicesDetails.js'
import Main from '../Main';

var screenWidth = Util.size.width;

var dividerColor = '#d8d8d8';
var keyTextColor = '#666666';
var valueTextColor = '#000';

var valueTextSize = Util.pxToTextSize(38);
var keyTextWidth = Util.pxToWidth(260);
var itemHeight = Util.pxToHeight(115);
var dividerWidth = Util.pxToHeight(2);
var keyTextSize = Util.pxToTextSize(38);

const LocalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        width: screenWidth,
    },
    scrollRootView: {
        flex: 1,
        width: screenWidth,
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
        marginRight: Util.pxToHeight(30),
        color: keyTextColor,
    },
    valueTextContainer: {},
    valueText: {
        flex: 1,
        fontSize: valueTextSize,
        textAlign: 'left',
        marginLeft: Util.pxToHeight(30),
        color: valueTextColor,
    },
    btnItemStyle: {
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
var data;
class WorkOrderDetail extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        //成员变量需在构造函数中生命
        this._navigator = this.props.navigator;
        data = this.props.data;

        this.device = undefined;
        // 初始状态
        this.state = {
            // entName: 'aaa',
            // id: 'GDHUH20160976889',
            // ipInfo: '192.168.1.1  192.168.1.0  255.255.255.255',
            // priority: '非常紧急',
            // deviceInfo: 'J98H-25/1(高清球)',
            // address: '成华区建设路',
            // addressLongitude: '176',
            // addressLatitude: '189',
            // statu: '待处理',
            // description: '摄像头被遮挡'
            entName: data.entName,
            id: data.id,
            ipInfo: data.ip,
            priority: Util.returnPriType(data.pri),
            deviceInfo: data.deviceName,
            address: data.street,
            addressLongitude: '176',
            addressLatitude: '189',
            statu: Util.returnStatus(data.status),
            description: data.remark
        };

        //绑定回调函数和成员方法
        this.processBySelf = this.processBySelf.bind(this);
        this.dispathToOther = this.dispathToOther.bind(this);
        this.showLocationInMap = this.showLocationInMap.bind(this);
        this.showDeviceInfo = this.showDeviceInfo.bind(this);
    }

    jumpToDevicesDetails(deviceList){
        Toast.show('jumpToDevicesDetails->data:'+deviceList);
        if(data!==undefined){
            let device = deviceList.filter((d) => {
                return d.id == data.cameraId();
            });
            if(device!==undefined){
                const {navigator} = this.props;
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({name: 'DevicesDtails', component: DevicesDtails, params: {data: device}});
                });
            }
            Toast.show('无该设备信息');
        }
    }

    showDeviceInfo() {
        if(this.device!==undefined){
            const {navigator} = this.props;
            InteractionManager.runAfterInteractions(() => {
                navigator.push({name: 'DevicesDtails', component: DevicesDtails, params: {data: this.device}});
            });
        }else{
            const {navigator} = this.props;
            storge.get('loginInfo').then((result) => {
                console.log(result);
                if (result) {
                    var body = {
                        'repairUserPhone': result[0],
                        'userToken': result[1],
                    };
                    Util.post(urls.DEVICESINFO_URL, body, navigator, (response) => {
                        if (response !== undefined) {
                            if (response.code === '0') {
                                for(let temp in response.data){
                                    if(response.data[temp].id === data.cameraId){
                                        this.device = response.data[temp];
                                        break;
                                    }
                                }
                                if(this.device!==undefined){
                                    const {navigator} = this.props;
                                    InteractionManager.runAfterInteractions(() => {
                                        navigator.push({name: 'DevicesDtails', component: DevicesDtails, params: {data: this.device}});
                                    });
                                }else{
                                    Toast.show('无该设备信息');
                                }
                            } else {
                                Toast.show('获取失败');
                            }
                        } else {
                            Toast.show('response === undefined');
                        }
                    });
                } else {
                    Toast.show('未登录');
                }
            });
        }
    }

    showLocationInMap() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'BaiduMapPage',
                component: BaiduMapPage,
                params:{
                    addr:this.state.address,
                    longitudeBd:data.longitudeBd,
                    latitudeBd:data.latitudeBd
                }
            });
        });
    }

    processBySelf(data) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'ProcessWorkOrder',
                component: ProcessWorkOrder,
                params:{
                    data:data
                }
            });
        });
    }

    dispathToOther() {
        Alert.alert('提示','您确定要转派吗?',
            [{text:'取消',onPress:() => {}},
                {text:'确定',onPress:() => {
                    const {navigator} = this.props;
                    storge.get('loginInfo').then((result) => {
                        var body = {
                            'repairUserPhone': result[0],
                            'userToken': result[1],
                            'typeId': '3',
                            'processId': data.id,
                            'status': '99',
                            'remark': this.state.comment,
                            'nextOpEntId':'jzsx',
                        }
                        Util.post(urls.CONDUCTPROCESS_URL, body, navigator, (response) => {
                            if(response === undefined || response === ''){
                                Toast.show('转派失败');
                            }else{
                                if(response.code === '0'){
                                    Toast.show('转派成功');
                                    navigator.resetTo({name: 'Main', component: Main});
                                }else{
                                    Toast.show('转派失败');
                                    console.log(response.msg);
                                }
                            }
                        });
                    });
                }}
            ]);
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

    render() {
        let statuTextColor = valueTextColor;
        if('1'===data.status){
            statuTextColor = '#FFB90F';
        }else if('99'===data.status){
            statuTextColor = 'green';
        }
        let priorityTextColor = valueTextColor;
        if('4'===data.pri){
            priorityTextColor = 'red';
        }else if('3'===data.pri){
            priorityTextColor = 'yellow';
        }
        return (
            <View style={LocalStyles.container}>
                <Toolbar title={'工单详情'} left={true} navigator={this._navigator}>
                </Toolbar>
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
                        <Text style={[LocalStyles.valueText,{color:priorityTextColor}]}>
                            {this.state.priority}
                        </Text>
                    </View>
                    <View style={LocalStyles.itemStyle}>
                        <View style={LocalStyles.keyTextContainer}>
                            <Text style={LocalStyles.keyText}>
                                设备
                            </Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.5} onPress={this.showDeviceInfo} style={{ flex: 1, alignItems: 'flex-start' }}>
                            <Text
                                style={{ fontSize: valueTextSize, textAlign: 'left', marginLeft: Util.pxToHeight(30), color: valueTextColor, }}>
                                {this.state.deviceInfo}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={LocalStyles.itemStyle}>
                        <View style={LocalStyles.keyTextContainer}>
                            <Text style={LocalStyles.keyText}>
                                地址
                            </Text>
                        </View>
                        <View
                            style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text
                                style={{ fontSize: valueTextSize, textAlign: 'left', marginLeft: Util.pxToHeight(30), color: valueTextColor, }}>
                                {this.state.address}
                            </Text>
                            <TouchableOpacity onPress={this.showLocationInMap}
                                              style={{ width: 30, height: 30, marginLeft: 6 }}>
                                <Image source={require('../img/map.png') }
                                       style={{ width: 30, height: 30 }}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={LocalStyles.itemStyle}>
                        <View style={LocalStyles.keyTextContainer}>
                            <Text style={LocalStyles.keyText}>
                                工单状态
                            </Text>
                        </View>
                        <Text style={[LocalStyles.valueText,{color:statuTextColor}]}>
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
                        <TouchableOpacity activeOpacity={0.5} style={{ elevation: 3, borderRadius: 6,margin:5}}
                                          onPress={this.processBySelf.bind(this, data)}>
                            <View style={LocalStyles.btnStyle}>
                                <Text style={{ color: 'red' }}>
                                    开始处理
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5} style={{ elevation: 3, borderRadius: 6,margin:5}}
                                          onPress={this.dispathToOther.bind(this)}>
                            <View style={LocalStyles.btnStyle}>
                                <Text style={{ color: 'red' }}>
                                    转派
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default WorkOrderDetail;
