import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../../actions/profile';

const Dashboard = props => {

    const { getCurrentUserProfile, auth, profile } = props;

    useEffect(() => {
        getCurrentUserProfile();
    }, []);

    return (
        <div className="container">Dashboard</div>
    )
}

Dashboard.propTypes = {
    getCurrentUserProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
}); 

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);