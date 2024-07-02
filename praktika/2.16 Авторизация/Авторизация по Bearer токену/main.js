import { getTodos } from "./api.js";
import { renderLogin } from "./renderLogin.js";
import { renderTasks } from "./renderTasks.js";

let tasks = [];

export const fetchAndRenderTasks = () => {
  getTodos().then((responseData) => {
    tasks = responseData.todos;
    renderTasks({ tasks, fetchAndRenderTasks });
    return true;
  });
};

renderLogin({ fetchAndRenderTasks });
