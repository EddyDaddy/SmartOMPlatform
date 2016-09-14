import React, {Component} from 'react';
import {
    Platform,
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
import Util from '../Utils/Utils.js'
import Register from './Register.js';
import {styles} from '../Utils/Styles.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../Utils/Storage.js';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        this.state = {
            userName: null,
            passWord: null
        };

    }

    componentDidMount() {
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        storge.get('phoneNum').then((phoneNum)=> {
            if (phoneNum !== null) {
                this.setState({userName: phoneNum});
            }
        });
        storge.get('passWord').then((passWord)=> {
            if (passWord !== null) {
                this.setState({passWord: passWord});
            }
        });


    }

    getLoginUI() {
        return (
            <View style={styles.root}>
                <Image source={require('./../img/bg.png')}
                       style={{width: screenWidth, height: screenHeight}}>
                    <View style={styles.root}>
                        <Image source={require('./../img/name.png')}
                               style={{marginTop: screenWidth/4.8, width: screenWidth/1.8, height: screenWidth/18}}/>
                        <Image
                            source={require('./../img/logo_img.png')}
                            style={{marginTop: screenWidth/18, width: screenWidth/3.86, height: screenWidth/3.86}}
                        />
                        <View style={styles.borderView}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(userName) => this.setState({userName})}
                                       keyboardType="phone-pad"
                                       maxLength={11}
                                       value={this.state.userName}
                                       placeholder="请输入您的手机号"
                                       placeholderTextColor='white'
                            />
                        </View>

                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord1) => this.setState({passWord1})}
                                       value={this.state.passWord}
                                       secureTextEntry={true}
                                       placeholder="请输入密码"
                                       placeholderTextColor='white'
                            />
                        </View>
                        <View style={{marginTop: screenWidth/36}}>
                            <TouchableElement
                                onPress={()=>{ToastAndroid.show('点击登录', 0.05);
                                storge.save('phoneNum', this.state.userName);
                                storge.save('passWord', this.state.passWord);
                                storge.get('phoneNum').then((phoneNum)=>{ToastAndroid.show('点击登录'+phoneNum, 1)});
                                this._navigator.push({id: 'Main'});
                                }}>
                                <View
                                    style={{width: screenWidth/1.5, height: screenWidth/9, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                    <Text style={{color: 'red'}}>
                                        登录
                                    </Text>
                                </View>
                            </TouchableElement>
                        </View>
                        <View style={{width: screenWidth/1.5, marginTop: screenWidth/20, alignItems: 'flex-end'}}>
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

export default Login;
