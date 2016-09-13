import React, {Component} from 'react'
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableNativeFeedback,
    TouchableHighlight,
    ToastAndroid,
    Navigator,
    BackAndroid,
    DeviceEventEmitter,
} from 'react-native';
import {styles} from './Styles.js';
import Util from './Utils.js'
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        this.state = {
            userName: '',
            verificationCode: '',
            passWord1: '',
            passWord2: '',
        };
    }

    componentDidMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            if (navigator && navigator.getCurrentRoutes().length > 1) {
                navigator.pop();
                return true;
            }
            return false;
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    getLoginUI() {
        return (
            <View style={styles.root}>
                <Image source={require('./img/bg.png')}
                       style={{width: screenWidth, height: screenHeight}}>
                    <View style={styles.root}>
                        <Image source={require('./img/name.png')}
                               style={{marginTop: screenWidth/4.8, width: screenWidth/1.8, height: screenWidth/18}}></Image>
                        <Image
                            source={require('./img/logo_img.png')}
                            style={{marginTop: screenWidth/18, width: screenWidth/3.86, height: screenWidth/3.86}}
                        />
                        <View style={styles.borderView}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(userName) => this.setState({userName})}
                                       keyboardType="phone-pad"
                                       value={this.state.userName}
                                       placeholder="请输入您的手机号"
                            />
                        </View>

                        <View style={{width: screenWidth/1.5, height: screenWidth / 9, marginTop: screenWidth/36, alignItems: 'center', flexDirection: 'row',
                        }}>
                            <View style={styles.borderViewshort}>
                                <TextInput style={styles.textInput}
                                           onChangeText={(verificationCode) => this.setState({verificationCode})}
                                           value={this.state.verificationCode}
                                           placeholder="请填写验证码"
                                />
                            </View>
                            <View style={{marginLeft: screenWidth/30, flex: 1, backgroundColor: '#ffd57d',
                             borderRadius: 6}}>
                                <TouchableElement onPress={()=>ToastAndroid.show('点击获取验证码', 0.05)}
                                                  background={TouchableNativeFeedback.Ripple('#ffd577', true)}
                                                  style={{flex: 1}}>
                                    <View
                                        style={{flex: 1, height: screenWidth/9, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text >
                                            验证码
                                        </Text>
                                    </View>
                                </TouchableElement>
                            </View>
                        </View>
                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord1) => this.setState({passWord1})}
                                       value={this.state.passWord1}
                                       secureTextEntry={true}
                                       placeholder="请设置密码"
                            />
                        </View>
                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord2) => this.setState({passWord2})}
                                       value={this.state.passWord2}
                                       secureTextEntry={true}
                                       placeholder="请再次输入密码"
                            />
                        </View>
                        <View style={{marginTop: screenWidth/36}}>
                            <TouchableElement
                                onPress={()=>ToastAndroid.show('点击登录', 0.05)}>
                                <View
                                    style={{width: screenWidth/1.5, height: screenWidth/9, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                    <Text style={{color: 'red'}}>
                                        登录
                                    </Text>
                                </View>
                            </TouchableElement>
                        </View>
                    </View>
                </Image>

            </View>
        )
    }

    configureScenceAndroid() {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    render() {
        return (
            this.getLoginUI()
        );
    }
}


export default Register;
