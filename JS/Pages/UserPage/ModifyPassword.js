/**
 * Created by demon on 2016/9/22.
 */

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
import Util from '../../Utils/Utils.js';
import {naviGoBack} from '../../Utils/CommonUtil.js';
import storge from '../../Utils/Storage.js';
import Toast from 'react-native-root-toast';
import ToolBar from '../../Utils/ToolBar';
import Loading from '../../Utils/Loading';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var _navigator;
var phone;
class ModifyPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            passWord: '',
            passWord1: '',
            passWord2: '',
            isLoading: false
        };
    }

    componentWillMount() {
        const {navigator} = this.props;
        Toast.show('navigator====' + navigator);
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    confirmModify() {
        this.setState({isLoading: true});
        if (this.state.passWord === '') {
            Toast.show('请输入旧密码');
            return;
        }
        if (this.state.passWord1 === '') {
            Toast.show('请输入新密码');
            return;
        }
        if (this.state.passWord2 === '') {
            Toast.show('请再次输入新密码');
            return;
        }
        if (this.state.verificationCode === '') {
            Toast.show('请输入验证码');
            return;
        }
        if (this.state.passWord1 !== this.state.passWord2) {
            Toast.show('两次输入的密码不一致');
            return;
        }
        storge.get('loginInfo').then((result) => {
            const body = {
                'repairUserPhone': result[0],
                'newPassword': this.state.passWord1,
                'checkCode': this.state.verificationCode,
            };
            const {navigator} = this.props;
            Util.post(urls.MODIFYPASSWORD_URL, body, (response) => {
                this.setState({isLoading: false});
                if (response !== undefined || response === '') {
                    if (response.code === '0') {
                        console.log(response.msg);
                        Toast.show('修改成功');
                        storge.save('loginInfo', [this.state.userName, '', '']);
                        storge.save('passWord', this.state.passWord1);
                        InteractionManager.runAfterInteractions(() => {
                            navigator.pop();
                        });
                    } else {
                        Toast.show('修改失败');
                        console.log(response.msg);
                    }
                } else {
                    Toast.show('网络异常');
                }
            });
        });

    }


    getLoginUI() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolBar title={'密码修改'} left={true} navigator={navigator}/>
                <View style={styles.root}>
                    <View style={{height: screenWidth/1.6}}>
                        <View style={styles.borderView}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord1) => this.setState({passWord1})}
                                       value={this.state.passWord}
                                       secureTextEntry={true}
                                       placeholder="输入旧密码"
                                       placeholderTextColor='#666666'
                            />
                        </View>

                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord1) => this.setState({passWord1})}
                                       value={this.state.passWord1}
                                       secureTextEntry={true}
                                       placeholder="输入新密码"
                                       placeholderTextColor='#666666'
                            />
                        </View>
                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord2) => this.setState({passWord2})}
                                       value={this.state.passWord2}
                                       secureTextEntry={true}
                                       placeholder="请再次输入新密码"
                                       placeholderTextColor='#666666'
                            />
                        </View>
                    </View>
                    <View style={{flex: 1, backgroundColor: '#ebebeb', width: screenWidth, alignItems: 'center'}}>
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={()=>{
                                this._navigator.pop();
                                storge.get('passWord').then((passWord)=>{Toast.show('登录密码'+passWord)});
                                }}
                                          style={{width: screenWidth/1.5, height: screenWidth/9, elevation: 3, borderRadius: 6, margin:5,marginTop: screenWidth / 20}}>
                            <View
                                style={{width: screenWidth/1.5, height: screenWidth/9, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                <Text style={{color: 'red'}}>
                                    确 认
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Loading visible={this.state.isLoading}/>
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
            flex: 1, alignItems: 'center', width: screenWidth
        },
        borderView: {
            width: screenWidth / 1.5,
            height: screenWidth / 9,
            marginTop: screenWidth / 9,
            elevation: 3,
            borderRadius: 6,
            margin: 5,
            borderWidth: 1,
            borderColor: '#d0d0d0',
            backgroundColor: 'white',

        },
        borderViewCommon: {
            width: screenWidth / 1.5,
            height: screenWidth / 9,
            marginTop: screenWidth / 20,
            elevation: 3,
            borderRadius: 6,
            margin: 5,
            borderWidth: 1,
            borderColor: '#d0d0d0',
            backgroundColor: 'white',

        },
        borderViewshort: {
            width: screenWidth / 2.3,
            height: screenWidth / 9,
            elevation: 3,
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


export default ModifyPassword;

