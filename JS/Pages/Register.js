import React, {Component} from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    View,
    Image,
    TouchableOpacity,
    Navigator,
    BackAndroid,
    DeviceEventEmitter,
} from 'react-native';
import Main from './Main';
import Util from '../Utils/Utils.js';
import {naviGoBack} from '../Utils/CommonUtil.js';
import storge from '../Utils/Storage.js';
import Toast from 'react-native-root-toast';
import ToolBar from '../Utils/ToolBar';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var _navigator;
var phone;
var goBack = () => {
    return naviGoBack(this._navigator);
};
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
        BackAndroid.addEventListener('hardwareBackPress', goBack);
        phone = this.state.userName;
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress', goBack);
        this.clearInterval();
    }

    setInterval() {
        this.interval = setInterval(
            () => {
                this.setState({countTime: this.state.countTime - 1});
                if (this.state.countTime === 0) {
                    this.initInterval();
                }
            },
            1000
        )
    }

    clearInterval() {
        // 如果存在this.interval，则使用clearInterval清空。
        // 如果你使用多个interval，那么用多个变量，或者用个数组来保存引用，然后逐个clear
        this.interval && clearInterval(this.timer);
    }

    initInterval() {
        //初始验证码按钮
        this.clearInterval();
        this.setState({countTime: 60});
        this.setState({isPressed: !this.state.isPressed});
    }


    getLoginUI() {
        return (
            <View style={styles.root}>
                <ToolBar title={'忘记密码'}/>
                <Image style={{height: screenWidth/1.9, width: screenWidth}}
                       source={require('./img/reset_pw_img.png')}/>
                <View style={styles.root}>
                    <View style={styles.borderView}>
                        <TextInput style={styles.textInput}
                                   onChangeText={(userName) => this.setState({userName})}
                                   keyboardType="phone-pad"
                                   value={this.state.userName}
                                   maxLength={11}
                                   placeholder="请输入您的手机号"
                                   placeholderTextColor='#666666'
                        />
                    </View>

                    <View style={{width: screenWidth/1.5, height: screenWidth / 9, marginTop: screenWidth / 20, alignItems: 'center', flexDirection: 'row',
                        }}>
                        <View style={styles.borderViewshort}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(verificationCode) => this.setState({verificationCode})}
                                       value={this.state.verificationCode}
                                       placeholder="请填写验证码"
                                       placeholderTextColor='#666666'
                            />
                        </View>
                        <View style={{marginLeft: screenWidth/30, flex: 1, backgroundColor: '#ffd57d',
                             borderRadius: 6}}>
                            <TouchableOpacity activeOpacity={0.5}
                                              onPress={()=>{Toast.show('点击获取验证码');
                                                            this.setState({isPressed: true});
                                                            this.setInterval();
                                                            }}
                                              underlayColor={'#ffd5ad'}
                                              disabled={this.state.isPressed}
                                              style={{flex: 1, borderRadius: 6}}>
                                <View
                                    style={{flex: 1, height: screenWidth/9, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text >
                                        {this.state.isPressed ? this.state.countTime + 's后获取' : '验证码'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.borderViewCommon}>
                        <TextInput style={styles.textInput}
                                   onChangeText={(passWord1) => this.setState({passWord1})}
                                   value={this.state.passWord1}
                                   secureTextEntry={true}
                                   placeholder="请设置密码"
                                   placeholderTextColor='#666666'
                        />
                    </View>
                    <View style={styles.borderViewCommon}>
                        <TextInput style={styles.textInput}
                                   onChangeText={(passWord2) => this.setState({passWord2})}
                                   value={this.state.passWord2}
                                   secureTextEntry={true}
                                   placeholder="请再次输入密码"
                                   placeholderTextColor='#666666'
                        />
                    </View>
                    <View style={{marginTop: screenWidth / 20}}>
                        <TouchableOpacity activeOpacity={0.5}
                            onPress={()=>{
                                this._navigator.replace({name: 'Main', component: Main});
                                storge.save('phoneNum', this.state.userName);
                                storge.save('passWord', this.state.passWord1);
                                storge.get('passWord').then((passWord)=>{Toast.show('点击登录'+passWord)});
                                }}
                            style={{borderRadius: 6}}>
                            <View
                                style={{width: screenWidth/1.5, height: screenWidth/9, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                <Text style={{color: 'red'}}>
                                    确 认
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }

    render() {
        return (
            this.getLoginUI()
        );
    }
}

const styles = StyleSheet.create({
        root: {
            flex: 1, alignItems: 'center'
        },
        borderView: {
            width: screenWidth / 1.5,
            height: screenWidth / 9,
            marginTop: screenWidth / 9,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#d0d0d0',
            backgroundColor: 'white',

        },
        borderViewCommon: {
            width: screenWidth / 1.5,
            height: screenWidth / 9,
            marginTop: screenWidth / 20,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#d0d0d0',
            backgroundColor: 'white',

        },
        borderViewshort: {
            width: screenWidth / 2.3,
            height: screenWidth / 9,
            borderRadius: 6,
            borderWidth: 1,
            borderColor: '#d0d0d0',
            backgroundColor: 'white',

        },
        textInput: {
            flex: 1,
            backgroundColor: '#00000000',
            color: 'black',
            fontSize: screenWidth / 25,
            padding: screenWidth / 36
        }
    })
    ;


export default Register;
