import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { getCurrentUserProfile } from '../../../actions/profile';
import DashboardActions from './DashboardActions';
import Spinner from './Spinner';
import Experience from './Experience';
import Education from './Education';

const Dashboard = props => {

    const { getCurrentUserProfile, auth, profile: { profile, loading } } = props;

    useEffect(() => {
        //TODO:
        //Check if token exists befire fetching
        getCurrentUserProfile();
    }, []);

    return loading && profile === null ? <Spinner /> : <div className="container">
        <h1 className="large text-primary">DASHBOARD</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome { auth.user && auth.user.name  }
        </p>
        { profile !== null ? 
            <div>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education educationInfo={profile.education} />
            </div> 
            : (
            <div>
                <p>You have not setup a profile. You can enter your profile details below:</p>
                <Link to='/create-profile' className="btn btn-primary my-1">
                    Create Profile
                </Link>
            </div>
            ) }
    </div>;
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