/**
 * Created by demon on 2016/9/14.
 * 工单页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Navigator,
    StyleSheet,
    TouchableOpacity,
    InteractionManager
}from 'react-native';
import Util from '../../Utils/Utils.js'
import {styles} from '../../Utils/Styles.js';
import storge from '../../Utils/Storage';
import Toolbar from '../../Utils/ToolBar.js';
import * as urls from '../../Utils/Request';
import WorkOrderDetail from '../MainPage/WorkOrderDetail';
import GiftedListView from 'react-native-gifted-listview';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
var itemHeight = Util.pxToTextSize(204);
var itemTextBigSize = Util.pxToTextSize(44);
var itemTextSmallSize = Util.pxToTextSize(34);
var pri;
export default class WorkOrderList extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        pri = this.props.pri
    }

    componentDidMount() {
        const {navigator} = this.props;
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    _onFetch(page = 1, callback, options) {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            console.log(result);
            if (result) {
                var body = {
                    'repairUserPhone': result[0],
                    'userToken': result[1],
                    'pri': pri,
                    'page': page,
                    'rows': 10
                };
                Util.post(urls.QUERY_PROCESSINFO_BY_PRI, body, navigator, (response) => {
                    if (response !== undefined && response !== '' && response !== null) {
                        if (response.success) {
                            if (response.rows.length === 10) {
                                callback(response.rows);
                            } else {
                                callback(response.rows, {
                                    allLoaded: true,
                                });
                            }
                            console.log('获取数据成功-------')
                        } else {
                            Toast.show('获取失败');
                            callback([]);
                        }
                    } else {
                        callback([]);
                    }
                });
            } else {
                Toast.show('未登录');
                navigator.resetTo({
                    name: 'Login',
                    component: Login
                })
            }
        });

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
                <View style={myStyles.itemView}>
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
                            }}>{rowData.createTime.substring(0, 16)}</Text>
                        </View>
                    </View>
                    <View style={{width: screenWidth, marginTop: 8, flexDirection: 'row'}}>
                        <Text numberOfLines={1} style={{
                            color: '#4b4b4b',
                            flex: 2,
                            fontSize: itemTextSmallSize
                        }}>{rowData.boxId}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: rowData.pri === '4' ? '#a7324a' : rowData.pri === '3' ? 'red' : '#ffb23f',
                                flex: 1.2,
                                fontSize: itemTextSmallSize
                            }}>{Util.returnPriType(rowData.pri)}</Text>
                        <Text
                            numberOfLines={1}
                            style={{
                                color: '#ff9900',
                                flex: 0.8,
                                fontSize: itemTextSmallSize
                            }}>{rowData.statusStr}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    /*加载完了的view*/
    _paginationAllLoadedView() {
        return (
            <View style={myStyles.paginationView}>
                <Text style={myStyles.actionsLabel}>
                    -- 没有啦 --
                </Text>
            </View>
        );
    }

    /*加载更多的view*/
    _paginationWaitingView(paginateCallback) {
        return (
            <TouchableOpacity activeOpacity={0.5}
                              underlayColor='#c8c7cc'
                              onPress={paginateCallback}
                              style={myStyles.paginationView}
            >
                <Text style={myStyles.actionsLabel}>
                    加载更多...
                </Text>
            </TouchableOpacity>
        );
    }

    /*没有数据的时候view*/
    _emptyView(refreshCallback) {
        return (
            <View style={myStyles.emptyView}>
                <Text style={myStyles.defaultViewTitle}>
                    暂无数据
                </Text>

                <TouchableOpacity activeOpacity={0.5}
                                  underlayColor='#c8c7cc'
                                  onPress={refreshCallback}
                >
                    <Text>
                        ↻
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderSeparator() {
        return (
            <View style={myStyles.separator}/>
        )
    }


    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <Toolbar left={true} title={'工单列表'} navigator={navigator}/>
                <GiftedListView
                    rowView={this._renderRowView.bind(this)}
                    onFetch={this._onFetch.bind(this)}
                    firstLoader={true} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    paginationWaitingView={this._paginationWaitingView}
                    paginationAllLoadedView={this._paginationAllLoadedView}
                    renderSeparator={this._renderSeparator}
                    emptyView={this._emptyView}
                />
            </View>
        );
    }

}

export const myStyles = StyleSheet.create({
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    paginationView: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF',
    },
    actionsLabel: {
        fontSize: 12,
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    defaultViewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#D8D8D8'
    },
    image: {
        width: screenWidth,
        height: screenHeight / 10 * 3,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch'
    },
    itemView: {
        width: screenWidth,
        height: itemHeight,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
});
