import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import Exception from 'components/Exception';
import { SCOPE_ROOT } from 'containers/LoginPage/constants';

import checkPerms from 'utils/checkPerms';

const ScopeRoute = ({
  component: Component,
  rootProps,
  hasSellers,
  hasStore,
  permissions,
  location,
  ...rest
}) => {
  const { scope } = rootProps;
  const nextLocation = Object.assign({}, location, {
    query: queryString.parse(location.search)
  });
  let hasPermission = false;

  if (!permissions) {
    return (
      <Route
        {...rest}
        render={props => (
          <Component
            {...props}
            {...rootProps}
            location={nextLocation}
            permissionNames={permissions}
          />
        )}
      />
    );
  }

  if (Array.isArray(permissions)) {
    if (checkPerms(scope, permissions)) {
      hasPermission = true;
    }
  } else if (typeof permissions === 'string') {
    if (scope.indexOf(SCOPE_ROOT) !== -1 || scope.indexOf(permissions) !== -1) {
      hasPermission = true;
    }
  }

  if (hasPermission) {
    return (
      <Route
        {...rest}
        render={props => (
          <Component
            {...props}
            {...rootProps}
            location={nextLocation}
            permissionNames={permissions}
          />
        )}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={props => (
        <Exception
          type="403"
          style={{ minHeight: 500, height: '80%' }}
        />
      )}
    />
  );
};

ScopeRoute.propTypes = {
  rootProps: PropTypes.object,
  permissions: PropTypes.oneOfType([PropTypes.array, PropTypes.string])
};

ScopeRoute.defaultProps = {
  rootProps: {},
  permissions: ''
};

export default ScopeRoute;
