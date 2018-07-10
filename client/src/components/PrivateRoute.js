import React, {
	Component
} from "react";
import {
	connect
} from "react-redux";
import PropTypes from "prop-types";
import {
	Route,
	Redirect
} from "react-router-dom";
class PrivateRoute extends Component {

	static propTypes = {
		userState: PropTypes.object.isRequired,
		events: PropTypes.object.isRequired,
		appState: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired,
		component: PropTypes.func.isRequired
	}

	static defaultProps = {
		"path": "/",
		"appState": {
			"loading": [],
			"errors": []
		},
		"userState": {
			"token": "test_token",
			"currentUser": null
		},
		"events": {
			"events": []
		},
		"store": {}
	}
    
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
}

export default connect(mapStateToProps)(PrivateRoute);