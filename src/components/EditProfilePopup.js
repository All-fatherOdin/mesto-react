import React from 'react'
import PopupWithForm from './PopupWithForm'
import {CurrentUserContext} from '../contexts/CurrentUserContext'


function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
   const [name, setName] = React.useState('')
   const [description, setDescription] = React.useState('')
   const currentUser = React.useContext(CurrentUserContext)

   function handleNameChange(e) {
      setName(e.target.value);
   }

   function handleDescriptionChange(e) {
      setDescription(e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({userName: name, about: description});
   } 

   React.useEffect(() => {
      setName(currentUser.name)
      setDescription(currentUser.about)
   }, [currentUser])
   
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
         >
            <input type="text" name="user-name" className="popup__text" 
            minLength="2" maxLength="40" value={name} onChange={handleNameChange} required />
            <span className="name-input-error popup__text-error">Вы пропустили это поле.</span>

            <input type="text" name="user-about" className="popup__text"
            minLength="2" maxLength="200" value={description} onChange={handleDescriptionChange} required />
            <span className="career-input-error popup__text-error">Вы пропустили это поле.</span>
         </PopupWithForm>
      </CurrentUserContext.Provider>
   )
}

export default EditProfilePopup;