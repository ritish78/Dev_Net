import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../dashboard/Spinner';
import { getAllUserProfile } from '../../../actions/profile';
import ProfileItem from '../profiles/ProfileItem';

const Profiles = props => {
    const { getAllUserProfile, profile: { profiles, loading } } = props;

    useEffect(() => {
        getAllUserProfile();
    }, [getAllUserProfile])

    return (
        <div className="container">
            { loading ? 
                <Spinner /> 
                : (
                    <div>
                        <h1 className="large text-secondary">Developer Profiles</h1>
                        <p className="lead">
                            <i className="fab fa-connectdevelop"></i> Browse and connect with other developers
                        </p>
                        <div className="profiles">
                            { profiles && profiles.length > 0 ? (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            ) : <h3>No profiles found...</h3>}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

Profiles.propTypes = {}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getAllUserProfile })(Profiles);