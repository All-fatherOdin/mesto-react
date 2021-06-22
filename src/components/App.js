import {useState, useEffect} from 'react';
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
import Login from './Login'
import Register from './Register'
import InfoTooltip from './InfoTooltip'
import { Redirect, Route, Switch, useHistory } from 'react-router';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../auth'

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedDelCard, setSelectedDelCard] = useState({ isOpen: false });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false });
  const [currentUser, setCurrentUser] = useState({});
  const [isTooltipPopupOpen, setTooltipPopupOpen] = useState({isOpen: false, registration: false});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [headerLink, setHeaderLink] = useState('/sign-in');
  const history = useHistory();


  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ isOpen: false });
    setSelectedDelCard({ isOpen: false });
    setTooltipPopupOpen({ isOpen: false })
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

  useEffect(() => {
    Promise.all([api.getUserInfo(), 
    api.getCardsInfo()])
      .then(([userInfo, cardsInfo]) => {
        setCurrentUser(userInfo)
        setCards(cardsInfo);
      })
      .catch((err) => {
        alert(err)
      })
  }, [loggedIn])

  function handleRegister({email, password}) {
    auth.register({email, password})
    .then((res) => {
      if(res.data){
        const {data} = res;
        setUserData({email: data.email})
        setTooltipPopupOpen({isOpen: true, registration: true})
      } else {
        setTooltipPopupOpen({isOpen: true, registration: false})
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleLogin({email, password}) {
    auth.authorize({email, password})
    .then((res) => {
      if(res.token){
        setUserData({email: email})
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        history.push('/main')
        setHeaderLink('/main')
      } else {
        setTooltipPopupOpen({isOpen: true, registration: false})
      }
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function handleLogout() {
    history.push('/sign-in')
    setLoggedIn(false)
    setUserData({email: ''})
    localStorage.removeItem('jwt')
  }

  function checkToken() {
    const token = localStorage.getItem('jwt')
    if(token) {
      auth.getContent(token)
      .then((res)=> {
        const {data} = res
        setUserData({email: data.email})
        setLoggedIn(true)
        history.push('/main')
        setHeaderLink('/main')
      })
      .catch((err) => {
        alert(err);
        localStorage.removeItem('jwt')
      })
    } else {
      history.push('/sign-in')
      setHeaderLink('/sign-in')
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header
          link={headerLink}
          changeLink={setHeaderLink}
          handleLogout={handleLogout}
          userEmail={userData.email}
        />
        <InfoTooltip 
          onClose={closeAllPopups}
          tooltipData={isTooltipPopupOpen}
          history={history}
          changeLink={setHeaderLink}
        />
        <Switch>
          <Route path="/sign-up">
            <Register 
              handleRegister={handleRegister} 
              changeLink={setHeaderLink}
            />
          </Route>
          <Route path="/sign-in">
            <Login 
              handleLogin={handleLogin}
            />
          </Route>
          <ProtectedRoute 
            path="/main" 
            component={Main}
            loggedIn={loggedIn}
            onEditProfile={openProfilePopup}
            onAddPlace={openNewCardPopup}
            onEditAvatar={openAvatarPopup}
            onDelCard={setSelectedDelCard}
            onCardClick={setSelectedCard}
            cards={cards}
            handleCardLike={handleCardLike}
          />
          <Route>
            {loggedIn ? <Redirect to="/main"/> : <Redirect to="/sign-in"/> }
          </Route>
        </Switch>

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