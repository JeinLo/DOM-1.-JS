"use strict";

import { getComments, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";

//Поиск элементов
const buttonElement = document.getElementById("button");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const loadingListElement = document.getElementById("loadingList");
const loadingCommentElement = document.getElementById("loadingComment");
const commentDivElement = document.getElementById("commentDiv");

let comments = [];

//Чтобы при загрузке страницы не было надписи "Комментарий добавляется..."
loadingCommentElement.style.display = "none";

const fetchAndRenderComments = () => {
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
    loadingCommentElement.style.display = "none";
    //Появляется блок где можно ввести коммент
    commentDivElement.style.display = "flex";

    comments = addComments;
    renderComments({ comments });
  });
};

const correceDateApi = (myDate) => {
  //Создаю объекты для работы с датой
  let date = myDate.getDate();
  let month = myDate.getMonth();
  let year = myDate.getFullYear();
  let hours = myDate.getHours();
  let minutes = myDate.getMinutes();

  //Если в дате, месяце, часах и минутах будут числа меньше 10, добавлять к ним 0 в начале
  date = date < 10 ? "0" + date : date;
  month = month < 10 ? "0" + (month + 1) : month + 1;
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  //Создаю объект, который включает в себя формат "день.месяц.год(последние две цифры) часы:минуты"
  return (
    date +
    "." +
    month +
    "." +
    year.toString().slice(2) +
    " " +
    hours +
    ":" +
    minutes
  );
};

renderComments({ comments });

//Добавил обработчик событий на button
buttonElement.addEventListener("click", () => {
  //Сброс валидации при кадом нажатии, чтобы импуты не оставались красными, после того как чел ошибся и потом исправил
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");
  //Сделал валидацию при нажатии на кнопку, чтобы выдавало ошибку если не введен любой из элементов (name и comment, только name, только comment)
  if (nameInputElement.value === "" && commentInputElement.value === "") {
    nameInputElement.classList.add("error");
    commentInputElement.classList.add("error");
    return;
  } else if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  } else if (commentInputElement.value === "") {
    commentInputElement.classList.add("error");
    return;
  }

  //После нажатия надпись "Комментарий добавляется..." появляется
  loadingCommentElement.style.display = "flex";

  //Во время загрузки убираем блок заполнения коммента
  commentDivElement.style.display = "none";

  postComment({
    name: nameInputElement.value,
    date: correceDateApi(new Date()),
    text: commentInputElement.value,
    likes: 0,
    isLiked: false,
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }

      if (response.status === 400) {
        throw new Error("Валидация");
      } else {
        throw new Error("Сервер упал");
      }
    })
    .then(() => {
      fetchAndRenderComments();
      //Обнуление импутов
      nameInputElement.value = "";
      commentInputElement.value = "";
    })
    .catch((error) => {
      if (error.message === "Валидация") {
        alert("Имя или текст короче 3 символов");
        fetchAndRenderComments();
      } else if (error.message === "Сервер упал") {
        alert("Сервер сломался, попробуй позже");
        fetchAndRenderComments();
      } else {
        commentDivElement.style.display = "flex";
        loadingCommentElement.style.display = "none";
        alert("У пользователя пропал интернет");
        fetchAndRenderComments();
      }
    });
});

fetchAndRenderComments();
