  import { useState } from "react";
  
  export const useLocalStorage = (key, initialValue) => {
      const [storedValue, setStoredValue] = useState(() => {
          const item = window.localStorage.getItem(key);
          //if item does exist in local storage, we will parse it with JSON (because it is an object...we must do this for objects and arrays if it involves localStorage) and if it is not there, then we will return whatever the initial value was in the key value pair which we made the parameters in the beginning
          return item ? JSON.parse(item) : initialValue;
      });

      const setValue = (value) => {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
        }

      return [storedValue, setValue];
  }



