import { getfunction, postFunction } from "./api.js";
import { render, commetForm } from "./render.js";

const nameInputEl = document.getElementById('nameInput');
const commentInputEl = document.getElementById('commentInput');
const writeButtonEl = document.getElementById('writeButton');
const timeEl = document.getElementById('time');
const comEL = document.getElementById('com');

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
    const getTodo = ()=>{
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
        render({peoples});
      });
  }

  const postTodo = () =>{ 
    postFunction({
      name:nameInputEl.value,
      text:commentInputEl.value,
    })
      .then((resData) => { 
        getTodo()
      return resData})
  .then(()=>{
  writeButtonEl.disabled = false;
  writeButtonEl.textContent = 'Написать';
  nameInputEl.value = (''); 
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
 
    let peoples = [];

      getTodo();

commetForm();

render({peoples});

  nameInputEl.addEventListener('input', function(event) {
  writeButtonEl.disabled = (nameInputEl.value === '');
});

      writeButtonEl.addEventListener('click', () => {
        setTimeout(() => { nameInputEl.classList.remove('err');}, 1000 * 0.5);
        setTimeout(() => { commentInputEl.classList.remove('err');}, 1000 * 0.5);

            if (nameInputEl.value === '') {
              nameInputEl.classList.add("err");
              return;
            }
            if (commentInputEl.value === '') {
              commentInputEl.classList.add('err');
              return;
            } 
            if (nameInputEl.value != '') {
              writeButtonEl.disabled = true;
              writeButtonEl.textContent = 'Элемент добавляется...'  
        postTodo();
       render({peoples});
  
    }});