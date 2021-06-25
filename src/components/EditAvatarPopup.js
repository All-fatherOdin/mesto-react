import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { useFormWithValidation } from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
   const { values, handleChange, resetForm, errors, isValid } = useFormWithValidation();

   function handleSubmit(e) {
      e.preventDefault();
      const avatarLink = values["img-link"];
      onUpdateAvatar({ avatar: avatarLink });
      onClose();
   } 

   useEffect(() => {
      resetForm();
   }, [isOpen, resetForm]);

   return (
         <PopupWithForm 
            name="user-gallery" 
            title="Обновить аватар"
            buttonName="Сохранить"
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}
            isValid={isValid}
         >
            <input 
               type="url" 
               name="img-link" 
               placeholder="Ссылка на картинку"
               className="popup__text" 
               required
               minLength='2'
               value={values["img-link"] || ""}
               onChange={handleChange} 
               />
            <span className="popup__text-error">
               {errors["img-link"] || ""}
            </span>
         </PopupWithForm>
   );
}

export default EditAvatarPopup;