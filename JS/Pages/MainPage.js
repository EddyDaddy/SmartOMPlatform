/**
 * Created by demon on 2016/9/14.
 * 首页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Navigator,
    StyleSheet,
    TouchableHighlight,
}from 'react-native';
import Util from '../Utils/Utils.js'
import {styles} from '../Utils/Styles.js';
import Toolbar from '../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
import GiftedListView from 'react-native-gifted-listview';

export default class MainPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
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

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        return (
            <TouchableHighlight
                style={myStyles.row}
                underlayColor='#c8c7cc'
                onPress={() => {
                    console.log(rowData + ' pressed')
                }}
            >
                <Text>{rowData}</Text>
            </TouchableHighlight>
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
            <TouchableHighlight
                underlayColor='#c8c7cc'
                onPress={paginateCallback}
                style={myStyles.paginationView}
            >
                <Text style={myStyles.actionsLabel}>
                    加载更多...
                </Text>
            </TouchableHighlight>
        );
    }

    /*没有数据的时候view*/
    _emptyView(refreshCallback) {
        return (
            <View style={myStyles.emptyView}>
                <Text style={myStyles.defaultViewTitle}>
                    暂无数据
                </Text>

                <TouchableHighlight
                    underlayColor='#c8c7cc'
                    onPress={refreshCallback}
                >
                    <Text>
                        ↻
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View >
                <Toolbar title={'首页'}>

                </Toolbar>
                <View style={{flex: 1, backgroundColor: '#ebebeb'}}>
                    <GiftedListView
                        rowView={this._renderRowView}
                        onFetch={this._onFetch}
                        firstLoader={true} // display a loader for the first fetching
                        pagination={true} // enable infinite scrolling using touch to load more
                        refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                        withSections={false} // enable sections
                        paginationWaitingView={this._paginationWaitingView}
                        paginationAllLoadedView={this._paginationAllLoadedView}
                        emptyView = {this._emptyView}
                    />
                </View>
            </View>
        );
    }
}

var myStyles = {
    row: {
        padding: 10,
        height: 44,
    },
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
        fontSize: 20,
    },
    actionsLabel: {
        fontSize: 20,
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
        height: 10,
        backgroundColor: '#CCCbbb'
    },
};