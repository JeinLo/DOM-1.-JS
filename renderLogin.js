import { loginUser } from "./api.js";

export const renderLogin = () => {
    const container = document.querySelector(".container");
    container.innerHTML = ` <div class="add-form">
        <input
            type="text"
            id="add-form-login"
            class="add-form-login"
            placeholder="Введите ваш логин"
        />
        <input
            id="add-form-password"
            type="password"
            class="add-form-password"
            placeholder="Введите ваш пароль"
        />
        <div class="add-form-row">
            <button
            class="add-form-button"
            id="add-form-button"
            >
            Войти
            </button>
        </div>`;
    const loginButton = document.querySelector(".add-form-button");
    if (loginButton) {
        loginButton.addEventListener("click", (event) => {
            event.preventDefault();
            loginUser();
        });
    }
};
