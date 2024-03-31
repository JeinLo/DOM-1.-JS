export const sanitize = (element) => {
  return `${element.replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")}`;
}

export function currentDateForComment(elem) {
  const currentDate = new Date(elem.date);
  return `${currentDate.getDate()}.${(currentDate.getMonth() < 8 ? '0' + (currentDate.getMonth() + 1) :
    currentDate.getMonth())}.${currentDate.getFullYear() - 2000}
        ${currentDate.getHours() < 10 ? '0' + currentDate.getHours() : currentDate.getHours()}:${currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : currentDate.getMinutes()}`;
}

export const reAddNewComment = (addNewComment) => {
  let interval = setInterval(addNewComment);
  setTimeout(() => clearInterval(interval), 5000);
}

export function render(elemen) {
  return `
    <li class="comment">
      <div class="comment-header">
        <div>${sanitize(elemen.author.name)}</div>
        <div>${currentDateForComment(elemen)}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${sanitize(elemen.text)}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${elemen.likes}</span>
          <button data-index="${elemen.id}" class="like-button ${elemen.isLiked ? "-active-like" : ""}"></button>
        </div>
      </div>
    </li>`;
}
