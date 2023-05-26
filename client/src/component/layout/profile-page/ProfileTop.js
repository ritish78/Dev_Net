import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileTop = props => {

    const { profile: { skills, company, location, status, website, social, user: { _id, name, avatar} }  } = props;

    return (
        <div className="profile-top bg-primary p-2">
            <img
                className="round-img my-1"
                src={avatar}
                alt=""
            />
            <h1 className="large">{name}</h1>
            <p className="lead">{status} {company && <span> at {company}</span>}</p>
            <p>{location && <span>{location}</span>}</p>
            <div className="icons my-1">
                {
                    website ? (
                        <a href={website} target="_blank" rel="noopener noreferrer">
                            <i className="fas fa-globe fa-2x"></i>
                        </a>
                    ) : null
                }
                {
                    social ? 
                        Object.entries(social)
                                .filter(([_, value]) => value)
                                .map(([key, value]) => (
                                    <a
                                        key={key}
                                        href={value}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className={`fab fa-${key} fa-2x`}></i>
                                    </a>
                                ))
                        : null
                }
                
            </div>
            </div>

  )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileTop