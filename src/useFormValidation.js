import { useState } from 'react';

const useFormValidation = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, handle form submission
      console.log("Form data is valid:", formData);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit
  };
};

export default useFormValidation;
