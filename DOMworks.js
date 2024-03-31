import * as commentsModule from './comments.js';
import { name, isAuthorized, getCommentsFromServer, setCommentToServer } from './api.js';
import { renderLogin } from './loginPage.js';

let loading = true;
let addCommentLoader = document.querySelector('.add-comment-loader');
let addForm = document.querySelector('.add-form');
let btn = document.querySelector('.add-form-button');
let inputName = document.querySelector('.add-form-name');
let inputText = document.querySelector('.add-form-text');
let ulList = document.querySelector('.comments');
let deleteBtn = document.querySelector('.delete-button');

export const appElement = document.getElementById('app');

function addComment(name, comment) {
    commentsModule.addComment(name, comment)
    renderCommentsList()

    inputName.value = '';
    inputText.value = '';
}

export function getComments() {
    loading = true;

    getCommentsFromServer(() => {
        if (addForm) {
            inputName.value = "";
            inputText.value = "";
            addCommentLoader.style.display = "none";
            addForm.style.display = "flex";
        }

        loading = false;
    })
        .then((responseData) => {
            commentsModule.fillComments(responseData)

            renderCommentsList();
        })
        .catch(catchError)
}

function setLike(id) {
    commentsModule.changeLike(id);
    renderCommentsList();
}

export function renderCommentsList() {
    document.querySelectorAll('.comment-text').forEach((element) => {
        element.addEventListener('click', () => {
            inputText.value = commentsModule.getQuote(element.dataset.index)
        })
    })

    const renderSecondPart = () => {
        if (!isAuthorized())
            return `<p>Чтобы добавить комментарий, <a id="ask-authorization">авторизуйтесь</a></p>`

        return `
            <div class="add-comment-loader">Добавление комментария...</div>
            <div class="add-form">
                <input type="text" class="add-form-name" placeholder="Введите ваше имя" value="${name}" disabled />
                <textarea class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
                <div class="add-form-row">
                    <button class="add-form-button">Написать</button>
                    <button class="delete-button">Удалить последний комментарий</button>
                </div>
            </div>
        `
    }

    appElement.innerHTML = `
        <div class="container">
            <ul class="comments">
                <div>Загрузка...</div>
            </ul>
            ${renderSecondPart()}
        </div>
    `;

    if (!loading) {
        ulList = document.querySelector('.comments');
        // ulList.innerHTML = loading ? '<div>Загрузка...</div>' : commentsModule.printCommentList();
        ulList.innerHTML = commentsModule.printCommentList();
    }

    const element = document.getElementById("ask-authorization")

    if (element)
        element.addEventListener("click", () => renderLogin())
    else
        setFormListeners()

    const buttons = document.querySelectorAll(`.like-button`);

    buttons.forEach((button) => {
        button.addEventListener('click', () => setLike(button.dataset.id));
    });
}

function isNotEmpty() {
    return inputName.value.trim() === '' || inputText.value.trim() === '';
}

function catchError(error) {
    if (error.message === 'Сервер сломался, попробуй позже')
        alert('Сервер сломался, попробуй позже');
    else if (error.message === 'Имя и комментарий должны быть не короче 3 символов')
        alert('Имя и комментарий должны быть не короче 3 символов');
    else
        alert('У вас проблемы с интернетом');

    if (addForm) {
        exceptErrorInUI();
        setTimeout(cleanErrorsInUI, 3000);

        addCommentLoader.style.display = 'none';
        addForm.style.display = 'flex';
    }
}

const exceptErrorInUI = () => {
    inputName.classList.add('error');
    inputText.classList.add('error');

    btn.setAttribute('disabled', 'true');
    btn.style.backgroundColor = 'grey';
};

const cleanErrorsInUI = () => {
    inputName.classList.remove('error');
    inputText.classList.remove('error');

    btn.removeAttribute('disabled');
    btn.style.backgroundColor = '#bcec30';
};

export const clickEvent = new MouseEvent('click', {
    view: window,
    bubbles: true,
    cancelable: true,
});

function setFormListeners() {
    addForm = document.querySelector('.add-form');
    btn = document.querySelector('.add-form-button');
    inputName = document.querySelector('.add-form-name');
    inputText = document.querySelector('.add-form-text');
    deleteBtn = document.querySelector('.delete-button');

    inputName.addEventListener('change', () => cleanErrorsInUI());
    inputText.addEventListener('change', () => cleanErrorsInUI());

    btn.addEventListener('click', () => {
        const name = inputName.value
        const comment = inputText.value

        if (isNotEmpty()) {
            exceptErrorInUI();
            setTimeout(cleanErrorsInUI, 2000);
        } else {
            addForm.style.display = 'none';

            addCommentLoader = document.querySelector('.add-comment-loader')
            addCommentLoader.style.display = 'block';

            setCommentToServer(name, comment, () => {
                getComments();

                inputName.value = "";
                inputText.value = "";
                addCommentLoader.style.display = "none";
                addForm.style.display = "flex";
            })
                .catch(catchError);
        }
    });

    addForm.addEventListener('keyup', (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            btn.dispatchEvent(clickEvent);
        }
    });

    deleteBtn.addEventListener('click', () => {
        commentsModule.deleteLast()
        renderCommentsList();
    });
}
