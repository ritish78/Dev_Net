import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const ProfileItem = props => {
    const { auth, profile: { skills, company, location, status, user: { _id, name, avatar} }  } = props;

    return (
        <div className="profile bg-light">
            <img src={avatar} alt="" className="round-img" />
            <div>
                <h2>{name} { auth.user._id === _id ? ' (You) ' : null }</h2>
                <p>{status} { company && <span>at {company}</span>}</p>
                <p className="my-1">{location && <span>{location}</span>}</p>
                <Link to={`/profile/${_id}`} className="btn btn-primary">
                    View Profile
                </Link>    
            </div>
            <ul>
                { skills.slice(0, 4).map((skill, index) => (
                        <li key={index} className="text-secondary">
                            <i className="fas fa-check"></i>
                            {'  '} {skill}
                        </li>
                    )) }
            </ul>
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProfileItem);