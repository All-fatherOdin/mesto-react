import { useCallback, useState } from "react";

export function useForm() {
   const [values, setValues] = useState({});

   const handleChange = (e) => {
      const input = e.target;
      const value = input.value;
      const name = input.name;
      setValues({ ...values, [name]: value });
   };

   return { values, handleChange, setValues };
};

export function useFormWithValidation(className=".popup") {
   const [values, setValues] = useState({});
   const [errors, setErrors] = useState({});
   const [isValid, setIsValid] = useState(false);

   const handleChange = (e) => {
      const input = e.target;
      const value = input.value;
      const name = input.name;
      setValues({ ...values, [name]: value });
      setErrors({ ...errors, [name]: input.validationMessage });
      setIsValid(input.closest(className).checkValidity());
   }

   const resetForm = useCallback(
      (newValues = {}, newErrors = {}, newIsValid = false) => {
         setValues(newValues);
         setErrors(newErrors);
         setIsValid(newIsValid);
      },
      [setValues, setErrors, setIsValid]
   );

   return { values, handleChange, resetForm, errors, isValid }
}