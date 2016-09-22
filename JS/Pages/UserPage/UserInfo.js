/**
 * Created by demon on 2016/9/22.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Platform,
    Text,
    TextInput,
    View,
    Image,
    TouchableNativeFeedback,
    InteractionManager,
    TouchableHighlight,
    TouchableOpacity,
    Navigator,
    BackAndroid,
    DeviceEventEmitter,
} from 'react-native';
import Util from '../../Utils/Utils.js'
import Toast from 'react-native-root-toast';
import Main from '../Main';
import Loading from '../../Utils/Loading';
import ToolBar from '../../Utils/ToolBar';
import {naviGoBack} from '../../Utils/CommonUtil';
import EntInfo from './EntInfo';
import ImagePicker from "react-native-image-picker";
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../../Utils/Storage.js';
var imagePickerOption = {
    title: '',
    takePhotoButtonTitle: '拍照',
    cancelButtonTitle: '取消',
    chooseFromLibraryButtonTitle: '照片',
    storageOptions: {
        skipBackup: true,
        path: 'images' //照片存储路径
    }
};


class UserInfo extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _navigator = this.props.navigator;
        this.state = {
            userIcon: '-'
        };
    }

    componentWillMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableOpacity;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
        storge.get('userIcon').then((result) => {
            this.setState({userIcon: result});
        });
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    _gotoEntInfo() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({name: 'EntInfo', component: EntInfo});
        });
    }

    choiceUserIcon() {
        ImagePicker.showImagePicker(imagePickerOption, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Toast.show('选择图片失败');
            } else {
                let imageUri = response.uri;
                if (Platform.OS === 'ios') {
                    imageUri = response.uri.replace('file://');
                }
                this.setState({
                    userIcon: imageUri
                });
            }
        });
    }


    render() {
        return (
            <View style={styles.root}>
                <ToolBar title={'个人信息'} left={true} navigator={this.props.navigator}/>
                <View style={styles.top}>
                    <View style={styles.item}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                头像
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <TouchableElement onPress={this.choiceUserIcon.bind(this)}
                                          activeOpacity={0.5}
                                          underlayColor={'white'}
                                          style={{flexDirection:'row', alignItems:'center', flex: 3.2, paddingLeft: screenWidth/20}}>
                            <View
                                style={{flexDirection:'row', alignItems:'center', flex: 3.2}}>

                                <Image
                                    style={{width: screenWidth/7.2, height: screenWidth/7.2, borderRadius: screenWidth/14.4}}
                                    source={this.state.userIcon=='-'?require('../img/my_icon_detail.png'):{uri:this.state.userIcon}}/>
                                <View
                                    style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: screenWidth/27}}>
                                    <Image style={{width: screenWidth/38.6, height: screenWidth/24}}
                                           source={require('../img/next_small.png')}/>
                                </View>
                            </View>
                        </TouchableElement>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                公司名称
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <TouchableElement style={styles.item3}
                                          onPress={this._gotoEntInfo.bind(this)}
                                          activeOpacity={0.5}
                                          underlayColor={'white'}>
                            <View style={{flex: 3.2, alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.textRight}>
                                    九洲视讯
                                </Text>
                                <View
                                    style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', marginRight: screenWidth/27}}>
                                    <Image style={{width: screenWidth/38.6, height: screenWidth/24}}
                                           source={require('../img/next_small.png')}/>
                                </View>
                            </View>
                        </TouchableElement>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                姓名
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item3}>
                            <Text style={styles.textRight}>
                                李四
                            </Text>
                        </View>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    <View style={styles.item1}>
                        <View style={styles.item2}>
                            <Text style={styles.textLeft}>
                                电话
                            </Text>
                        </View>
                        <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item3}>
                            <Text style={styles.textRight}>
                                13812345678
                            </Text>
                        </View>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                </View>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ebebeb'}}>
                    <View style={{marginTop: screenWidth/18}}>
                        <TouchableElement
                            style={{borderRadius: 6, elevation: 3}}
                            activeOpacity={0.5}
                            onPress={()=> {Toast.show('保存');
                            storge.save('userIcon', this.state.userIcon)}}>
                            <View
                                style={{width: screenWidth/1.5, height: screenWidth/9, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffd57d'}}>
                                <Text style={{color: 'red'}}>
                                    保 存
                                </Text>
                            </View>
                        </TouchableElement>
                    </View>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    top: {
        height: screenWidth / 1.5,
        width: screenWidth,
        backgroundColor: 'white',
    },
    item: {
        flex: 1.5,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    item1: {
        flex: 1,
        width: screenWidth,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    item2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: screenWidth / 20,
    },
    item3: {
        flex: 3.2,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: screenWidth / 20,
    },
    textLeft: {
        fontSize: Util.pixel * 37,
        color: '#666666',
    },
    textRight: {
        fontSize: Util.pixel * 37,
        color: 'black',
    },

});

export default UserInfo;
