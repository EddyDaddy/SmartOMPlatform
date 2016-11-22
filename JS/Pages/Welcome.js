/**
 * Created by demon on 2016/9/23.
 */

import React, {Component} from 'react';
import {
    Platform,
    Navigator,
    BackAndroid,
    View,
    StatusBar
} from 'react-native';
import Login from './Login';
import Main from './Main';
import storge from '../Utils/Storage';
var view;
export default class Welcome extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            view: null
        };
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            console.log(result);
            if (result) {
                this.setState({view: (<Main navigator={navigator}/>)});
            } else {
                this.setState({view: (<Main navigator={navigator}/>)});
            }
        }).catch(() => {
            this.setState({view: (<Main navigator={navigator}/>)});
        });
    }

    componentWillMount() {
    }

    render() {
        return this.state.view;
    }
}
 