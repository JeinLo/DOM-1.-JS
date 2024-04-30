const listElement = document.getElementById('comment-script');

export const renderCommentators = ({comments, addEventListenerB, replyToCommentFunction}) => {
  const commentatorHTML = comments.map((commentator, index) => {
        return `<li class="comment">
        <div data-user="${commentator.name}" class="comment-header">
          ${commentator.name}
          <div>${commentator.data}</div>
        </div>
        <div class="comment-body">
          <div data-text=">-${commentator.comment}" class="comment-text">
            ${commentator.comment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span data-like="0" class="likes-counter">${commentator.like}</span>
            <button class="like-button ${commentator.isLike ? '-active-like' : ''}" data-index="${index}" ></button>
          </div>
        </div>
        </li>`;
    }).join("");
    listElement.innerHTML = commentatorHTML;
    addEventListenerB()
    //addLikeButtonEventListener();
    replyToCommentFunction();
    inactiveDeleteButton();
  };