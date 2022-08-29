function project(title) {
  const todos = [];
  const addTodo = (todo) => {
    todos.push(todo);
  };
  const displayTodos = () => {
    const main = document.querySelector(".main");
    for (let todo of todos) {
      const todoRow = document.createElement("p");
      todoRow.textContent = todo.title;
      todoRow.classList.add("todo");
      main.appendChild(todoRow);
    }
  };
  return { title, todos, addTodo, displayTodos };
}
export { project };
