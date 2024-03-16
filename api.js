export function getTodos() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/artem-filumenov/comments',
        {
          method: "GET",
          forceError: true,
        }).then((response) => {
          if (response.status === 500) {
          throw new Error("Сервер упал");
          };
          return response.json();
        });
}

export function postTodo({text, name}) {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/artem-filumenov/comments',
  
        {
          method: "POST",
          body: JSON.stringify({
            text: text.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: name.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
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
