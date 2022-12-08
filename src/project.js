import { todo } from "./todo.js";
import { todoForm } from "./todoForm.js";

function project(title, todos = []) {
  const addTodo = (todo) => {
    todos.push(todo);
  };

  const displayTodos = () => {
    const main = document.querySelector("main");
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
    } //passes the responsibility to individual todos to display themselves

    const plus = document.createElement("img");
    plus.src = "../todo-project/src/plus-box-outline.svg";
    plus.classList.add("plus-todo");
    plus.addEventListener("click", newTodo);
    //Creates a plus symbol after all todos, allowing creation of a new one

    main.appendChild(plus);
  };

  const newTodo = (e) => {
    todoForm(e); //sets up the html of the todoForm. Could have been in here but it's just a large quantity of code
    const submit = document.querySelector(".submit"); //creates submit button

    submit.addEventListener("click", submitTodo); //When the submit button is clicked, adds that todo to the display
  }; //

  function submitTodo() {
    const titleInput = document.querySelector(".title-input");
    const descriptionInput = document.querySelector(".description-input");
    const dateInput = document.querySelector(".date-input");
    const priorityInput = document.querySelector(".priority-input");
    const doneInput = document.querySelector(".done-input");
    const form = document.querySelector("form");
    const plus = document.querySelector(".plus-todo"); //selects the input form

    if (
      !titleInput.value ||
      !descriptionInput.value ||
      !dateInput.value ||
      !priorityInput.value
    ) {
      alert("Please fill out all fields of the todo");
    } else {
      const newTodo = todo(
        titleInput.value,
        descriptionInput.value,
        dateInput.value,
        priorityInput.value,
        doneInput.checked
      ); //creates a new todo based on the content of input forms
      addTodo(newTodo);
      displayTodos(); //we want to redisplay the todos, now wiht the new entry
      form.remove(); //clears the input form
      plus.classList.remove("hidden");
    } //if the submission form is not fully filled out, rejects it - otherwise adds the new todo
  }

  return { title, todos, addTodo, displayTodos };
} //passed a title for the project, with the option to pass in a list of todos (this is useful when we reconstruct projects from local storage). Contains functions to add and display todos
export { project };
