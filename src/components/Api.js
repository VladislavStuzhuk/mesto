export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }
  
 _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }
  
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleResponse)
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then(this._handleResponse)
  }
  patchUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._handleResponse)
  }
  patchUserAvatar(data){
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._handleResponse)  
  }
  postNewCard(data){
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._handleResponse);
  }
  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method :'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }
  like(id) {
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(this._checkResponse)
  }
  dislike(id){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
    
  }
}

