import {login, setToken, token} from "./api.js"

export const renderLogin = ({render})=>{
    const appEl = document.getElementById('app');
    const loginHtml = ` <div id="form" class="add-form">
    <p>Форма входа</p>
    <input
      id="loginInput"
      type="text"
      class="login-input"
      placeholder="Введите логин"
    />
    <br>
    <input
      id="passwordInput"
      type="password"
      class="password-input"
      placeholder="Введите пароль"
    ></input>
    
      <button  id="enterButton"  class="login-button">Войти</button>

  </div>
  <a href="index.html">Основная страница</a>
  <a href="registration.html">Регистрация</a>
  </div> `
  appEl.innerHTML = loginHtml;

  const enterButtonEl = document.getElementById('enterButton');
  const loginInpurEl = document.getElementById('loginInput');
  const passwordInputEl = document.getElementById('passwordInput');

enterButtonEl.addEventListener('click', ()=>{
    login({
        login:loginInpurEl.value,
        password:passwordInputEl.value,
    })
    .then((resData)=>{
        setToken(resData.user.token);
        console.log(token);
    })
    .then(()=>{
        render();
    })
})
}