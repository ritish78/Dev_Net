import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../../utils/formatDate';
import { deleteEducationById } from '../../../actions/profile';

const Education = props => {
    const { educationInfo, deleteEducationById } = props;

    const educationHistoryOfUser = educationInfo.map(educationInfo => (
        <tr key={educationInfo._id}>
            <td>{educationInfo.school}</td>
            <td className="hide-sm">{educationInfo.degree}</td>
            <td>
                { formatDate(educationInfo.from) }
                { ' till ' }
                { educationInfo.to == null ? 'Present' : formatDate(educationInfo.to)}
            </td>
            <td>
                <button onClick={ () => deleteEducationById(educationInfo._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ))

    return (
        <div>
            <h2 className="my-2">Education History</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {educationHistoryOfUser}
                </tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    educationInfo: PropTypes.array.isRequired,
    deleteEducationById: PropTypes.func.isRequired
}

export default connect(null, { deleteEducationById })(Education);