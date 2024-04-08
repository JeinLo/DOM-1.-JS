import { users } from "./main.js";
import { delay } from "./utils.js";

export function addEventListeners() {
  document.querySelectorAll('.like-button').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.dataset.index, 10);
      const comment = users[index];

      if (comment.isLikeLoading) return;

      comment.isLikeLoading = true;
      this.classList.add('-loading-like'); // Добавляем анимацию

      delay(2000).then(() => {
        // Имитация изменения состояния лайка
        comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1;
        comment.isLiked = !comment.isLiked;
        comment.isLikeLoading = false;
        this.classList.remove('-loading-like');

        renderUsers(users);
      });
    });
  });

  document.querySelectorAll('.comment-text').forEach(div => {
    div.addEventListener('click', function () {
      const index = this.dataset.index;
      textInputElement.value = "QUOTE_BEGIN " + users[index].name + "\n" + users[index].comment + " QUOTE_END";
    });
  });

  document.querySelectorAll('.edit-button').forEach(button => {
    button.addEventListener('click', function () {
      alert("Сервер пока что не поддерживает редактирование комментариев. Приходите позже");
    });
  });

  document.querySelectorAll('.save-button').forEach(button => {
    button.addEventListener('click', function () {
      const index = parseInt(this.dataset.index, 10);
      const newText = document.querySelector(`.edit-textarea[data-index="${index}"]`).value;
      users[index].comment = safeHTML(newText);
      users[index].isEdit = false;
      renderUsers(users);
    });
  });

  updateButtonState();
}

export function renderUsers(users) {
  const listCommentElement = document.getElementById('list-comment');
  const usersHtml = users.map((user, index) => {
    let activeLike = "";
    let commentContent;
    let editButton;
    if (user.isLiked) {
      activeLike = "-active-like";
    }
    if (user.isEdit) {
      // Если комментарий в режиме редактирования
      commentContent = `<textarea class="edit-textarea" data-index="${index}">${user.comment}</textarea>`;
      editButton = `<button class="save-button" data-index="${index}">Сохранить</button>`;
    } else {
      // Если комментарий в обычном режиме просмотра
      commentContent = `<div class="comment-text" data-index="${index}">${user.comment}</div>`;
      editButton = `<button class="edit-button" data-index="${index}">Редактировать</button>`;
      commentContent = commentContent.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>").replaceAll("\n", "</br>");
    }
    return `
        <li class="comment">
          <div class="comment-header">
            <div>${user.name}</div>
            <div>${user.date}</div>
          </div>
          <div class="comment-body">
              ${commentContent}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${user.likes}</span>
              <button class="like-button ${activeLike}" data-index="${index}"></button>
              ${editButton}
            </div>
          </div>
        </li>`;
  });
  listCommentElement.innerHTML = usersHtml.join('');
  // addEventListeners();
}

export function updateButtonState() {
  const nameInputElement = document.getElementById('name-input');
  const textInputElement = document.getElementById('text-input');
  const buttonAddComment = document.getElementById('add-button');
  const nameValue = nameInputElement.value.trim();
  const textValue = textInputElement.value.trim();
  if (nameValue !== "" && textValue !== "") {
    buttonAddComment.disabled = false;
    buttonAddComment.classList.remove("button-error-grey");
  } else {
    buttonAddComment.disabled = true;
    buttonAddComment.classList.add("button-error-grey");
  }
}