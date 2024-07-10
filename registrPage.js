export const registrPage = () => {
  const registrForm = `<div id="commentDiv" class="add-form">
  <div class="">Форма регистрации</div>
  <input
    id="name-input"
    type="text"
    class="registration-name"
    placeholder="Введите имя"
  />
  <input
    id="name-input"
    type="text"
    class="registration-login"
    placeholder="Введите логин"
  />
  <input
    id="name-input"
    type="text"
    class="registration-password"
    placeholder="Введите пароль"
  />
  <div class="registration-row">
    <button id="button" class="authorization-button">Зарегистрироваться</button>
  </div>
  <div class="registration-row">
    <button id="button" class="registration-button">Войти</button>
  </div>
</div>`;

  const conteinerText = document.getElementById("app");
  conteinerText.innerHTML = registrForm;

  const enterText = document.querySelector(".authorization-button");
  enterText.addEventListener("click", () => {
    // прописать сюда, что произойдет если нажать вход 
  });

  const registrText = document.querySelector(".registration-button");
  registrText.addEventListener("click", () => {
    registrPage();
  });
};
