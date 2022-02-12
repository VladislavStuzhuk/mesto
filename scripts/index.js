const content = document.querySelector(".content");
const editButton = content.querySelector(".profile__edit-button");
const popup = document.querySelector('.popup');
const popupForm = document.querySelector('.popup__container');
const closeButton = document.querySelector('.popup__close-icon');
const author = content.querySelector('.profile__author');
const discription = content.querySelector('.profile__subtitle');
const formName = document.querySelector('.popup__input_text_name');
const formDiscription = document.querySelector('.popup__input_text_discription');
const likeBtn = content.querySelectorAll('.card__like-button');

function setValue(){
  formName.value = author.textContent;
  formDiscription.value = discription.textContent;
}
function openPopup(){
  setValue();
  popup.classList.add('popup_opened');
}
function closePopup(){
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  author.textContent = formName.value;
  discription.textContent = formDiscription.value;
  console.log('submit');
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', formSubmitHandler);

for (let i = 0; i < likeBtn.length; i++){
  likeBtn[i].addEventListener('click', function likeActiv(){
    likeBtn[i].classList.toggle('card__like-button_active');
  });
}
 

