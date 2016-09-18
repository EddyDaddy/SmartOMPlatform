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
var lastTime = 0;
var _getRandomRoute = function (str) {
    return {
        randNumber: str,
    };
}

var ROUTE_STACK = [
    _getRandomRoute('MainPage'),
    _getRandomRoute('DevicesPage'),
    _getRandomRoute('WorkOrder'),
    _getRandomRoute('User'),
];

var routeIndex = 0;
class Main extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tabIndex: 0
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

    renderScene(route, navigator){
        var pages =[
            <MainPage {...route.params} />,
            <DevicesPage {...route.params}  />,
            <WorkOrder {...route.params}  />,
            <User {...route.params}  />,
        ]
        return (
            pages[routeIndex]
        )

    }
    TabBar() {
        return (
            <View style={{flexDirection: 'row'}}>
                <TabBarItem
                    image={this.state.tabIndex === 0? require('../img/tab_check_coupon_selected.png'):require("../img/tab_check_coupon_unselected.png") }
                    onPress={() => {
                        this.onTabIndex(0);
                         this.setState({tabIndex:0})
                    } }>
                    ></TabBarItem>
                <TabBarItem
                    image={this.state.tabIndex === 1? require('../img/tab_order_selected.png'):require("../img/tab_order_unselected.png") }
                    onPress={() => {
                        this.onTabIndex(1);
                         this.setState({tabIndex:1})
                    } }>
                    ></TabBarItem>
                <TabBarItem
                    image={this.state.tabIndex === 2? require('../img/tab_return_coupon_selected.png'):require("../img/tab_return_coupon_unselected.png") }
                    onPress={() => {
                        this.onTabIndex(2);
                        this.setState({tabIndex:2})
                    } }>
                    ></TabBarItem>
                <TabBarItem
                    image={this.state.tabIndex === 3? require('../img/tab_shop_selected.png'):require("../img/tab_shop_unselected.png") }
                    onPress={() => {
                        this.onTabIndex(3);
                        this.setState({tabIndex:3})
                    } }>
                    ></TabBarItem>
            </View>
        )
    }
    onTabIndex(_index){
        routeIndex = _index;
        // this._navigator.jumpTo(ROUTE_STACK[routeIndex]);
    }

    render() {
        return (
            <Navigator
                initialRoute={ROUTE_STACK[routeIndex]}
                // configureScene={(route) => {
                //     return Navigator.SceneConfigs.FadeAndroid;
                // } }
                renderScene={this.renderScene}
                navigationBar={
                    this.TabBar()
                }
                initialRouteStack={ROUTE_STACK}
                ref={(navigator) => {
                  this._navigator = navigator;
                }}
            />
        );
    }
}

export default Main;

