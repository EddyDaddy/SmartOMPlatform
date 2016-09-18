'use strict';

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Image
} from 'react-native';
import Util from '../Utils/Utils.js';
var screenWidth = Util.size.width;

// import Icon from 'react-native-vector-icons/Ionicons';

class TabBarItem extends Component {

    propTypes = {
        goToPage: React.PropTypes.func, // 跳转到对应tab的方法
        activeTab: React.PropTypes.number, // 当前被选中的tab下标
        tabs: React.PropTypes.array, // 所有tabs集合

        tabNames: React.PropTypes.array, // 保存Tab名称
        tabIconNames: React.PropTypes.array, // 保存Tab图标
    }

    setAnimationValue({value}) {
        console.log(value);
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    renderTabOption(tab, i) {
        let color = this.props.activeTab == i ? "#3fd0a7" : "#666666"; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            <TouchableOpacity onPress={()=>this.props.goToPage(i)} style={styles.tab} activeOpacity={1}>
                <View style={styles.tabItem}>
                    <Image
                        source={this.props.tabIconNames[i]}
                        style={{width: screenWidth / 12, height: screenWidth / 12,
        resizeMode: Image.resizeMode.stretch, tintColor: color}}
                    />
                    <Text style={{color: color}}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={styles.tabs}>
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: screenWidth / 7.5,
    },

    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: {
        width: screenWidth / 12,
        height: screenWidth / 12,
        marginTop: screenWidth / 30,
        resizeMode: Image.resizeMode.stretch,
    },
});


export default TabBarItem;