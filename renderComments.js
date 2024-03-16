import { comments } from "./main.js";
import { clock } from "./helpers.js";

export const renderComments = () => {
    const listElement = document.getElementById("list");
    const commentsHtml = comments.map((item) => {
      return `<li class="comment">
                <div class="comment-header">
                  <div class="user-name">${item.name}</div>
                  <div>${clock(item.date)}</div>
                </div>
                <div data-text="${item.comment}" class="comment-body">
                  <div class="comment-text">
                    ${item.comment}
                  </div>
                </div>
                <div class="comment-footer">
                  <div class="likes">
                    <span class="likes-counter">${item.likes}</span>
                    <button data-like="${item.likes}" data-id="${item.id}" class="like-button ${item.isLiked ? '-active-like' : 'like-button'}"></button>
                  </div>
                </div>
              </li>`;
    }).join('');
  
    listElement.innerHTML = commentsHtml;
  
    initLikeButtonListeners();
    answerComment ();
  };

  function initLikeButtonListeners () {
    const buttonElements = document.querySelectorAll('.like-button');
    for (const buttonElement of buttonElements) {
  
      const id = buttonElement.dataset.id;
      const counter = buttonElement.dataset.like;
  
      buttonElement.addEventListener('click', (el) => {
        el.stopPropagation();
        const found = comments.find(item => item.id === + id);
        if (found.isLiked === false) {
          const result = Number(counter) + 1;
          found.likes = result;
          found.isLiked = true;
        } else if (found.isLiked === true) {
          const result = Number(counter) - 1;
          found.likes = result;
          found.isLiked = false;
        }
        renderComments();
  
      });
    }
  };

  function answerComment () {
    const commentBlocks = document.querySelectorAll('.comment-body');
    for (const commentBlock of commentBlocks) {
      commentBlock.addEventListener('click', (event) => {
        const userNames = document.querySelectorAll('.user-name');
        console.log(event);
        textInputElement.value = `< ${event.target.outerText} \n ${event.target.parentElement.parentElement.firstElementChild.firstElementChild.innerText},`;
      });
    }
  }
  