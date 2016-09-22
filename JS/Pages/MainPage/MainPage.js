/**
 * Created by demon on 2016/9/14.
 * 首页
 */
import React, {Component, PropTypes} from 'react';
import {
    Platform,
    BackAndroid,
    View,
    Text,
    Image,
    Navigator,
    StyleSheet,
    TouchableHighlight,
    InteractionManager,
    TouchableNativeFeedback,
    RefreshControl,
}from 'react-native';
import {connect} from 'react-redux';
import Util from '../../Utils/Utils.js'
import WorkOrderDetail from './WorkOrderDetail.js'
import storge from '../../Utils/Storage.js';
import {styles} from '../../Utils/Styles.js';
import Toolbar from '../../Utils/ToolBar.js';
import ViewPager from 'react-native-viewpager';
import GiftedListView from 'react-native-gifted-listview';
import Toast from 'react-native-root-toast';
import getWOAction from '../../actions/GetWorkOrderAction';
import LoadingView from '../../Utils/LoadingView';
import * as urls from '../../Utils/Request';
var TouchableByPlatForm = TouchableHighlight;
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

const BANNER_IMGS = [
    require('../img/logo_img.png'),
    require('../img/tab_device.png'),
    require('../img/tab_user.png')
];

let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    getWOReducer: PropTypes.object.isRequired
};
var loginInfo;
class MainPage extends React.Component {
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
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
        };
    }

    componentDidMount() {

        if (Platform.OS === 'android') {
            TouchableByPlatForm = TouchableNativeFeedback
        }
        const {dispatch} = this.props;
        // storge.get('loginInfo').then((result) => {
        //     console.log(result);
        //     loginInfo = result;
        //     if (result) {
        //         dispatch(getWOAction(result[0], result[1], '', isLoadMore, isRefreshing, isLoading));
        //     } else {
        //         Toast.show('未登录');
        //     }
        // });
    }

    _onFetch(page = 1, callback, options) {
        storge.get('loginInfo').then((result) => {
            console.log(result);
            if (result) {
                // dispatch(getWOAction(result[0], result[1], '', isLoadMore, isRefreshing, isLoading));
                var body = {
                    'repairUserPhone': result[0],
                    'userToken': result[1],
                    // 'status': '',
                };
                Util.post(urls.WORKORDER_URL, body, (response) => {
                    if (response !== undefined) {
                        if (response.code === '0') {
                            callback(response.data);
                            console.log('获取数据成功-------')
                        } else {
                            Toast.show('获取失败');
                            callback([]);
                        }
                    }else{
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
            navigator.push({name: 'WorkOrderDetail', component: WorkOrderDetail});
        });
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {

        return (
            <TouchableByPlatForm
                underlayColor='#c8c7cc'
                onPress={() => this._buttonClickItem(rowData)}
            >
                <View style={myStyles.itemView}>
                    <Text >{rowData.entName}</Text>
                    <View style={{width: screenWidth, marginTop: 8, flexDirection: 'row'}}>
                        <Text style={{color: '#4b4b4b'}}>{rowData.deviceName}</Text>
                        <Text style={{color: '#ff3f3f', marginLeft: screenWidth / 5}}>{rowData.pri}</Text>
                        <Text style={{color: '#ff9900', marginLeft: screenWidth / 6}}>{rowData.status}</Text>
                    </View>
                </View>
            </TouchableByPlatForm>
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
                </View>
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
});

export default connect((state) => {
    const {getWOReducer} = state;
    return {
        getWOReducer
    }
})(MainPage);