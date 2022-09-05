import { todo } from "./todo.js";
import { todoForm } from "./todoForm.js";

function project(title, todos = []) {
  const addTodo = (todo) => {
    todos.push(todo);
  };

  const displayTodos = () => {
    const main = document.querySelector(".main");
    main.innerHTML = ""; //clear out any previous entries so that the display changes, rather than duplicating all entries

    const headRow = todo(
      "Title",
      "Description",
      "Due",
      "Priority",
      "Completed"
    ); //special row to make the header of the to-do list

    headRow.display();
    for (let i = 0; i < todos.length; i++) {
      todos[i].display(i, todos); //we pass the index and array to the individual todos so that they can remove themselves from the array when they are deleted
    }

    const plus = document.createElement("img");
    plus.src = "../src/plus-box-outline.svg";
    plus.classList.add("plus");
    plus.addEventListener("click", newTodo);
    //Creates a plus symbol after all todos to create a new one

    main.appendChild(plus);
  };

  const newTodo = (e) => {
    todoForm(e); //sets up to do form

    const submit = document.querySelector(".submit");
    const titleInput = document.querySelector(".title-input");
    const descriptionInput = document.querySelector(".description-input");
    const dateInput = document.querySelector(".date-input");
    const priorityInput = document.querySelector(".priority-input");
    const doneInput = document.querySelector(".done-input");
    const form = document.querySelector("form");
    const plus = e.target;

    let todoTitle, todoDescription, todoDate, todoPriority, todoCompleted;

    submit.addEventListener("click", () => {
      todoTitle = titleInput.value;
      todoDescription = descriptionInput.value;
      todoDate = dateInput.value;
      todoPriority = priorityInput.value;
      todoCompleted = doneInput.checked;
      form.remove();
      plus.classList.remove("hidden");
      const newTodo = todo(
        todoTitle,
        todoDescription,
        todoDate,
        todoPriority,
        todoCompleted
      );

      addTodo(newTodo);
      displayTodos();
    });
  }; //Tried setting this up as an external module, but it needs to be in the project object so the project can add the created todo

  return { title, todos, addTodo, displayTodos };
}
export { project };
