import {getPromise, postPromise} from "./api.js"
import {renderComments} from "./render.js"
import { normalizeComments } from "./helpers.js";
const commentsLoading = document.querySelector('.data-loading');

const nameInputElement = document.querySelector(".add-form-name");
const textInputElement = document.querySelector(".add-form-text");
const buttonElement = document.querySelector(".add-form-button");
// Переносим данные из разметки
export let comments = [];
export function setComments(newComments) {
  comments = newComments;
}
export const fetchPromiseGet = () => {
  getPromise().then((responseData) => {
    // console.log(responseData);

    const appComments = normalizeComments(responseData.comments)
    // получили данные и рендерим их в приложении
    comments = appComments;
    
    //console.log(comments)
    renderComments({comments});
    
  })
};
fetchPromiseGet();

console.log("It works!");
