export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v1/giorgi-bahuta/comments", {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
}

export function postComment({ name, date, text }) {
  return fetch("https://wedev-api.sky.pro/api/v1/giorgi-bahuta/comments", {
    method: "POST",
    body: JSON.stringify({
      name: name.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
      date: date,
      text: text
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
      likes: 0,
      isLiked: false,
    }),
  });
}
