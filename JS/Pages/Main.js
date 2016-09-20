/**
 * Created by demon on 2016/9/14.
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Navigator,
}from 'react-native';
import TabBarItem from '../Utils/TabBarItem.js';
import MainPage from './MainPage/MainPage.js';
import DevicesPage from './DevicesPage/DevicesPage.js';
import WorkOrder from './WorkOrderPage/WorkOrder.js';
import User from './UserPage/User.js';
import ScrollableTabView, {DefaultTabBar} from 'react-native-scrollable-tab-view';
import Toast from 'react-native-root-toast';
var lastTime = 0;
class Main extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tabIconNames: [require('./img/tab_workorder.png'), require('./img/tab_device.png'),
                require('./img/tab_user.png')]
        };
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', function () {
            Toast.show("再点击一次退出");
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
                    <MainPage />
                </View>
                <View style={{flex: 1}} tabLabel='Tab2'>
                    <DevicesPage/>
                </View>
                <View style={{flex: 1}} tabLabel='Tab3'>
                    <User/>
                </View>
            </ScrollableTabView>
        );
    }
}

export default Main;
