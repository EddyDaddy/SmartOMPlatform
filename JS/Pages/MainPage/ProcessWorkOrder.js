//creat by zjw at 2016/09/18
//处理工单
import React, {Component} from 'react';
import {
    Platform,
    BackAndroid,
    StyleSheet,
    ScrollView,
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
import {naviGoBack, getFileName} from '../../Utils/CommonUtil.js';
import storge from '../../Utils/Storage';
import ImagePicker from "react-native-image-picker";
import * as urls from '../../Utils/Request';
import Main from '../Main';
import LoadViewing from '../../Utils/LoadingView';

var screenWidth = Util.size.width;

//1080*1920

var dividerColor = '#d8d8d8';
var keyTextColor = '#666666';
var valueTextColor = '#000';

var valueTextSize = Util.pxToTextSize(35);
var keyTextWidth = Util.pxToWidth(260);
var itemHeight = Util.pxToHeight(115);
var dividerWidth = 2 * Util.pixel;
var keyTextSize = Util.pxToTextSize(35);

var uploadPhotoItemHeight = Util.pxToHeight(325);
var photoViewHeight = Util.pxToHeight(270);
var photoViewWidth = Util.pxToHeight(480);

var imagePickerOption = {
    title: '',
    takePhotoButtonTitle: '拍照',
    cancelButtonTitle: '取消',
    chooseFromLibraryButtonTitle: '照片',
    storageOptions: {
        skipBackup: true,
        path: 'images' //照片存储路径
    }
};

const LocalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
        width: screenWidth,
    },
    scrollRootView: {
        flex: 1,
        width: screenWidth,
    },
    itemStyle: {
        width: screenWidth,
        height: itemHeight,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: dividerWidth,
        borderBottomColor: dividerColor,
        backgroundColor: '#fff',
    },
    keyTextContainer: {
        width: keyTextWidth,
        height: itemHeight,
        //alignItems:'center',
        justifyContent: 'center',
        borderRightWidth: dividerWidth,
        borderRightColor: dividerColor,
    },
    keyText: {
        fontSize: keyTextSize,
        textAlign: 'right',
        //alignSelf:'flex-end',
        marginRight: Util.pxToWidth(30),
        color: keyTextColor,
    },
    valueTextContainer: {},
    valueText: {
        flex: 1,
        fontSize: valueTextSize,
        textAlign: 'left',
        marginLeft: Util.pxToWidth(30),
        color: valueTextColor,
    },
    btnItemStyle: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: Util.pxToHeight(70),
        backgroundColor: '#ebebeb',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    btnStyle: {
        width: Util.pxToWidth(730),
        height: Util.pxToHeight(120),
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffd57d',
        //elevation:20,
    },
    textInputStyle: {
        flex:1,
        margin:6,
        borderWidth: 3 * Util.pixel,
        borderColor: '#d7d7d7',
        elevation:1,
    }
});
var data;
class ProcessWorkOrder extends React.Component {

    constructor(props) {
        super(props);

        this._navigator = this.props.navigator;
        data = this.props.data;
        this.state = {
            entName: data.entName,
            id: data.id,
            type: '维修',
            oldPhoto: '-',
            newPhoto: '-',
            comment: data.remark,
            isUploadingOld: false,
            isUploadingNew: false,
        };

        this.uploadOldPhoto = this.uploadOldPhoto.bind(this);
        this.uploadNewPhoto = this.uploadNewPhoto.bind(this);
        this.workOrderDone = this.workOrderDone.bind(this);
    }

    uploadOldPhoto() {
        ImagePicker.showImagePicker(imagePickerOption, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Toast.show('选择图片失败');
            } else {
                let imageUri = response.uri;
                if (Platform.OS === 'ios') {
                    imageUri = response.uri.replace('file://');
                }
                storge.get('loginInfo').then((result) => {
                    this.setState({isUploading: true});
                    let formData = new FormData();
                    formData.append('file', {uri: imageUri, type: 'multipart/form-data',
                        name: getFileName(imageUri)+'.png'});
                    formData.append('key', getFileName(imageUri));
                    formData.append('userToken', result[1]);
                    formData.append('repairUserPhone', result[0]);
                    formData.append('fileType', 1);
                    formData.append('businessType', 1);
                    formData.append('processId', data.id);
                    console.log(JSON.stringify(formData));
                    let options = {};
                    options.body = formData;
                    options.method = 'post';
                    options.headers = {
                        'Content-Type':'multipart/form-data',
                    };
                    fetch(urls.UPLOAD_URL, options).then((response) => {
                        this.setState({isUploadingOld: false});
                        console.log('response'+JSON.stringify(response));
                        if (response.ok) {
                            return response.json()
                        } else {
                            Toast.show('请求失败')
                        }
                    }).then((responseData) => {
                        console.log('请求结果：' + JSON.stringify(responseData));
                        if (responseData !== undefined) {
                            if (responseData.code === '-109') {
                                navigator.resetTo({
                                    name: 'Login',
                                    component: Login
                                })
                            } else if(responseData.code === '0'){
                                Toast.show('上传成功');
                                this.setState({
                                    oldPhoto: imageUri
                                });
                            }else{
                                Toast.show('上传失败');
                                console.log(JSON.stringify(responseData.data));
                            }
                        }
                    }).catch(
                        (error) => {
                            this.setState({isUploadingOld: false});
                            Toast.show('上传图片异常')
                            console.log('错误信息：' + error);
                        }
                    );
                    // storge.get('loginInfo').then((result) => {
                    //     var body = {
                    //         'userToken': result[1],
                    //         'repairUserPhone': result[0],
                    //         'fileType': '1',
                    //         'businessType': '1',
                    //         'processId': data.id,
                    //         'file':
                    //     }
                    // });
                });

            }
        });
    }

    uploadNewPhoto() {
        ImagePicker.showImagePicker(imagePickerOption, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
                Toast.show('选择图片失败');
            } else {
                let imageUri = response.uri;
                if (Platform.OS === 'ios') {
                    imageUri = response.uri.replace('file://');
                }
                storge.get('loginInfo').then((result) => {
                    this.setState({isUploadingNew: true});
                    let formData = new FormData();
                    formData.append('file', {uri: imageUri, type: 'multipart/form-data',
                        name: getFileName(imageUri)+'.jpg'});
                    formData.append('key', getFileName(imageUri));
                    formData.append('userToken', result[1]);
                    formData.append('repairUserPhone', result[0]);
                    formData.append('fileType', 1);
                    formData.append('businessType', 1);
                    formData.append('processId', data.id);
                    console.log(JSON.stringify(formData));
                    let options = {};
                    options.body = formData;
                    options.method = 'post';
                    options.headers = {
                        'Content-Type':'multipart/form-data',
                    };
                    fetch(urls.UPLOAD_URL, options).then((response) => {
                        this.setState({isUploadingNew: false});
                        console.log('response'+JSON.stringify(response));
                        if (response.ok) {
                            return response.json()
                        } else {
                            Toast.show('请求失败')
                        }
                    }).then((responseData) => {
                        console.log('请求结果：' + JSON.stringify(responseData));
                        if (responseData !== undefined) {
                            if (responseData.code === '-109') {
                                navigator.resetTo({
                                    name: 'Login',
                                    component: Login
                                })
                            } else if(responseData.code === '0'){
                                Toast.show('上传成功');
                                this.setState({
                                    newPhoto: imageUri
                                });
                            }else{
                                Toast.show('上传失败');
                                console.log(JSON.stringify(responseData.data));
                            }
                        }
                    }).catch(
                        (error) => {
                            this.setState({isUploadingNew: false});
                            Toast.show('上传图片异常')
                            console.log('错误信息：' + error);
                        }
                    );
                    // storge.get('loginInfo').then((result) => {
                    //     var body = {
                    //         'userToken': result[1],
                    //         'repairUserPhone': result[0],
                    //         'fileType': '1',
                    //         'businessType': '1',
                    //         'processId': data.id,
                    //         'file':
                    //     }
                    // });
                });
            }
        });
    }

    updateComment(newStr) {
        Toast.show('updateComment:' + newStr);
    }

    workOrderDone() {
        const {navigator} = this.props;
        storge.get('loginInfo').then((result) => {
            var body = {
                'repairUserPhone': result[0],
                'userToken': result[1],
                'typeId': this.state.type,
                'processId': data.id,
                'status': data.status,
                'remark': this.state.comment,
            }
            Util.post(urls.CONDUCTPROCESS_URL, body, navigator, (response) => {
                if(response === undefined || response === ''){
                    Toast.show('处理失败');
                }else{
                    if(response.code === '0'){
                        Toast.show('处理成功');
                        navigator.resetTo({name: 'Main', component: Main});
                    }else{
                        Toast.show('处理失败');
                        console.log(response.msg);
                    }
                }
            });
        });
    }

    componentDidMount() {
        var navigator = this._navigator;
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
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-start',marginLeft:6}}>
                            <View style={{borderWidth: 1, borderColor: '#bbb'}}>
                                <Picker
                                    style={{height:Util.pxToHeight(85), width:Util.pxToWidth(430),justifyContent: 'center', alignItems: 'center'}}
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
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',margin:6}}>
                            <TouchableOpacity onPress={this.uploadOldPhoto}>
                                <Image
                                    source={this.state.oldPhoto=='-'?require('./../img/photo_add.png'):{uri:this.state.oldPhoto}}
                                    style={{ width: photoViewWidth, height: photoViewHeight,resizeMode:'cover'}}>
                                    {this.state.isUploadingOld?<LoadViewing/>:null}
                                </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[LocalStyles.itemStyle,{height:uploadPhotoItemHeight}]}>
                        <View style={[LocalStyles.keyTextContainer,{height:uploadPhotoItemHeight}]}>
                            <Text style={LocalStyles.keyText}>
                                处理后照片
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',margin:6}}>
                            <TouchableOpacity onPress={this.uploadNewPhoto}>
                                <Image
                                    source={this.state.newPhoto=='-'?require('./../img/photo_add.png'):{uri:this.state.newPhoto}}
                                    style={{ width: photoViewWidth, height: photoViewHeight}}>
                                    {this.state.isUploadingNew?<LoadViewing/>:null}
                                    </Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[LocalStyles.itemStyle,{height:Util.pxToHeight(350)}]}>
                        <View style={[LocalStyles.keyTextContainer,{height:Util.pxToHeight(350)}]}>
                            <Text style={LocalStyles.keyText}>
                                处理备注
                            </Text>
                        </View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'stretch'}}>
                            <View style={LocalStyles.textInputStyle}>
                                <TextInput style={{flex:1,textAlign:'left',textAlignVertical:'top'}}
                                           underlineColorAndroid='#fff'
                                           multiline={true}
                                           maxLength={120}
                                           onChangeText={(newText)=>this.updateComment(newText)}/>
                            </View>
                        </View>
                    </View>
                    <View style={LocalStyles.btnItemStyle}>
                        <TouchableOpacity activeOpacity={0.5} style={{elevation:3,borderRadius:6}} onPress={this.workOrderDone}>
                            <View style={LocalStyles.btnStyle}>
                                <Text style={{color: 'red'}}>
                                    完成
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
export default ProcessWorkOrder;
