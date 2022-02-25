const content = document.querySelector(".content");
const editProfileButton = content.querySelector(".profile__edit-button");
const popupProfile = document.querySelector('.popup-profile');
const popupProfileForm = popupProfile.querySelector('.popup__container');
const profileAuthor = document.querySelector('.profile__author');
const profileSubtitle = document.querySelector('.profile__subtitle');
const formProfileAuthor = document.querySelector('.popup__input_text_name');
const formProfileSubtitle = document.querySelector('.popup__input_text_discription');

function openPopupProfile(){
  formProfileAuthor.value = profileAuthor.textContent;
  formProfileSubtitle.value =  profileSubtitle.textContent;
  popupProfile.classList.add('popup_opened');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  profileAuthor.textContent = formProfileAuthor.value;
  profileSubtitle.textContent = formProfileSubtitle.value;
  popupProfile.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', openPopupProfile);
popupProfileForm.addEventListener('submit', formSubmitHandler);







const closeButton = document.querySelectorAll('.popup__close-icon');
for (let i = 0; i < closeButton.length; i++){
  closeButton[i].onclick = function(evt){
  evt.target.closest('.popup').classList.remove('popup_opened');
}
}


const popupImage = document.querySelector('.popup-image')
const cardsContainer = document.querySelector('.elements');

cardsContainer.onclick = function(evt){
  const target = evt.target;
  if (target.tagName != 'IMG') return;
  const discription = target.closest('.card');
  const image = document.querySelector('.popup-image__image');
  const title = document.querySelector('.popup-image__discription');
  title.textContent = discription.querySelector('.card__title').textContent;
  image.setAttribute('src', target.getAttribute('src'))
  popupImage.classList.add('popup_opened');
}


const popupPlace = document.querySelector('.popup-place');
const popupPlaceForm = popupPlace.querySelector('.popup__container');
const addButon = document.querySelector('.profile__add-button')

addButon.addEventListener('click', function(){
  const imgName = document.querySelector('.popup__input_img_name').value = '';
  const imglink = document.querySelector('.popup__input_img_link').value = '';
  popupPlace.classList.add('popup_opened');
})

function addCard(nameValue, imgValue){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').setAttribute('src', imgValue);
  cardElement.querySelector('.card__image').setAttribute('alt', nameValue);
  cardElement.querySelector('.card__title').textContent =  nameValue;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function(evt){
    evt.target.closest('.card').remove();
  });
  cardElement.querySelector('.card__like-button').addEventListener('click', function(evt){
    evt.target.classList.toggle('card__like-button_active');
  });
  cardsContainer.prepend(cardElement);
}

popupPlaceForm.addEventListener('submit', function(evt){
  evt.preventDefault();
  const imgName = document.querySelector('.popup__input_img_name').value;
  const imglink = document.querySelector('.popup__input_img_link').value;
  addCard(imgName, imglink);
  popupPlace.classList.remove('popup_opened');
});

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
for (let i = 0; i < initialCards.length; i++ ){
  addCard(initialCards[i].name, initialCards[i].link);
};

