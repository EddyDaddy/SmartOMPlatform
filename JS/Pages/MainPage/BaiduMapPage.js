/**
 * Created by Paul on 2016/9/22.
 */
import React, {Component} from 'react';
import {
    Navigator,
    View,
    BackAndroid,
    NativeModules,
}from 'react-native';
import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';
import Util from '../../Utils/Utils.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';
import Loading from '../../Utils/Loading';

class BaiduMapPage extends React.Component {
    constructor(props) {
        super(props);
        //成员变量需在构造函数中生命
        this._navigator = this.props.navigator;
        this.addr = this.props.addr;
        this.longitudeBd = this.props.longitudeBd;
        this.latitudeBd = this.props.latitudeBd;
        this.mLocation = undefined;

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 18,
            marker: {
                latitude:this.latitudeBd,
                longitude:this.longitudeBd
            },
            center: {
                latitude:this.latitudeBd,
                longitude:this.longitudeBd
            },
            loading:false
        };
    }

    componentDidMount() {
        var navigator = this._navigator;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
        Geolocation.getCurrentPosition()
            .then(data => {
                Toast.show('getCurrentPosition');
                this.mLocation = {
                    latitude:Number(data.latitude),
                    longitude:Number(data.longitude)
                };
            })
            .catch(err=>{
                Toast.show('获取当前位置失败');
            });
        NativeModules.NavModule.initNavSDK();
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'地图'} left={true} right={'导航'} navigator={this._navigator}
                         rightCallBack={()=>{
                             if(this.mLocation===undefined){
                                 Toast.show('定位失败,无法导航');
                                 return;
                             }
                             this.setState({
                                 loading:true
                             });
                             //定时取消loading
                             this.timer = setTimeout(
                                 () => {
                                     Toast.show('开启导航失败');
                                     this.setState({loading:false})
                                 },
                                 12000
                             );
                             NativeModules.NavModule.jumpToNav(this.mLocation.longitude,this.mLocation.latitude,'我的位置',this.longitudeBd,this.latitudeBd,this.addr)
                                 .then(result=>{
                                     this.timer && clearTimeout(this.timer);
                                 this.setState({
                                     loading:false
                                     });
                                 })
                                 .catch(err=>{
                                     this.timer && clearTimeout(this.timer);
                                 Toast.show('err:'+err.message);
                                 if(err.code==='-2'){
                                     Toast.show('路径规划失败');
                                 }else{
                                     Toast.show('导航初始化失败');
                                 }
                                 this.setState({
                                     loading:false
                                 });
                             });
                         }}>

                </Toolbar>
                <MapView
                    style={{flex: 1}}
                    zoom={this.state.zoom}
                    center={this.state.center}
                    marker={this.state.marker}
                    mapType={this.state.mapType}
                    onMarkerClick={()=>{
                        Toast.show(this.addr);
                    }}
                />
                <Loading visible={this.state.loading}/>
            </View>
        );
    }
}

export default BaiduMapPage;