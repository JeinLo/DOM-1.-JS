import { getfunction, postFunction } from "./api.js";
import { render, commetForm, initlikeButton } from "./render.js";
import { renderLogin} from "./renderLogin.js";

function MinSec() {
    let currentDate = new Date();
    let options = {hour: '2-digit', minute:'2-digit'};
    return (currentDate.toLocaleTimeString('ru-RU', options)); 
}

 function Year() {
    const months = [1, 2, 3, 4, 5, 6,
        7, 8, 9, 10, 11, 12];
        let myDate = new Date();
      
        let fullDate =  myDate.getDate() +
        "." + months[myDate.getMonth()] +
        "." + myDate.getFullYear() ;
        
        return (fullDate);
        MinSec();
}
    export const getTodo = ()=>{
       getfunction()
      .then((resData) =>{
        const appComments = resData.comments.map((comment) => {
        return{
          id: comment.id,
          name: comment.author.name,
          text: comment.text,
          time: Year(comment.date),
          like: comment.likes,
          isLike: false
          };
        })
        peoples = appComments;
        render();
      });
  }

  export const postTodo = () =>{
    const commentInputEl = document.getElementById('commentInput'); 
    const writeButtonEl = document.getElementById('writeButton');
    postFunction({
      text:commentInputEl.value,
    })
      .then((resData) => { 
        getTodo()
      return resData})
  .then(()=>{
  writeButtonEl.disabled = false;
  writeButtonEl.textContent = 'Написать';
  commentInputEl.value = ('');
})
.catch((error)=>{
writeButtonEl.disabled = false;
writeButtonEl.textContent = 'Написать';
if (error.message === "Ошибка в запросе") {
  alert("Имя и комментарий должны быть не короче 3 символов");
  return;
}
if (error.message === "Сервер упал") {
  alert("Сервер не отвечает, попробуйте позже");
  return;
   }
 })
}

export const mainView = ()=>{
  getfunction()
  .then((resData) =>{
    const appComments = resData.comments.map((comment) => {
    return{
      id: comment.id,
      name: comment.author.name,
      text: comment.text,
      time: Year(comment.date),
      like: comment.likes,
      isLike: false
      };
    })
    peoples = appComments;
    const appEl = document.getElementById('app');
    const appHtml = peoples.map((people, index) => {
       return `<li data-name="${people.name}" data-id="${people.id}" class="comment">
             <div class="comment-header">
               <div >${people.name}</div>
               <div id="time"> ${people.time}</div>
             </div>
             <div class="comment-body" data-index="${index}">
               <div id="text" class="comment-text">
                ${people.text}
               </div>
             </div>   
             <div class="comment-footer">
             </div>
           </li>
           <br>` 
     }).join('');

     appEl.innerHTML = appHtml + `<div class="main-authorization">
      <span id="mainAutho" class="main-autho-button">Авторизуйтесь
      </span>, чтобы оставить комментарий </div>`;
    const mainAuthoEl = document.getElementById('mainAutho');
    mainAuthoEl.addEventListener('click', ()=>{
      renderLogin({render});
    })
  });
}
 
    export let peoples = [];
    export const setPeoples = (newComment)=>{
      peoples = newComment
    }
      mainView();
      commetForm();

