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
class Register extends React.Component {
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
                    <View style={styles.viewCenter}>
                        <Image source={require('./img/name.png')}
                               style={{marginTop: screenWidth/4.8, width: screenWidth/1.8, height: screenWidth/18}}></Image>
                    </View>
                    <View style={styles.viewCenter}>
                        <Image
                            source={require('./img/logo_img.png')}
                            style={{marginTop: screenWidth/18, width: screenWidth/3.86, height: screenWidth/3.86}}
                        />
                    </View>
                    <View style={styles.viewCenter}>
                        <TextInput style={styles.textInputLong}>

                        </TextInput>
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
    },
    viewCenter: {
        width: screenWidth,
        alignItems: 'center'
    },
    textInputLong: {
        width: screenWidth/1.5,
        height: screenWidth/9,
        backgroundColor: '#6ab5ba',
        marginTop: screenWidth/18
    }
});

export default Register;
