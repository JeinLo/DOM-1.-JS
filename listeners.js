import { getPromise, postPromise } from "./api.js";
import { sanitize , normalizeComments} from "./helpers.js";
import {renderComments} from "./render.js";
import {comments, setComments} from "./main.js";
import { token } from "./api.js";

//функция добвления лайка
export const addLike = ({comments}) => {
    const likesElements = document.querySelectorAll(".like-button");
    for (const likesElement of likesElements) {    
      likesElement.addEventListener('click', (event) => {
        event.stopPropagation();

        if (!token) {
            return
          }
        const index = likesElement.dataset.index;
    
        console.log(comments[index].likes);
        if (comments[index].isLiked) {
          comments[index].isLiked = false;
          comments[index].likes--;
          
        } else {
          comments[index].isLiked = true;
          comments[index].likes++;
        }
        renderComments({comments});
    
      });
    }
    };

export const addComment = () => {
    const nameInputElement = document.querySelector(".add-form-name");
    const textInputElement = document.querySelector(".add-form-text");
    const buttonElement = document.querySelector(".add-form-button");
    
    textInputElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        buttonElement.click();
      }
    });
    //удаление последнего комментария
    
    const buttonElementDel = document.querySelector(".delete-form-button");
    
    if (buttonElementDel) {
      buttonElementDel.addEventListener("click", () => {
        comments.pop();
        renderComments({comments, addLike, answerComment});
      });
    } else {
      console.error("Элемент не найден в DOM");
    }

    buttonElement.addEventListener("click", () => {
      nameInputElement.classList.remove("error");
      textInputElement.classList.remove("error");
        if (nameInputElement.value.trim() === "" || textInputElement.value.trim() === "") {
          nameInputElement.classList.add("error");
          textInputElement.classList.add("error");
          return;
        }
        postPromise({
            text: sanitize(textInputElement.value),
            name: sanitize(nameInputElement.value)
        
        }).then(() => {
        
        getPromise()
        .then((responseData) => {
            // console.log(responseData);
            const appComments = normalizeComments(responseData.comments);
              
            // получили данные и рендерим их в приложении
            setComments(appComments);
            renderComments({comments, addLike, answerComment});
            
          })
        
        })
        .then(() => {
        buttonElement.disabled = false;
        buttonElement.textContent = 'Написать';
        nameInputElement.value = "";
        textInputElement.value = "";
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
    if (!token) {
        return
      }
    const comment = document.querySelectorAll(".comment");
    const textInputElement = document.querySelector(".add-form-text");
    comment.forEach((el, index) => {
      el.addEventListener("click", () => {
        textInputElement.value = `${comments[index].name} \n ${comments[index].comment}`;
      });
    });
  }