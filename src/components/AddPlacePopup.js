import { useRef, useEffect } from 'react'
import PopupWithForm from './PopupWithForm'
import { useFormWithValidation } from '../hooks/useForm';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {
   const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
   const pictureNameRef = useRef()
   const pictureLinkRef = useRef()

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({ name: pictureNameRef.current.value, link: pictureLinkRef.current.value });
   }

   useEffect(() => {
      resetForm()
   }, [isOpen, resetForm])

   return (
      <PopupWithForm
         name="user-gallery" 
         id="gallery-popup" 
         title="Новое место"
         buttonName="Сохранить"
         isOpen={isOpen} 
         onClose={onClose}
         onSubmit={handleSubmit}
         isValid={isValid}
         resetForm={resetForm}
         >
         <input  
            type="text" 
            name="img-name" 
            placeholder="Название" 
            className="popup__text" 
            minLength="2" 
            maxLength="30"
            onChange={handleChange}
            value={values["img-name"] || ""} 
            ref={pictureNameRef} 
            required 
         />
         <span className="popup__text-error">
            {errors[["img-name"]]}
         </span>

         <input 
            type="url" 
            name="img-location"
            placeholder="Ссылка на картинку" 
            className="popup__text"
            onChange={handleChange}
            value={values["img-location"] || ""}  
            ref={pictureLinkRef} 
            required 
            />
         <span className="popup__text-error">
            {errors["img-location"]}
         </span>
      </PopupWithForm>
   )
}

export default AddPlacePopup;