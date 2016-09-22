import React, {Component} from 'react'
import {
    StyleSheet,
} from 'react-native';
import Util from './Utils.js'
var screenWidth = Util.size.width;
var screenHeight = Util.size.height;
export const styles = StyleSheet.create({
        root: {
            flex: 1, alignItems: 'center'
        },
        viewCenter: {
            width: screenWidth,
            alignItems: 'center'
        },
        borderView: {
            width: screenWidth / 1.5,
            height: screenWidth / 9,
            marginTop: screenWidth / 18,
            borderRadius: 6,
            elevation: 3,
            backgroundColor: '#6ab5ba',

        },
        borderViewCommon: {
            width: screenWidth / 1.5,
            height: screenWidth / 9,
            marginTop: screenWidth / 36,
            borderRadius: 6,
            elevation: 3,
            backgroundColor: '#6ab5ba',

        },
        borderViewshort: {
            width: screenWidth / 2.3,
            height: screenWidth / 9,
            borderRadius: 6,
            elevation: 3,
            backgroundColor: '#6ab5ba',

        },
        textInput: {
            flex: 1,
            backgroundColor: '#00000000',
            color: 'white',
            fontSize: screenWidth / 25,
            padding: screenWidth / 36
        }
    })
    ;
