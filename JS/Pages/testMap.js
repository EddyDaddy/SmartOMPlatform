/**
 * Created by demon on 2016/9/22.
 */

import React, {Component, PropTypes} from 'react';
import {
    Platform,
    BackAndroid,
    View,
    Text,
    Image,
    Navigator,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
    RefreshControl,
}from 'react-native';
// import MapView from 'react-native-maps';

class testMap extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }
    render(){
        return (
            <View style={{flex: 1}}>
                <MapView style={{flex: 1}}>

                </MapView>
            </View>
        );
    }
}

export default testMap;
