export function getPromise () {
    return fetch("https://wedev-api.sky.pro/api/v1/Angellina/comments", {
        method: "GET",
    })
      .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else {
            throw new Error("failed to get: " + response.status);
        }
    })
    .catch((error) => {
        console.error("Произошла ошибка при выполнении GET-запроса:", error);
    });
}
      export function postPromise({ text, name})  {
    return fetch("https://wedev-api.sky.pro/api/v1/Angellina/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text,
            forceError: true,
            })
   }) .then((response) => {

    console.log(response);
    
    if (response.status === 201) {
      return response.json();
    }else if (response.status === 500) {
      throw new Error("Сервер сломался")
    }else if (response.status === 400) {
      throw new Error("Недопустимое количество символов")
    }
    
    })
   
   }