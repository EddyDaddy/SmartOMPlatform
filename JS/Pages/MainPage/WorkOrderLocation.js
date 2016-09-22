/**
 * Created by root on 16-9-22.
 */
/**
 * Created by root on 16-9-20.
 */
//creat by zjw at 2016/09/18
//工单地址
import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TextInput,
    ListView,
    Picker,
    View,
    Image,
    Text,
    Navigator,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';
import { MapView, MapTypes, MapModule, Geolocation } from 'react-native-baidu-map';

var TouchableElement = TouchableHighlight;
var textColor = '#666';

var screenWidth = Util.size.width;


class WorkOrderLocation extends React.Component{

    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        this._location = this.props.location;

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 10,
            center: {
                latitude: 104.06667,
                longitude: 30.66667
            },
            trafficEnabled: false,
            baiduHeatMapEnabled: false,
            marker:{
                latitude: 104.06667,
                longitude: 30.66667
            }
        };
        //this.confirmDispatch = this.confirmDispatch.bind(this);
    }

    componentDidMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <View style={{flex: 1,justifyContent:'flex-start'}}>
                <Toolbar title={'工单位置'} left={true} navigator={this._navigator}>
                </Toolbar>
                <View style={{width:screenWidth,flex:1,justifyContent:'center',alignItems:'center'}}>
                    <MapView
                        trafficEnabled={this.state.trafficEnabled}
                        baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                        zoom={this.state.zoom}
                        mapType={this.state.mapType}
                        center={this.state.center}
                        marker={this.state.marker}
                        style={{width:screenWidth,flex:1}}
                        onMapClick={(e) => {
                        }}
                    />
                </View>
            </View>
        );
    }
}

const LocalStyles = StyleSheet.create({

});

export default WorkOrderLocation;