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
    TouchableNativeFeedback
}from 'react-native';
import Util from '../../Utils/Utils.js'
import WorkOrderDetail from './WorkOrderDetail.js'
import {styles} from '../../Utils/Styles.js';
import Toolbar from '../../Utils/ToolBar.js';
import ViewPager from 'react-native-viewpager';
import GiftedListView from 'react-native-gifted-listview';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

const BANNER_IMGS = [
    require('../img/logo_img.png'),
    require('../img/tab_device.png'),
    require('../img/tab_user.png')
];

export default class MainPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS)
        };
        this._buttonClickItem = this._buttonClickItem.bind(this);
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

    _buttonClickItem(rowData) {
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        const {navigator} = this.props;
        return (
            <TouchableNativeFeedback
                underlayColor='#c8c7cc'
                onPress={() => {
                    navigator.push({name: 'WorkOrderDetail', component: WorkOrderDetail})
                }
                }
            >
                <View style={myStyles.itemView}>
                    <Text >{'机场派出所'}</Text>
                    <View style={{width: screenWidth, marginTop: 8, flexDirection: 'row'}}>
                        <Text style={{color: '#4b4b4b'}}>{'J98khk'}</Text>
                        <Text style={{color: '#ff3f3f', marginLeft: screenWidth / 5}}>{'紧急'}</Text>
                        <Text style={{color: '#ff9900', marginLeft: screenWidth / 6}}>{'待处理'}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
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

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={myStyles.image}/>
        );
    }

    _renderSeparator() {
        return (
            <View style={myStyles.separator}/>
        )
    }

    render() {
        return (
            <View style={{marginBottom: screenWidth / 7.5}}>
                <Toolbar title={'首页'}>
                </Toolbar>
                <View style={{flex: 1}}>
                    <View style={{width: screenWidth, height: screenHeight / 10 * 3, backgroundColor: '#ebebeb'}}>
                        <ViewPager
                            dataSource={this.state.dataSource}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true}/>
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
}

var myStyles = {
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
        backgroundColor: '#bcd234',
        resizeMode: 'contain'
    },
    itemView: {
        width: screenWidth,
        height: screenHeight / 10,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
};