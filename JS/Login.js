import React, {Component} from 'react'
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    ToastAndroid,
    TouchableNativeFeedback,
    TouchableHighlight,
    Navigator,
    DeviceEventEmitter,
} from 'react-native';
import Dimensions from 'Dimensions';
import Register from './Register.js';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var TouchableElement = TouchableHighlight;
var _navigator;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        this.state = {
            userName: '',
            passWord: '',
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
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
                                       maxLength={11}
                                       value={this.state.userName}
                                       placeholder="请输入您的手机号"
                            />
                        </View>

                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord1) => this.setState({passWord1})}
                                       value={this.state.passWord1}
                                       secureTextEntry={true}
                                       placeholder="请输入密码"
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
                        <View style={{width: screenWidth/1.5, marginTop: screenWidth/20, alignItems: 'flex_end'}}>
                            <TouchableElement
                                onPress={()=>this._navigator.push({id: 'Register'})}>
                                <View style={{borderBottomWidth: 0.5, borderBottomColor: 'red'}}>
                                    <Text style={{color: 'red'}}>
                                        没有账号？去注册
                                    </Text>
                                </View>
                            </TouchableElement>
                        </View>
                    </View>
                </Image>

            </View>
        )
            ;
    }


    render() {
        return (
            this.getLoginUI()
        );
    }
}

var styles = StyleSheet.create({
    root: {
        flex: 1, alignItems: 'center'
    },
    viewCenter: {
        width: screenWidth,
        alignItems: 'center'
    },
    borderView: {
        width: screenWidth / 1.5,
        height: screenWidth / 9,
        marginTop: screenWidth / 18,
        borderRadius: 6,
        backgroundColor: '#6ab5ba',

    },
    borderViewCommon: {
        width: screenWidth / 1.5,
        height: screenWidth / 9,
        marginTop: screenWidth / 36,
        borderRadius: 6,
        backgroundColor: '#6ab5ba',

    },
    textInput: {
        flex: 1,
        backgroundColor: '#00000000',
        color: 'white',
        fontSize: 18,
        padding:screenWidth / 36,
    }
});

export default Login;
