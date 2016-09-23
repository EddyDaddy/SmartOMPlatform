/**
 * Created by demon on 2016/9/20.
 */
import React, {Component} from 'react';
import {
    Platform,
    Navigator,
    BackAndroid,
    View,
    StatusBar
} from 'react-native';
import login from './Login';
import Welcome from './Welcome';
import * as XG from 'react-native-tencent-xg';
var _navigator = null;
//禁止左滑返回
const NoBackSwipe = {
    ...Navigator.SceneConfigs.HorizontalSwipeJump,
    gestures: {
        pop: {}
    }
};
class App extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            event: '',
            eventArgs: null,
            badgeNum: 0,
            localUserInfo: {id: 1},
            devToken: '',
        };
    }

    componentDidMount() {
        XG.enableDebug(true);
        console.log(XG.allEvents());
        var registerHolder = XG.addEventListener('register', devToken => {
            this.setState({
                event: 'register',
                eventArgs: JSON.stringify(devToken),
                devToken,
            });
        });

        if (!registerHolder) console.log('Fail to add event to handle register');

        var errorHolder = XG.addEventListener('error', err => {
            this.setState({
                event: 'error',
                eventArgs: JSON.stringify(err)
            });
        });

        if (!errorHolder) console.log('Fail to add event to handle error');

        var remoteHolder = XG.addEventListener('notification', xgInstance => {
            this.setState({
                event: 'notification',
                eventArgs: JSON.stringify(xgInstance)
            });
        });

        if (!remoteHolder)
            console.log('Fail to add event to handle remote notification');

        var localHolder = XG.addEventListener('localNotification', xgInstance => {
            console.log(xgInstance);
            this.setState({
                event: 'localNotification',
                eventArgs: JSON.stringify(xgInstance)
            });
        });

        if (!localHolder) console.log('Fail to add event to local notification');

        this.setState({
            eventsHolder: [
                registerHolder,
                errorHolder,
                remoteHolder,
                localHolder
            ]
        });

        // Your accessId as number and your accessKey
        XG.setCredential(2100230682, 'ANF2QS47Q44W');
        XG.register('SampleTester');
        if (Platform.OS === 'ios') {
        XG.getApplicationIconBadgeNumber()
            .then(badgeNum => {
                this.setState({badgeNum});
            })
            .then(() => XG.checkPermissions())
            .then(data => console.log(data));
        }
    }


    componentWillUnmount() {
        this.state.eventsHolder.filter(h => !!h).forEach(holder => holder.remove());
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
                    initialRoute={{name:"Welcome",component:Welcome}}
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
