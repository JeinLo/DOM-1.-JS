import { getPromise, postPromise } from "./api.js";
import { sanitize , normalizeComments} from "./helpers.js";
import {renderComments} from "./render.js"
import {comments, setComments} from "./main.js"

//функция добвления обрабочика клика
export const initEventListeners = ({comments, initEventListeners, answerComment}) => {
    const likesElements = document.querySelectorAll(".like-button");
    for (const likesElement of likesElements) {    
      likesElement.addEventListener('click', (event) => {
        event.stopPropagation();

        const index = likesElement.dataset.index;
    
        console.log(comments[index].likes);
        if (comments[index].isLiked) {
          comments[index].isLiked = false;
          comments[index].likes--;
          
        } else {
          comments[index].isLiked = true;
          comments[index].likes++;
        }
    
        renderComments({comments, initEventListeners, answerComment});
    
      });
    }
    };

export const initEventAndCommentListener = () => {
    const inputNameElement = document.querySelector(".add-form-name");
    const inputTextElement = document.querySelector(".add-form-text");
    const buttonElement = document.querySelector(".add-form-button");

    buttonElement.addEventListener("click", () => {
        inputNameElement.classList.remove("error");
        inputTextElement.classList.remove("error");
        if (inputNameElement.value.trim() === "" || inputTextElement.value.trim() === "") {
          inputNameElement.classList.add("error");
          inputTextElement.classList.add("error");
          return;
        }
        postPromise({

            text: sanitize(inputTextElement.value),
        
            name: sanitize(inputNameElement.value)
        
        }).then(() => {
        
        getPromise()
        .then((responseData) => {
            // console.log(responseData);
            const appComments = normalizeComments(responseData.comments);
              
            // получили данные и рендерим их в приложении
            setComments(appComments);
            renderComments({comments, initEventListeners, answerComment});
            
          })
        
        })
        .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        inputNameElement.value = "";
        inputTextElement.value = "";
        })
        .catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуйте снова")
        }
        if (error.message === "Недопустимое количество символов") {
          alert("Имя и комментарий должны быть не короче 3-х символов")
        }
        if (error.message === 'Failed to fetch') {
          alert('Интернет не работает, попробуйте позже');
        }
        console.warn(error);
        })
      
        buttonElement.disabled = true;
        buttonElement.textContent = 'Комментарий добавляется...';
      
      });
}
//ответ на комментарии
   export function answerComment() {
    const comment = document.querySelectorAll(".comment");
    const inputNameElement = document.querySelector(".add-form-name");
    const inputTextElement = document.querySelector(".add-form-text");
    comment.forEach((el, index) => {
      el.addEventListener("click", () => {
        inputTextElement.value = `${comments[index].name} \n ${comments[index].comment}`;
      });
    });
  }