const commentsURL = "https://wedev-api.sky.pro/api/v2/giorgi-bahuta/comments";
const loginURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export let userName;
//Для того чтобы переопределить имя, создаем функция, она принимает новое имя и меняет старое
export const setName = (newName) => {
  userName = newName;
};

export function getComments() {
  return fetch(commentsURL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postComment({ text }) {
  return fetch("https://wedev-api.sky.pro/api/v2/giorgi-bahuta/comments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      text: text
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>"),
    }),
  });
}

export function login({ login, password }) {
  return fetch(loginURL, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 401) {
      alert("неверный логин или пароль");
    }
    return response.json();
  });
}
