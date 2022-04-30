
export default class Card {
  constructor(name, image, handleOpenPopup) {
    this._name = name;
    this._image = image;
    this._handleOpenPopup = handleOpenPopup;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector('#card-template')
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }
  _like(){
    this._buttonLike.classList.toggle('card__like-button_active');
  }
  _removeCard(){
    this._element.remove();
    this._element = null;
  }
  _setEventListeners(){
    this._cardImage.addEventListener('click', () => {
     this._handleOpenPopup(this._name, this._image);
    });
    this._buttonLike.addEventListener('click', () => {
      this._like();
    });
    this._buttonDelete.addEventListener('click', () => {
      this._removeCard();
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._buttonDelete = this._element.querySelector('.card__delete-button');
    this._cardImage = this._element.querySelector('.card__image'); 
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.setAttribute('alt', this._name);
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
};