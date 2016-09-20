/**
 * Created by demon on 2016/9/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Navigator,
    BackAndroid,
    View,Text
} from 'react-native';
import login from './Login';

var _navigator = null;

class App extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <Navigator
                initialRoute={{name:"login",component:login}}
                renderScene={
                    (route,navigator) =>{
                        _navigator = navigator;
                        let Component = route.component;
                        console.log(route)
                        return <Component {...route.params} navigator={navigator} />
                    }
                }
                configureScene={() => Navigator.SceneConfigs.PushFromRight}
            />
        );
    }
}

BackAndroid.addEventListener("hardwareBackPress",()=>{
    if(_navigator && _navigator.getCurrentRoutes().length > 1){
        _navigator.pop();
        return true;
    }
    return false;
});

export default App;
