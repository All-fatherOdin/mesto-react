import React from 'react'
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
   const avatarRef = React.useRef('')

   function handleSubmit(e) {
      e.preventDefault();
      const avatarLink = avatarRef.current.value
      onUpdateAvatar({avatar: avatarLink});
      
   } 

   React.useEffect(() => {
      avatarRef.current.value = ""
   }, [isOpen])

   return (
         <PopupWithForm 
            name="user-gallery" 
            id="avatar-popup" 
            title="Обновить аватар"
            buttonName="Сохранить"
            isOpen={isOpen} 
            onClose={onClose}
            onSubmit={handleSubmit}
         >
            <input id="pic-url-input" type="url" name="img-link" placeholder="Ссылка на картинку"
            className="popup__text popup__text_placeholder-disable" ref={avatarRef} required />
            <span className="pic-url-input-error popup__text-error">Вы пропустили это поле.</span>
         </PopupWithForm>
   )
}

export default EditAvatarPopup;