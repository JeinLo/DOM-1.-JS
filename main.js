"use strict";

import { getComments, postComment } from "./api.js";
import { correceDateApi } from "./helpers.js";
import { renderComments } from "./renderComments.js";

//Поиск элементов
const loadingListElement = document.getElementById("loadingList");
// const loadingCommentElement = document.getElementById("loadingComment");

export let comments = [];

//Чтобы при загрузке страницы не было надписи "Комментарий добавляется..."
// loadingCommentElement.style.display = "none";

export const fetchAndRenderComments = () => {
  getComments().then((responseData) => {
    const addComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: correceDateApi(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        isLiked: comment.isLiked,
      };
    });

    //В конце рендера удаляет лоудер рендера
    loadingListElement.style.display = "none";
    //Убирает надпись "Комментарий добавляется..."
    // loadingCommentElement.style.display = "none";
    //Появляется блок где можно ввести коммент
    // commentDivElement.style.display = "flex";

    comments = addComments;
    renderComments({ comments });
  });
};

fetchAndRenderComments();
