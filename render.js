import {postTodo, peoples, setPeoples} from "./main.js"

const listEL = document.getElementById('list');

export const initlikeButton = () => {
    const likeButtonEls = document.querySelectorAll('.like-button');
    for (const likeButtonEl of likeButtonEls) {
      likeButtonEl.addEventListener('click', () => {
       const index = likeButtonEl.dataset.index;
       
       if (peoples[index].isLike === false || peoples[index].like === 0) {  
       peoples[index].like = parseInt(peoples[index].like) + 1; 
       peoples[index].isLike = true;
       } else {
        peoples[index].like = parseInt(peoples[index].like) - 1;
      peoples[index].isLike = false;
       }
  
      render();
      });
    }
  }

  export const initDeleteButton = () => {
    const deleteButtonEls = document.querySelectorAll('.deleteButton');
    for (const deleteButtonEl of deleteButtonEls) {
      deleteButtonEl.addEventListener('click', (e) => {
       const id = deleteButtonEl.dataset.id;
       const newPeople = peoples.filter((comment)=>{
        return comment.id !== id;
       });
       setPeoples(newPeople);
       render();
      });
    }
  }

 export const commetForm = () => {
    const commentInputEl = document.getElementById('commentInput');
    const commentBodyElements = document.querySelectorAll('.comment-body');
    for (const commentBodyElement of commentBodyElements) {
      commentBodyElement.addEventListener('click', () => {
        document.querySelector('.add-form-text').scrollIntoView({behavior: 'smooth' })
        const index = commentBodyElement.dataset.index;
        const commetandname = `${peoples[index].text} \n ${peoples[index].name}`
        commentInputEl.value = commetandname ;
        render();
      });
    }
  }



export const render = () => {
  const appEl = document.getElementById('app');
        const peopleHtml = peoples.map((people, index) => {
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
                   <button class="deleteButton" data-id="${people.id}">Удалить</button>
                   <div class="likes">
                     <span class="likes-counter" data-index="${index}" >${people.like}</span>
                     <button class="like-button ${people.isLike ? "-active-like" : "" }"
                      data-index="${index}"></button>
                   </div>
                 </div>
               </li>`
         }).join('');
         
         const appHtml = `<div id="management"></div>
         <div id="app"></div>
        <ul id="list" class="comments">${peopleHtml}
         </ul>
         <div id="form" class="add-form">
           <input
             id="nameInput"
             type="text"
             class="add-form-name"
             readonly="readonly"
           />
           <textarea
             id="commentInput"
             type="textarea"
             class="add-form-text"
             placeholder="Введите ваш коментарий"
             rows="4"
           ></textarea>
           <div class="add-form-row">
             <button disabled id="writeButton"  class="add-form-button">Написать</button>
         </div>
         </div>`

         appEl.innerHTML = appHtml;
         initDeleteButton();
         initlikeButton();
         commetForm();

        const commentInputEl = document.getElementById('commentInput');
        const writeButtonEl = document.getElementById('writeButton');
 
        const nameInputEl = document.getElementById('nameInput');
         nameInputEl.value = `Һарыбаш`

        commentInputEl.addEventListener('input', function(event) {
          writeButtonEl.disabled = (commentInputEl.value === '');
        });
              writeButtonEl.addEventListener('click', () => {
                setTimeout(() => { commentInputEl.classList.remove('err');}, 1000 * 0.5);

                    if (commentInputEl.value === '') {
                      commentInputEl.classList.add('err');
                      return;
                    } 
                    if (commentInputEl.value != '') {
                      writeButtonEl.disabled = true;
                      writeButtonEl.textContent = 'Элемент добавляется...'  
                postTodo();
            }});
      }

