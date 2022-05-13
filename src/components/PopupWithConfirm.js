import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
  constructor(selector){
    super(selector);
    this._form = this._popup.querySelector('.popup__container');
  }
  setSubmitHandler(sumbitHandler){
    this._sumbitHandler = sumbitHandler;
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sumbitHandler();
    });
  }
  open(){
    super.open();
  }
  close(){
    super.close();
    this._form.reset();
  }
}