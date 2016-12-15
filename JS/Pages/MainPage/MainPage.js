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
    TouchableOpacity,
    InteractionManager,
    RefreshControl,
    ListView
}from 'react-native';
import {connect} from 'react-redux';
import Util from '../../Utils/Utils.js'
import WorkOrderList from '../WorkOrderPage/WorkOrderList';
import storge from '../../Utils/Storage.js';
import Toolbar from '../../Utils/ToolBar.js';
import ViewPager from 'react-native-viewpager';
import Toast from 'react-native-root-toast';
import * as urls from '../../Utils/Request';
import Login from '../Login';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

const BANNER_IMGS = [
    require('../img/mainBanner_1.png'),
    require('../img/mainBanner_2.png'),
    require('../img/mainBanner_3.png')
];

let isLoadMore = false;
let isRefreshing = false;
let isLoading = true;
var itemHeight = Util.pxToTextSize(204);
var itemTextBigSize = Util.pxToTextSize(44);
var itemTextSmallSize = Util.pxToTextSize(34);

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    getWOReducer: PropTypes.object.isRequired
};
var loginInfo;
var dataSource;
var ds;
var _navigator
class MainPage extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        // 用于构建DataSource对象
        dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        ds = new ListView.DataSource({
            rowHasChanged: (h1, h2) => h1 !== h2,
        });

        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            dataSourceList: ds
        };
        const {navigator} = this.props;
        _navigator = navigator;
    }

    componentWillMount() {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            let body = {
                'repairUserPhone': result[0],
                'userToken': result[1],
            };
            Util.post(urls.QUERY_PRI_NUM, body, navigator, (responseData) => {
                if(responseData.success){
                    this.setState({
                        dataSourceList: ds.cloneWithRows(responseData.rows),
                    })
                }else{
                    Toast.show('数据获取失败');
                }
            })
        });
    }

    componentDidMount() {
    }

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={myStyles.image}/>
        );
    }

    _renderRow(rowData){
        return (
            <View style={{width: Util.size.width, height: Util.pxToHeight(220), backgroundColor: 'white'}}>
                <TouchableOpacity style={{flex: 1}}
                                  onPress={() => {
                                      InteractionManager.runAfterInteractions(() => {
                                          _navigator.push({
                                              component: WorkOrderList, name: 'WorkOrderList', params: {
                                                  pri: rowData.pri
                                              }
                                          });
                                      })
                                  }}>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: rowData.pri === '4'?'#a7324a':rowData.pri === '3'?'red':'#ffb23f', fontSize: Util.pxToTextSize(50), marginLeft: Util.pxToHeight(160)}}>
                            {rowData.priStr}
                        </Text>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text style={{color: rowData.pri === '4'?'#a7324a':rowData.pri === '3'?'red':'#ffb23f', fontSize: Util.pxToTextSize(50), marginRight: Util.pxToHeight(180)}}>
                                {rowData.num}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    _renderSeparator() {
        return (
            <View style={{height: Util.pxToHeight(38), width: Util.size.width, backgroundColor: '#ebebeb'}}/>
        )
    }

    render() {
        const {navigator} = this.props;
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
                    <ListView style={{height: Util.pxToHeight(995), width: Util.size.width, backgroundColor: '#ebebeb'}}
                              dataSource={this.state.dataSourceList}
                              scrollEnabled={false}
                              renderRow={this._renderRow}
                              renderSeparator={this._renderSeparator}/>
                </View>
            </View>
        );
    }
}


export default connect((state) => {
    const {getWOReducer} = state;
    return {
        getWOReducer
    }
})(MainPage);

export const myStyles = StyleSheet.create({
    image: {
        width: screenWidth,
        height: screenHeight / 10 * 3,
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch'
    },
});
//数据格式
/*
 {
 "id": "1",
 "status": "1",
 "pri": "4",
 "cameraId": "1",
 "remark": "摄像头遮挡",
 "entName": " ",
 "deviceName": "J98H-26/1(高清球机)",
 "ip": "51.37.1.10",
 "street": "普明派出所",
 "createTime": "2016-09-20 18:00:19",
 "updateTime": ""
 }*/
