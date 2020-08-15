// write your custom hook here to control your checkout form

import { useLocalStorage } from "./useLocalStorage";
import { useState } from 'react';

export const useForm = (key, initialValues, cb) => {
  // inputs - handleChange, state (dynamically manage any number of inputs)
  const [setValues, values] = useLocalStorage(key, initialValues);

  
  const clearForm = e => {
    e.preventDefault();
    setValues(initialValues);
  };


  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
  };

  return [values, clearForm, handleSubmit, handleChanges];
};