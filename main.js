import { getTodos } from "./api.js";
import { renderComments } from "./renderComments.js";
import { initAddCommentsListeners } from "./initAddCommentsListeners.js";

export const addForm = document.querySelector(".add-form");
export const loader = document.querySelector(".loader");
export let comments = [];

export function getComments() {
    return getTodos().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date),
            comment: comment.text,
            likes: comment.likes,
            isLiked: false,
            id: comment.id,
          }
        });
        comments = appComments;
        renderComments({comments});
        loader.textContent = '';
        addForm.classList.remove("hidden");
        preloader.classList.add('preloader-hidden');
    }).catch((error) => {
      if (error.message === 'Failed to fetch') {
        alert("Кажется что-то пошло не так, попробуйте позже");
      };
      if (error.message === "Сервер упал") {
        alert('Сервер сломался, попробуйте позже');
      };

    console.warn(error);
  });
};

getComments();

initAddCommentsListeners();