import { comments } from './comments.js'

const list = document.querySelector('.comments')
const commentEl = document.querySelector('.add-form-text')

export const renderComments = () => {
    const commentsHtml = comments
        .map((comment, index) => {
            return `<li class="comment">
  <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.date}</div>
  </div>
  <div data-index=${index} class="comment-body">
    <div class="comment-text">
      ${comment.text}
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${comment.likes}</span>
      <button data-index=${index} class="${
          comment.isLiked ? 'like-button -active-like' : 'like-button'
      }"></button>
    </div>
  </div>
</li>`
        })
        .join('')

    list.innerHTML = commentsHtml

    //Внутрь рендер функции добавим обработчик лайка и дизлайка, чтобы он каждый раз вешался при добавлении новых комментов
    const likeButtons = document.querySelectorAll('.like-button')

    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', function (e) {
            const index = likeButton.dataset.index
            const comment = comments[index]

            comment.isLiked ? comment.likes-- : comment.likes++

            comment.isLiked = !comment.isLiked

            renderComments()
        })
    }

    // Внутрь рендер функции добавим ответ на коммент. При нажатии на любой коммент, на него можно будет ответить
    const commentTexts = document.querySelectorAll('.comment-body')

    for (const commentText of commentTexts) {
        commentText.addEventListener('click', function (e) {
            const index = commentText.dataset.index
            const comment = comments[index]
            const name = comment.name
            const text = comment.text
            commentEl.value = `Ответ на ${name}: ${text} -> `
        })
    }
}
