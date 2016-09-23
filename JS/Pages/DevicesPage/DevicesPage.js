/**
 * Created by demon on 2016/9/14.
 * 设备页
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Navigator,
    TouchableOpacity,
    InteractionManager,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import {myStyles} from '../MainPage/MainPage.js';
import DevicesDtails from './DevicesDetails.js'
import Toolbar from '../../Utils/ToolBar.js';
import GiftedListView from 'react-native-gifted-listview';
import Toast from 'react-native-root-toast';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
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
                            backgroundColor: '#bcd234',
                            resizeMode: 'contain'
                        }}
                               source={require('../img/tab_user.png')}/>
                    </View>
                    <View style={{width: screenWidth, height: screenHeight / 2, backgroundColor: '#ebebeb'}}>
                        <GiftedListView
                            rowView={this._renderRowView.bind(this)}
                            onFetch={this._onFetch}
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
                </View>
            </View>
        );
    }

    _onFetch(page = 1, callback, options) {
        setTimeout(() => {
            var rows = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
            if (page === 3) {
                callback(rows, {
                    allLoaded: true, // the end of the list is reached
                });
            } else {
                callback(rows);
            }
        }, 1000); // simulating network fetching
    }

    _buttonClickItem(rowData) {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            console.log('跳转到工单详情');
            navigator.push({name: 'DevicesDtails', component: DevicesDtails, data: rowData});
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
                        <Text style={{flex:1,color: '#4b4b4b'}}>{'天山路口（东）'}</Text>
                        <Text style={{flex:1,color: '#4b4b4b'}}>{'DSP（抠脚大汉）'}</Text>
                        <Text style={{flex:1,color: '#4b4b4b'}}>{'客源的哈派出所'}</Text>
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
}
