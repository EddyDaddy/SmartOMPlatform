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
    Navigator,
    DeviceEventEmitter,
} from 'react-native';
import Dimensions from 'Dimensions';
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.status = {
            userName: '',
            passWord: '',
        };
    }

    componentDidMount() {

    }

    getLoginUI() {
        return (
            <View style={styles.root}>
                <Image source={require('./img/bg.png')}
                       style={{width: screenWidth, height: screenHeight}}>
                    <View style={{width: screenWidth, alignItems: 'center'}}>
                        <Image source={require('./img/name.png')}
                               style={{marginTop: screenWidth/4.8, width: screenWidth/1.8, height: screenWidth/18}}></Image>
                        </View>

                </Image>

            </View>
    );
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
        flex: 1
    }
    });

    export default Login;
