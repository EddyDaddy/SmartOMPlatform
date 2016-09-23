/**
 * Created by demon on 2016/9/22.
 */

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
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../../Utils/Storage.js';
import ModifyPassword from './ModifyPassword';

class Setting extends React.Component {
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
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableOpacity;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
        storge.get('userIcon').then((result) => {
            this.setState({userIcon: result});
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');

    }

    _gotoModifyPassword() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name: 'ModifyPassword', component: ModifyPassword});
        });
    }


    render() {
        return (
            <View style={styles.root}>
                <ToolBar title={'设置'} left={true} navigator={this.props.navigator}/>
                <TouchableElement onPress={this._gotoModifyPassword.bind(this)}
                                  activeOpacity={0.5}
                                  underlayColor={'white'}
                                  style={styles.top}>
                    <View style={styles.top}>
                        <Image style={{width: screenWidth/27, height: screenWidth/19, marginLeft: screenWidth/16}}
                               source={require('../img/lock_icon.png')}/>
                        <Text style={{marginLeft: Util.pixel*38, fontSize: Util.pixel*38, color:'#666666'}}>
                            登录密码修改
                        </Text>
                        <View
                            style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: screenWidth/27}}>
                            <Image style={{width: screenWidth/38.6, height: screenWidth/24}}
                                   source={require('../img/next_small.png')}/>
                        </View>
                    </View>
                </TouchableElement>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ebebeb'}}>
                    <View style={{marginTop: screenWidth/22}}>
                        <TouchableElement
                            style={{borderRadius: 6, elevation: 3}}
                            activeOpacity={0.5}
                            underlayColor={'#00000000'}
                            onPress={()=> {
                                Toast.show('退出登录');
                                storge.save('loginInfo', null);
                                storge.save('passWord', '');
                            }}>
                            <View
                                style={{width: screenWidth/1.5, height: screenWidth/9, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                <Text style={{color: 'red'}}>
                                    退 出
                                </Text>
                            </View>
                        </TouchableElement>
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
        height: screenWidth / 4.5,
        width: screenWidth,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        flex: 1.5,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden'
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
        fontSize: Util.pixel * 37,
        color: '#666666',
    },
    textRight: {
        fontSize: Util.pixel * 37,
        color: 'black',
    },

});

export default Setting;

