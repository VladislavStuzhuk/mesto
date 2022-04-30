
import './index.css';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards, validationParams} from '../components/components.js';
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
  info.setUserInfo(data['name-input'], data['discription-input'])
});
popupProfile.setEventListeners();
profileEditButton.addEventListener('click',()=> {
  popupProfile.open(info.getUserInfo());
});



const cardsContainer = document.querySelector('.elements');
const popupPlace = document.querySelector('.popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__container');
const addButon = document.querySelector('.profile__add-button')

const popupPl = new PopupWithForm('.popup-place', (data) => {
  const cardElement = generateNewCard(data['img-name-input'], data['url-input'], handleOpenPopup);
  document.querySelector('.elements').prepend(cardElement);
});
popupPl.setEventListeners();
addButon.addEventListener('click', () => {
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
   const card = new Card(item.name, item.image, handleOpenPopup);
   const cardElement = card.generateCard();
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
