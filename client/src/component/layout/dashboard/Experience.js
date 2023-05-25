import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../../utils/formatDate';

const Experience = props => {
    const { experience } = props;

    const experienceHistoryOfUser = experience.map(experience => (
        <tr key={experience._id}>
            <td>{experience.company}</td>
            <td className="hide-sm">{experience.title}</td>
            <td>
                { formatDate(experience.from) }
                { ' till ' }
                { experience.to == null ? 'Present' : formatDate(experience.to)}
            </td>
            <td>
                <button className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))

    return (
        <div>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experienceHistoryOfUser}
                </tbody>
            </table>
        </div>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired
}

export default Experience;