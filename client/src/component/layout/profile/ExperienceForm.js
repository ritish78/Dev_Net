import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { createExperience } from '../../../actions/profile';
import { connect } from 'react-redux';


//Creating initial form data outside of component
const initialFormData = {
    title: '',
    company: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
}

export const ExperienceForm = (props) => {
  
    const { createExperience } = props;
    
    const [formData, setFormData] = useState(initialFormData);

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = formData;


    const navigate = useNavigate();

    const onChangeHandler = e => setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });

    const checkboxChangeHandler = e => {
        setFormData({
            ...formData,
            current: !current
        })
    }
    
    const onSubmitHandler = e => {
        e.preventDefault();

        createExperience(formData).then(() => {
            navigate('/dashboard');
        })
    }


  return (
    <section className="container">
      <h1 className="large text-primary">
       Add An Experience
      </h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmitHandler(e)}>
        <div className="form-group">
          <input 
                type="text" 
                placeholder="* Job Title" 
                name="title"
                value={title}
                onChange={e => onChangeHandler(e)} 
                required 
            />
        </div>
        <div className="form-group">
          <input 
                type="text" 
                placeholder="* Company" 
                name="company"
                value={company}
                onChange={e => onChangeHandler(e)}
                required 
            />
        </div>
        <div className="form-group">
          <input 
                type="text" 
                placeholder="Location" 
                name="location"
                value={location}
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
          <p><input 
                    type="checkbox" 
                    name="current" 
                    checked={current}
                    value={current}
                    onChange={e => checkboxChangeHandler(e)} 
                /> Current Job</p>
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
            placeholder="Job Description"
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


ExperienceForm.propTypes = {
  createExperience: PropTypes.func.isRequired    
}


export default connect(null, { createExperience })(ExperienceForm);