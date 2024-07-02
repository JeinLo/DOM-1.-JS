//Чтобы каждый раз не вводить адрес, создали переменную
const todosURL = "https://wedev-api.sky.pro/api/v2/todos";
const loginURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

//Создал новую переменную userName, так как она будет меняться пишем let
export let userName;
//Для того чтобы переопределить имя, создаем функция, она принимает новое имя и меняет старое
export const setName = (newName) => {
  userName = newName;
};

export function getTodos() {
  //Заменили адрес на todosURL
  return fetch(todosURL, {
    method: "GET",
    //Добавили headers в котором загаловку "Authorization" передаем пароль "password". Верный пароль в документации 123456
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    //Если пользователь введет неверный пароль, то сервер вернет ошибку 401, чтобы сайт продолжал работать, запросим у пользователя ввод пароля еще раз
    if (response.status === 401) {
      //token = prompt("Неверный пароль, попробуй снова");
      //Запрашиваем повторно данные с сервера, с корректным паролем
      //fetchAndRenderTasks();
    }

    return response.json();
  });
}

export function deleteTodo({ id }) {
  return fetch("https://wedev-api.sky.pro/api/v2/todos/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ text }) {
  return fetch(todosURL, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return response.json();
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
    if (response.status === 400) {
      alert("неверный логин или пароль");
    }
    return response.json();
  });
}
 