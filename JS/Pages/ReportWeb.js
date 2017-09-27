/**
 * Created by demon on 2016/9/14.
 */
import React, { Component } from 'react';
import { WebView,View,StyleSheet } from 'react-native';
import * as urls from '../Utils/Request.js'
import Util from '../Utils/Utils.js'
import Toolbar from '../Utils/ToolBar.js';
import storge from '../Utils/Storage';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

var BGWASH = 'rgba(255,255,255,0.8)';
var repairUserPhone;
var userToken;

class ReportWeb extends Component {
	
	// 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            url: ''
        }
    }
	
	componentWillMount() {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
			this.setState({
                        url: urls.REPORT_FORMS+"?repairUserPhone="+result[0]+"&userToken="+result[1],
                    })
        });
    }
	
  render() {
    return (
		<WebView
		  style={{marginTop:  Util.pxToHeight(76)}}
          automaticallyAdjustContentInsets={false}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true} />
    );
  }
}
export default ReportWeb;
