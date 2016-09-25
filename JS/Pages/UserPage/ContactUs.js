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
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../../Utils/Storage.js';
import Communications from 'react-native-communications';

class ContactUs extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _navigator = this.props.navigator;
        this.state = {};
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


    render() {
        return (
            <View style={styles.root}>
                <ToolBar title={'联系我们'} left={true} navigator={this.props.navigator}/>
                <View style={styles.top}>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                公司名称
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item3}>
                            <Text style={styles.textRight}>
                                九洲视讯科技有限责任公司
                            </Text>
                        </View>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                电话
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item3}>
                            <Image style={{width: screenWidth/27, height: screenWidth/27, marginRight: Util.pixel*12}}
                                   source={require('../img/phone_icon.png')}/>
                            <TouchableElement onPress={() => Communications.phonecall('400123123', true)}
                                              underlayColor={'#00000000'}
                                              activeOpacity={0.5}>
                                <Text style={styles.textRight}>
                                    400-123-123
                                </Text>
                            </TouchableElement>
                        </View>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                网址
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item3}>
                            <TouchableElement onPress={() => Communications.web('http://www.jiuzhouas.com/')}
                                              activeOpacity={0.5}
                                              underlayColor={'#00000000'}>
                                <Text style={styles.textRight}>
                                    http://www.jiuzhouas.com/
                                </Text>
                            </TouchableElement>
                        </View>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                </View>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ebebeb'}}/>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    top: {
        height: screenHeight / 3,
        width: screenWidth,
        backgroundColor: 'white',
    },
    item1: {
        flex: 1,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    item2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: screenWidth / 20,
    },
    item3: {
        flex: 3.2,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: screenWidth / 20,
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

export default ContactUs;


