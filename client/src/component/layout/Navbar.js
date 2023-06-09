import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '..//..//actions/auth';

const Navbar = (props) => {

  const { auth: { isAuthenticated, loading }, logout } = props;

  const authLinks = (
    <ul>
        <li>
          <Link to='/dashboard'>
              <i className='fas fa-user'></i>{' '}
              <span className='hide-sm'>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link to='/get-all-profiles'>
              <i className='fa-solid fa-users'></i>{' '}
              <span className='hide-sm'>Other Developers</span>
          </Link>
        </li>
        <li>
          <Link to='/posts'>
              <i className="fa-solid fa-list"></i>{' '}
              <span className='hide-sm'>Posts</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt'></i>{' '}
            <span className='hide-sm'>Logout</span>
          </a>
        </li>
      </ul>
  );

  const guestLinks = (
    <ul>
        <li>
          <Link to='/get-all-profiles'>
              <i className='fa-solid fa-users'></i>{' '}
              <span className='hide-sm'>Other Developers</span>
          </Link>
        </li>
        <li>
          <Link to="/register">
            <i className="fa-solid fa-user-plus"></i>{' '}
            Register
          </Link>
        </li>
        <li>
          <Link to="/login">
          <i className="fa-solid fa-right-to-bracket"></i>{' '}Login
          </Link>
        </li>
      </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fas fa-code"></i> DevNetwork
        </Link>
      </h1>
      { !loading && (<>{ isAuthenticated ? authLinks : guestLinks }</>) }
    </nav>
  )
}


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
