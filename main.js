const buttonElement = document.getElementById('add-button');
const listElement = document.getElementById('comment-script');
const nameInputElement = document.getElementById('input-accept-name');
const textInputElement = document.getElementById('textarea-accept-comment');
const buttonDelete =  document.getElementById('delete-button');
const addForm = document.getElementById("addForm");
const containerPreloader = document.getElementById('container-preloader');
const containerPreloaderPost = document.getElementById('container-preloader-post'); 


containerPreloader.textContent = 'Пожалуйста подождите, идет загрузка комментариев...';
containerPreloaderPost.style.display = 'none';

function commentsFunction () {
console.log('Запрос начался');

//данные из API 
fetch("https://wedev-api.sky.pro/api/v1/Angellina/comments",{
    method: "GET"
    }).then((response) => {
    return response.json();
}).then((responseData) => {
    //массив из API
comments = responseData.comments.map((comment) => {
            // дата и время
            const currentDate = new Date(comment.date).toLocaleDateString('ru-Ru');
            const currentTime = new Date(comment.date).toLocaleTimeString('ru-RU');
            return {
                name: comment.author.name,
                data: `${currentDate} ${currentTime}`,
                comment: comment.text,
                like: comment.likes, 
                isLike: comment.isLiked
            };
        });
    renderCommentators();
    containerPreloader.textContent = '';
    containerPreloaderPost.style.display = 'block';
});
}
commentsFunction();

let comments = [];

//кнопка, неактивна при незаполненом поле
function checkInputs() {
if (nameInputElement.value.trim() === "" || textInputElement.value.trim() === "") {
    buttonElement.disabled = true;
    buttonElement.classList.add("gray");
} else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("gray");
};
};
nameInputElement.addEventListener("input", checkInputs);
textInputElement.addEventListener("input", checkInputs);
checkInputs();
//кнопка удалить и её функционал
buttonDelete.addEventListener('click', () => {
comments.pop();
renderCommentators();
checkInputs();
});

// Функция, которая делает кнопку "удалить" неактивной когда в массиве нет элементов
function inactiveDeleteButton() {
if (comments.length === 0) {
    buttonDelete.disabled = true;
    buttonDelete.classList.add("gray-delete");
} else {
    buttonDelete.disabled = false;
    buttonDelete.classList.remove("gray-delete");
}
};

//коммент по нажатию клавиши
document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            buttonElement.click();
        }
    })

//функция лайка
const addLikeButtonEventListener = () => {
const likesButtonElement = document.querySelectorAll('.like-button');
for (const likeButton of likesButtonElement) {
    let isLike = false;
    likeButton.addEventListener("click", event => {
        event.stopPropagation();
        const index = likeButton.dataset.index;
        if (comments[index].isLike === false) {
            comments[index].isLike = true;
            comments[index].like++;
        } else {
            comments[index].isLike = false;
            comments[index].like--;
        }
        likeButton.classList.toggle('-active-like', comments[index].isLike);
        renderCommentators();
        checkInputs();
    });
};
};

let text; 
let variableUserName;
// 2.11 
const replyToCommentFunction = () => {
const replyComments = document.querySelectorAll('.comment-text');
const commentTextArea = document.getElementById('textarea-accept-comment');
for (const replyComment of replyComments) {
    replyComment.addEventListener("click", event => {
        event.stopPropagation();
    const replyUserName = event.target.closest('.comment').querySelector('.comment-header').dataset.user;
    text = replyComment.dataset.text;
    commentTextArea.value = text + ' ' + '\n : - ' + replyUserName;
        renderCommentators();
        checkInputs();
    });
};
};
    //Рендер функция
const renderCommentators = () => {
const commentatorHTML = comments.map((commentator, index) => {
            return `<li class="comment">
  <div data-user="${commentator.name}" class="comment-header">
    ${commentator.name}
    <div>${commentator.data}</div>
  </div>
  <div class="comment-body">
    <div data-text=">-${commentator.comment}" class="comment-text">
      ${commentator.comment}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span data-like="0" class="likes-counter">${commentator.like}</span>
      <button class="like-button ${commentator.isLike ? '-active-like' : ''}" data-index="${index}" ></button>
    </div>
  </div>
  </li>`;
    }).join("");
    listElement.innerHTML = commentatorHTML;
    addLikeButtonEventListener();
    replyToCommentFunction();
inactiveDeleteButton();
};
    

function addNewComment() { 
  postPromiseFetch();
};

    function postPromiseFetch() {

        const fetchPromisePost = fetch(" https://wedev-api.sky.pro/api/v1/Angellina/comments",{
                method: "POST",	
                body:	JSON.stringify ({
                    text: textInputElement.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
                    name: nameInputElement.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
                    forceError: true
                }),
        }).then((response) => {
         console.log(response);
        if (response.status === 201) {
        return response.json();
        }else if (response.status === 500) {
        throw new Error("Сервер сломался")
        } else if (response.status === 400) {
        throw new Error("Недопустимое количество символов")
        }
        }).then((response) => {
            commentsFunction();
        }).then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        nameInputElement.value = "";
        textInputElement.value = "";
        })
        .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';

        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте позже")
        }
        if (error.message === "Недопустимое количество символов") {
          alert("Имя и комментарий должны быть не короче 3-х символов")
        }
        if (error.message === 'Failed to fetch') {
          alert('Интернет не работает, попробуйте позже');
        }
        console.warn(error);
        });
    };

buttonElement.addEventListener("click", () => {
      nameInputElement.classList.remove("error");
      textInputElement.classList.remove("error");
     if (!textInputElement.value.trim() || !nameInputElement.value.trim()) {
     textInputElement.classList.add("error") || nameInputElement.classList.add("error");
    return;         
   }
  addNewComment();
  buttonElement.disabled = true;
  buttonElement.textContent = 'Комментарий добавляется...';
})