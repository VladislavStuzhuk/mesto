import Popup from './Popup.js';
export default class PopupWithConfirm extends Popup {
  constructor(selector, sumbitHandler){
    super(selector);
    this._sumbitHandler = sumbitHandler;
    this._form = this._popup.querySelector('.popup__container');
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sumbitHandler(this._data);
    });
  }
  open(data){
    super.open();
    this._data = data;
  }
  close(){
    super.close();
    this._form.reset();
  }
}