import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEducationInfo } from '../../../actions/profile';


const initialState = {
    school: '',
    degree: '',
    fieldOfStudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
}

const EducationForm = (props) => {

    const { addEducationInfo } = props;

    const [formData, setFormData] = useState(initialState);

    const {
        school,
        degree,
        fieldOfStudy,
        from,
        to,
        current,
        description
    } = formData;


    const onChangeHandler = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const checkboxChangeHandler = e => setFormData({
        ...formData,
        current: !current
    });

    const navigate = useNavigate();

    const onSubmitHandler = e => {
        e.preventDefault();

        addEducationInfo(formData).then(() => {
            navigate('/dashboard');
        })
    }


    return (
        <section className="container">
        <h1 className="large text-primary">
            Add Your Education
        </h1>
        <p className="lead">
            <i className="fas fa-graduation-cap"></i> 
            Add any school, bootcamp, etc that you have attended
        </p>
        <small>* = required field</small>
        <form className="form" onSubmit={e => onSubmitHandler(e)}>
            <div className="form-group">
            <input
                    type="text"
                    placeholder="* School or Bootcamp"
                    name="school"
                    value={school}
                    onChange={e => onChangeHandler(e)}
                    required
            />
            </div>
            <div className="form-group">
            <input
                    type="text"
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={degree}
                    onChange={e => onChangeHandler(e)}
                    required
            />
            </div>
            <div className="form-group">
            <input 
                    type="text" 
                    placeholder="Field Of Study" 
                    name="fieldOfStudy" 
                    value={fieldOfStudy}
                    onChange={e => onChangeHandler(e)}
                />
            </div>
            <div className="form-group">
            <h4>From Date</h4>
            <input 
                    type="date" 
                    name="from"
                    value={from}
                    onChange={e => onChangeHandler(e)} 
                />
            </div>
            <div className="form-group">
            <p>
                <input 
                        type="checkbox" 
                        name="current" 
                        value={current}
                        checked={current}
                        onChange={e => checkboxChangeHandler(e)} 
                    /> 
                Current School or Bootcamp
            </p>
            </div>
            <div className="form-group">
            <h4>To Date</h4>
            <input 
                    type="date" 
                    name="to"
                    value={to}
                    onChange={e => onChangeHandler(e)}
                    disabled={current} 
                />
            </div>
            <div className="form-group">
            <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Program Description"
                value={description}
                onChange={e => onChangeHandler(e)}
            ></textarea>
            </div>
            <input type="submit" className="btn btn-primary my-1" />
            <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
        </form>
        </section>
  )
}


EducationForm.propType = {
    addEducationInfo: PropTypes.func.isRequired
}


export default connect(null, { addEducationInfo })(EducationForm);