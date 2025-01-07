const comments = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        isLike: false,
        numLikes: 3,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        isLike: true,
        numLikes: 75,
    },
]

const nameEl = document.querySelector('.add-form-name')
const commentEl = document.querySelector('.add-form-text')
const buttonEl = document.querySelector('.add-form-button')
const list = document.querySelector('.comments')

function getCurrentFormattedTime() {
    const now = new Date()

    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = String(now.getFullYear()).slice(-2)
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}

// Рендер комментов
const renderComments = () => {
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
      <span class="likes-counter">${comment.numLikes}</span>
      <button data-index=${index} class="${
          comment.isLike ? 'like-button -active-like' : 'like-button'
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

            comment.isLike ? comment.numLikes-- : comment.numLikes++

            comment.isLike = !comment.isLike

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

renderComments()

// Добавление нового коммента
buttonEl.addEventListener('click', function (e) {
    nameEl.classList.remove('error')
    commentEl.classList.remove('error')

    if (nameEl.value === '' && commentEl.value === '') {
        nameEl.classList.add('error')
        commentEl.classList.add('error')
        return
    } else if (commentEl.value === '') {
        commentEl.classList.add('error')
        return
    } else if (nameEl.value === '') {
        nameEl.classList.add('error')
        return
    }

    const currentTime = getCurrentFormattedTime()

    comments.push({
        name: nameEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        date: currentTime,
        text: commentEl.value.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        isLike: false,
        numLikes: 0,
    })

    renderComments()

    nameEl.value = ''
    commentEl.value = ''
})
