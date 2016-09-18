/**
 * Created by demon on 2016/9/14.
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    ToastAndroid,
    View,
    Text,
    Navigator,
}from 'react-native';
import TabBarItem from '../Utils/TabBarItem.js';
import MainPage from './MainPage.js';
import DevicesPage from './DevicesPage.js';
import WorkOrder from './WorkOrder.js';
import User from './User.js';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
var lastTime = 0;
class Main extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tabNames: ['首页', '设备', '工单', '我的'],
            tabIconNames: [require('../img/tab_check_coupon_selected.png'), require('../img/tab_order_selected.png'),
                require('../img/tab_return_coupon_selected.png'), require('../img/tab_shop_selected.png')]
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', function () {
            ToastAndroid.show("再点击一次退出", ToastAndroid.SHORT);
            if ((new Date()).valueOf() - lastTime > 2000) {
                lastTime = (new Date()).valueOf();
                return true;
            } else {
                return false;
            }
        });
    }

    componentDidUnMount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }


    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <TabBarItem tabNames={this.state.tabNames} tabIconNames={this.state.tabIconNames}/>}
            tabBarPosition='bottom'>
                <View style={{flex: 1}} tabLabel='Tab1'>
                    <MainPage/>
                </View>
                <View style={{flex: 1}} tabLabel='Tab2'>
                    <DevicesPage/>
                </View>
                <View style={{flex: 1}} tabLabel='Tab3'>
                    <WorkOrder/>
                </View>
                <View style={{flex: 1}} tabLabel='Tab4'>
                    <User/>
                </View>
            </ScrollableTabView>
        );
    }
}

export default Main;

