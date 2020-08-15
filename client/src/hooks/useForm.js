
import { useState } from 'react';

export const useForm = (initialValues) => {
  // inputs - handleChange, state (dynamically manage any number of inputs)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [values, setValues] = useState({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zip: "",
  })


  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
  };

  return [showSuccessMessage, values, handleSubmit, handleChanges];
};