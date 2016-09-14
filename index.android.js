/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Navigator,
    BackAndroid
} from 'react-native';
import Login from './JS/Pages/Login.js';
import Register from './JS/Pages/Register.js';
import {naviGoBack} from './JS/Utils/CommonUtil.js';
import Main from './JS/Pages/Main.js';
class SmartOMPlatform extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    configureScence() {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', function() {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    renderScene(route, navigator) {
        this._navigator = navigator;

        if (route.id === 'Login') {
            return (
                <Login navigator={navigator} route={route}/>
            );
        }
        if (route.id === 'Register') {
            return (
                <Register navigator={navigator} route={route}/>
            );
        }
        if (route.id === 'Main') {
            return (
                <Main navigator={navigator} route={route}/>
            );
        }

    }
    render() {
        var renderScene = this.renderScene;
        var configureScence = this.configureScence;
        return (
            <Navigator
                initialRoute={{ title: '登录', id:'Login'}}
                configureScence={{ configureScence }}
                renderScene={renderScene}
            />
        );
    }
}

AppRegistry.registerComponent('SmartOMPlatform', () => SmartOMPlatform);
