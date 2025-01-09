import { renderComments } from './modules/renderComments.js'
import { getCurrentFormattedTime } from './modules/date.js'
import { comments } from './modules/comments.js'

renderComments()

const nameEl = document.querySelector('.add-form-name')
const commentEl = document.querySelector('.add-form-text')
const buttonEl = document.querySelector('.add-form-button')

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
