import React from 'react'
import PopupWithForm from './PopupWithForm'

function DelCardPopup({card, onClose, onDelCard}) {

   function handleSubmit(e) {
      e.preventDefault()
      onDelCard(card._id)
      onClose()
   }

   return(
      <PopupWithForm 
         name="del-card-form" 
         id="del-card-popup" 
         title="Вы уверены?"
         buttonName="Да"
         isOpen={card.isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      />
   )
}

export default DelCardPopup;