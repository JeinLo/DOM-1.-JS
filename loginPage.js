import { login, setName, setToken } from "./api.js";
import { fetchAndRenderComments } from "./main.js";
import { registrPage } from "./registrPage.js";

export const loginPage = () => {
  const loginForm = `<div id="commentDiv" class="add-form">
        <div class="">Форма входа</div>
        <input
          id="name-input"
          type="text"
          class="authorization-login"
          placeholder="Введите логин"
        />
        <input
          id="name-input"
          type="text"
          class="authorization-password"
          placeholder="Введите пароль"
        />
        <div class="authorization-row">
          <button id="button" class="authorization-button">Войти</button>
        </div>
        <div class="authorization-row">
          <button id="button" class="registration-button">Зарегистрироваться</button>
        </div>
      </div>`;

  const conteinerText = document.getElementById("app");
  conteinerText.innerHTML = loginForm;

  const authButtonElement = document.querySelector(".authorization-button");
  const loginInputElement = document.querySelector(".authorization-login");
  const passwordInputElement = document.querySelector(
    ".authorization-password"
  );

  authButtonElement.addEventListener("click", () => {
    login({
      login: loginInputElement.value,
      password: passwordInputElement.value,
    }).then((responseData) => {
      console.log(responseData);
      setToken(responseData.user.token);
      setName(responseData.user.name);
      // console.log(token);
      fetchAndRenderComments();
    });
  });

  const registrText = document.querySelector(".registration-button");
  registrText.addEventListener("click", () => {
    registrPage();
  });
};
