import Popup from './Popup.js';
export default class PopupWithImage extends Popup{
  constructor(selector){
    super(selector);
    this._image = this._popup.querySelector('.popup-image__image');
    this._discription = this._popup.querySelector('.popup-image__discription');
  }
  open(name, img){
    super.open();
    this._image.src = img;
    this._image.setAttribute('alt', name);
    this._discription.textContent = name;
  }
} 