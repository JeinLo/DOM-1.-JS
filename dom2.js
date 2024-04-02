const massageSendButton = document.querySelector('.add-form-button');
const listElement = document.querySelector('.comments');
const nameInputElement = document.querySelector('.add-form-name');
const commitInputElement = document.querySelector('.add-form-text');
const lastCommentDeleteButton = document.querySelector('.delete-last-comment');
const likeButtonElements = document.querySelectorAll('.like-button');
massageSendButton.disabled = true;




//Функция получения и преобразования данных с сервера

function getComments() {
  const loadingElement = document.getElementById('loading');
 loadingElement.style.display = 'block';
  return fetch(
    'https://wedev-api.sky.pro/api/v1/DidusAnatoliy/comments',
    {
      method: "GET"
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date).toLocaleDateString('ru-RU', { year: '2-digit', month: '2-digit', day: '2-digit' }) + ' ' + new Date(comment.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          massage: comment.text,
          likesCounter: comment.likes,
          isLiked: false,
        };
      });
      comments = appComments;
      renderComments();
      loadingElement.style.display = 'none';
    });
};
getComments();



//Условное ветвление отрабатывает невозможность ввода первой буквы в виде пробела
nameInputElement.oninput = () => {
  if (nameInputElement.value.charAt(0) === ' ') {
    nameInputElement.value = '';
  }
}

commitInputElement.oninput = () => {
  if (commitInputElement.value.charAt(0) === ' ') {
    commitInputElement.value = '';
  }
}
//массив пользователей
let comments = [];



const likeButtonListners = () => {
  const likeButtonElements = document.querySelectorAll('.like-button');
  for (const likeButtonElement of likeButtonElements) {
    likeButtonElement.addEventListener('click', event => {
      event.stopPropagation();
      const index = likeButtonElement.dataset.index;

      if (comments[index].isLiked === false) {
        comments[index].likesCounter = comments[index].likesCounter + 1;
        comments[index].isLiked = true;

      } else {
        comments[index].isLiked = false;
        comments[index].likesCounter = comments[index].likesCounter - 1;

      }
      renderComments();

    })
  }
}

//Функции ответа на комментарий

const editButtonListners = () => {
  const editButtonElements = document.querySelectorAll(".edit");
  for (const editButtonElement of editButtonElements) {
    editButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      comments[editButtonElement.dataset.index].isEdit = false;
      renderComments();
    })
  }
}




const doneButtonListners = () => {
  const doneButtonElements = document.querySelectorAll(".done");
  for (const doneButtonElement of doneButtonElements) {
    doneButtonElement.addEventListener("click", (event) => {
      event.stopPropagation();
      const dune = doneButtonElement.dataset.index;
      const addFormTextEdit = document.querySelectorAll(".addformedit");
      comments[done].massage = addFormTextEdit[done].value;
      comments[done].isEdit = true;
      renderComments();
    })

  }
}


const quoteElementsListners = () => {
  const quoteElements = document.querySelectorAll(".comment-text");
  for (const quoteElement of quoteElements) {
    quoteElement.addEventListener("click", () => {
      const quote = quoteElement.dataset.index;
      commitInputElement.value = ">" + comments[quote].massage + "\n" + comments[quote].name + "\n";
      renderComments();
    })
  }
}


//HTML разметка комментария
const renderComments = () => {
  const commentsHtml = comments.map((comment, index) => {
    let activeLikeClass;
    if (comments[index].isLiked === true) {
      activeLikeClass = "active-like"
    } else {
      activeLikeClass = ""
    }

    let massageHideClass;
    let doneHideClass;


    return `
        <li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date}</div>
          </div>
          <div class="comment-body">
              <p class ="done ${doneHideClass}" data-index="${index}"></p>
            <div class="comment-text ${massageHideClass}" data-index="${index}">
              ${comment.massage}
              <p class ="edit" data-index="${index}"></p>
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likesCounter}</span>
              <button class="like-button ${activeLikeClass}" data-index="${index}" data-like="${comment.isLiked}"></button>
              </div>
          </div>
        </li>`
  }).join("")
  listElement.innerHTML = commentsHtml;

  likeButtonListners();
  editButtonListners();
  doneButtonListners();
  quoteElementsListners();

}
renderComments();




//функция формата реального времени

function addComment() {


  //Обработчик клика и проверка ввода
  if (nameInputElement.value === "" && commitInputElement.value === "") {
    nameInputElement.classList.add("errorinput");
    commitInputElement.classList.add("errorinput");
    return
  } else if (nameInputElement.value === "") {
    nameInputElement.classList.add("errorinput");
    return
  } else if (commitInputElement.value === "") {
    commitInputElement.classList.add("errorinput");
    return
  }

  //Вввод нового комментария
  massageSendButton.disabled = true;
  massageSendButton.textContent = 'Ждите....';

  //Функция добавлений данных на сервер

  fetch(
    'https://wedev-api.sky.pro/api/v1/DidusAnatoliy/comments',
    {
      method: "POST",
      body: JSON.stringify({
        name: nameInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        text: commitInputElement.value
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
          .replaceAll("END_QUOTE%", "</div>"),
      })
    }
  ).then(() => {
    return getComments();
  }).then(() => {
    massageSendButton.disabled = false;
    massageSendButton.textContent = 'Написать';
  })
  //Очистка форм input
  nameInputElement.value = "";
  commitInputElement.value = "";
  nameInputElement.classList.remove("errorinput");
  commitInputElement.classList.remove("errorinput");

  renderComments();

};

massageSendButton.addEventListener("click", addComment);

nameInputElement.addEventListener("input", () => {
  massageSendButton.disabled = false;
})

commitInputElement.addEventListener("input", () => {
  massageSendButton.disabled = false;
})

lastCommentDeleteButton.addEventListener("click", () => {
  if (comments.length > 0) {
    comments.pop();
    renderComments();
  }
});



