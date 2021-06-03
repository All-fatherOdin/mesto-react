class Api {
   constructor(infoForFetch) {
      this._cohortId = infoForFetch.cohortId;
      this._baseUrl = infoForFetch.baseUrl;
      this._headers = infoForFetch.headers;
   }

   _checkResponse(res) {
         if (res.ok) {
            return res.json();
         }
         return Promise.reject(`Ошибка ${res.status}`);
   }

   getUserInfo() {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   getCardsInfo() {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   changeProfile({userName, about}) {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            name: userName,
            about: about
         })
      })
      .then(this._checkResponse)
   }

   addCard({cardName, link}) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({
            name: cardName,
            link: link
         })
      })
      .then(this._checkResponse)
   }

   deleteCard(id) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/${id}`, {
         method: 'DELETE',
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   changeLikeCardStatus(id, isLike) {
      return fetch(`${this._baseUrl}/${this._cohortId}/cards/likes/${id}`, {
         method: `${isLike ? 'PUT' : 'DELETE'}`,
         headers: this._headers
      })
      .then(this._checkResponse)
   }

   changeAvatar(avatar) {
      return fetch(`${this._baseUrl}/${this._cohortId}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({
            avatar
         })
      })
      .then(this._checkResponse)
   }

}

const api = new Api({baseUrl: 'https://mesto.nomoreparties.co/v1', cohortId: 'cohort-22', 
                                 token: '3c946ec2-c7fc-48d8-9469-bc7da07a0d23', headers: {authorization: '3c946ec2-c7fc-48d8-9469-bc7da07a0d23',
                                 'Content-Type': 'application/json'}
                              });

export default api;