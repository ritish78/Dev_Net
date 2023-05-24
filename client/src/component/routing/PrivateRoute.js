import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from '../auth/Login';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading }
}) => {

    if (isAuthenticated) return <Component />


    if (!isAuthenticated && loading) return <Login />


  return (
    <Navigate to='/login' />
  )
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute);