import React, { useState } from 'react';
import { Link } from 'react-router-dom';


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
        <form className="form">
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
                    name="fieldofstudy" 
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


export default EducationForm;