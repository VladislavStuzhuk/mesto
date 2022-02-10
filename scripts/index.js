let content = document.querySelector(".content");
let editButton = content.querySelector(".profile__edit-button");
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close-icon');
let author = content.querySelector('.profile__author');
let discription = content.querySelector('.profile__subtitle');
let formName = document.querySelector('.popup__form_name');
let formDiscription = document.querySelector('.popup__form_discription');
let likeBtn = content.querySelectorAll('.elements__like-button');

function setValue(){
  formName.value = author.textContent;
  formDiscription.value = discription.textContent;
}
function popupOpen(){
  setValue();
  popup.classList.toggle('popup_opened');
}

function formSubmitHandler(evt){
  evt.preventDefault();
  author.textContent = formName.value;
  discription.textContent = formDiscription.value;
  console.log('submit');
  popupOpen();
}

editButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupOpen);
popup.addEventListener('submit', formSubmitHandler);

for (let i = 0; i < likeBtn.length; i++){
  likeBtn[i].addEventListener('click', function likeActiv(){
    likeBtn[i].classList.toggle('elements__like-button_active');
  });
}
 

