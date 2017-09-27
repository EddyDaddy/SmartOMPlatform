/**
 * Created by demon on 2016/9/14.
 */
import React, { Component } from 'react';
import { WebView,View,StyleSheet } from 'react-native';
import * as urls from '../Utils/Request.js'
import Util from '../Utils/Utils.js'
import Toolbar from '../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;

var BGWASH = 'rgba(255,255,255,0.8)';

class MapWeb extends Component {
  render() {
    return (
		<WebView
		  style={{marginTop:  Util.pxToHeight(76)}}
          automaticallyAdjustContentInsets={false}
          source={{uri: urls.MAP_URL}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          startInLoadingState={true}
          scalesPageToFit={true} />
    );
  }
}
export default MapWeb;
