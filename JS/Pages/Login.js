import React, {Component, PropTypes} from 'react';
import {
    Platform,
    Text,
    TextInput,
    Navigator,
    View,
    Image,
    BackAndroid,
    InteractionManager,
    TouchableOpacity,
    NativeModules
} from 'react-native';
import Util from '../Utils/Utils.js'
import Register from './Register.js';
import {styles} from '../Utils/Styles.js';
import Toast from 'react-native-root-toast';
import {connect} from 'react-redux';
import {naviGoBack} from '../Utils/CommonUtil';
import {loginAction} from '../actions/LoginAction';
import Main from './Main';
import Loading from '../Utils/Loading';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
import storge from '../Utils/Storage.js';
import {hex_md5} from '../Utils/MD5.js';
const propTypes = {
    dispatch: PropTypes.func.isRequired,
    loginReducer: PropTypes.object.isRequired
};
var _navigator;
var androidImei;
class Login extends Component {
    constructor(props) {
        super(props);
        _navigator = this.props.navigator;
        this.state = {
            userName: '',
            passWord: '',
        };
        this.buttonRegisterOrLoginAction = this.buttonRegisterOrLoginAction.bind(this);

    }

    componentWillMount() {
        storge.get('loginInfo').then((result)=> {
            if (result !== null && result[0] !== null) {
                this.setState({userName: result[0]});
            }
        });
        storge.get('passWord').then((passWord)=> {
            if (passWord !== null) {
                this.setState({passWord: passWord});
            }
        });
        NativeModules.CommonModule.getIMEI((result) => {
            androidImei = result;
            console.log('androidImei----->'+androidImei);
        });
    }

    componentDidMount() {
        const {navigator} = this.props;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    //用户登录/注册
    buttonRegisterOrLoginAction(position) {
        const {dispatch} = this.props;
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
            dispatch(loginAction(this.state.userName, hex_md5(this.state.passWord), androidImei, 1, (responseData) => {
                const {navigator} = this.props;
                console.log('code---->' + responseData.code);
                if (responseData.code === '0') {
                    console.log('userToken---->' + responseData.data.userToken);
                    console.log('repairId---->' + responseData.data.repairId);
                    storge.save('loginInfo', [this.state.userName, responseData.data.userToken, responseData.data.repairId]);
                    storge.save('passWord', this.state.passWord);
                    InteractionManager.runAfterInteractions(() => {
                        navigator.replace({name: 'Main', component: Main});
                    });
                }
            }));
        }
    }

    gotoRegister(){
        const {navigator} = this.props;
        navigator.push({component: Register, name: 'Register'})
    }

    getLoginUI() {
        const {loginReducer} = this.props;
        console.log('密码' + storge.get('passWord'));
        return (
            <View style={{flexDirection: 'column'}}>
                <View style={{height: Util.status_bar_height, backgroundColor: '#3fd0a7'}}></View>
                <View style={styles.root}>
                    <Image source={require('./img/bg.png')}
                           style={{width: screenWidth, height: screenHeight}}>
                        <View style={styles.root}>
                            <Image source={require('./img/name.png')}
                                   style={{
                                       marginTop: screenWidth / 4.8,
                                       width: screenWidth / 1.8,
                                       height: screenWidth / 18
                                   }}/>
                            <Image source={require('./img/logo_img.png')}
                                   style={{
                                       marginTop: screenWidth / 18,
                                       width: screenWidth / 3.86,
                                       height: screenWidth / 3.86
                                   }}/>
                            <View style={styles.borderView}>
                                <TextInput style={styles.textInput}
                                           onChangeText={(userName) => this.setState({userName})}
                                           keyboardType="phone-pad"
                                           maxLength={11}
                                           value={this.state.userName}
                                           underlineColorAndroid='#6ab5ba'
                                           placeholder="请输入您的手机号"
                                           placeholderTextColor='white'/>
                            </View>

                            <View style={styles.borderViewCommon}>
                                <TextInput style={styles.textInput}
                                           onChangeText={(passWord) => this.setState({passWord})}
                                           value={this.state.passWord}
                                           secureTextEntry={true}
                                           placeholder="请输入密码"
                                           underlineColorAndroid='#6ab5ba'
                                           placeholderTextColor='white'/>
                            </View>
                            <View style={{marginTop: screenWidth / 36}}>
                                <TouchableOpacity activeOpacity={0.5}
                                                  style={{elevation: 3}}
                                                  onPress={()=> this.buttonRegisterOrLoginAction(0)}>
                                    <View
                                        style={{
                                            width: screenWidth / 1.5,
                                            height: screenWidth / 9,
                                            borderRadius: 6,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#ffd57d'
                                        }}>
                                        <Text style={{color: 'red'}}>
                                            登录
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View
                                style={{width: screenWidth / 1.5, marginTop: screenWidth / 20, alignItems: 'flex-end'}}>
                                <TouchableOpacity activeOpacity={0.5}
                                                  onPress={() => this.gotoRegister()}>
                                    <View style={{borderBottomWidth: 0.5, borderBottomColor: 'red'}}>
                                        <Text style={{color: 'red'}}>
                                            忘记密码？
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Image>
                    <Loading visible={loginReducer.loading}/>
                </View>
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
    const {loginReducer} = state;
    return {
        loginReducer
    }
})(Login);
