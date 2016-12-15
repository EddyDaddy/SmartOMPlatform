/**
 * Created by demon on 2016/12/15.
 */
import React, {Component, PropTypes} from 'react';
import {
    Platform,
    BackAndroid,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    InteractionManager,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import storge from '../../Utils/Storage.js';
import Toolbar from '../../Utils/ToolBar.js';
import ViewPager from 'react-native-viewpager';
import Toast from 'react-native-root-toast';
import * as urls from '../../Utils/Request';
import Loading from '../../Utils/Loading';
import {naviGoBack} from '../../Utils/CommonUtil';
var data;
var dataSource;
const BANNER_IMGS = [
    require('../img/mainBanner_1.png'),
    require('../img/mainBanner_2.png'),
    require('../img/mainBanner_3.png')
];
export default class DisplayPic extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            isLoading: false
        };
        data = this.props.data;
    }

    componentWillMount() {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            this.setState({
                isLoading: true
            });
            let body = {
                'repairUserPhone': result[0],
                'userToken': result[1],
                'taskRecordId': data.taskRecordId,
                'createOpEntId': data.createOpEntId,
                'id': data.id
            };
            Util.post(urls.QUERY_FILE_BY_BID, body, navigator, (responseData) => {
                this.setState({
                    isLoading: false
                });
                // console.log('responseData----->'+JSON.stringify(responseData.rows));
                // var rows = new Array();
                // let picRows = responseData.rows;
                // picRows.forEach((e) => {
                //     console.log('e----->'+JSON.stringify(e.fileUrlAbs));
                //     rows.push(e.fileUrlAbs)
                // })
                // console.log('rows----->'+JSON.stringify(rows));
                if(responseData.success){
                    console.log('msg----->'+JSON.stringify(responseData.msg))
                    this.setState({
                        dataSource: dataSource.cloneWithPages(responseData.rows),
                    });
                }else{
                    Toast.show('查看图片失败')
                    console.log('erro----->'+JSON.stringify(responseData.msg))
                }
            })
        });
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

    _renderPage(rows, pageID) {
        console.log('row---->'+JSON.stringify(rows));
        return (
            <Image
                style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: Util.size.width}}
                resizeMode={'contain'}
                source={{uri:rows.fileUrlAbs}}
            />
        );
    }

    render() {
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                <Toolbar left={true} title={'查看图片'} navigator = {navigator}/>
                <ViewPager
                    style={{flex: 1}}
                    dataSource={this.state.dataSource}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={false}
                    initialPage={0}/>
                <Loading visible={this.state.isLoading}/>
            </View>
        );
    }
}