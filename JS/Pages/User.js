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
import Util from '../Utils/Utils.js'
import {styles} from '../Utils/Styles.js';
import Toolbar from '../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
export default class User extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }

    componentDidMount() {

    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'我的'}>
                </Toolbar>
                <View style={{height: screenHeight/2}}>
                    <View style={{flex: 2}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('点击个人信息')}>
                            <View style={{width: screenWidth/4, justifyContent: 'center', alignItems: 'center'}}>
                                <Image
                                    style={{width: screenWidth / 5, height: screenWidth / 5, borderRadius: screenWidth / 10}}
                                    source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
                                />
                            </View>
                            <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text >
                                    李四
                                </Text>
                                <Text style={{marginTop: Util*120}}>
                                    18000001111
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('我的工单')}>
                            <Image
                                style={{width: screenWidth/12, height: screenWidth/12, marginLeft: screenWidth/18}}
                                source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                我的工单
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('设置')}>
                            <Image
                                style={{width: screenWidth/12, height: screenWidth/12, marginLeft: screenWidth/18}}
                                source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                设置
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity
                            style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                            activeOpacity={1}
                            onPress={() => Toast.show('关于')}>
                            <Image
                                style={{width: screenWidth/12, height: screenWidth/12, marginLeft: screenWidth/18}}
                                source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}/>
                            <Text
                                style={{marginLeft: screenWidth/18}}>
                                关于
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                </View>
            </View>
        );
    }
}
