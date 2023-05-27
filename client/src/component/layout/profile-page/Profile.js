import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../dashboard/Spinner';
import { getUserProfileById } from '../../../actions/profile';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithubRepo from './ProfileGithubRepo';

const Profile = (props) => {
    const { getUserProfileById, profile: { profile }, auth } = props;

    const { id } = useParams();

    useEffect(() => {
        getUserProfileById(id);
    }, [getUserProfileById, id]);

    return (
        <div className="container">
            { profile == null ? ( <Spinner />)
                : (
                    <div>
                        <Link to="/get-all-profiles" className="btn btn-light">
                            Back to Profiles
                        </Link>
                        { auth.isAuthenticated &&
                            auth.loading === false &&
                            auth.user._id === profile.user._id && (
                                <Link to="/edit-profile" className="btn btn-dark">
                                    Edit Profile
                                </Link>
                            )
                        }
                        <div className="profile-grid my-1">
                            <ProfileTop profile={profile}/>
                            <ProfileAbout profile={profile} />
                            <div className="profile-exp bg-white p-2">
                                <ProfileExperience profile={profile} />
                            </div>
                            <div className="profile-edu bg-white p-2">
                                <ProfileEducation profile={profile} />
                            </div>
                            
                            {
                                profile.githubusername && (
                                    <div className="profile-github">
                                        <ProfileGithubRepo githubusername={profile.githubusername} />
                                    </div>
                                )
                            }
                        </div>    
                    </div>
                ) }
        </div>
    )
}

Profile.propTypes = {
    getUserProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, { getUserProfileById })(Profile);
