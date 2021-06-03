import React from 'react'
import PopupWithForm from './PopupWithForm'

function AddPlacePopup({onAddPlace, isOpen, onClose}) {

   const pictureNameRef = React.useRef()
   const pictureLinkRef = React.useRef()

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({name: pictureNameRef.current.value, link: pictureLinkRef.current.value});
   }

   React.useEffect(() => {
      pictureNameRef.current.value = "";
      pictureLinkRef.current.value = "";   
   }, [isOpen])

   return (
      <PopupWithForm
         name="user-gallery" 
         id="gallery-popup" 
         title="Новое место"
         buttonName="Сохранить"
         isOpen={isOpen} 
         onClose={onClose}
         onSubmit={handleSubmit}
         >
         <input id="picture-name-input" type="text" name="img-name" 
         placeholder="Название" className="popup__text popup__text_placeholder-disable" 
         minLength="2" maxLength="30" ref={pictureNameRef} required />
         <span className="picture-name-input-error popup__text-error">Вы пропустили это поле.</span>

         <input id="picture-url-input" type="url" name="img-location"
         placeholder="Ссылка  на картинку" className="popup__text popup__text_placeholder-disable" 
         ref={pictureLinkRef} required />
         <span className="picture-url-input-error popup__text-error">Вы пропустили это поле.</span>
      </PopupWithForm>
   )
}

export default AddPlacePopup;