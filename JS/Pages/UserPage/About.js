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
import ContactUs from './ContactUs';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
import storge from '../../Utils/Storage.js';

class About extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _navigator = this.props.navigator;
        this.state = {
            userIcon: '-'
        };
    }

    componentWillMount() {
        const {navigator} = this.props;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableOpacity;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    _gotoContactUs() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name: 'ContactUs', component: ContactUs});
        });
    }

    render() {
        return (
            <View style={styles.root}>
                <ToolBar title={'关于'} left={true} navigator={this.props.navigator}/>
                <View style={styles.top}>
                    <View style={styles.item}>
                        <Image style={{tintColor: '#0054a7',marginTop: screenWidth/12, width: screenWidth/1.8, height: screenWidth/18}}
                               source={require('../img/name.png')}
                        />
                        <Image style={{marginTop: screenWidth/18, width: screenWidth/3.8, height: screenWidth/3.8}}
                               source={require('../img/logo_img.png')}
                        />
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Image style={{width: screenWidth/27, height: screenWidth/27}}
                                   source={require('../img/help_icon.png')}/>
                        </View>
                        <TouchableElement style={styles.item3}
                                          onPress={this._gotoContactUs.bind(this)}
                                          activeOpacity={0.5}
                                          underlayColor={'white'}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={styles.textRight}>
                                    帮助中心
                                </Text>
                                <View
                                    style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: screenWidth/27}}>
                                    <Image style={{width: screenWidth/38.6, height: screenWidth/24}}
                                           source={require('../img/next_small.png')}/>
                                </View>
                            </View>
                        </TouchableElement>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Image style={{width: screenWidth/27, height: screenWidth/27}}
                                   source={require('../img/phone_icon.png')}/>
                        </View>
                        <TouchableElement style={styles.item3}
                                          onPress={this._gotoContactUs.bind(this)}
                                          activeOpacity={0.5}
                                          underlayColor={'white'}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={styles.textRight}>
                                    联系我们
                                </Text>
                                <View
                                    style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: screenWidth/27}}>
                                    <Image style={{width: screenWidth/38.6, height: screenWidth/24}}
                                           source={require('../img/next_small.png')}/>
                                </View>
                            </View>
                        </TouchableElement>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                </View>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ebebeb'}}>
                    <View style={{marginTop: screenWidth/18}}>
                        <Text>
                            九洲视讯科技有限责任公司 版权所有
                        </Text>
                    </View>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    top: {
        height: screenWidth / 1.2,
        width: screenWidth,
        backgroundColor: 'white',
    },
    item: {
        width: screenWidth,
        height: screenWidth/1.9,
        alignItems: 'center',
        overflow: 'hidden'
    },
    item1: {
        flex: 1,
        width: screenWidth,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    item2: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: screenWidth/14,
    },
    item3: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: screenWidth/28,
    },
    textLeft: {
        fontSize: screenWidth/29,
        color: '#666666',
    },
    textRight: {
        fontSize: screenWidth/29,
        color: 'black',
    },

});

export default About;

