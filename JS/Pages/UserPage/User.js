/**
 * Created by demon on 2016/9/14.
 * 我的页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Image,
    TouchableOpacity,
    InteractionManager,
    Navigator,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import {styles} from '../../Utils/Styles.js';
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import storge from '../../Utils/Storage';
import UserInfo from './UserInfo';
import Setting from './Setting';
import About from './About';
import MyWorkOrder from './MyWorkOrder';
import * as urls from '../../Utils/Request';
import LoadView from '../../Utils/LoadingView';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var phoneNum;
var _navigator;
export default class User extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // _navigator = this.props.navigator;
        this.state = {
            phoneNum: '18012345678',
            userName: '',
            userIcon: '-',
            isOk: false,
        };
    }

    componentWillMount() {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            this.setState({phoneNum: result[0]});
            var body = {
                'repairUserPhone': result[0],
                'userToken': result[1]
            }
            Util.post(urls.QUERYUSERINFO_URL, body, navigator, (response) => {
                this.setState({
                    isOk: true
                });
                if (response === undefined && response === '') {
                    Toast.show('返回结果异常');
                } else {
                    if (response.code === '0') {
                        this.setState({
                            userName: response.data[0].repairUserName,
                            userPhone: response.data[0].repairUserPhone,
                            data: response.data[0],
                        });
                    } else {
                        Toast.show('获取失败');
                    }
                }
            });
        });
    }

    componentDidMount() {

    }

    _gotoUserInfo(data) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'UserInfo', component: UserInfo, params: {
                    data: this.state.data
                }
            });
        });
    }

    _gotoMyWorkOrder() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name: 'MyWorkOrder', component: MyWorkOrder});
        });
    }

    _gotoSetting() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name: 'Setting', component: Setting});
        });
    }

    _gotoAbout() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name: 'About', component: About});
        });
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'我的'}/>
                <View style={{width: screenWidth, height: Util.pixel, backgroundColor: 'white'}}/>
                {this.state.isOk ?
                    <View style={{flex: 1}}>
                        <View style={{width: screenWidth, height: screenWidth / 2.8, backgroundColor: '#3fd0a7'}}>
                            <TouchableOpacity
                                style={{flex: 1, flexDirection: 'row'}}
                                activeOpacity={1}
                                onPress={this._gotoUserInfo.bind(this)}>
                                <View style={{marginLeft: screenWidth / 13, justifyContent: 'center'}}>
                                    <Image
                                        style={{
                                            width: screenWidth / 4,
                                            height: screenWidth / 4,
                                            borderRadius: screenWidth / 8
                                        }}
                                        source={require('../img/my_icon.png')}
                                    />
                                </View>
                                <View style={{marginLeft: screenWidth / 15}}>
                                    <Text style={{
                                        color: 'white',
                                        marginTop: screenWidth / 12,
                                        fontSize: screenWidth/24.5
                                    }}>
                                        {this.state.userName}
                                    </Text>
                                    <View style={{flexDirection: 'row', marginTop: screenWidth / 40}}>
                                        <Text style={{color: 'white', fontSize: screenWidth/29}}>
                                            职位：
                                        </Text>
                                        <Text style={{color: '#ffff00', fontSize: screenWidth/29}}>
                                            工程师
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: screenWidth / 60}}>
                                        <Text style={{color: 'white', fontSize: screenWidth/29}}>
                                            电话：
                                        </Text>
                                        <Text style={{color: '#ffff00', fontSize: screenWidth/29}}>
                                            {this.state.phoneNum}
                                        </Text>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flex: 1,
                                        alignItems: 'flex-end',
                                        justifyContent: 'center',
                                        marginRight: screenWidth / 28
                                    }}>
                                    <Image style={{width: screenWidth / 30, height: screenWidth / 16}}
                                           source={require('../img/next_big.png')}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: screenHeight / 12,
                                width: screenWidth,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <TouchableOpacity
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                activeOpacity={1}
                                onPress={this._gotoMyWorkOrder.bind(this)}>
                                <Image
                                    style={{
                                        width: screenWidth / 18,
                                        height: screenWidth / 17,
                                        marginLeft: screenWidth / 18
                                    }}
                                    source={require('../img/my_workorder_img.png')}
                                    resizeMode={'contain'}/>
                                <Text
                                    style={{marginLeft: screenWidth / 18, fontSize: screenWidth/29}}>
                                    我的工单
                                </Text>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Image style={{
                                        width: screenWidth / 56,
                                        height: screenWidth / 30,
                                        marginRight: screenWidth / 18
                                    }}
                                           source={require('../img/next_small.png')}
                                           resizeMode={'contain'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                height: screenHeight / 12,
                                width: screenWidth,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <TouchableOpacity
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                activeOpacity={1}
                                onPress={this._gotoMyWorkOrder.bind(this)}>
                                <Image
                                    style={{
                                        width: screenWidth / 18,
                                        height: screenWidth / 17,
                                        marginLeft: screenWidth / 18
                                    }}
                                    source={require('../img/kuaizhao.png')}
                                    resizeMode={'contain'}/>
                                <Text
                                    style={{marginLeft: screenWidth / 18, fontSize: screenWidth/29}}>
                                    我的快照
                                </Text>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Image style={{
                                        width: screenWidth / 56,
                                        height: screenWidth / 30,
                                        marginRight: screenWidth / 18
                                    }}
                                           source={require('../img/next_small.png')}
                                           resizeMode={'contain'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                        <View
                            style={{
                                height: screenHeight / 12,
                                width: screenWidth,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <TouchableOpacity
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                activeOpacity={1}
                                onPress={this._gotoSetting.bind(this)}>
                                <Image
                                    style={{
                                        width: screenWidth / 14,
                                        height: screenWidth / 14,
                                        marginLeft: screenWidth / 18
                                    }}
                                    source={require('../img/setting.png')}
                                    resizeMode={'contain'}/>
                                <Text
                                    style={{marginLeft: screenWidth / 18, fontSize: screenWidth/29}}>
                                    设置
                                </Text>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Image style={{
                                        width: screenWidth / 56,
                                        height: screenWidth / 30,
                                        marginRight: screenWidth / 18
                                    }}
                                           source={require('../img/next_small.png')}
                                           resizeMode={'contain'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                        <View
                            style={{
                                height: screenHeight / 12,
                                width: screenWidth,
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                            <TouchableOpacity
                                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                activeOpacity={1}
                                onPress={this._gotoAbout.bind(this)}>
                                <Image
                                    style={{
                                        width: screenWidth / 15,
                                        height: screenWidth / 14,
                                        marginLeft: screenWidth / 18
                                    }}
                                    source={require('../img/about_img.png')}
                                    resizeMode={'contain'}/>
                                <Text
                                    style={{marginLeft: screenWidth / 18, fontSize: screenWidth/29}}>
                                    关于
                                </Text>
                                <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <Image style={{
                                        width: screenWidth / 56,
                                        height: screenWidth / 30,
                                        marginRight: screenWidth / 18
                                    }}
                                           source={require('../img/next_small.png')}
                                           resizeMode={'contain'}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    </View> :
                    <LoadView/>}
            </View>
        );
    }
}
