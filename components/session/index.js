/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 */

import React, {Component, Fragment} from 'react';
import {bindActionCreators} from 'redux';
import LoginScreen from '../../screens/login-screen/index';
// import RootNavigation from '../../navigation/RootNavigation';
import * as actions from './actions';
import {connect} from 'react-redux';

type Props = {
    children: any,
    initialAuthChecked: boolean,
    isInitialized: boolean,
    isLoggingInViaSSO: boolean,
    actions: { initialize: () => void },
    splash: Object,
    user: Object,
    userIsLoggedIn: boolean
};

class Session extends Component<Props> {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.initialize();
    }

    render() {
        const {userIsLoggedIn, isInitialized, isLoggingInViaSSO, splash, children} = this.props;

        switch (true) {
            case (userIsLoggedIn === false && !isLoggingInViaSSO) :
                return (
                    <LoginScreen/>
                );
            case (isInitialized):
                return (
                    <Fragment>
                        {children}
                    </Fragment>
                );
            default :
                return (
                    <Fragment>{splash}</Fragment>
                );
        }
    }

}

function mapStateToProps(state) {
    const {login, loading} = state;
    const isInitialized = loading.setupMessagesListener;
    Boolean(loading.setupMessagesListener &&
        loading.setupTeamsListener &&
        loading.setupMyTeamsListeners &&
        loading.setupProfileListener &&
        loading.setupInvitationsListener
    );
    const {initialAuthChecked, isLoggingInViaSSO, userIsLoggedIn, user} = login;
    return {
        initialAuthChecked,
        isLoggingInViaSSO,
        userIsLoggedIn,
        isInitialized,
        user: user || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Session);
