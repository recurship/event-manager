// @flow

import * as React from 'react'
import { connect } from 'react-redux';
import { Action } from 'redux';
import PropTypes from 'prop-types';

import {
    Route,
    Redirect
} from 'react-router-dom';

type dispatch = {
    dispatch: (action: Action ) => any,
    component: (React.ComponentType<PropTypes>)
}

type Props =dispatch & {
    userState: Object,
    events: Object,
    appState: Object
};

class PrivateRoute extends React.Component<Props> {
    
    render() {
        const { userState, component: Component, ...rest } = this.props;
        return (
            <Route
            {...rest}
            render={ (props) =>
                userState.token ? (
                <Component {...props} />
                ) : (
                <Redirect
                    to={{
                    pathname: '/login',
                    state: { from: props.location }
                    }}
                />
                )
            }
            />
        );
    }

}
  const mapStateToProps = (state) => {
    // const { appState, userState, events } = state;
    return state;
};

export default connect(mapStateToProps)(PrivateRoute);