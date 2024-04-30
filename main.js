import {getPromise, postPromise} from "./api.js"
import {renderCommentators} from "./render.js"
//import {initEventListeners, addEventListener, answerComment} from "./listeners.js"
//import { normalizeComments } from "./helpers.js";


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
getPromise ().then((responseData) => {
    //renderCommentators();
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
//const addLikeButtonEventListener = () => {
////const likesButtonElement = document.querySelectorAll('.like-button');
//for (const likeButton of likesButtonElement) {
//    let isLike = false;
//    likeButton.addEventListener("click", event => {
//        event.stopPropagation();
//        const index = likeButton.dataset.index;
//        if (comments[index].isLike === false) {
//            comments[index].isLike = true;
//            comments[index].like++;
//        } else {
//            comments[index].isLike = false;
//            comments[index].like--;
//        }
//        likeButton.classList.toggle('-active-like', comments[index].isLike);
//        renderCommentators();
//        checkInputs();
//    });
//};
//};


// 2.11 
//const replyToCommentFunction = () => {
//const replyComments = document.querySelectorAll('.comment-text');
//const commentTextArea = document.getElementById('textarea-accept-comment');
//for (const replyComment of replyComments) {
//    replyComment.addEventListener("click", event => {
//        event.stopPropagation();
//    const replyUserName = event.target.closest('.comment').querySelector('.comment-header').dataset.user;
//    text = replyComment.dataset.text;
//    commentTextArea.value = text + ' ' + '\n : - ' + replyUserName;
//        renderCommentators();
 //       checkInputs();
//    });
//};
//};

  //Рендер функция



function addNewComment() { 
  postPromiseFetch();
};

    function postPromiseFetch() {

        //.then((response) => {
        //    commentsFunction();
        //})
        postPromise().then(() => {
        
        });
      }
//buttonElement.addEventListener("click", () => {
//      nameInputElement.classList.remove("error");
//      textInputElement.classList.remove("error");
//     if (!textInputElement.value.trim() || !nameInputElement.value.trim()) {
//     textInputElement.classList.add("error") || nameInputElement.classList.add("error");
//    return;         
//   }
//  addNewComment();
//  buttonElement.disabled = true;
//  buttonElement.textContent = 'Комментарий добавляется...';
//})