import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { createOrUpdateProfile, getCurrentUserProfile } from '..//..//..//actions/profile';


//We are declaring initialFormData outside of our CreateProfile
//component so that useEffect won't be triggered when we load
//in profile information to populate the profile info when editing
//current user's profile

const initialFormData = {
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    discord: '',
    youtube: '',
    twitter: '',
    linkedin: '',
    facebook: ''
};

const CreateProfile = props => {
    const { createOrUpdateProfile, getCurrentUserProfile, profile } = props;
    
    const [formData, setFormData] = useState(initialFormData);

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        if (!profile) getCurrentUserProfile();

        //Once the loading is finished and if we have
        //a profile then we can fill in the form data
        if (profile.profile && !profile.loading) {
            const profileData = { ...initialFormData };

            //Creating keys of company, website, location and other.
            //Skills are in array so they need to be separated by a comma
            for (const key in profile.profile) {
                if (key in profileData) {
                    profileData[key] = profile.profile[key];
                }
            }

            //Creating keys of user's social media links and handles
            for (const key in profile.profile.social) {
                if (key in profileData) {
                    profileData[key] = profile.profile.social[key];
                }
            }

            //Displaying skills by separating with a comma
            if (Array.isArray(profileData.skills)) {
                profileData.skills = profileData.skills.join(', ');
            }

            //Setting local state with the profileData
            setFormData(profileData);
        }
    }, [profile.loading, getCurrentUserProfile, profile]);


    const navigate = useNavigate();


    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        discord,
        youtube,
        twitter,
        linkedin,
        facebook
    } = formData;


    const onChangeHandler = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const onSubmitHandler = e => {
        const editing = profile ? true : false;
        e.preventDefault();

        createOrUpdateProfile(formData, editing).then(() => {
            navigate('/dashboard'); 
        })
    }

    return (
        <section className="container">
            <h1 className="large text-primary">
                Create Your Profile
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={e => onSubmitHandler(e)}>
                <div className="form-group">
                <select 
                    name="status"
                    value={status}
                    onChange={(e) => onChangeHandler(e)}
                >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">Student or Learning</option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                </select>
                <small className="form-text"
                    >Give us an idea of where you are at in your career</small>
                </div>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Company" 
                    name="company" 
                    value={company}
                    onChange={(e) => onChangeHandler(e)}
                />
                <small className="form-text">Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Website" 
                    name="website"
                    value={website}
                    onChange={(e) => onChangeHandler(e)}
                />
                <small className="form-text">Your porfolio website or the company website where you work in</small>
                </div>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Location" 
                    name="location" 
                    value={location}
                    onChange={(e) => onChangeHandler(e)}
                />
                <small className="form-text">City and Country (e.g. Tokyo, Japan)</small>
                </div>
                <div className="form-group">
                <input 
                    type="text" 
                    placeholder="* Skills" 
                    name="skills" 
                    value={skills}
                    onChange={(e) => onChangeHandler(e)}
                />
                <small className="form-text">Please use comma separated values (eg.
                    HTML, CSS, JavaScript, Python, Java, SQL)</small>
                </div>
                <div className="form-group">
                <input
                    type="text"
                    placeholder="Github Username"
                    name="githubusername"
                    value={githubusername}
                    onChange={(e) => onChangeHandler(e)}
                />
                <small className="form-text">If you want your latest repos and a Github link, include your
                    username</small>
                </div>
                <div className="form-group">
                <textarea 
                    placeholder="A short bio of yourself" 
                    name="bio"
                    value={bio}
                    onChange={(e) => onChangeHandler(e)}
                >
                </textarea>
                <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                <button onClick={() => toggleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                    Add Social Network Links
                </button>
                <span>Optional</span>
                </div>

                { 
                    displaySocialInputs && <div>
                        <div className="form-group social-input">
                            <i className="fab fa-discord fa-2x"></i>
                            <input 
                                type="text" 
                                placeholder="Discord URL or Handle" 
                                name="discord"
                                value={discord}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input 
                                type="text" 
                                placeholder="Youtube URL" 
                                name="youtube"
                                value={youtube}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input 
                                type="text" 
                                placeholder="Twitter URL" 
                                name="twitter"
                                value={twitter}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input 
                                type="text" 
                                placeholder="Linkedin URL" 
                                name="linkedin"
                                value={linkedin}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            </div>

                            <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input 
                                type="text" 
                                placeholder="Facebook URL" 
                                name="facebook" 
                                value={facebook}
                                onChange={(e) => onChangeHandler(e)}
                            />
                            </div>
                    </div> 
                }

                <input type="submit" className="btn btn-primary my-1" />
                <Link to='/dashboard' className="btn btn-light my-1">Go Back</Link>
            </form>
    </section>
    )
}

CreateProfile.propTypes = {
    createOrUpdateProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { createOrUpdateProfile })(CreateProfile);