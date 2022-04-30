export default class Popup{
  constructor(selector){
    this._popup = document.querySelector(selector)
    this._closeButton = this._popup.querySelector('.popup__close-icon');
  }
  open(){
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown',evt => this._handleEscClose(evt))
  }
  close(){
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown',evt => this._handleEscClose(evt))
  }
  _handleEscClose(evt){
    if (evt.key === 'Escape') {
      this.close();
    }  
  }
  _handleOverlayClose(evt){
    if (evt.target === evt.currentTarget){
      this.close()
    }
  }
  setEventListeners(){
    this._popup.addEventListener('click', evt => this._handleOverlayClose(evt))
    this._closeButton.addEventListener('click', () => this.close());
  }
}