import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../utils/formatDate';

const ProfileExperience = props => {

    const { profile: { experience } } = props;

    return(
        <div>
          <h2 className="text-primary">Experience:</h2>
          <div>
            { experience && experience.length > 0 ? experience.map(exp => {
                return (
                    <div key={exp._id} className="boxborder">
                        <h3 className="text-dark">{exp.company}</h3>
                        <p>{formatDate(exp.from)} {' to '} 
                            {exp.to ? formatDate(exp.to) : 'Present'}</p>
                        <p><strong>Position: </strong>
                                    {exp.title}
                        </p>
                        <p>
                            <strong>Description: </strong>
                                    {exp.description}
                        </p>
                    </div>
                )
            })
            : (
                <h3>No experience registered by user.</h3>
            )}
          </div>
        </div>
    );
}

ProfileExperience.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileExperience;