/**
 * Created by demon on 2017/6/1.
 * 我的快照
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
import Loading from '../../Utils/Loading';
import ToolBar from '../../Utils/ToolBar';
import {naviGoBack} from '../../Utils/CommonUtil';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
var TouchableElement = TouchableHighlight;
import storge from '../../Utils/Storage.js';
import * as urls from '../../Utils/Request';
import GridView from '../../Utils/GridView.js';
import EasyGridView from 'react-native-easy-listview-gridview';
import DisplayPic from '../MainPage/DisplayPic';
var ds;
var dataList;
export default class MyWorkOrder extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([]),
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
        this._getMySnapShot();
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    _buttonClickItem(rowData)
    {
        const {navigator} = this.props;
        InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'DisplayPic',
                component: DisplayPic,
                params: {
                    rowData: rowData
                }
            });
        });
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(index, rowData, sectionID, rowID, highlightRow) {

        return (
            <TouchableOpacity activeOpacity={0.5}
                              underlayColor='#c8c7cc'
                              onPress={this._buttonClickItem.bind(this, rowData)}
            >
                <View style={styles.itemView}>
                    <Image style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
                           resizeMode={'contain'}
                           resizeMethod={'auto'}
                           source={{uri: rowData.fileUrlAbs}}/>
                </View>
            </TouchableOpacity>
        );
    }


    _getMySnapShot() {

    }

    _renderSeparator() {
        return (
            <View style={{height: 1, backgroundColor: '#D8D8D8'}}/>
        )
    }


    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <ToolBar title={'我的快照'} left={true} navigator={navigator}/>
                <EasyGridView
                    ref={component => this.gridview = component}
                    column={3}
                    renderItem={this._renderRowView.bind(this)}
                    refreshHandler={this._onFetch.bind(this)}
                    loadMoreHandler={this._onFetch.bind(this)}
                />
            </View>
        );
    }

    _onFetch(pageNo, success, failure) {
        // ...
        // success([{fileUrlAbs: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496380769900&di=75f79b8d1d5912d2b70eff1f1b733d8d&imgtype=0&src=http%3A%2F%2Fpic3.zhongsou.com%2Fimage%2F38063b6d7defc892894.jpg', id: '1'},
        //     {fileUrlAbs: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496380769899&di=edcb65022311755b446bc8141184ee76&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F12%2F65%2F04%2F16658PICNpU.jpg', id: '1'},
        //     {fileUrlAbs: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496380769897&di=70382e18fd9f2fa237da2791e5caf693&imgtype=0&src=http%3A%2F%2Fe.hiphotos.baidu.com%2Fbaike%2Fw%253D268%2Fsign%3D5b952a087e3e6709be0042f903c79fb8%2F34fae6cd7b899e51f3a0ec3b43a7d933c995d143ad4b2dcf.jpg', id: '1'},
        //     {fileUrlAbs: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1496380769896&di=c9fbd5e18f4e66fddde82e0c3803e2b1&imgtype=0&src=http%3A%2F%2Fwww.th7.cn%2Fd%2Ffile%2Fp%2F2012%2F02%2F09%2F77b080fc506bbc76b935cd9f0a004c19.jpg', id: '1'}]);
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            var body = {
                'repairUserPhone': result[0],
                'userToken': result[1],
            }
            Util.post(urls.QUERY_SNAPSHOT, body, navigator, (response) => {
                if (response === undefined || response === '') {
                    Toast.show('搜索访问异常');
                } else {
                    if (response.success) {
                        if (response.rows.length > 0) {
                            success(response.rows);
                        } else {
                            Toast.show('搜索结果为空')
                            success([]);
                        }
                    } else {
                        Toast.show('搜索失败')
                        failure([]);
                    }
                }
            })
        });
    }
}

export const styles = StyleSheet.create({
    itemView: {
        width: screenWidth / 3,
        height: screenWidth / 3,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    }
});
