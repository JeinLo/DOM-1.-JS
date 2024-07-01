import { comments } from "./main.js";

const listElement = document.getElementById("list");
const commentInputElement = document.getElementById("comment-input");

const initLikeButtons = () => {
  const likeButtons = document.querySelectorAll(".like-button");

  for (const likeButton of likeButtons) {
    likeButton.addEventListener("click", (event) => {
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
  const replyComments = document.querySelectorAll(".comment");

  for (const replyComment of replyComments) {
    replyComment.addEventListener("click", () => {
      const text = replyComment.dataset.text;
      commentInputElement.value = text;
    });
  }
};

export const renderComments = ({ comments }) => {
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

  listElement.innerHTML = commentsHtml;

  initLikeButtons();
  initReplyComments();
};
