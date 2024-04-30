import { getPromise, postPromise } from "./api.js";
///import { sanitize , normalizeComments} from "./helpers.js";
import {renderComments} from "./render.js"
import {comments} from "./main.js"

const buttonElement = document.getElementById('add-button');

export const addLikeButtonEventListener = () => {
  const likesButtonElement = document.querySelectorAll('.like-button');
  for (const likeButton of likesButtonElement) {
      let isLike = false;
      likeButton.addEventListener("click", event => {
          event.stopPropagation();
          const index = likeButton.dataset.index;
          if (comments[index].isLike === false) {
              comments[index].isLike = true;
              comments[index].like++;
          } else {
              comments[index].isLike = false;
              comments[index].like--;
          }
          likeButton.classList.toggle('-active-like', comments[index].isLike);
          renderCommentators();
          checkInputs();
      });
    renderCommentators = ({comments, addEventListenerB, replyToCommentFunction})  
  };
};

export const addEventListenerB = () => {
  buttonElement.addEventListener("click", () => {
      nameInputElement.classList.remove("error");
      textInputElement.classList.remove("error");
       if (!textInputElement.value.trim() || !nameInputElement.value.trim()) {
       textInputElement.classList.add("error") || nameInputElement.classList.add("error");
      return;         
     }
    addNewComment();
    buttonElement.disabled = true;
    buttonElement.textContent = 'Комментарий добавляется...';
  }//)
  postPromise({

    text: sanitize(textInputElement.value),
    name: sanitize(nameInputElement.value)

   }).then(() => {

    getPromise().then((responseData) => {
      
      renderCommentators({comments, addEventListenerB, replyToCommentFunction});
            
        })
        
        }).then(() => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
          nameInputElement.value = "";
          textInputElement.value = "";
          })
          .catch((error) => {
          buttonElement.disabled = false;
          buttonElement.textContent = 'Написать';
  
          if (error.message === "Сервер сломался") {
            alert("Сервер сломался, попробуйте позже")
          }
          if (error.message === "Недопустимое количество символов") {
            alert("Имя и комментарий должны быть не короче 3-х символов")
          }
          if (error.message === 'Failed to fetch') {
            alert('Интернет не работает, попробуйте позже');
          }
          console.warn(error);
          })
        )}

        export const replyToCommentFunction = () => {
          const replyComments = document.querySelectorAll('.comment-text');
          const commentTextArea = document.getElementById('textarea-accept-comment');
          for (const replyComment of replyComments) {
              replyComment.addEventListener("click", event => {
                  event.stopPropagation();
              const replyUserName = event.target.closest('.comment').querySelector('.comment-header').dataset.user;
              text = replyComment.dataset.text;
              commentTextArea.value = text + ' ' + '\n : - ' + replyUserName;
                  renderCommentators();
                  checkInputs();
              });
          };
        };