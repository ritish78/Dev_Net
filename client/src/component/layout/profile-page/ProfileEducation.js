import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../../utils/formatDate';

const ProfileEducation = props => {

    const { profile: { education } } = props;

    return (
        <div>
          <h2 className="text-primary">Education</h2>
          <div>
            { education && education.length > 0 ?education.map(edu => {
                return (
                    <div key={edu._id} className="boxborder">
                        <h3>{edu.school}</h3>
                        <p>{formatDate(edu.from)} { ' to ' }
                            {edu.to ? formatDate(edu.to) : 'Present'}
                        </p>
                        <p><strong>Degree: </strong>{edu.degree}</p>
                        <p><strong>Field Of Study: </strong>{edu.fieldOfStudy}</p>
                        <p>
                            <strong>Description: </strong>
                            {edu.description}
                        </p>
                    
                    </div>
                )
            }) : (
                <h3>Education info not registered by user.</h3>
            )}
          </div>
        </div>
    )
}

ProfileEducation.propTypes = {
    profile: PropTypes.object.isRequired
}

export default ProfileEducation;