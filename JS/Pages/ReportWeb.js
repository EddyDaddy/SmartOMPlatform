/**
 * Created by demon on 2016/9/14.
 */
import React, { Component } from 'react';
import { WebView,View } from 'react-native';
import * as urls from '../Utils/Request.js'
import Util from '../Utils/Utils.js'

var BGWASH = 'rgba(255,255,255,0.8)';

class ReportWeb extends Component {
    render() {
    return (
		<WebView
		  style={{marginTop:  Util.pxToHeight(76)}}
          automaticallyAdjustContentInsets={false}
          source={{uri: urls.REPORT_FORMS}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true} />
    );
  }
}

export default ReportWeb;
