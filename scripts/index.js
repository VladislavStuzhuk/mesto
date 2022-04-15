
import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, validationParams} from './components.js';

const page = document.querySelector('.page');
const content = document.querySelector(".content");
const profileEditButton = content.querySelector(".profile__edit-button");
const popupProfile = document.querySelector('.popup-profile');
const popupProfileForm = popupProfile.querySelector('.popup__container');
const profileAuthor = document.querySelector('.profile__author');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileAuthor = document.querySelector('.popup__input_text_name');
const formProfileSubtitle = document.querySelector('.popup__input_text_discription');

function openPopupProfile(){
  formProfileAuthor.value = profileAuthor.textContent;
  formProfileSubtitle.value =  profileSubtitle.textContent;
  openPopup(popupProfile);
}
function closeByEsc(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_opened');
      closePopup(openedPopup); 
    }
}  
function openPopup(popup){
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc)
}
function closePopup(popup){
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc)
}

function submitProfileForm(evt){
  evt.preventDefault();
  profileAuthor.textContent = formProfileAuthor.value;
  profileSubtitle.textContent = formProfileSubtitle.value;
  closePopup(popupProfile);
}

profileEditButton.addEventListener('click', openPopupProfile);
popupProfileForm.addEventListener('submit', submitProfileForm);


const closeButtons = document.querySelectorAll('.popup__close-icon');
for (let i = 0; i < closeButtons.length; i++){
  closeButtons[i].onclick = function(evt){
    closePopup(evt.target.closest('.popup'));
}
}
const popupOverlays = document.querySelectorAll('.popup');
popupOverlays.forEach((overlay) => {
  overlay.addEventListener('mousedown', function(evt){
    closePopup(evt.target);
  });
});

const popupImage = document.querySelector('.popup-image')
const cardsContainer = document.querySelector('.elements');
const popupImageImg = document.querySelector('.popup-image__image');
const popupImageTitle = document.querySelector('.popup-image__discription');
const popupImageInputName = document.querySelector('.popup__input_img_name');
const popupImageInputLink = document.querySelector('.popup__input_img_link');
const popupPlace = document.querySelector('.popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__container');
const addButon = document.querySelector('.profile__add-button')

addButon.addEventListener('click', function(){
  popupPlaceForm.reset();
  openPopup(popupPlace);
  popupPlaceForm.querySelector('.popup__submit-botton').disabled = true;
})
function handleOpenPopup(name, img){
  popupImageImg.src = img;
  popupImageTitle.textContent = name;
  openPopup(popupImage);
}

initialCards.forEach((item) => {
  const card = new Card(item.name, item.image, handleOpenPopup);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
});

popupPlaceForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  const card = new Card(popupImageInputName.value, popupImageInputLink.value, handleOpenPopup);
  const cardElement = card.generateCard();
  document.querySelector('.elements').append(cardElement);
  closePopup(popupPlace);
});
//
//Валидация форм 
//
const validProfile = new FormValidator(validationParams, popupProfileForm);
validProfile.enableValidation();
const validAddPlace = new FormValidator(validationParams, popupPlaceForm);
validAddPlace.enableValidation();
