import { postComment, token, userName } from "./api.js";
import { correceDateApi } from "./helpers.js";
import { loginPage } from "./loginPage.js";
import { comments, fetchAndRenderComments } from "./main.js";

const listElement = document.getElementById("list");
const commentInputElement = document.getElementById("comment-input");

const initLikeButtons = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
      if (!token) {
        alert("Сначала авторизуйтесь");
        return;
      }
      const index = likeButton.dataset.index;
      event.stopPropagation();

      if (comments[index].isLiked === false) {
        comments[index].isLiked = true;
        comments[index].likes++;
      } else {
        comments[index].isLiked = false;
        comments[index].likes--;
      }
      renderComments({ comments });
    });
  }
};

const initReplyComments = () => {
  if (!token) {
    return;
  }
  const replyComments = document.querySelectorAll(".comment");

  for (const replyComment of replyComments) {
    replyComment.addEventListener("click", () => {
      const text = replyComment.dataset.text;
      commentInputElement.value = text;
    });
  }
};

export const renderComments = ({ comments }) => {
  const authButton = `<p>Для того чтобы оставить комм, <span class="span-click">авторизуйтесь</span></p>`;
  const formHtml = `<div id="commentDiv" class="add-form">
  <input
    id="name-input"
    type="text"
    class="add-form-name"
    placeholder="Введите ваше имя"
    disabled
    value = "${userName}"
  />
  <textarea
    id="comment-input"
    type="textarea"
    class="add-form-text"
    placeholder="Введите ваш коментарий"
    rows="4"
  ></textarea>
  <div class="add-form-row">
    <button id="button" class="add-form-button">Написать</button>
  </div>
</div>`;
  const renderFooter = token ? formHtml : authButton;
  const commentsHtml = comments
    .map((comment, index) => {
      return `<li class="comment" data-text="QUOTE_BEGIN ${comment.name}:\n${
        comment.text
      } QUOTE_END\n">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" class="${
        comment.isLiked ? "like-button -active-like" : "like-button"
      }"></button>
          </div>
        </div>
      </li>`;
    })
    .join("");

  const appHtml = `<ul id="list" class="comments">
    ${commentsHtml}
    </ul>
    ${renderFooter}
    <div id="loadingComment" class="loading">Комментарий добавляется...</div>`;
  const app = document.getElementById("app");
  app.innerHTML = appHtml;

  const loadingCommentElement = document.getElementById("loadingComment");
  loadingCommentElement.style.display = "none";

  actionAuth();
  actionForm();

  initLikeButtons();
  initReplyComments();
};

function actionAuth() {
  if (token) {
    return;
  }
  const authText = document.querySelector(".span-click");
  authText.addEventListener("click", () => {
    loginPage();
  });
}

function actionForm() {
  if (!token) {
    return;
  }
  const buttonElement = document.getElementById("button");
  const nameInputElement = document.getElementById("name-input");
  const commentInputElement = document.getElementById("comment-input");
  const commentDivElement = document.getElementById("commentDiv");
  const loadingCommentElement = document.getElementById("loadingComment");

  // Добавил обработчик событий на button
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
        } else if (error.message === "Сервер упал") {
          alert("Сервер сломался, попробуй позже");
        } else {
          commentDivElement.style.display = "flex";
          loadingCommentElement.style.display = "none";
          alert("У пользователя пропал интернет");
        }
        fetchAndRenderComments();
      });
  });
}
