import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'
import DelCardPopup from './DelCardPopup'
import PopupWithForm from './PopupWithForm'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedDelCard, setSelectedDelCard] = React.useState({ isOpen: false });
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({ isOpen: false });
  const [currentUser, setCurrentUser] = React.useState({})

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setSelectedDelCard({ isOpen: false })
  }

  function openProfilePopup() {
    setEditProfilePopupOpen(true);
  }

  function openNewCardPopup() {
    setAddPlacePopupOpen(true);
  }

  function openAvatarPopup() {
    setEditAvatarPopupOpen(true);
  }

  function handleUpdateUser({userName, about}) {
    api.changeProfile({userName, about})
    .then((userInfo) => {
      setCurrentUser(userInfo)
      closeAllPopups()
    })
    .catch((err) => {
      alert(err)
    });
  }

  function handleUpdateAvatar({avatar}) {
    api.changeAvatar(avatar)
    .then((userInfo) => {
      setCurrentUser(userInfo)
    })
    .catch((err) => {
      alert(err)
    });
  }

  function handleCardDelete(_id) {
    api.deleteCard(_id)
    .then(() => {
      setCards((state) => state.filter((currentCard) => currentCard._id !== _id));
    })
    .catch((err) => {
      alert(err)
    });
  }

  function handleAddPlaceSubmit(card) {
    api.addCard({cardName: card.name, link: card.link})
    .then((newCard) => {
      setCards([newCard, ...cards])
      closeAllPopups()
    })
    .catch((err) => {
      alert(err)
    });
  }

  function handleCardLike(cardInfo) {
    const isLiked = cardInfo.likes.some(user => user._id === currentUser._id);
    api.changeLikeCardStatus(cardInfo._id, !isLiked)
    .then((newCard) => {
      setCards((state) => state.map((card) => card._id === cardInfo._id ? newCard : card));
    })
    .catch((err) => {
      alert(err)
    });
  }

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), 
    api.getCardsInfo()])
      .then(([userInfo, cardsInfo]) => {
        setCurrentUser(userInfo)
        setCards(cardsInfo);
      })
      .catch((err) => {
        alert(err)
      });
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />

        <Main
          onEditProfile={openProfilePopup}
          onAddPlace={openNewCardPopup}
          onEditAvatar={openAvatarPopup}
          onDelCard={setSelectedDelCard}
          onCardClick={setSelectedCard}
          cards={cards}
          handleCardLike={handleCardLike}
        />

        <Footer />
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups} 
        onUpdateUser={handleUpdateUser}
      />

      <AddPlacePopup
        onAddPlace={handleAddPlaceSubmit}
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <DelCardPopup 
        card={selectedDelCard}
        onClose={closeAllPopups}
        onDelCard={handleCardDelete}
      />

      <ImagePopup 
        card={selectedCard} 
        onClose={closeAllPopups}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;