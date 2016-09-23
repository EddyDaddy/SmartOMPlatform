/**
 * Created by demon on 2016/9/22.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    Image,
    TouchableNativeFeedback,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    Navigator,
    BackAndroid,
    DeviceEventEmitter,
} from 'react-native';
import Util from '../../Utils/Utils.js'
import Toast from 'react-native-root-toast';
import Main from '../Main';
import Loading from '../../Utils/Loading';
import ToolBar from '../../Utils/ToolBar';
import {naviGoBack} from '../../Utils/CommonUtil';
import EntInfo from './EntInfo';
import ImagePicker from "react-native-image-picker";
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../../Utils/Storage.js';
import DatePicker from 'react-native-datepicker';

export default class MyWorkOrder extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            startDate: '2016-01-01',
            endData: '2016-01-01'
        };
    }

    componentWillMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableOpacity;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnMount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolBar title={'我的工单'} left={true} navigator={navigator}/>
                <DatePicker
                    style={{width: 200}}
                    date={this.state.startDate}
                    mode="date"
                    placeholder="2016-01-01"
                    format="YYYY-MM-DD"
                    minDate="2016-01-01"
                    maxDate="2019-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    },
    dateInput: {
      marginLeft: 36,
    },
  }}
                    onDateChange={(date) => {this.setState({startDate: date})}}
                />
                <DatePicker
                    style={{width: 200}}
                    date={this.state.endDate}
                    mode="date"
                    placeholder="2016-01-01"
                    format="YYYY-MM-DD"
                    minDate="2016-01-01"
                    maxDate="2019-12-31"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    customStyles={{
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    },
    dateInput: {
      marginLeft: 36,
    },
  }}
                    onDateChange={(date) => {this.setState({endDate: date})}}
                />
            </View>
        );
    }
}
