export{render, commetForm}

const listEL = document.getElementById('list');

const initlikeButton = ({peoples}) => {
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
  
      render({peoples});
      });
    }
  }

  const initDeleteButton = ({peoples}) => {
    const deleteButtonEls = document.querySelectorAll('.deleteButton');
    for (const deleteButtonEl of deleteButtonEls) {
      deleteButtonEl.addEventListener('click', (e) => {
       const id = deleteButtonEl.dataset.id;
       fetch("https://wedev-api.sky.pro/api/v1/gazim-akbutin/comments/" + id, {
              method: "DELETE",
            })
            getTodo();
            e.stopPropagation();
      });
    }
  }

  const commetForm = ({peoples}) => {
    const commentInputEl = document.getElementById('commentInput');
    const commentBodyElements = document.querySelectorAll('.comment-body');
    for (const commentBodyElement of commentBodyElements) {
      commentBodyElement.addEventListener('click', () => {
        document.querySelector('.add-form-text').scrollIntoView({behavior: 'smooth' })
        const index = commentBodyElement.dataset.index;
        const commetandname = `${peoples[index].text} \n ${peoples[index].name}`
        commentInputEl.value = commetandname ;
        render({peoples});
      });
    }
  }

const render = ({peoples}) => {
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
         listEL.innerHTML = peopleHtml;
         initDeleteButton({peoples});
         initlikeButton({peoples});
         commetForm({peoples});
}
