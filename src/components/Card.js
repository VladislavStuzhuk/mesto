
export class Card {
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
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
  }
  _removeCard(){
    this._element.remove();
    this._element = null;
  }
  
  _setEventListeners(){
    this._cardImage.addEventListener('click', () => {
     this._handleOpenPopup(this._name, this._image);
    });
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
      this._like();
    });
    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
      this._removeCard();
    });
  
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.card__image'); 
    this._setEventListeners();
    this._cardImage.src = this._image;
    this._cardImage.setAttribute('alt', this._name);
    this._element.querySelector('.card__title').textContent = this._name;
    return this._element;
  }
};