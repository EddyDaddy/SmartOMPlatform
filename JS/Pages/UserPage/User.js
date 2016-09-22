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
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var phoneNum;
var _navigator;
var userData;
export default class User extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // _navigator = this.props.navigator;
        this.state = {
            phoneNum: '18012345678',
            userIcon: '-'
        };
    }

    componentWillMount() {
        storge.get('loginInfo').then((result) => {
            this.setState({phoneNum: result[0]});
        });
        storge.get('userIcon').then((result) => {
            this.setState({userIcon: result});
            console.log('userIcon----'+result);
        });
    }

    componentDidMount() {

    }

    _gotoUserInfo(data){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name:'UserInfo', component: UserInfo});
        });
    }

    _gotoMyWorkOrder(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name:'MyWorkOrder', component: MyWorkOrder});
        });
    }

    _gotoSetting(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name:'Setting', component: Setting});
        });
    }

    _gotoAbout(){
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name:'About', component: About});
        });
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'我的'}/>
                <View style={{width: screenWidth, height: Util.pixel, backgroundColor: 'white'}}/>
                <View style={{flex: 1}}>
                    <View style={{width: screenWidth, height:screenWidth/2.8, backgroundColor: '#3fd0a7'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row'}}
                            activeOpacity={1}
                            onPress={this._gotoUserInfo.bind(this, userData)}>
                            <View style={{marginLeft: screenWidth/13, justifyContent: 'center'}}>
                                <Image
                                    style={{width: screenWidth / 4, height: screenWidth / 4, borderRadius: screenWidth / 8}}
                                    source={this.state.userIcon=='-'?require('../img/my_icon.png'):{uri:this.state.userIcon}}
                                />
                            </View>
                            <View style={{marginLeft: screenWidth/15}}>
                                <Text style={{color: 'white', marginTop: screenWidth/12, fontSize: Util.pixel*44}}>
                                    职工姓名（生产一部）
                                </Text>
                                <View style={{flexDirection: 'row', marginTop: screenWidth/40}}>
                                    <Text style={{color: 'white', fontSize: Util.pixel*37}}>
                                        职位：
                                    </Text>
                                    <Text style={{color: '#ffff00', fontSize: Util.pixel*37}}>
                                        工程师
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row', marginTop: screenWidth/60}}>
                                    <Text style={{color: 'white', fontSize: Util.pixel*37}}>
                                        电话：
                                    </Text>
                                    <Text style={{color: '#ffff00', fontSize: Util.pixel*37}}>
                                        {this.state.phoneNum}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: screenWidth/28}}>
                                <Image style={{width: screenWidth/30, height: screenWidth/16}}
                                       source={require('../img/next_big.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{height: screenHeight/12, width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={this._gotoMyWorkOrder.bind(this)}>
                            <Image
                                style={{width: screenWidth/18, height: screenWidth/17, marginLeft: screenWidth/18}}
                                source={require('../img/my_workorder_img.png')}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                我的工单
                            </Text>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Image style={{width: screenWidth/56, height: screenWidth/30, marginRight: screenWidth/18}}
                                       source={require('../img/next_small.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View
                        style={{height: screenHeight/12, width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={this._gotoSetting.bind(this)}>
                            <Image
                                style={{width: screenWidth/14, height: screenWidth/14, marginLeft: screenWidth/18}}
                                source={require('../img/setting.png')}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                设置
                            </Text>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Image style={{width: screenWidth/56, height: screenWidth/30, marginRight: screenWidth/18}}
                                       source={require('../img/next_small.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View
                        style={{height: screenHeight/12, width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={this._gotoAbout.bind(this)}>
                            <Image
                                style={{width: screenWidth/15, height: screenWidth/14, marginLeft: screenWidth/18}}
                                source={require('../img/about_img.png')}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                关于
                            </Text>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Image style={{width: screenWidth/56, height: screenWidth/30, marginRight: screenWidth/18}}
                                       source={require('../img/next_small.png')}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                </View>
            </View>
        );
    }
}
