
export default class Card {
  constructor(data, handleOpenPopup, {handleDeletePopup,setLike, setDislike}, userId) {
    this._name = data.name;
    this._image = data.link;
    this._cardId = data._id;
    this._currentUser = userId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._handleOpenPopup = handleOpenPopup;
    this._handleDeletePopup = handleDeletePopup;
    this._setDislike = setDislike;
    this._setLike = setLike;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector('#card-template')
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  _pressLikeButton(){
    if (this._buttonLike.classList.contains('card__like-button_active')){
      this._setDislike()
    } else {
      this._setLike()
    }
  }
  _сheckLikeStatus(){
    this._likes.forEach(like => {
      if (like._id === this._currentUser) {
        this._buttonLike.classList.add('card__like-button_active');
      }
    })
  }
  _checkDeleteButton(){
    if (this._ownerId !== this._currentUser) {
      this._buttonDelete.style.display = "none";  
    }
  }
  _setEventListeners(){
    this._cardImage.addEventListener('click', () => {
     this._handleOpenPopup(this._name, this._image);
    });
    this._buttonLike.addEventListener('click', () => {
      this._pressLikeButton();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._handleDeletePopup();
    });
  }
  deleteCard(){
    this._element.remove();
    this._element = null;
  }
  _setLikeValue(isLiked){
    if (!isLiked){
      if (this._likes.some(like => like._id === this._currentUser)){ 
      this._likeCounter.textContent = this._likes.length; 
      } else this._likeCounter.textContent = this._likes.length + 1; 
    } else {
        if (this._likes.some(like => like._id === this._currentUser)){ 
        this._likeCounter.textContent = this._likes.length - 1; 
      } else this._likeCounter.textContent = this._likes.length 
    }
  }
  likeCard(){
    this._buttonLike.classList.add('card__like-button_active');
    this._setLikeValue(false);
  }
  dislikeCard(){
    this._buttonLike.classList.remove('card__like-button_active');
    this._setLikeValue(true);
  }
  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._likeCounter.textContent = this._likes.length;
    this._buttonDelete = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image'); 
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.setAttribute('alt', this._name);
    this._сheckLikeStatus()
    this._checkDeleteButton();
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
};