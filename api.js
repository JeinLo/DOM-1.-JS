const host = ' https://wedev-api.sky.pro/api/v2/artem-filumenov/comments';
const password = "123456"

export function getTodos() {
    return fetch(host,
        {
          method: "GET",
          headers: {
            Authorization: password,
          },
          forceError: true,
        }).then((response) => {
          if (response.status === 500) {
          throw new Error("Сервер упал");
          };
          if (response.status === 401) {
            throw new Error("Нет авторизации");
            };
          return response.json();
        });
}

export function postTodo({text, name}) {
    return fetch(host,
        {
          method: "POST",
          body: JSON.stringify({
            text: text.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            headers: {
              Authorization: password,
            },
            forceError: true,
          }),
        }).then((response) => {
          if (response.status === 500) {
            throw new Error("Сервер упал");
          };
          if (response.status === 400) {
            throw new Error("Короткие вводимые данные");
          };
          return response.json();
        });
}
