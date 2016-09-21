//creat by zjw at 2016/09/18
//处理工单
import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    StyleSheet,
    ScrollView,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableOpacity,
    TextInput,
    Picker,
    View,
    Image,
    Text,
    Navigator,
}from 'react-native';
import Util from '../../Utils/Utils.js'
import Toolbar from '../../Utils/ToolBar.js';
import Toast from 'react-native-root-toast';
import {naviGoBack} from '../../Utils/CommonUtil.js';

import ImageChooser from "react-native-image-chooser";

var TouchableElement = TouchableHighlight;

var screenWidth = Util.size.width;

//1080*1920

var dividerColor = '#d8d8d8';
var keyTextColor = '#666666';
var valueTextColor = '#000';

var valueTextSize = Util.pxToTextSize(35);
var keyTextWidth = Util.pxToWidth(260);
var itemHeight = Util.pxToHeight(115);
var dividerWidth = 2*Util.pixel;
var keyTextSize = Util.pxToTextSize(35);

var uploadPhotoItemHeight = Util.pxToHeight(300);
var photoViewHeight = Util.pxToHeight(250);
var photoViewWeight = Util.pxToHeight(250);

const LocalStyles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollView:{
        flex:1,
        width:screenWidth,
    },
    scrollRootView:{
        flex:1,
        width:screenWidth,
    },
    itemStyle:{
        width:screenWidth,
        height:itemHeight,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:dividerWidth,
        borderBottomColor:dividerColor,
        backgroundColor:'#fff',
    },
    keyTextContainer:{
        width:keyTextWidth,
        height:itemHeight,
        //alignItems:'center',
        justifyContent:'center',
        borderRightWidth:dividerWidth,
        borderRightColor:dividerColor,
    },
    keyText:{
        fontSize:keyTextSize,
        textAlign:'right',
        //alignSelf:'flex-end',
        marginRight:30*Util.pixel,
        color:keyTextColor,
    },
    valueTextContainer:{

    },
    valueText:{
        flex:1,
        fontSize:valueTextSize,
        textAlign:'left',
        marginLeft:30*Util.pixel,
        color:valueTextColor,
    },
    btnItemStyle:{
        flex:1,
        flexDirection:'row',
        paddingTop:70*Util.pixel,
        backgroundColor:'#ebebeb',
        justifyContent:'center',
        alignItems:'flex-start',
    },
    btnStyle:{
        width: 451*Util.pixel,
        height: 120*Util.pixel,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd57d',
        //elevation:20,
    },
    textInputStyle:{
        width:200,
        height:100,
        borderWidth:3*Util.pixel,
        borderColor:'#777',
    }
});

class ProcessWorkOrder extends React.Component{

    constructor(props) {
        super(props);

        this._navigator = this.props.navigator;

        this.state = {
            entName:'机场派出所',
            id:'GDHUH20160976889',
            type:'维修',
            oldPhoto:'-',
            newPhoto:'-',
            comment:'备注default'
        };

        this.uploadOldPhoto = this.uploadOldPhoto.bind(this);
        this.uploadNewPhoto = this.uploadNewPhoto.bind(this);
        this.workOrderDone = this.workOrderDone.bind(this);
    }

    uploadOldPhoto(){
        //Toast.show('uploadOldPhoto');
        ImageChooser.pickImage()
            .then((data)=>{
                console.info('ImageChooser return data:\n'
                    +'data.name'+data.name+'\n'
                    +'data.uri'+data.uri+'\n'
                    +'data.height'+data.height+'\n'
                    +'data.width'+data.width+'\n'
                );
                this.setState((state)=>{
                    return {
                        oldPhoto:data.uri
                    };
                });
            })
            .catch((err)=>{
            console.warn('uploadOldPhoto->err!:'+err.message);
            Toast.show('选择图片失败');
        });
    }

    uploadNewPhoto(){
        Toast.show('uploadNewPhoto');
        // height: number;
        // width: number;
        // size: number;
        // name: string;
        // uri: string;
        // do something with the data
        ImageChooser.pickImage().then(
                (data)=>{
                    console.info('ImageChooser return data:\n'
                        +'data.name'+data.name+'\n'
                        +'data.uri'+data.uri+'\n'
                        +'data.height'+data.height+'\n'
                        +'data.width'+data.width+'\n'
                    );

                    this.setState((state)=>{
                        return {
                            newPhoto:data.uri
                        };
                    });
                }
            ).catch((err)=>{
                console.warn('uploadOldPhoto->err!:'+err.message);
                Toast.show('uploadOldPhoto->err:'+err.message);
            });
    }

    updateComment(newStr){
        Toast.show('updateComment:'+newStr);
        // this.setState((state=>{
        //     return {
        //         comment:newStr
        //     };
        // }));
    }

    workOrderDone(){
        Toast.show('workOrderDone');
    }

    componentDidMount() {
        var navigator = this._navigator;
        if (Platform.OS === 'android') {
            TouchableElement = TouchableNativeFeedback;
        }
        BackAndroid.addEventListener('hardwareBackPress', function () {
            return naviGoBack(navigator)
        });
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener('hardwareBackPress');
    }

    render() {
        return (
            <View style={LocalStyles.container}>
                <Toolbar title={'处理工单'} left={true} navigator={this._navigator}>
                </Toolbar>
                    <View style={LocalStyles.scrollRootView}>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    企业名称
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.entName}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    工单编号
                                </Text>
                            </View>
                            <Text style={LocalStyles.valueText}>
                                {this.state.id}
                            </Text>
                        </View>
                        <View style={LocalStyles.itemStyle}>
                            <View style={LocalStyles.keyTextContainer}>
                                <Text style={LocalStyles.keyText}>
                                    处理类型
                                </Text>
                            </View>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <View style={{borderWidth: 1, borderColor: 'bbb'}}>
                                    <Picker
                                        style={{height:20, width:120,justifyContent: 'center', alignItems: 'center'}}
                                        selectedValue={this.state.type}
                                        mode={'dropdown'}
                                        onValueChange={(value) => this.setState({type: value})}>
                                        <Picker.Item label="维修" value="维修"/>
                                        <Picker.Item label="更换设备" value="更换设备"/>
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View style={[LocalStyles.itemStyle,{height:uploadPhotoItemHeight}]}>
                            <View style={[LocalStyles.keyTextContainer,{height:uploadPhotoItemHeight}]}>
                                <Text style={LocalStyles.keyText}>
                                    处理前照片
                                </Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={this.uploadOldPhoto}>
                                    <Image source={this.state.oldPhoto=='-'?require('./../img/photo_add.png'):{uri:this.state.oldPhoto}}
                                       style={{ width: photoViewWeight, height: photoViewHeight}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[LocalStyles.itemStyle,{height:uploadPhotoItemHeight}]}>
                            <View style={[LocalStyles.keyTextContainer,{height:uploadPhotoItemHeight}]}>
                                <Text style={LocalStyles.keyText}>
                                    处理后照片
                                </Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={this.uploadNewPhoto}>
                                    <Image source={this.state.newPhoto=='-'?require('./../img/photo_add.png'):{uri:this.state.newPhoto}}
                                           style={{ width: photoViewWeight, height: photoViewHeight}}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[LocalStyles.itemStyle,{height:120}]}>
                            <View style={[LocalStyles.keyTextContainer,{height:120}]}>
                                <Text style={LocalStyles.keyText}>
                                    处理备注
                                </Text>
                            </View>
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                              <View style={LocalStyles.textInputStyle}>
                                <TextInput style={{flex:1}}
                                  placeholder={'备注信息'} 
                                  underlineColorAndroid='#fff'
                                  multiline={true}
                                  //value={this.state.comment}
                                  defaultValue={this.state.comment}
                                  maxLength={120}
                                  onChangeText={(newText)=>this.updateComment(newText)}/>
                                </View>
                            </View>
                        </View>
                        <View style={LocalStyles.btnItemStyle}>
                            <TouchableElement style={{elevation:3,borderRadius:6}} onPress={this.workOrderDone}>
                                <View style={LocalStyles.btnStyle}>
                                    <Text style={{color: 'red'}}>
                                        完成
                                    </Text>
                                </View>
                            </TouchableElement>
                        </View>
                    </View>
            </View>
        );
    }
}
export default ProcessWorkOrder;