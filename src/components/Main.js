import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Card from './Card'

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onDelCard, onCardClick, handleCardLike}) {
   
   const currentUser = React.useContext(CurrentUserContext)

   function renderCards() {
      return cards.map(({...card})=>(
         <Card 
            key={card._id}
            card={{...card}} 
            onCardClick={onCardClick}
            handleCardLike={handleCardLike}
            onDelCard ={onDelCard}
         />
      ))
   }

   return (
      <>
      <main className="content">
         <section className="profile">
            <button onClick={onEditAvatar} type="button" className="profile__avatar-button">
               <img className="profile__avatar" alt={currentUser.name} 
               style={{background: `url(${currentUser.avatar})center/cover`}} />
            </button>
            <div className="profile__info">
               <div className="profile__container">
                  <h1 className="profile__name">{currentUser.name}</h1>
                  <button onClick={onEditProfile} type="button" className="profile__edit-button"></button>
               </div>
               <p className="profile__career">{currentUser.about}</p>
            </div>
            <button onClick={onAddPlace} type="button" className="profile__add-button"></button>
         </section>
      </main>
      
      <section className="elements">
         <ul className="elements__list">
            {renderCards()}
         </ul>
      </section>
      </>
   )
}

export default Main;