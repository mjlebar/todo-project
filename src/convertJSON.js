import { todo } from "./todo.js";
import { project } from "./project.js";

function convertJSON(tempProjects) {
  let newProjects = [];

  for (let i = 0; i < tempProjects.length; i++) {
    const displayableTodos = [];
    for (let j = 0; j < tempProjects[i].todos.length; j++) {
      const oldTodo = tempProjects[i].todos[j];
      const newTodo = new todo(
        oldTodo.title,
        oldTodo.description,
        oldTodo.dueDate,
        oldTodo.priority,
        oldTodo.completed
      );
      displayableTodos.push(newTodo);
    } //Creates new array of todos. this attaches the functions that were removed in local storage

    let newProject = new project(tempProjects[i].title, displayableTodos); //creates new projects with todos with functions attached
    newProjects.push(newProject);
  }

  return newProjects;
} //Takes stored JSON memory on projects and recreates them so that we can attach functions. does this by recreating every project item using a recreated todo array

export { convertJSON };
