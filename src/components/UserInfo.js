export default class UserInfo{
  constructor(nameSelector, infoSelector){
    this._name = document.querySelector(nameSelector);
    this._info = document.querySelector(infoSelector);
  }
  getUserInfo(){
    return {
      'name-input': this._name.textContent,
      'discription-input': this._info.textContent
    }
  }
  setUserInfo(newName, newInfo){
    this._name.textContent = newName;
    this._info.textContent = newInfo;
  }
}