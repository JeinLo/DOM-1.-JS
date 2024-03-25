import { loginUser, setToken, token } from "./api.js";

export function entranceUser() {
    const authButtonElement = document.getElementById("authButton");
    const loginInputElement = document.getElementById("authInputName");
    const passwordInputElement = document.getElementById("authInputPassword");
    authButtonElement.addEventListener('click', () => {
        loginUser({
            login: loginInputElement.value,
            password: passwordInputElement.value,
        }).then((responseData) => {
            console.log(token);
            setToken(responseData.user.token);
            console.log(token);
        })
    });
}