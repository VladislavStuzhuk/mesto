const initialCards = [
  {
    name: 'Нью-Йорк',
    link: 'images/maddison-square.jpg'
  },
  {
    name: 'Инглвуд',
    link: 'images/maxresdefault.jpg'
  },
  {
    name: 'Лас-Вегас',
    link: 'images/slayer-madisonsquaregarden-70.jpg'
  },
  {
    name: 'Колорадо-Спрингс',
    link: 'images/NYC.jpg'
  },
  {
    name: 'Вакен',
    link: 'images/Wacken-Festivals-Cancelled-2020.jpg'
  },
  {
    name: 'Луисвилл',
    link: 'images/Slayer-main.jpg'
  },
]; 
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

function createCard(nameValue, imgValue){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').setAttribute('src', imgValue);
  cardElement.querySelector('.card__image').setAttribute('alt', nameValue);
  cardElement.querySelector('.card__title').textContent =  nameValue;
  cardElement.querySelector('.card__image').addEventListener('click', function(evt){
      const target = evt.target;
      const discription = target.closest('.card');
      popupImageTitle.textContent = discription.querySelector('.card__title').textContent;
      popupImageImg.setAttribute('src', target.getAttribute('src'));
      openPopup(popupImage);
   })
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_active');
  });
  return cardElement
}
function addCard(card, container) {
    container.prepend(card);
} 
popupPlaceForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  const card = createCard(popupImageInputName.value, popupImageInputLink.value);
  addCard(card, cardsContainer);
  closePopup(popupPlace);
});

for (let i = 0; i < initialCards.length; i++ ){
  const card = createCard(initialCards[i].name, initialCards[i].link);
  addCard(card, cardsContainer);
};
