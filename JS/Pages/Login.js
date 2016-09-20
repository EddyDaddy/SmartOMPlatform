import React, {Component} from 'react';
import {
    Platform,
    Text,
    TextInput,
    View,
    Image,
    TouchableNativeFeedback,
    InteractionManager,
    TouchableHighlight,
    Navigator,
    DeviceEventEmitter,
} from 'react-native';
import Util from '../Utils/Utils.js'
import Register from './Register.js';
import {styles} from '../Utils/Styles.js';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import loginAction from '../actions/LoginAction';
import Main from './Main';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../Utils/Storage.js';
import {hex_md5} from '../Utils/MD5.js';
class Login extends Component {
    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        this.state = {
            userName: null,
            passWord: null
        };
        this.buttonRegisterOrLoginAction = this.buttonRegisterOrLoginAction.bind(this);

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

    //用户登录/注册
    buttonRegisterOrLoginAction(position) {
        const {loginAction, navigator} = this.props;
        if (position === 0) {
            //用户登录
            if (this.state.userName === '') {
                Toast.show('用户名不能为空...');
                return;
            }
            if (this.state.passWord === '') {
                Toast.show('密码不能为空...');
                return;
            }
            loginAction(this.state.userName, hex_md5(this.state.passWord), (response) => {
                if (response.code === '0') {
                    console.log(response.msg);
                    if (response.data) {
                        storge.save('userToken', response.data);
                        storge.save('phoneNum', this.state.userName);
                        storge.save('passWord', this.state.passWord);
                        InteractionManager.runAfterInteractions(() => {
                            navigator.replace({name: 'Main', component: Main});
                        });
                    }
                }
            });


        } else if (position === 1) {
            //用户注册
            InteractionManager.runAfterInteractions(() => {
                navigator.push({
                    component: Register,
                    name: 'Register'
                });
            });
        }
    }

    _onLogin() {
        Util.post('http://120.24.179.24:8080/smartMonitor/api/login', {
            'repairUserPhone': this.state.userName.toString(),
            'repairUserPassword': hex_md5(this.state.passWord.toString())
        }, (response) => {
            Toast.show(response.msg);
            console.log(response.msg);
            if (response.data) {
                storge.save('userToken', response.data);
                storge.save('phoneNum', this.state.userName);
                storge.save('passWord', this.state.passWord);
                this._navigator.replace({id: 'Main'});
            }
        });
    }

    getLoginUI() {
        return (
            <View style={styles.root}>
                <Image source={require('./img/bg.png')}
                       style={{width: screenWidth, height: screenHeight}}>
                    <View style={styles.root}>
                        <Image source={require('./img/name.png')}
                               style={{marginTop: screenWidth/4.8, width: screenWidth/1.8, height: screenWidth/18}}/>
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
                                       placeholderTextColor='white'
                            />
                        </View>

                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord) => this.setState({passWord})}
                                       value={this.state.passWord}
                                       secureTextEntry={true}
                                       placeholder="请输入密码"
                                       placeholderTextColor='white'
                            />
                        </View>
                        <View style={{marginTop: screenWidth/36}}>
                            <TouchableElement
                                onPress={()=> this.buttonRegisterOrLoginAction(0)}>
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
                                        忘记密码？
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
        // const {login} = this.props;
        // let msg = login.data.msg;
        // console.log("dddddddddd"+msg);
        return (
            this.getLoginUI()
        );
    }
}

export default connect((state) => {
    const {login} = state;
    return {
        login
    }
}, {loginAction: loginAction})(Login);
