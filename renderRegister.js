import { register } from "./api.js";
import { renderLogin } from "./renderLogin.js";

export const renderRegister = ()=>{
const appEl = document.getElementById('app');
const regHtml = `<div id="form" class="add-form">
<p>Форма регистрации</p>
<input
  id="nameInputReg"
  type="text"
  class="login-input"
  placeholder="Введите имя"
/>
<br>
<input
  id="loginInputReg"
  type="text"
  class="login-input"
  placeholder="Введите логин"
/>
<br>
<input
  id="passwordInputReg"
  type="password"
  class="password-input"
  placeholder="Введите пароль"
></input>

  <button  id="enterButton"  class="login-button">Зарегистрироваться</button>

</div>
<br>
<div id="loginLink" class="login-link">Авторизация</div>
</div> `
appEl.innerHTML = regHtml;

const enterButtonEl = document.getElementById('enterButton');
const nameRegInputEl = document.getElementById('nameInputReg');
const loginRegInputEl = document.getElementById('loginInputReg');
const passwordRegInput = document.getElementById('passwordInputReg');

const loginLinkEl = document.getElementById('loginLink');
loginLinkEl.addEventListener('click', ()=>{
    renderLogin();
})

enterButtonEl.addEventListener('click', ()=>{
    register({
        nameReg:nameRegInputEl.value,
        loginReg:loginRegInputEl.value,
        passwordReg:passwordRegInput.value,
    })
    .then((resData)=>{
        console.log(resData);
    })
})
}