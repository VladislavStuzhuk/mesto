import Popup from './Popup.js';
export default class PopupWithForm extends Popup {
  constructor(selector, sumbitHandler){
    super(selector);
    this._sumbitHandler = sumbitHandler;
    this._form = this._popup.querySelector('.popup__container');
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'))
  }
  _getInputValues(){
    const values = {};
    this._inputList.forEach((input) => values[input.name] = input.value);
    return values; 
  }
  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._sumbitHandler(this._getInputValues());
    });
  }
  open(data) {
    super.open();
    if (data) {
      this._inputList.forEach(input => {
        input.value = data[input.name];
      })
    }
  } 
  close(){
    super.close();
    this._form.reset();
  }
}