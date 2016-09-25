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
    ListView,
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
import storge from '../../Utils/Storage.js';
import DatePicker from 'react-native-datepicker';
import * as urls from '../../Utils/Request';
import WorkOrderDetail from '../MainPage/WorkOrderDetail';
var ds;
export default class MyWorkOrder extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            startDate: '2016-01-01',
            endData: '2016-01-01'
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

    componentWillUnMount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {

        return (
            <TouchableOpacity activeOpacity={0.5}
                              underlayColor='#c8c7cc'
                              onPress={this._buttonClickItem.bind(this, rowData)}
            >
                <View style={styles.itemView}>
                    <Text >{rowData.street}</Text>
                    <View style={{width: screenWidth, marginTop: 8, flexDirection: 'row'}}>
                        <Text numberOfLines={1} style={{color: '#4b4b4b', flex: 2.2}}>{rowData.deviceName}</Text>
                        <Text
                            numberOfLines={1}
                            style={{color: '#ff3f3f', flex: 1}}>{Util.returnPriType(rowData.pri)}</Text>
                        <Text
                            numberOfLines={1}
                            style={{color: '#ff9900', flex: 0.8}}>{Util.returnStatus(rowData.status)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    _buttonClickItem(rowData) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            console.log('跳转到工单详情');
            navigator.push({
                name: 'WorkOrderDetail',
                component: WorkOrderDetail,
                params: {
                    data: rowData
                }
            });
        });
    }

    _search() {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            var body = {
                'repairUserPhone': result[0],
                'userToken': result[1],
                'beginTime': this.state.startDate,
                'endTime': this.state.endDate,
            }
            Util.post(urls.SEARCHPROCESS_URL, body, navigator, (response) => {
                if (response === undefined || response === '') {
                    Toast.show('搜索访问异常');
                } else {
                    if (response.code === '0') {
                        if (response.data.length > 0) {
                            this.setState({
                                dataSource: ds.cloneWithRows(response.data),
                            });
                        } else {
                            Toast.show('搜索结果为空')
                        }
                    } else {
                        Toast.show('搜索失败')
                    }
                }
            })
        });
    }


    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolBar title={'我的工单'} left={true} navigator={navigator}/>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: screenWidth / 20,}}>
                            开始时间
                        </Text>
                        <DatePicker
                            style={{width: 180}}
                            date={this.state.startDate}
                            mode="date"
                            placeholder="2016-01-01"
                            format="YYYY-MM-DD"
                            minDate="2016-01-01"
                            maxDate="2019-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({startDate: date})
                            }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center',marginTop: screenWidth/100}}>
                        <Text style={{fontSize: screenWidth / 20,}}>
                            结束时间
                        </Text>
                        <DatePicker
                            style={{width: 180}}
                            date={this.state.endDate}
                            mode="date"
                            placeholder="2016-01-01"
                            format="YYYY-MM-DD"
                            minDate="2016-01-01"
                            maxDate="2019-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            showIcon={true}
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                },
                            }}
                            onDateChange={(date) => {
                                this.setState({endDate: date})
                            }}
                        />
                    </View>
                    <TouchableOpacity
                        style={{borderRadius: 6, elevation: 3, marginTop: screenWidth/30}}
                        activeOpacity={0.5}
                        onPress={this._search.bind(this)}>
                        <View
                            style={{
                                width: screenWidth / 1.5,
                                height: screenWidth / 9,
                                borderRadius: 6,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#ffd57d',
                            }}>
                            <Text style={{color: 'red'}}>
                                搜 索
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex: 1}}>
                        <ListView
                            style={{marginTop: screenWidth/30}}
                            renderRow={(rowData) => this._renderRowView(rowData)}
                            dataSource={this.state.dataSource}
                        />
                    </View>
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    itemView: {
        width: screenWidth,
        height: screenHeight / 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
});
