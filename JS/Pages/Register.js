import React, {Component} from 'react'
import {
    Platform,
    Text,
    TextInput,
    View,
    Image,
    TouchableNativeFeedback,
    TouchableHighlight,
    Navigator,
    BackAndroid,
    DeviceEventEmitter,
} from 'react-native';
import {styles} from '../Utils/Styles.js';
import Util from '../Utils/Utils.js';
import {naviGoBack} from '../Utils/CommonUtil.js';
import storge from '../Utils/Storage.js';
import Toast from 'react-native-root-toast';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
var phone;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;
        this.state = {
            userName: '',
            verificationCode: '',
            passWord1: '',
            passWord2: '',
            isPressed: false,
            countTime: 60
        };
    }

    componentDidMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
        phone = this.state.userName;

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
        this.clearInterval();
    }

    setInterval(){
        this.interval = setInterval(
            () => {this.setState({countTime: this.state.countTime - 1});
                if(this.state.countTime === 0){
                    this.initInterval();
                }
                },
            1000
        )
    }

    clearInterval(){
        // 如果存在this.interval，则使用clearInterval清空。
        // 如果你使用多个interval，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.interval && clearInterval(this.timer);
    }

    initInterval(){
        //初始验证码按钮
        this.clearInterval();
        this.setState({countTime: 60});
        this.setState({isPressed: !this.state.isPressed});
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
                                       value={this.state.userName}
                                       maxLength={11}
                                       placeholder="请输入您的手机号"
                                       placeholderTextColor='white'
                            />
                        </View>

                        <View style={{width: screenWidth/1.5, height: screenWidth / 9, marginTop: screenWidth/36, alignItems: 'center', flexDirection: 'row',
                        }}>
                            <View style={styles.borderViewshort}>
                                <TextInput style={styles.textInput}
                                           onChangeText={(verificationCode) => this.setState({verificationCode})}
                                           value={this.state.verificationCode}
                                           placeholder="请填写验证码"
                                           placeholderTextColor='white'
                                />
                            </View>
                            <View style={{marginLeft: screenWidth/30, flex: 1, backgroundColor: '#ffd57d',
                             borderRadius: 6}}>
                                <TouchableElement onPress={()=>{Toast.show('点击获取验证码');
                                                                this.setState({isPressed: true});
                                                                this.setInterval();
                                                                }}
                                                  underlayColor={'#ffd5ad'}
                                                  disabled={this.state.isPressed}
                                                  style={{flex: 1, borderRadius: 6}}>
                                    <View
                                        style={{flex: 1, height: screenWidth/9, alignItems: 'center', justifyContent: 'center'}}>
                                        <Text >
                                            {this.state.isPressed?this.state.countTime+'s后获取':'验证码'}
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
                                       placeholderTextColor='white'
                            />
                        </View>
                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord2) => this.setState({passWord2})}
                                       value={this.state.passWord2}
                                       secureTextEntry={true}
                                       placeholder="请再次输入密码"
                                       placeholderTextColor='white'
                            />
                        </View>
                        <View style={{marginTop: screenWidth/36}}>
                            <TouchableElement
                                onPress={()=>{
                                this._navigator.replace({id: 'Main'});
                                storge.save('phoneNum', this.state.userName);
                                storge.save('passWord', this.state.passWord1);
                                storge.get('passWord').then((passWord)=>{Toast.show('点击登录'+passWord)});
                                }}
                                style={{borderRadius: 6}}>
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

    configureScence() {
        return Navigator.SceneConfigs.FadeAndroid;
    }

    render() {
        return (
            this.getLoginUI()
        );
    }
}


export default Register;
