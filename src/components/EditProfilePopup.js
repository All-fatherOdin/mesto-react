import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { useFormWithValidation } from '../hooks/useForm';


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
   const currentUser = useContext(CurrentUserContext)
   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

   function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({userName: values["user-name"], about: values["user-about"]});
   } 

   useEffect(() => {
      resetForm()
   }, [isOpen, resetForm])
   
   return(
      <CurrentUserContext.Provider value={currentUser}>
         <PopupWithForm
            name="user-profile" 
            id="profile-popup" 
            title="Редактировать профиль"
            buttonName="Сохранить" 
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
            resetForm={resetForm}
         >
            <input 
               type="text" 
               name="user-name"
               placeholder="Имя" 
               className="popup__text" 
               minLength="2" 
               maxLength="40" 
               value={values["user-name"] || ""} 
               onChange={handleChange}
               required
            />
            <span className="popup__text-error">
               {errors["user-name"] || ""}
            </span>

            <input 
               type="text" 
               name="user-about"
               placeholder="О себе" 
               className="popup__text"
               minLength="2" 
               maxLength="40" 
               value={values["user-about"] || ""} 
               onChange={handleChange} 
               required 
            />
            <span className="popup__text-error">
               {errors["user-about"] || ""}
            </span>
         </PopupWithForm>
      </CurrentUserContext.Provider>
   )
}

export default EditProfilePopup;