import { todo } from "./todo.js";

function project(title) {
  const todos = [];
  const addTodo = (todo) => {
    todos.push(todo);
  };
  const displayTodos = () => {
    for (let todo of todos) {
      todo.display();
    }
  };
  return { title, todos, addTodo, displayTodos };
}
export { project };
