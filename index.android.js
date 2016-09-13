/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Navigator,
    View
} from 'react-native';
import Login from './JS/Login.js';
import Register from './JS/Register.js';

class SmartOMPlatform extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    configureScenceAndroid() {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    renderSceneAndroid(route, navigator) {
        _navigator = navigator;

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

    }
    render() {
        var renderScene = this.renderSceneAndroid;
        var configureScence = this.configureScenceAndroid;
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
