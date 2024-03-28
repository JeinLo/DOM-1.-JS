import { initAddCommentsListeners } from "./initAddCommentsListeners.js";
import { renderLoginForm } from "./login.js";
import { user } from "./main.js";

export const renderCommentForm = () => {
    const addCommentForm = document.querySelector(".form");
    const commentFormHtml = user ?`
    <div class="add-form" id="addForm">
        <input
            type="text" 
            class="input-form"
            placeholder="Введите ваше имя"
            id="name-input" 
            required
        />
        <textarea
            type="textarea"
            class="text-area-form"
            placeholder="Введите ваш коментарий"
            rows="4"
            id="text-input"
        ></textarea>
        <div class="add-form-row">
            <button class="add-form-button" id="addCommentButton">Написать</button>
        </div>
    </div>`: `<div>Чтобы оставить комментарий пожалуйста <button class="auth-link">авторизуйтесь</button></div>`;

    addCommentForm.innerHTML = commentFormHtml;
    const authButton = document.querySelector('.auth-link');
    if (authButton) {
        authButton.addEventListener('click', () => {
            renderLoginForm();
        });
    }
    if (user) {
        initAddCommentsListeners();
    };
};

