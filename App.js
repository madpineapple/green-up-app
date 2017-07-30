// @flow

import React, {Component} from 'react';

import Nav from './src/';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './src/reducers/';
import thunk from 'redux-thunk'




const store = createStore(reducer, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Nav/>
            </Provider>
        );
    }
}

export default App;
