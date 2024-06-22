import React, { useState, useEffect } from 'react';
import './App.css';
import useFormValidation from './useFormValidation';

const validate = (formData) => {
  const newErrors = {};
  if (!formData.name) newErrors.name = "Name is required";
  if (!formData.email) newErrors.email = "Email is required";
  if (!formData.age || formData.age <= 0) newErrors.age = "Age must be greater than 0";
  return newErrors;
};

function App() {
  const initialState = {
    name: "",
    email: "",
    age: "",
    guestName: "",
  };

  const [attendingWithGuest, setAttendingWithGuest] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //custom hook
  const { formData, errors, handleChange, handleSubmit } = useFormValidation(initialState, validate);
  useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  // useEffect to log changes to attendingWithGuest
  useEffect(() => {
    console.log("Attending with guest:", attendingWithGuest);
  }, [attendingWithGuest]);

  const handleAttendingChange = (event) => {
    setAttendingWithGuest(event.target.value === 'yes');
  };

  const onSubmit = (event) => {
    handleSubmit(event);
    if (Object.keys(errors).length === 0) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="form-container">
      <h1 className='h1'>Event Registration Form</h1>
      <form className="form" onSubmit={onSubmit}>
        {/* <div> */}
        <label htmlFor="name">Name</label>
        <input
          id='name'
          type="text"
          placeholder='Name'
          className='form--input'
          onChange={handleChange}
          name='name'
          value={formData.name}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        {/* </div> */}

        {/* <div> */}
        <label htmlFor="email">Enter Your Email</label>
        <input
          id='email'
          type="email"
          placeholder='Email'
          className='form--input'
          onChange={handleChange}
          name='email'
          value={formData.email}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        {/* </div> */}

        {/* <div> */}
        <label htmlFor="age">Enter Your Age</label>
        <input
          id='age'
          type="number"
          placeholder='Age'
          className='form--input'
          onChange={handleChange}
          name='age'
          value={formData.age}
        />
        {errors.age && <p className="error">{errors.age}</p>}
        {/* </div> */}

        {/* <div> */}
        <label htmlFor="attending">Are you attending with a guest?</label>
        <select id="attending" onChange={handleAttendingChange}>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
        {/* </div> */}

        {attendingWithGuest && (
          <div>
            <label htmlFor="guestName">Enter name of the guest</label>
            <input
              id='guestName'
              type="text"
              placeholder='Guest Name'
              className='form--input'
              onChange={handleChange}
              name='guestName'
              value={formData.guestName}
            />
          </div>
        )}

        <button className='btn' type="submit">Submit</button>
      </form>

      {isSubmitted && (
        <div className="summary">
          <h2>Summary</h2>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          {attendingWithGuest && <p><strong>Guest Name:</strong> {formData.guestName}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
