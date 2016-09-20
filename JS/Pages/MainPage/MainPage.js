/**
 * Created by demon on 2016/9/14.
 * 首页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Image,
    Navigator,
    StyleSheet,
    TouchableHighlight,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import {styles} from '../../Utils/Styles.js';
import Toolbar from '../../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
import Swiper from 'react-native-swiper';
import GiftedListView from 'react-native-gifted-listview';
var navigator;
export default class MainPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        navigator = this.props.navigator;
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
        // Util.post("https://www.baidu.com", '', function (responseData){
        //     var rows = ['row ' + ((page - 1) * 3 + 1), 'row ' + ((page - 1) * 3 + 2), 'row ' + ((page - 1) * 3 + 3)];
        //     var rows2 = ['row ' + ((page - 1) * 3 + 1)];
        //     if (responseData !== null) {
        //         callback(rows)
        //     } else {
        //         callback(rows2)
        //     }
        // });
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
                <View style={{width: screenWidth, height: screenHeight/3,backgroundColor: '#ebebeb'}}>
                    <Swiper style={myStyles.wrapper}
                            showsButtons={false} loop={true}
                            activeDot={<View style={{backgroundColor: '#000', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 30,}} />}
                            dot={<View style={{backgroundColor:'rgba(255,255,255,.3)', width: 13, height: 13,borderRadius: 7, marginLeft: 7, marginRight: 7,marginTop: 3, marginBottom: 30,}} />}
                    >
                        <View style={myStyles.slide}>
                            <Text style={myStyles.text}>Hello Swiper</Text>
                        </View>
                        <View style={myStyles.slide}>
                            <Text style={myStyles.text}>Beautiful</Text>
                        </View>
                        <View style={myStyles.slide}>
                            <Text style={myStyles.text}>And simple</Text>
                        </View>
                    </Swiper>
                </View>
                <View style={{width: screenWidth, height: screenHeight/3*2,backgroundColor: '#ebebeb'}}>
                   <GiftedListView
                        style={myStyles.wrapper}
                        rowView={this._renderRowView}
                        onFetch={this._onFetch}
                        firstLoader={true} // display a loader for the first fetching
                        pagination={true} // enable infinite scrolling using touch to load more
                        refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                        withSections={false} // enable sections
                        paginationWaitingView={this._paginationWaitingView}
                        paginationAllLoadedView={this._paginationAllLoadedView}
                        emptyView={this._emptyView}
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
    wrapper: {
    },

    slide: {
        width: screenWidth,
        height: screenHeight/3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#bcd235'
    },

    text: {
        fontSize: 30,
        fontWeight: 'bold'
    },

    image: {
        flex: 1,
    }
};