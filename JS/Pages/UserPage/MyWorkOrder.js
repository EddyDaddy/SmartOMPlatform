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
import moment from 'moment';
var ds;
var dataList = new Array();
var itemTextBigSize = Util.pxToTextSize(44);
var itemTextSmallSize = Util.pxToTextSize(34);
export default class MyWorkOrder extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
            startDate: Util.FormatDate(new Date()),
            endData: Util.FormatDate(new Date()),
            page: 1,
            isLoading: false,
            isMore: false,
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

    componentWillUnmount() {
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
                    <View style={{width: screenWidth, flexDirection: 'row'}}>
                        <Text style={{
                            flex: 2,
                            fontSize: itemTextBigSize,
                            color: '#333333'
                        }}>{rowData.name}</Text>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <Text style={{
                                fontSize: itemTextSmallSize,
                                color: 'red'
                            }}>{moment(rowData.createTime).format("YYYY-MM-DD HH:mm")}</Text>
                        </View>
                    </View>
                    <View style={{width: screenWidth, marginTop: 8, flexDirection: 'row'}}>
                        <Text numberOfLines={1} style={{color: '#4b4b4b', flex: 2.2}}>{rowData.boxId}</Text>
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
                    data: rowData,
                    from: 'workOrderList'
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
                'endTime': this.state.endDate ? this.state.endData : Util.FormatDate(new Date()),
                'page': this.state.page,
                'rows': 20
            }
            this.setState({
                isLoading: true
            })
            Util.post(urls.SEARCHPROCESS_URL, body, navigator, (response) => {
                this.setState({
                    isLoading: false
                })
                if (response === undefined || response === '') {
                    Toast.show('搜索访问异常');
                } else {
                    if (response.success) {
                        if (response.rows.length > 0) {
                            if (this.state.page === 1) {
                                dataList = response.rows;
                            } else {
                                dataList = dataList.concat(response.rows);
                            }
                            this.setState({
                                dataSource: ds.cloneWithRows(dataList),
                            });
                            if (response.rows.length === 20) {
                                this.setState({
                                    isMore: true
                                })
                            }
                            else {
                                this.setState({
                                    isMore: false
                                })
                            }
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

    _renderSeparator() {
        return (
            <View style={{height: 1, backgroundColor: '#D8D8D8'}}/>
        )
    }

    _getMoreData() {
        this.setState({
            page: this.state.page + 1
        })
        this._search()
    }

    _renderFooter() {
        return (
            this.state.isMore ?
                <TouchableOpacity
                    onPress={this._getMoreData.bind(this)}>
                    <View style={[styles.itemView, {alignItems: 'center'}]}>
                        <Text style={{fontSize: screenWidth / 20}}>
                            点击加载更多
                        </Text>
                    </View>
                </TouchableOpacity> : null
        )
    }

    _buttomSearch() {
        this.setState({
            page: 1
        })
        this._search();
    }


    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolBar title={'我的工单'} left={true} navigator={navigator}/>
                <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: screenWidth / 30}}>
                        <Text style={{fontSize: screenWidth / 20,}}>
                            开始时间
                        </Text>
                        <DatePicker
                            style={{width: 180}}
                            date={this.state.startDate}
                            mode="date"
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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginTop: screenWidth / 100}}>
                        <Text style={{fontSize: screenWidth / 20,}}>
                            结束时间
                        </Text>
                        <DatePicker
                            style={{width: 180}}
                            date={this.state.endDate}
                            mode="date"
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
                        style={{borderRadius: 6, elevation: 3, marginTop: screenWidth / 30}}
                        activeOpacity={0.5}
                        onPress={this._buttomSearch.bind(this)}>
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
                    <View style={{
                        backgroundColor: '#d8d8d8',
                        width: Util.size.width,
                        height: 1,
                        marginTop: screenWidth / 30
                    }}>

                    </View>
                    <View style={{flex: 1}}>
                        <ListView
                            renderRow={(rowData) => this._renderRowView(rowData)}
                            dataSource={this.state.dataSource}
                            renderSeparator={this._renderSeparator}
                            renderFooter={this._renderFooter.bind(this)}
                        />
                    </View>
                </View>
                <Loading visible={this.state.isLoading}/>
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
