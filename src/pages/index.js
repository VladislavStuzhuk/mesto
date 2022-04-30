
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, validationParams} from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

const page = document.querySelector('.page');
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const popupProfileForm = document.querySelector('.popup-profile').querySelector('.popup__container');

const info = new UserInfo('.profile__author','.profile__subtitle');
const popupProfile = new PopupWithForm('.popup-profile', (data) => {
  info.setUserInfo(data['name'], data['info'])
});
popupProfile.setEventListeners();
profileEditButton.addEventListener('click',()=> {
  popupProfile.open(info.getUserInfo());
});

const cardsContainer = document.querySelector('.elements');
const popupPlace = document.querySelector('.popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__container');
const buttonAddPlace = document.querySelector('.profile__add-button')

const popupPl = new PopupWithForm('.popup-place', (data) => {
  const cardElement = generateNewCard(data['imgInfo'], data['url'], handleOpenPopup);
  cardList.addItem(cardElement);
});
popupPl.setEventListeners();
buttonAddPlace.addEventListener('click', () => {
  popupPl.open();
})

const popupImg = new PopupWithImage('.popup-image');
popupImg.setEventListeners();

function handleOpenPopup(name, img){
  popupImg.open(name, img)
}

const cardList = new Section({
  data: initialCards,
  renderer: (item) =>{
   const cardElement = generateNewCard(item.name, item.image, handleOpenPopup);
   cardList.addItem(cardElement);
  }
}, cardsContainer);
cardList.renderItems();

function generateNewCard(name, img, handleOpenPopup){ 
  const card = new Card(name, img, handleOpenPopup); 
  return card.generateCard(); 
}; 
//
//Валидация форм 
//
const validProfile = new FormValidator(validationParams, popupProfileForm);
validProfile.enableValidation();
const validAddPlace = new FormValidator(validationParams, popupPlaceForm);
validAddPlace.enableValidation();
