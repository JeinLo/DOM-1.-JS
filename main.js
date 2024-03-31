import { getTodos, postComment } from "./api.js";
import { reAddNewComment, render } from "./commons.js";

let commentsList = [];
const currentInputName = document.querySelector('.add-form-name');
const currentInputText = document.querySelector('.add-form-text');
const commentButton = document.querySelector('.add-form-button');
const commentList = document.querySelector('.comments');
const checkStatus = document.querySelector('.add-form');
const deleteButton = document.querySelector('.delete-form-button');
const deleteElement = document.querySelector('.comments');

const likesActive = () => {
    const buttonLikeElements = document.querySelectorAll('.like-button');

    for (const elem of buttonLikeElements) {
        elem.addEventListener('click', (event) => {
            event.stopPropagation();
            let num = 0;
            let index = elem.dataset.index;
            for (const element of commentsList) {
                if (element.id === index) {
                    index = num;
                }
                num += 1;
            }
            const commentIndex = commentsList[index];
            if (commentIndex.isLiked) {
                commentIndex.isLiked = false;
                commentIndex.likes = commentIndex.likes - 1;
                renderComments();
            } else {
                commentIndex.isLiked = true;
                commentIndex.likes = commentIndex.likes + 1;
                renderComments();
            }
        });
    }
}

const reComment = () => {
    const commentElement = document.querySelectorAll(".comment");

    for (const textElement of commentElement) {
        textElement.addEventListener("click", () => {
            const indexElementInClick = [...document.querySelectorAll('.comment')].indexOf(textElement);
            let nameComment = commentsList[indexElementInClick].author.name;
            currentInputText.value = `>${commentsList[indexElementInClick].text.replaceAll('&gt;', '>')}
${nameComment}, `;
        });
    }
}

const start = () => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('newComment');
    commentList.insertAdjacentElement('afterend', newDiv);
    document.querySelector('.newComment').innerHTML = 'Список комментариев загружается...';
    getTodos()
        .then((responseData) => {
            commentsList = responseData.comments;
            renderComments();
        })
        .then(() => {
            document.querySelector('.newComment').remove();
        })
        .catch((error) => {
            if (error.message === 'Сервер сломался. Попробуйте позже.') {
                alert('Сервер сломался. Попробуйте позже.');
            } else {
                alert('Кажется, у вас сломался интернет, попробуйте позже');
            }
        })
}

start();

const fetchAndRenderTasks = async () => {
    try {
        const responseData = await getTodos();
        commentsList = responseData.comments;
        renderComments();
    } catch (error) {
        if (error.message === 'Сервер сломался. Попробуйте позже.') {
            alert('Сервер сломался. Попробуйте позже.');
        } else {
            alert('Кажется, у вас сломался интернет, попробуйте позже');
        }
        setInterval(fetchAndRenderTasks);
    }
}

function addNewComment() {
    if (currentInputName.value.trim().length !== 0 && currentInputText.value.trim().length !== 0) {
        let thisText = currentInputText.value;
        let thisName = currentInputName.value;
        checkStatus.style.display = "none";
        let newDiv = document.createElement('div');
        newDiv.classList.add('newComment');
        commentList.insertAdjacentElement('afterend', newDiv);
        document.querySelector('.newComment').innerHTML = 'Комментарий добавляется';

        postComment(currentInputText, currentInputName)
            .then(() => {
                return fetchAndRenderTasks();
            })
            .then(() => {
                document.querySelector('.newComment').remove();
                checkStatus.style.display = "flex";
            })
            .catch((error) => {
                if (error.message === 'Сервер сломался. Попробуйте позже.' && thisText.length > 2 && thisName.length > 2) {
                    reAddNewComment(addNewComment);
                } else if (error.message === 'Сервер сломался. Попробуйте позже.') {
                    alert('Сервер сломался. Попробуйте позже.');
                } else if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
                    alert('Имя и комментарий должны быть не короче 3 символов');
                } else {
                    alert('Кажется, у вас сломался интернет, попробуйте позже');
                }
                document.querySelector('.newComment').remove();
                checkStatus.style.display = "flex";
                currentInputText.value = thisText;
                currentInputName.value = thisName;
            })
    }
    currentInputText.value = '';
    currentInputName.value = '';
    renderComments();
}

checkStatus.addEventListener('input', () => {
    if (currentInputName.value.trim().length !== 0 && currentInputText.value.trim().length !== 0) {
        commentButton.style.disabled = false;
        commentButton.style.backgroundColor = '#bcec30';
    } else {
        commentButton.style.disabled = true;
        commentButton.style.backgroundColor = 'grey';
    }
});

commentButton.addEventListener("click", () => {
    addNewComment();
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        addNewComment();
    }
});

deleteButton.addEventListener('click', () => {
    let delElem = deleteElement.children.item(deleteElement.children.length - 1);
    delElem.remove();
    commentsList.pop();
});

const renderComments = () => {
    commentList.innerHTML = commentsList.map((elem) => {
        return render(elem);
    }).join('');
    likesActive();
    reComment();
}

renderComments();