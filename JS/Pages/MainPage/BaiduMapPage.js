/**
 * Created by Paul on 2016/9/22.
 */
import React, {Component} from 'react';
import {
    Navigator,
    View,
    BackAndroid
}from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation,
    MapModule
} from 'react-native-baidu-map';
import Util from '../../Utils/Utils.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';

var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

class BaiduMapPage extends React.Component {
    constructor(props) {
        super(props);
        //成员变量需在构造函数中生命
        this._navigator = this.props.navigator;

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 18,
            center: null,
            marker: null
        };
    }

    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });

        Geolocation.getCurrentPosition()
            .then(data => {
                this.setState({
                    marker: {
                        latitude: data.latitude,
                        longitude: data.longitude
                    },
                    center: {
                        latitude: data.latitude,
                        longitude: data.longitude
                    }
                });
            })
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'地图'} left={true} navigator={this._navigator}></Toolbar>
                <MapView
                    style={{flex: 1}}
                    zoom={this.state.zoom}
                    center={this.state.center}
                    marker={this.state.marker}
                    mapType={this.state.mapType}
                    onMarkerClick={()=>{Toast.show("点击了马克")}}
                />
            </View>
        );
    }
}

export default BaiduMapPage;