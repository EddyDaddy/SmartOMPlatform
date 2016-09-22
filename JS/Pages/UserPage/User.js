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
    Navigator,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import {styles} from '../../Utils/Styles.js';
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import storge from '../../Utils/Storage';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var phoneNum;
export default class User extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            phoneNum:'18012345678'
        };
    }

    componentDidMount() {
        storge.get('loginInfo').then((result) => {
            this.setState({phoneNum: result[0]});
        });
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'我的'}/>
                <View style={{width: screenWidth, height: Util.pixel, backgroundColor: 'white'}}/>
                <View style={{flex: 1}}>
                    <View style={{width: screenWidth, height:screenHeight/5, backgroundColor: '#3fd0a7'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('点击个人信息')}>
                            <View style={{width: screenWidth/4, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{width: screenWidth / 5, height: screenWidth / 5, borderRadius: screenWidth / 10}}
                                    source={require('../img/my_icon.png')}
                                />
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text >
                                    李四
                                </Text>
                                <Text style={{marginTop: Util*120}}>
                                    {this.state.phoneNum}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{height: screenHeight/12, width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('我的工单')}>
                            <Image
                                style={{width: screenWidth/18, height: screenWidth/17, marginLeft: screenWidth/18}}
                                source={require('../img/my_workorder_img.png')}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                我的工单
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={{height: screenHeight/12, width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('设置')}>
                            <Image
                                style={{width: screenWidth/14, height: screenWidth/14, marginLeft: screenWidth/18}}
                                source={require('../img/setting.png')}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                设置
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={{height: screenHeight/12, width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('关于')}>
                            <Image
                                style={{width: screenWidth/15, height: screenWidth/14, marginLeft: screenWidth/18}}
                                source={require('../img/about_img.png')}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                关于
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                </View>
            </View>
        );
    }
}
