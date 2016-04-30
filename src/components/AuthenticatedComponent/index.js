import React from 'react';
import {connect} from 'react-redux';

export function requireAuthentication(Component) {

  class AuthenticatedComponent extends Component {

    componentWillMount() {
      this.checkAuth();
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        this.context.router.push(`/home/login?next=${redirectAfterLogin}`);
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
          }
        </div>
      )

    }
  }
  
  // Store is re-defined in the contextTypes, since we overwrite it when we want the router.
  AuthenticatedComponent.contextTypes = { router: React.PropTypes.object.isRequired, store: React.PropTypes.any };

  const mapStateToProps = (state) => ({
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated,
    isAuthenticating: state.auth.isAuthenticating
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}