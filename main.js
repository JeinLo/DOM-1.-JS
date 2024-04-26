import {getPromise, postPromise} from "./api.js"
import {renderComments} from "./render.js"
import {initEventListeners, initEventAndCommentListener, answerComment} from "./listeners.js"
import { normalizeComments } from "./helpers.js";



const inputNameElement = document.querySelector(".add-form-name");
const inputTextElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
const buttonElementDel = document.querySelector(".delete-form-button");
// Переносим данные из разметки
export let comments = [];
export function setComments(newComments) {
  comments = newComments;
}
const fetchPromiseGet = () => {

  const containerPreloader = document.getElementById('container-preloader');
  const containerPreloaderPost = document.getElementById('container-preloader-post');

  containerPreloader.textContent = 'Пожалуйста подождите, идет загрузка комментариев...';
  containerPreloaderPost.style.display = 'none';

  getPromise().then((responseData) => {
    // console.log(responseData);
    const appComments = normalizeComments(responseData.comments)
    // получили данные и рендерим их в приложении
    comments = appComments;
    containerPreloader.textContent = '';
    containerPreloaderPost.style.display = 'block';
    //console.log(comments)
    renderComments({comments, initEventListeners, answerComment});
    
  })
};
fetchPromiseGet();
initEventAndCommentListener();



console.log("It works!");

// Чтобы форма отправлялась клавишей Enter
inputTextElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    buttonElement.click();
  }
});
//удаление последнего комментария
buttonElementDel.addEventListener("click", () => {

  comments.pop();
  renderComments({comments, initEventListeners, answerComment});
});

//console.log("It works!");*/