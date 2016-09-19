/**
 * Created by demon on 2016/9/14.
 * 我的页
 */
import React, {Component} from 'react';
import {
    BackAndroid,
    View,
    Text,
    Image,
    Navigator,
}from 'react-native';
import Util from '../Utils/Utils.js'
import {styles} from '../Utils/Styles.js';
import Toolbar from '../Utils/ToolBar.js';
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
export default class User extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Toolbar title={'我的'}>
                </Toolbar>
                <View style={{height: screenHeight/2}}>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                        <View style={{width: screenWidth/4, justifyContent: 'center', alignItems: 'center'}}>
                            <Image
                                style={{width: screenWidth / 8, height: screenWidth / 8, borderRadius: screenWidth / 16}}
                                source={{uri: 'http://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=%E5%A4%B4%E5%83%8F&hs=0&pn=2&spn=0&di=74507158770&pi=&rn=1&tn=baiduimagedetail&ie=utf-8&oe=utf-8&cl=2&lm=-1&cs=3468736256%2C2070128096&os=3194819285%2C2386622250&simid=3503753564%2C306441078&adpicid=0&ln=30&fr=ala&fm=&sme=&cg=head&bdtype=0&oriquery=%E5%A4%B4%E5%83%8F&objurl=http%3A%2F%2Fv1.qzone.cc%2Favatar%2F201401%2F31%2F20%2F11%2F52eb92dd6bcdf173.jpg!200x200.jpg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3Bqz5gj_z%26e3BvvAzdH3Fqqp57xtwg2AzdH3Fhwp5g2AzdH3Fccladc_z%26e3Bip4s&gsm=0'}}
                                />
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text >
                                李四
                            </Text>
                            <Text style={{marginTop: Util*20}}>
                                18000001111
                            </Text>
                        </View>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                    <View style={{flex: 1}}>
                    </View>
                    <View style={{width: screenWidth, height: Util.pixel, backgroundColor: '#000000'}}/>
                </View>
            </View>
        );
    }
}
