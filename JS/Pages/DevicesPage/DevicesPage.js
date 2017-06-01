/**
 * Created by demon on 2016/9/14.
 * 设备页
 */
import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    Navigator,
    TouchableOpacity,
    InteractionManager,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import DevicesDtails from './DevicesDetails.js'
import Toolbar from '../../Utils/ToolBar.js';
import GiftedListView from 'react-native-gifted-listview';
import Toast from 'react-native-root-toast';
import * as urls from '../../Utils/Request';
import storge from '../../Utils/Storage';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var itemHeight = Util.pxToTextSize(140);
var itemTextSize = Util.pxToTextSize(34);
export default class DevicesPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        return (
            <View style={{marginBottom: screenWidth / 7.5}}>
                <Toolbar title={'设备'}>
                </Toolbar>
                <View style={{flex: 1}}>
                    <View style={{width: screenWidth, height: screenHeight / 10 * 3, backgroundColor: '#ebebeb'}}>
                        <Image style={{
                            width: screenWidth,
                            height: screenHeight / 10 * 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                            resizeMode: 'stretch'
                        }}
                               source={require('../img/deviceBanner.png')}/>
                    </View>
                    <View style={{width: screenWidth, height: Util.pxToHeight(995), backgroundColor: '#ebebeb'}}>
                        <GiftedListView
                            rowView={this._renderRowView.bind(this)}
                            onFetch={this._onFetch.bind(this)}
                            firstLoader={true} // display a loader for the first fetching
                            pagination={false} // enable infinite scrolling using touch to load more
                            refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                            withSections={false} // enable sections
                            paginationWaitingView={this._paginationWaitingView}
                            paginationAllLoadedView={this._paginationAllLoadedView}
                            renderSeparator={this._renderSeparator}
                            emptyView={this._emptyView}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _onFetch(page = 1, callback, options) {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            console.log(result);
            if (result) {
                var body = {
                    'repairUserPhone': result[0],
                    'userToken': result[1],
                    'page': page,
                    'rows': 10
                };
                Util.post(urls.DEVICESINFO_URL, body, navigator, (response) => {
                    if (response !== undefined) {
                        if (response.success) {
                            callback(response.rows);
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
            }
        });
    }

    _buttonClickItem(rowData) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            console.log('跳转到工单详情');
            navigator.push({name: 'DevicesDtails', component: DevicesDtails, params: {data: rowData}});
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
                <View style={[myStyles.itemView,{height:itemHeight}]}>
                    <View style={{width: screenWidth, flexDirection: 'row', alignItems: 'center'}}>
                        <Text numberOfLines={1} style={{flex:1.2,color: '#4b4b4b',fontSize:itemTextSize}}>{rowData.name}</Text>
                        <Text numberOfLines={1} style={{flex:1.2,color: '#4b4b4b',fontSize:itemTextSize,marginLeft:4}}>{rowData.deviceName}</Text>
                        <Text numberOfLines={1} style={{flex:1,color: '#4b4b4b',fontSize:itemTextSize,marginLeft:4}}>{rowData.priStr}</Text>
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
            <View style={{backgroundColor: '#ebebeb', height: Util.pxToHeight(1), width: Util.size.width}}/>
        )
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
