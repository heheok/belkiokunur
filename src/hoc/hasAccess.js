import React from 'react';
import { Redirect } from 'react-router-dom';
import { apiGet } from '../utils/api';
import { getAuthorContext } from '../utils/auth';

const hasAccess = () => WrappedComponent => {
  class HasAccess extends React.Component {
    state = {
      hasError: false,
      verifiedUser: null,
      error: {
        title: 'Cannot validate authenticity',
        message: 'Could not retrieve data from API.'
      },
      useDefault: false,
      loading: false
    };

    componentDidMount = async () => {
      const { token } = getAuthorContext();
      console.log(token);
      this.setState({ loading: true });
      const endPointResponse = await apiGet({
        endpoint: `check?token=${token}`
      });

      this.setState({
        loading: false,
        hasError: endPointResponse.hasError,
        verifiedUser: endPointResponse.data
          ? endPointResponse.data.verifiedUser
          : null
      });
    };

    render() {
      const { hasError, loading, verifiedUser } = this.state;
      const { params } = this.props.match;
      const hasAccess = params && params.authorNick
        ? params.authorNick === verifiedUser
        : true;
      return (
        <div>
          {loading && <span>loading</span>}
          {hasError &&
            <Redirect
              to={{
                pathname: '/auth/login',
                state: { from: this.props.location }
              }}
            />}
          {!hasAccess &&
            <span>Bu Sayfayı görüntülemek için yetkiniz yok.</span>}
          {!loading &&
            !hasError &&
            hasAccess &&
            <WrappedComponent {...this.state} {...this.props} />}
        </div>
      );
    }
  }

  return HasAccess;
};
export default hasAccess;
