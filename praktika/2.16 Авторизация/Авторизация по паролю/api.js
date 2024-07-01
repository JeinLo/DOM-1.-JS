//Импортировали fetchAndRenderTasks
import { fetchAndRenderTasks } from "./main.js";

//Чтобы каждый раз не вводить адрес, создали переменную
const host = "https://wedev-api.sky.pro/api/v2/todos";

// 1) Сделали на пароль let, чтобы его можно было менять
// 2) Присвоили ему prompt, чтобы пользователь вводил пароль
let password = prompt("Введите пароль");

export function getTodos() {
  //Заменили адрес на host
  return fetch(host, {
    method: "GET",
    //Добавили headers в котором загаловку "Authorization" передаем пароль "password". Верный пароль в документации 123456
    headers: {
      Authorization: password,
    },
  }).then((response) => {
    //Если пользователь введет неверный пароль, то сервер вернет ошибку 401, чтобы сайт продолжал работать, запросим у пользователя ввод пароля еще раз
    if (response.status === 401) {
      password = prompt("Неверный пароль, попробуй снова");
      //Запрашиваем повторно данные с сервера, с корректным паролем
      fetchAndRenderTasks();
    }

    return response.json();
  });
}

export function deleteTodo({ id }) {
  return fetch("https://wedev-api.sky.pro/api/v2/todos/" + id, {
    method: "DELETE",
    headers: {
      Authorization: password,
    },
  }).then((response) => {
    return response.json();
  });
}

export function postTodo({ text }) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      Authorization: password,
    },
  }).then((response) => {
    return response.json();
  });
}
