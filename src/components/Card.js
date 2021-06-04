import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card({onCardClick, handleCardLike, onDelCard, card}) {
   const currentUser = React.useContext(CurrentUserContext)

   const isOwn = card.owner._id === currentUser._id;

   const cardDeleteButtonClassName = (
      `${isOwn ? "element__trash-can" : 
      "element__trash-can element__trash-can_disabled"}`
   ); 

   const isLiked = card.likes.some(user => user._id === currentUser._id);

   const cardLikeButtonClassName = (
      `${isLiked ? "element__like element__like_active" : 
      "element__like"}`
   );; 

   function handleLikeStatus() {
      handleCardLike(card)
   }

   function handleClick(){
      handleCardClick(card)
   }

   function openDelCardPopup(cardInfo) {
      onDelCard({ isOpen: true, _id: card._id });
      console.log({ isOpen: true, _id: card })
   }

   function handleCardClick(cardInfo) {
      onCardClick({ isOpen: true, src: cardInfo.link, name: cardInfo.name })
   }

   return (
      <li className="element">
         <button onClick={handleClick} type="button" className="element__open-image-popup">
            <img className="element__image" src={card.link} alt={card.name} />
         </button>
         <button type="button" onClick={openDelCardPopup} className={cardDeleteButtonClassName} />
         <div className="element__container">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
               <button onClick={handleLikeStatus} type="button" className={cardLikeButtonClassName} />
               <p className="element__like-counter">{card.likes.length}</p>
            </div>
         </div>
      </li>
   );
}
export default Card;
