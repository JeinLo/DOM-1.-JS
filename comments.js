import { isAuthorized } from './api.js';
import { format } from 'date-fns';

let comments = [];

export function addComment(name, comment) {
    const date = new Date();
    comments.push({
        id: date.getTime(),
        name: name,
        date: format(date, 'yyyy-MM-dd HH.mm.ss'),
        text: comment.sterilize(),
        isLiked: false,
        likes: 0,
    });
}

export function fillComments(data) {
    comments = data.comments.map((comment) => {
        return {
            id: comment.id,
            name: comment.author.name,
            date: format(new Date(comment.date), 'yyyy-MM-dd HH.mm.ss'),
            text: comment.text,
            likes: comment.likes,
            isLiked: false,
        };
    });
}

export function changeLike(id) {
    if (!isAuthorized())
        return alert('Ошибка, авторизуйтесь!')

    const button = document.querySelector(`.like-button[data-id="${id}"]`);

    for (const record of comments) {
        if (record.id === id) {
            if (record.isLiked) {
                record.isLiked = false;
                record.likes--;
                button.classList.remove('-active-like');
            } else {
                record.isLiked = true;
                record.likes++;
                button.classList.add('-active-like');
            }

            break
        }
    }
}

export function getQuote(index) {
    const record = comments[index]
    return `> ${record.text}\n\n${record.name}, `
}

export function deleteLast() {
    comments.pop()
}

export function printCommentList() {
    return comments.map((record, index) => {
        const classLikeButton = record.isLiked ? '-active-like' : ''

        return `<li class="comment">
              <div class="comment-header">
                <div class="comment-name" data-index="${index}">
                    ${record.name.sterilize()}
                </div>
                <div>${record.date}</div>
              </div>
              <div class="comment-body">
                <div class="comment-text" data-index="${index}">
                  ${record.text.sterilize()}
                </div>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${record.likes}</span>
                  <button class="like-button ${classLikeButton}" data-id="${record.id}"></button>
                </div>
              </div>
            </li>`
    }).join("")
}
