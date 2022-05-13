
import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards, validationParams} from '../utils/constants.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm.js'
import Api from '../components/Api.js'
const page = document.querySelector('.page');
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const popupProfileForm = document.querySelector('.popup-profile').querySelector('.popup__container');
const buttonSubmitProfile = document.querySelector('.popup-profile__submit-button');
const buttonSubmitPlace = document.querySelector('.popup-place__submit-button');
const buttonSubmitAvatar = document.querySelector('.popup-avatar-edit__submit-button');

const info = new UserInfo('.profile__author','.profile__subtitle','.profile__avatar');
const popupProfile = new PopupWithForm('.popup-profile', (data) => {
  renderLoading(true, buttonSubmitProfile);
  api.patchUserInfo(data)
  .then(data => {
    info.setUserInfo(data);
    popupProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    renderLoading(false, buttonSubmitProfile);
  })
});
popupProfile.setEventListeners();
profileEditButton.addEventListener('click',()=> {
  popupProfile.open(info.getUserInfo());
});

const cardsContainer = document.querySelector('.elements');
const popupPlaceForm = document.querySelector('.popup-place').querySelector('.popup__container');
const buttonAddPlace = document.querySelector('.profile__add-button')

const popupPlace = new PopupWithForm('.popup-place', (data) => {
  renderLoading(true, buttonSubmitPlace);
  api.postNewCard(data)
  .then(data => {
    const cardElement = generateNewCard(data, handleOpenPopup, userId);
    cardList.addItem(cardElement);
    popupPlace.close();
  }).catch(err => console.log(err))
  .finally(() => {
    renderLoading(false, buttonSubmitPlace);
  })
});
popupPlace.setEventListeners();
buttonAddPlace.addEventListener('click', () => {
  validAddPlace.toggleButtonState();
  popupPlace.open();
})

const avatar = document.querySelector('.profile__avatar');
const popupAvatarForm = document.querySelector('.popup-avatar-edit__container')
const buttonEditAvatar = document.querySelector('.profile__avatar-edit-button');
const popupAvatar = new PopupWithForm('.popup-avatar-edit', data =>{
  renderLoading(true, buttonSubmitAvatar);
  api.patchUserAvatar(data)
  .then(data => {
    info.setUserAvatar(data);
    popupAvatar.close();
  })
  .catch((err) => console.log(err))
  .finally(() => {
    renderLoading(false, buttonSubmitAvatar);
  })
  
});
popupAvatar.setEventListeners();
buttonEditAvatar.addEventListener('click', ()=>{
  validAvatar.toggleButtonState();
  popupAvatar.open();
});

const popupImg = new PopupWithImage('.popup-image');
popupImg.setEventListeners();

const popupDelete = new PopupWithConfirm('.popup-confirm-delete')
const buttonDelete = document.querySelector('.popup-confirm-delete__button');
popupDelete.setEventListeners();

function renderLoading(isLoading, button){
  if (isLoading) {
    button.textContent = 'Сохранение...'
  } else button.textContent = button.value;
}
const cardList = new Section({
  renderer: (item) =>{
   const cardElement = generateNewCard(item);
   cardList.addItem(cardElement);
  }
}, cardsContainer);
// функции для обработки карточки 
function handleOpenPopup(name, img){
  popupImg.open(name, img)
}
function handleDeletePopup(card){
  popupDelete.setSubmitHandler(()=>{
    api.deleteCard(card._cardId)
    .then( () =>{
      card.deleteCard();
      popupDelete.close();
    }).catch(err => console.log(err))
  })
  popupDelete.open();
}
function setLike(card){
    api.like(card._cardId)
    .then(card.likeCard()
    ).catch(err => console.log(err));
}
function setDislike(card){
    api.dislike(card._cardId)
    .then(card.dislikeCard()
    ).catch(err => console.log(err));
}

function generateNewCard(data){ 
  const card = new Card(data, handleOpenPopup, {
    handleDeletePopup: () => handleDeletePopup(card), 
    setLike: () => setLike(card), 
    setDislike: ()=> setDislike(card)
  }, userId); 
  return card.generateCard(); 
};
//
//Валидация форм 
//
const validProfile = new FormValidator(validationParams, popupProfileForm);
validProfile.enableValidation();
const validAddPlace = new FormValidator(validationParams, popupPlaceForm);
validAddPlace.enableValidation();
const validAvatar = new FormValidator(validationParams, popupAvatarForm);
validAvatar.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-40',
  headers: {
    authorization: '3be77505-74d7-4be6-abbc-19e7c1c00c0e',
    'Content-Type': 'application/json'
  }
});
let userId ;
Promise.all([
    api.getUserInfo(),
    api.getInitialCards()
])
.then((data) => {
  const profileInfo = (data[0]);
  const cards = (data[1]);
    userId = profileInfo._id;
    info.setUserInfo(profileInfo);
    info.setUserAvatar(profileInfo);
    cardList.renderItems(cards);
})
.catch((err) => {
    console.log(err);
  });