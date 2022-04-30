import img1 from '../images/maddison-square.jpg';
import img2 from '../images/maxresdefault.jpg';
import img3 from '../images/slayer-madisonsquaregarden-70.jpg';
import img4 from '../images/NYC.jpg';
import img5 from '../images/Wacken-Festivals-Cancelled-2020.jpg';
import img6 from '../images/Slayer-main.jpg';

export const initialCards = [
  {
    name: 'Нью-Йорк',
    image: img1
  },
  {
    name: 'Инглвуд',
    image: img2
  },
  {
    name: 'Лас-Вегас',
    image: img3
  },
  {
    name: 'Колорадо-Спрингс',
    image: img4
  },
  {
    name: 'Вакен',
    image: img5
  },
  {
    name: 'Луисвилл',
    image: img6
  },
]; 
export const validationParams  = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-botton',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__input-error_active'
};