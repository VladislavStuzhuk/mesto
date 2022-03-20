const objects = {
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-botton',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};
const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.classList.add(obj.errorClass);
}
const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = '';
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
}
const checkInputValid = (formElement, inputElement, obj) => {
  (!inputElement.validity.valid) ? 
    showInputError(formElement, inputElement, inputElement.validationMessage, obj) :
    hideInputError(formElement, inputElement, obj);
}
const toggleButtonState = (inputList, buttonElement) => {
  (hasInvalidInput(inputList)) ? 
    buttonElement.disabled = true :
    buttonElement.disabled = false ;
}
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement => {
    return !inputElement.validity.valid;
  }));
}
const setEventListener = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function(){
      checkInputValid(formElement, inputElement, obj);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
function enableValidation(obj){
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt){
      evt.preventDefault();
    });
    setEventListener(formElement, obj);
  });
  
}
enableValidation(objects)