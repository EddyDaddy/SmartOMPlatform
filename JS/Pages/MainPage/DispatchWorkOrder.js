/**
 * Created by root on 16-9-20.
 */
//creat by zjw at 2016/09/18
//转派工单
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
    ListView,
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

var TouchableElement = TouchableHighlight;
var textColor = '#666';


class DispatchWorkOrderNew extends React.Component{

    constructor(props) {
        super(props);
        this._navigator = this.props.navigator;

        this.ds = new ListView.DataSource({
            rowHasChanged:(oldRaw,newRow)=>{
                newRow.isSelected||(oldRaw !== newRow);
            }
        });


        this.workerList = Array();
        for(let i=0;i<30;i++){
            this.workerList[i] = {name:'aaaaaaaaa',isSelected:false};
        }

        this.state={
            nowIndex:-1,
            workers:this.ds.cloneWithRows(this.workerList)
        };
        this.confirmDispatch = this.confirmDispatch.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
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

    confirmDispatch(){
        Toast.show('confirmDispatch');
    }

    onItemClick(rowId){
        Toast.show('onItemClick->rowId:'+rowId);
        this.workerList[rowId].isSelected = true;
        let lastIndex = this.state.nowIndex;
        if(lastIndex===rowId){
            return;
        }
        if(lastIndex>-1){
            this.workerList[lastIndex].isSelected = false;
        }
        this.setState((state)=>{
            return{
                nowIndex:rowId,
                workers:this.ds.cloneWithRows(this.workerList)
            };
        });
    }

    renderListItem(itemData,sectionId,rowId) {
        let bgColor = true===itemData.isSelected?'#770000':'#fff';
        return (
            <TouchableOpacity onPress={()=>this.onItemClick(rowId)}>
                <View style={{height:30,width:Util.size.width/10*8,justifyContent:'center',alignItems:'center',backgroundColor:bgColor}}>
                    <Text style={LocalStyles.textStyle}>
                        1111111111111111111
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={{flex: 1,justifyContent:'flex-start'}}>
                <Toolbar title={'处理工单'} left={true} navigator={this._navigator}>
                </Toolbar>
                <View style={LocalStyles.seacherStyle}>
                    <Text style={[LocalStyles.textStyle, {marginRight: 12}]}>搜索</Text>
                    <View style={{height:39,width:270,borderColor:'bbb', borderWidth: 1}}>
                        <TextInput
                            style={[LocalStyles.textStyle, {height:39,width: 260}]}
                            placeholder={'关键字'}
                            placeholderTextColor='#bbb'
                            underlineColorAndroid='#fff'
                            multiline={false}
                            maxLength={30}
                            onChangeText={(newText)=> {
                                searchContent = newText;
                            }}/>
                    </View>
                </View>
                <View style={LocalStyles.listStyle}>
                    <ListView
                        dataSource={this.state.workers}
                        renderRow={this.renderListItem}
                    />
                </View>
            </View>
        );
    }
}

const LocalStyles = StyleSheet.create({
    seacherStyle:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30,
    },
    textStyle:{
        fontSize:12,
        color:textColor
    },
    listStyle:{
        width:Util.size.width/10*8,
        height:300,
        marginTop:30,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#bbb',
        borderWidth:1,
    }
});

export default DispatchWorkOrderNew;