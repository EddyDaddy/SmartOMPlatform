/**
 * Created by demon on 2016/9/20.
 */
import React, {Component} from 'react';
import {
    Navigator,
    BackAndroid,
    View,
    StatusBar
} from 'react-native';
import login from './Login';
import testMap from './testMap';
var _navigator = null;
//禁止左滑返回
const NoBackSwipe = {
    ...Navigator.SceneConfigs.HorizontalSwipeJump,
    gestures: {
        pop: {}
    }
};
class App extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    translucent={true}
                    backgroundColor="rgba(0, 0, 0, 0.2)"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute={{name:"login",component:login}}
                    renderScene={
                        (route,navigator) =>{
                            _navigator = navigator;
                            let Component = route.component;
                            console.log(route);
                            return <Component {...route.params} navigator={navigator} />
                        }
                    }
                    configureScene={() => {return NoBackSwipe}}
                />
            </View>
        );
    }
}

BackAndroid.addEventListener("hardwareBackPress", ()=> {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

export default App;
