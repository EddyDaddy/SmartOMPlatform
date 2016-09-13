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
        this.state = {
            userName: '',
            erificationCodev: '',
            passWord1: '',
            passWord2: '',
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
                        <View style={styles.borderView}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(name) => this.setState({name})}
                                       value={this.state.name}
                            />
                        </View>
                    </View>

                    <View style={{width: screenWidth, marginTop: screenWidth/36, alignItems: 'center', flexDirection: 'row',
                        }}>
                        <View style={styles.borderViewshort}>
                            <TextInput style={styles.textInput}
                                       onChangeText={(verificationCode) => this.setState({verificationCode})}
                                       value={this.state.verificationCode}
                            />
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
            flex: 1
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
        borderViewshort: {
            width: screenWidth / 2.3,
            height: screenWidth / 9,
            marginTop: screenWidth / 36,
            borderRadius: 6,
            backgroundColor: '#6ab5ba',

        },
        textInput: {
            flex: 1,
            backgroundColor: '#00000000'
        }
    })
    ;

export default Register;
