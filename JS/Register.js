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
    DeviceEventEmitter,
} from 'react-native';
import Dimensions from 'Dimensions';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var TouchableElement = TouchableHighlight;
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            verificationCode: '',
            passWord1: '',
            passWord2: '',
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
                                       onChangeText={(name) => this.setState({name})}
                                       value={this.state.name}
                                       defaultValue="请输入您的手机号"
                            />
                        </View>

                        <View style={{width: screenWidth/1.5, height: screenWidth / 9, marginTop: screenWidth/36, alignItems: 'center', flexDirection: 'row',
                        }}>
                            <View style={styles.borderViewshort}>
                                <TextInput style={styles.textInput}
                                           onChangeText={(verificationCode) => this.setState({verificationCode})}
                                           value={this.state.verificationCode}
                                           defaultValue="请填写验证码"
                                />
                            </View>
                            <View style={{marginLeft: screenWidth/30, flex: 1, height: screenWidth/9,
                             borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                <TouchableElement onPress={()=>ToastAndroid.show('点击获取验证码', 0.05)}>
                                    <Text style={{flex: 1}}>
                                        验证码
                                    </Text>
                                </TouchableElement>
                            </View>
                        </View>
                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord1) => this.setState({passWord1})}
                                       value={this.state.passWord1}
                                       defaultValue="请设置密码"
                            />
                        </View>
                        <View style={styles.borderViewCommon}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(passWord2) => this.setState({passWord2})}
                                       value={this.state.passWord2}
                                       defaultValue="请再次输入密码"
                            />
                        </View>

                        <View style={{width: screenWidth/1.5, height: screenWidth/9, marginTop: screenWidth/36, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                            <TouchableElement onPress={()=>ToastAndroid.show('点击登录', 0.05)}>
                                <Text style={{flex: 1}}>
                                    登录
                                </Text>
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
        borderViewshort: {
            width: screenWidth / 2.3,
            height: screenWidth / 9,
            borderRadius: 6,
            backgroundColor: '#6ab5ba',

        },
        textInput: {
            flex: 1,
            backgroundColor: '#00000000',
            color: 'white',
            paddingLeft: screenWidth/36
        }
    })
    ;

export default Register;
