export default class FormValidator{
  constructor(data, form){
    this._form = form;
    this._inputSelector = data.inputSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._inputList = Array.from(form.querySelectorAll(this._inputSelector))
    this._buttonSubmit = this._form.querySelector(data.submitButtonSelector)
  }
  _showInputError(inputElement, errorMessage){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(inputElement){
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }
  _checkInputValid(inputElement){
    (!inputElement.validity.valid) ? 
      this._showInputError(inputElement, inputElement.validationMessage) :
      this._hideInputError(inputElement);
  }
  _hasInvalidInput(){
    return this._inputList.some((inputElement => {
      return !inputElement.validity.valid;
    }));
  }
  _setEventListener(){
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(inputElement);
        this.toggleButtonState();
      });
    });
  }
  toggleButtonState(){
    this._buttonSubmit.disabled = this._hasInvalidInput()
  }
  enableValidation(){
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });     
    this._setEventListener();
  }
}