export class FormValidator{
  constructor(validationParams, targetForm){
    
    this._targetForm = targetForm;
    this._inputSelector = validationParams.inputSelector;
    this._submitButtonSelector = validationParams.submitButtonSelector;
    this._inactiveButtonClass = validationParams.inactiveButtonClass;
    this._inputErrorClass = validationParams.inputErrorClass;
    this._errorClass = validationParams.errorClass;
  }
  _showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
  }
  _hideInputError(formElement, inputElement){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  }
  _checkInputValid(formElement, inputElement){
    (!inputElement.validity.valid) ? 
      this._showInputError(formElement, inputElement, inputElement.validationMessage) :
      this._hideInputError(formElement, inputElement);
  }
  _toggleButtonState(inputList, buttonElement){
    (this._hasInvalidInput(inputList)) ? 
      buttonElement.disabled = true :
      buttonElement.disabled = false ;
  }
  _hasInvalidInput(inputList){
    return inputList.some((inputElement => {
      return !inputElement.validity.valid;
    }));
  }
  _setEventListener(formElement){
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  enableValidation(){
    this._targetForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });     
    this._setEventListener(this._targetForm);
  }
}