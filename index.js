import { fetchComments } from './modules/api.js'
import { updateComments } from './modules/comments.js'
import { initAddCommentListener } from './modules/initListeners.js'
import { renderComments } from './modules/renderComments.js'

document.querySelector('.comments').innerHTML =
    'Пожалуйста подождите, загружаю комментарии...'

const fetchAndRenderComments = () => {
    fetchComments().then((data) => {
        updateComments(data)

        renderComments()
    })
}

fetchAndRenderComments()
initAddCommentListener(renderComments)
