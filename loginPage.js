import { login, registration, setName, setToken } from './api.js';
import { appElement, getComments } from './DOMworks.js'


export const renderRegistration = () => {
    appElement.innerHTML = `
        <div class="container">
            <h1>Страница входа</h1>
            <div class="add-form">
                <div class="add-form-row">
                    <h3 class="form-title">Форма регистрации</h3>
                    <button class="form-button" id="do-login">Авторизоваться</button>
                </div>
                <div class="form-row">
                    <input type="text" id="login-input" class="input" placeholder="Логин" /><br><br>
                    <input type="text" id="name-input" class="input" placeholder="Имя" /><br><br>
                    <input type="text" id="password-input" class="input" placeholder="Пароль" />
                </div>
                <br />
                <button class="add-form-button" id="login-button">Зарегистрироваться</button>
            </div>
            <a href="index.html" id="link-to-tasks">Перейти на страницу комментариев</a>
        </div>
    `;

    document.getElementById("do-login")
        .addEventListener("click", () => renderLogin())

    const logBtn = document.getElementById('login-button');
    const loginInputElement = document.getElementById('login-input');
    const nameInputElement = document.getElementById('name-input');
    const passwordInputElement = document.getElementById('password-input');

    logBtn.addEventListener('click', () => {
        registration({
            login: loginInputElement.value,
            name: nameInputElement.value,
            password: passwordInputElement.value,
        })
            .then(endUserEnter)
            .catch((error) => {
                // Обработка ошибок
                console.error('Ошибка:', error.message);
                // Отображение сообщения об ошибке пользователю
                alert('Вы ввели неправильные данные');
            })
    })
}

export const renderLogin = () => {
    appElement.innerHTML = `
        <div class="container">
            <h1>Страница входа</h1>
            <div class="add-form">
                <div class="add-form-row">
                    <button class="form-button" id="do-registration">Зарегистрироваться</button>
                    <h3 class="form-title">Форма входа</h3>
                </div>
                <div class="form-row">
                    <input type="text" id="login-input" class="input" placeholder="Логин" /><br><br>
                    <input type="text" id="password-input" class="input" placeholder="Пароль" />
                </div>
                <br />
                <button class="add-form-button" id="login-button">Войти</button>
            </div>
            <a href="index.html" id="link-to-tasks">Перейти на страницу комментариев</a>
        </div>
    `;

    document.getElementById("do-registration")
        .addEventListener("click", () => renderRegistration())

    const logBtn = document.getElementById('login-button');
    const loginInputElement = document.getElementById('login-input');
    const passwordInputElement = document.getElementById('password-input');

    logBtn.addEventListener('click', () => {
        login({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        })
            .then(endUserEnter)
            .catch((error) => {
                // Обработка ошибок
                console.error('Ошибка:', error.message);
                // Отображение сообщения об ошибке пользователю
                alert('Неправильный логин или пароль');
            })
    })
}

function endUserEnter(responseData) {
    //console.log(token)
    setName(responseData.user.name)
    setToken(responseData.user.token)

    getComments()
    //console.log(token)
}
