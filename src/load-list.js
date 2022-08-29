import { todo } from "./todo.js";
import { project } from "./project.js";

function loadList() {
  const kick = todo(
    "Kick ass",
    `Kick someone's ass`,
    "12/15/2022",
    "High",
    true
  );
  const defProject = project("default");

  defProject.addTodo(kick);
  defProject.displayTodos();
}

export { loadList };
