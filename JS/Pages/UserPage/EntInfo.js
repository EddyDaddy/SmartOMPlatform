/**
 * Created by demon on 2016/9/22.
 */

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
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
var _navigator;
import storge from '../../Utils/Storage.js';
import * as urls from '../../Utils/Request';
import LoadViewing from '../../Utils/LoadingView';
var userData

class EntInfo extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        _navigator = this.props.navigator;
        this.state = {
            isOk: false,
            entName: '',
            entId: '',
            linkman: '',
            linkNum: '',
            address: '',
        };
    }

    componentWillMount() {
        const {navigator} = this.props;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableOpacity;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });

    }

    componentDidMount() {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
                storge.get('loginInfo').then((result) => {
                    this.setState({phoneNum: result[0]});
                    var body = {
                        'repairUserPhone': result[0],
                        'userToken': result[1]
                    }
                    Util.post(urls.QUERYENTINFO_URL, body, navigator, (response) => {
                        this.setState({
                            isOk: true
                        });
                        if (response === undefined && response === '') {
                            Toast.show('返回结果异常');
                        } else {
                            if (response.code === '0') {
                                this.setState({
                                    entName: response.data[0].repairName,
                                    linkman: response.data[0].linkman,
                                    entId: response.data[0].repairId,
                                    linkNum: response.data[0].contactNumber,
                                    address:response.data[0].repairAddr,
                                });
                            } else {
                                Toast.show('获取失败');
                            }
                        }
                    });
                });
            }
        );
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }


    render() {
        return (this.state.isOk ?
                <View style={styles.root}>
                    <ToolBar title={'企业信息'} left={true} navigator={this.props.navigator}/>
                    <View style={styles.top}>
                        <View style={styles.item1}>
                            <View style={styles.item2}>
                                <Text style={styles.textLeft}>
                                    企业编号
                                </Text>
                            </View>
                            <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                            <View style={styles.item3}>
                                <Text style={styles.textRight}>
                                    {this.state.entId}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item1}>
                            <View style={styles.item2}>
                                <Text style={styles.textLeft}>
                                    企业名称
                                </Text>
                            </View>
                            <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                            <View style={styles.item3}>
                                <Text style={styles.textRight}>
                                    {this.state.entName}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item1}>
                            <View style={styles.item2}>
                                <Text style={styles.textLeft}>
                                    负责人姓名
                                </Text>
                            </View>
                            <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                            <View style={styles.item3}>
                                <Text style={styles.textRight}>
                                    {this.state.linkman}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>

                        <View style={styles.item1}>
                            <View style={styles.item2}>
                                <Text style={styles.textLeft}>
                                    负责人电话
                                </Text>
                            </View>
                            <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                            <View style={styles.item3}>
                                <Text style={styles.textRight}>
                                    {this.state.linkNum}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                        <View style={styles.item1}>
                            <View style={styles.item2}>
                                <Text style={styles.textLeft}>
                                    地址
                                </Text>
                            </View>
                            <View style={{width: Util.pixel, height: 200, backgroundColor: '#dddddd'}}/>
                            <View style={styles.item3}>
                                <Text style={styles.textRight}>
                                    {this.state.address}
                                </Text>
                            </View>
                        </View>
                        <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#dddddd'}}/>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ebebeb'}}/>
                </View> : <LoadViewing/>
        );

    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    top: {
        height: screenHeight / 2.4,
        width: screenWidth,
        backgroundColor: 'white',
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
        fontSize: screenWidth / 29,
        color: '#666666',
    },
    textRight: {
        fontSize: screenWidth / 29,
        color: 'black',
    },

});

export default EntInfo;

