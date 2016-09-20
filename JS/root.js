/**
 * Created by demon on 2016/9/20.
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store';

import App from './Pages/App';

export default class Root extends Component {
    render() {
        return (
            <Provider store = {store} >
                <App />
            </Provider>
        )
    }
}
