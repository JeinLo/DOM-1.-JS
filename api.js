function checkResponse(response) {
    if (response.status === 500) {
        throw new Error("Сервер сломался, попробуй позже");
    }
    else if (response.status === 400) {
        throw new Error(
            "Имя и комментарий должны быть не короче 3 символов"
        );
    }
}

const commentsURL = "https://wedev-api.sky.pro/api/v2/lida-merzhoeva/comments";
const registrationURL = " https://wedev-api.sky.pro/api/user";
const loginURL = " https://wedev-api.sky.pro/api/user/login";

export let name;
export let token;

export const setName = (newName) => {
    name = newName
}

export const isAuthorized = () => {
    return Boolean(token)
}

export const setToken = (newToken) => {
    token = newToken;
}

export function getCommentsFromServer(callbackForResponse) {
    // if (!isAuthorized())
    //     return "Go to her!"

    return fetch(commentsURL,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    ).then((response) => {
        checkResponse(response)
        callbackForResponse()
        return response.json();
    })
}
export function setCommentToServer(name, text, callbackForResponse) {
    return fetch(commentsURL,
        {
            method: "POST",
            body: JSON.stringify({
                name: name,
                text: text,
            }),
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            checkResponse(response)
            callbackForResponse()
        })
}



export function login({ login, password }) {
    return fetch(loginURL,
        {
            method: "POST",
            body: JSON.stringify({
                login,
                password,
            }),

        })
        .then((response) => {
            return response.json();
        })
}

export function registration({ login, name, password }) {
    return fetch(registrationURL,
        {
            method: "POST",
            body: JSON.stringify({
                login,
                name,
                password,
            }),

        })
        .then((response) => {
            return response.json();
        })
}
